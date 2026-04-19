import { NextResponse } from "next/server";
import DodoPayments from "dodopayments";

const dodo = new DodoPayments({
  
  bearerToken: process.env.DODO_PAYMENTS_API_KEY, 
  environment: "test_mode", 
  timeout: 60000,
  maxRetries: 3,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { planName, price } = body;

    const product = await dodo.products.create({
      name: planName,
      tax_category: "saas",
      price: {
        currency: "USD",
        price: price * 100, 
        type: "one_time_price",
        discount: 0, 
        purchasing_power_parity: false,
      },
    });

    const session = await dodo.checkoutSessions.create({
      product_cart: [ 
        {
          product_id: product.product_id,
          quantity: 1,
        },
      ],
      billing_currency: "USD",
return_url: "https://substream-amber.vercel.app/dashboard",
    });

    return NextResponse.json({ url: session.checkout_url });
    
  } catch (error) {
    console.error("Dodo API Error:", error);
    return NextResponse.json({ error: "Failed to create link" }, { status: 500 });
  }
}