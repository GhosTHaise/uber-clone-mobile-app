import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, amount } = body;

  if (!name || !email || !amount) {
    return new Response(
      JSON.stringify({
        error: "Please enter a valid paiement infos.",
        status: 400,
      }),
    );
  }

  let customer;
  const existingCustomer = await stripe.customers.list({ email });
  if (!!existingCustomer.data.length) {
    customer = existingCustomer.data[0];
  } else {
    const newCustomer = await stripe.customers.create({
      email,
      name,
    });

    customer = newCustomer;
  }

  const ephemeralKey = await stripe.ephemeralKeys.create(
    { customer: customer.id },
    { apiVersion: "2023-10-16" },
  );
  const paymentIntent = await stripe.paymentIntents.create({
    amount: parseInt(amount) * 100,
    currency: "usd",
    customer: customer.id,
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter
    // is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
      allow_redirects: "never",
    },
  });

  return new Response(
    JSON.stringify({
      paymentIntent: paymentIntent,
      ephemeralKey: ephemeralKey,
      customer: customer.id,
    }),
  );
}
