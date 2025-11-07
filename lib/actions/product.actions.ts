'use server'
import {prisma} from 'db/prisma'
import { convertToPlainObject, formatError } from "../utils"
import { LATEST_PRODUCTS_LIMIT, PAGE_SIZE } from "../constants"
import { revalidatePath } from 'next/cache'
import { insertProductSchema, updateProductSchema } from '../validators'
import z from 'zod'
import { Prisma } from '@prisma/client'

// Get latest products
export async function getLatestProducts(){

    const data = await prisma.product.findMany({
        take:LATEST_PRODUCTS_LIMIT,
        orderBy:{createAt:"desc"}
    })

    return convertToPlainObject(data)
}

//Get single product by it's slug
export async function getProductBySlug(slug:string){
    return await prisma.product.findFirst({
        where:{slug:slug}
    })
}

//Get single product by it's ID
export async function getProductById(productId:string){
    const data = await prisma.product.findFirst({
        where:{ id: productId },
    });

    return convertToPlainObject(data);
}

// Get all products
export async function getAllProducts({
    query,
    limit = PAGE_SIZE,
    page,
    category,
}: {
    query: string;
    limit?: number;
    page: number;
    category?: string;
}) {
    // Build where clause based on filters
    const whereClause: Prisma.ProductWhereInput = {};
    
    if (query) {
        whereClause.OR = [
            { name: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
        ];
    }
    
    if (category && category !== 'all') {
        whereClause.category = category;
    }

    const data = await prisma.product.findMany({
        where: whereClause,
        orderBy: { createAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit
    });

    const dataCount = await prisma.product.count({
        where: whereClause
    });

    return {
        data,
        totalPages: Math.ceil(dataCount / limit)
    }
}

// Delete product
export async function deleteProduct(id: string) {
    try {
        const productExists = await prisma.product.findFirst({
            where: { id }

        })

        if(!productExists) throw new Error('Product not found')

        await prisma.product.delete({where: {id} })

        revalidatePath('/admin/products');

        return {
            success: true,
            message: 'Product deleted successfully',
        }
    } catch (error) {
        return {success: false, message: formatError(error)}
    }
}

// Create a product
export async function createProduct(data: z.infer<typeof insertProductSchema>) {

    try {
        const product = insertProductSchema.parse(data);
        await prisma.product.create({data: product});

        revalidatePath('/admin/products');

        return {
            success: true,
            message: 'Product created successfully'
        }
        
    } catch (error) {
        return { success: false, message: formatError(error) }
    }
    
}

// Update product
export async function updateProduct(data: z.infer<typeof updateProductSchema>) {

    try {
        const product = updateProductSchema.parse(data);
        const productExists = await prisma.product.findFirst({
            where: { id: product.id }
        })

        if(!productExists) throw new Error('Product not found');

        await prisma.product.update({
            where: {id: product.id},
            data: product
        })

        revalidatePath('/admin/products');

        return {
            success: true,
            message: 'Product update successfully'
        }
        
    } catch (error) {
        return { success: false, message: formatError(error) }
    }
    
}

// Get all categories
export async function getAllCategories() {
    const data = await prisma.product.groupBy({
        by: ['category'],
        _count:true
    })
    return data;
}