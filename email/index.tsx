import { Resend } from 'resend'
import { APP_NAME, SENDER_EMAIL } from '@/lib/constants'
import { Order } from '@/types';
import 'dotenv/config';
import PurchaseReceipEmail from './purchase-receipt';

const resend = new Resend(process.env.RESEND_API_KEY as string);

export const sendPurchaseReceipt = async ({ order }: { order: Order; }) => {
    await resend.emails.send({
        from: `${APP_NAME} <${SENDER_EMAIL}>`,
        to: order.user.email as string,
        subject: `Order Confirmation ${order.id}`,
        react: <PurchaseReceipEmail order={order} />,
    });
}