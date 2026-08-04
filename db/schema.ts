import { pgTable, serial, text, real, jsonb, timestamp } from "drizzle-orm/pg-core";

export const contacts = pgTable("contacts", {
  id: serial().primaryKey(),
  name: text().notNull(),
  email: text().notNull(),
  phone: text().notNull(),
  message: text().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const auditResponses = pgTable("audit_responses", {
  id: serial().primaryKey(),
  score: real().notNull(),
  assessment: text().notNull(),
  answers: jsonb().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
