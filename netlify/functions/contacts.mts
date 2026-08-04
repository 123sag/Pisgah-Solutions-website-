import type { Config } from "@netlify/functions";
import { desc } from "drizzle-orm";
import { db } from "../../db/index.js";
import { contacts } from "../../db/schema.js";
import { isAdminAuthorized } from "./lib/admin-auth.js";

export default async (req: Request) => {
  if (req.method === "GET") {
    if (!isAdminAuthorized(req)) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    const rows = await db.select().from(contacts).orderBy(desc(contacts.createdAt));
    return Response.json(rows);
  }

  if (req.method === "POST") {
    const body = await req.json().catch(() => null);
    const name = typeof body?.name === "string" ? body.name.trim() : "";
    const email = typeof body?.email === "string" ? body.email.trim() : "";
    const phone = typeof body?.phone === "string" ? body.phone.trim() : "";
    const message = typeof body?.message === "string" ? body.message.trim() : "";

    if (!name || !email || !phone || !message) {
      return Response.json({ error: "name, email, phone, and message are required" }, { status: 400 });
    }
    if ([name, email, phone, message].some((v) => v.length > 2000)) {
      return Response.json({ error: "Field too long" }, { status: 400 });
    }

    const [created] = await db.insert(contacts).values({ name, email, phone, message }).returning();
    return Response.json(created, { status: 201 });
  }

  return new Response("Method not allowed", { status: 405 });
};

export const config: Config = {
  path: "/api/contacts",
};
