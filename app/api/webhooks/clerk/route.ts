import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { User } from "@/utils/schema";
import { db } from "@/utils/db";
import { NextResponse } from "next/server";
import { UserJSON } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET_;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Do something with the payload
  // For this guide, you simply log the payload to the console
  const { id } = evt.data;

  const eventType = evt.type;

  if (eventType === "user.created") {
    return createUser(evt.data.id, evt.data.created_at);
  }

  async function createUser(id: string, createdAt: number) {
    console.info("creating user due to clerk webhook");

    // Ensure we're dealing with a UserJSON object
    if (!isUserJSON(evt.data)) {
      throw new Error("Invalid user data received");
    }

    const userData = evt.data;

    console.log(userData);

    await db.insert(User).values({
      email: userData.email_addresses[0]?.email_address ?? "",
      firstName: userData.first_name ?? null,
      lastName: userData.last_name ?? null,
      imageUrl: userData.image_url ?? null,
      clerkUserId: id,
      createdAt: new Date(createdAt),
      updatedAt: new Date(createdAt),
    });

    return NextResponse.json(
      {
        message: "user created",
      },
      { status: 200 }
    );
  }

  // Type guard to ensure we're dealing with a UserJSON object

  // Type guard to ensure we're dealing with a UserJSON object
  function isUserJSON(data: any): data is UserJSON {
    return (
      data &&
      typeof data === "object" &&
      "email_addresses" in data &&
      "first_name" in data &&
      "last_name" in data
    );
  }

  return new Response("", { status: 200 });
}
