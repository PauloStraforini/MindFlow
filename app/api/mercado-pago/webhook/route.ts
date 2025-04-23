/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import { Payment } from "mercadopago";
import mpClient from "@/lib/mercado-pago";
import { handleMercadoPagoPayment } from "@/server/mercado-mercado/handle-payments";

export async function POST(req: NextRequest) {
    try {
        
        const body = await req.json()
        const { type, data } = body

        //Webhook signature validation
        switch (type) {
            case "payment":
                const payment = new Payment(mpClient)
                const paymentData = await payment.get({id: data.id,})

                if (
                    paymentData.status === "approved" || 
                    paymentData.date_approved === null
                ) {
                    await handleMercadoPagoPayment(paymentData)
                } 

                break
            case "subscription_prepproval":
                 break
            default:
                console.log("Unknown webhook type:", type)
        }

        return NextResponse.json({received: true}, { status: 200 });
    } catch (error) {
        console.error("Error processing webhook:", error)
        return NextResponse.json(
            { error: "Internal server error." },
            { status: 500 }
        )
    }
}

