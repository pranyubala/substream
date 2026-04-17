import { NextResponse } from "next/server";
import DodoPayments from "dodopayments";

// Initialize the Dodo client
const dodo = new DodoPayments({
 
  bearerToken: process.env.DODO_PAYMENTS_API_KEY, 
  environment: "test_mode", 
  timeout: 60000,
  maxRetries: 3,
});

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("Authorization");
    
    if (!authHeader || !authHeader.startsWith("Bearer sk_live_sub")) {
      return NextResponse.json(
        { error: "Unauthorized. Invalid Agent API Key." }, 
        { status: 401 }
      );
    }

    const body = await request.json();
    const { agent_id, amount_usd, description } = body;

    const product = await dodo.products.create({
      name: `x402 Protocol: ${description} (via ${agent_id})`,
      price: {
        price: amount_usd * 100, 
        currency: "USD",
        type: "one_time_price",
        discount: 0,
        purchasing_power_parity: false
      },
      tax_category: "digital_products"
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

    return NextResponse.json(
      {
        status: "402 Payment Required",
        message: "AGENT HALTED: Human payment required to release data.",
        agent_id: agent_id,
        checkout_url: session.checkout_url, 
      },
      { status: 402 } 
    );

  } catch (error) {
    console.error("x402 API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" }, 
      { status: 500 }
    );
  }
}