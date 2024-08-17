import { stripe } from "@/lib/stripe";
import { db } from "@/utils/db";
import { Subscription, User } from "@/utils/schema";
import Stripe from "stripe";
import { eq } from "drizzle-orm";

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const body = await req.text();

  const sig = req.headers.get("stripe-signature")!;
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, WEBHOOK_SECRET);
  } catch (error: any) {
    console.error("Webhook signature verification failed", error.message);
    return new Response(`Webhook Error: ${error.message}`, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        const session = await stripe.checkout.sessions.retrieve(
          (event.data.object as Stripe.Checkout.Session).id,
          {
            expand: ["line_items"],
          }
        );
        const customerId = session.customer as string;
        const customerDetails = session.customer_details;

        if (customerDetails?.email) {
          const [user] = await db
            .select()
            .from(User)
            .where(eq(User.email, customerDetails.email));
          if (!user) throw new Error("User not found");

          // Update or set the customerId for the user
          await db.update(User).set({ customerId }).where(eq(User.id, user.id));

          const lineItems = session.line_items?.data || [];

          for (const item of lineItems) {
            const priceId = item.price?.id;
            const isSubscription = item.price?.type === "recurring";

            if (isSubscription) {
              let endDate = new Date();
              if (priceId === process.env.STRIPE_PRICE_ID!) {
                endDate.setMonth(endDate.getMonth() + 1);
              } else {
                throw new Error("Invalid PriceId");
              }

              // Create or update the subscription using customerId as the id
              await db
                .insert(Subscription)
                .values({
                  id: customerId,
                  userId: user.clerkUserId,
                  startDate: new Date(),
                  endDate: endDate,
                  active: true,
                })
                .onConflictDoUpdate({
                  target: Subscription.id,
                  set: {
                    startDate: new Date(),
                    endDate: endDate,
                    active: true,
                  },
                });
            } else {
              // Handle one-time purchase
            }
          }
        }

      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  } catch (error) {
    console.error(error);
    return new Response("Webhook Error", { status: 400 });
  }

  return new Response("Webhook received", { status: 200 });
}
