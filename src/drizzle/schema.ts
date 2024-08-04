
import { InferModel,relations } from "drizzle-orm";
import { pgTable, serial, text, integer, decimal, timestamp, varchar, boolean } from "drizzle-orm/pg-core";




// Users Table
export const users = pgTable("users", {
    id: serial('id').primaryKey(),
    username:varchar("username").notNull().unique(),
    email: text('email').notNull().unique(),
    password: varchar('password').notNull(),
    salt: varchar('salt').notNull(),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow().$onUpdate(() => new Date())
});


// RefreshTokens Table
export const accessrefreshTokens = pgTable("access_refresh_tokens", {
    id: serial('id').primaryKey(),
    user_id: integer('user_id').references(() => users.id).notNull(),
    access_token: text('access_token').notNull(),
    refresh_token: text('refresh_token').notNull(),
    access_blacklisted: boolean("access_blacklisted").notNull(), // Ensure this is correct
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp("updated_at").defaultNow().$onUpdate(() => new Date())
});


// Products Table
export const inventory = pgTable("inventory", {
    id: serial('id').primaryKey(),
    name: text('name').notNull().unique(),
    quantity:integer("quantity").notNull(),
    description: text('description').notNull(),
    category_id:integer('category_id').references(() => categories.id).notNull(),
    price: decimal('price', {
        precision:10,
        scale:2
    }).notNull(),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp("updated_at").defaultNow().$onUpdate(() => new Date())
});





//categories table

export const categories = pgTable("categories", {
    id: serial('id').primaryKey(),
    name: text('name').notNull().unique(),
    description: text('description'),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp("updated_at").defaultNow().$onUpdate(() => new Date())
})





export const inventoryRelations = relations(inventory, ({ one }) => ({
    category: one(categories)
}));

export const categoryRelations = relations(categories, ({ many }) => ({
    inventories: many(inventory)
}));







export type User = InferModel<typeof users, 'select'>;
export type InsertUser = InferModel<typeof users, 'insert'>;


// cApi types
export type Category = InferModel<typeof categories, 'select'>;
export type InsertCategory = InferModel<typeof categories, 'insert'>;
export type InsertInventory = InferModel<typeof inventory, 'insert'>;

export type AccessRefreshToken = InferModel<typeof accessrefreshTokens, 'insert'>