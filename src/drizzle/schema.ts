
import { decimal, integer, json, pgEnum, pgTable, primaryKey, serial, text, timestamp, varchar, numeric } from "drizzle-orm/pg-core";
import { InferModel, SQL, relations } from "drizzle-orm";




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
export const refreshTokens = pgTable("refresh_tokens", {
    id: serial('id').primaryKey(),
    user_id: integer('user_id').references(() => users.id).notNull(),
    token: text('token').notNull(),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp("updated_at").defaultNow().$onUpdate(() => new Date())
});

// Products Table
export const inventory = pgTable("inventory", {
    id: serial('id').primaryKey(),
    name: text('name').notNull().unique(),
    quantity:integer("quantity").notNull(),
    description: text('description'),
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





// Relations
export const inventoryRelations = relations(inventory, ({ one, many }) => ({
    categories:one(categories)
    
}));
// Relations
export const categoryRelation  = relations(categories, ({ one, many }) => ({
    inventories:many(inventory)
}));







export type User = InferModel<typeof users, 'select'>;
export type InsertUser = InferModel<typeof users, 'insert'>;


// cApi types
export type Category = InferModel<typeof categories, 'select'>;
export type InsertCategory = InferModel<typeof categories, 'insert'>;

export type RefreshToken = InferModel<typeof refreshTokens, 'insert'>;


