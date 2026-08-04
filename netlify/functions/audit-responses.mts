import type { Config } from "@netlify/functions";
import { desc } from "drizzle-orm";
import { db } from "../../db/index.js";
import { auditResponses } from "../../db/schema.js";
import { isAdminAuthorized } from "./lib/admin-auth.js";

export default async (req: Request) => {
  if (req.method === "GET") {
    if (!isAdminAuthorized(req)) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    const rows = await db.select().from(auditResponses).orderBy(desc(auditResponses.createdAt));
    return Response.json(rows);
  }

  if (req.method === "POST") {
    const body = await req.json().catch(() => null);
    const score = typeof body?.score === "number" && Number.isFinite(body.score) ? body.score : null;
    const assessment = typeof body?.assessment === "string" ? body.assessment.trim() : "";
    const answers = Array.isArray(body?.answers) ? body.answers : null;

    if (score === null || !assessment || !answers) {
      return Response.json({ error: "score, assessment, and answers are required" }, { status: 400 });
    }

    const [created] = await db.insert(auditResponses).values({ score, assessment, answers }).returning();
    return Response.json(created, { status: 201 });
  }

  return new Response("Method not allowed", { status: 405 });
};

export const config: Config = {
  path: "/api/audit-responses",
};
