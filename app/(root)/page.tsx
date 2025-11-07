import ProductList from "@/components/shared/product/product-list";
import { getFeaturedProduts, getLatestProducts } from "@/lib/actions/product.actions";
import ProductCarousel from "@/components/shared/product/product-carousel";

const HomePage = async () => {
  const latestProducts = await getLatestProducts()
  const featureProducts = await getFeaturedProduts()



  return ( 
  <>
  { featureProducts.length > 0 && <ProductCarousel data={featureProducts}/> }
<ProductList data={latestProducts} title="Newest Arrivals" limit={4}/>
  </> );
}
 
export default HomePage;