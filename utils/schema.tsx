import {
  boolean,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const AIOutput = pgTable("aiOutput", {
  id: serial("id").primaryKey(),
  formData: varchar("formData").notNull(),
  aiResponse: text("aiResponse"),
  templateSlug: varchar("templateSlug").notNull(),
  createdBy: varchar("createdBy").notNull(),
  createdAt: varchar("createdAt"),
  icon: varchar("icon").notNull(),
});

export const User = pgTable("user", {
  id: serial("id").primaryKey(),
  email: varchar("email").notNull().unique(),
  firstName: varchar("firstName"),
  lastName: varchar("lastName"),
  imageUrl: varchar("imageUrl"),
  clerkUserId: varchar("clerkUserId").notNull().unique(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
  customerId: varchar("customerId"),
});

export const Subscription = pgTable("subscription", {
  id: serial("id").primaryKey(),
  active: boolean("active"),
  startDate: timestamp("startDate"),
  endDate: timestamp("endDate"),
});
