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
}

/* app.post('/create-intent', async (req, res) => {
    try {
        var args = {
            amount: 1099,
            currency: 'usd',
            // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
            automatic_payment_methods: { enabled: true },
        };
        const intent = await stripe.paymentIntents.create(args);
        res.json({
            client_secret: intent.client_secret,
        });
    } catch (err) {
        res.status(err.statusCode).json({ error: err.message })
    }
});

app.listen(3000, () => {
    console.log('Running on port 3000');
}); */
