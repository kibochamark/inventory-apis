import db from "../utils/dbconnection";
import { inventory } from "./schema";
import { lt, sql } from "drizzle-orm";

export async function getTotalInventoryValue() {
    const result = await db
        .select({
            price:inventory.price,
            quantity:inventory.quantity
        })
        .from(inventory)

    const totalValue = result.reduce((acc, item:any) => acc + item.price * item.quantity, 0);
    return totalValue;
}


export async function getLowStockItems(threshold: number) {
    const result = await db.execute(sql`
        SELECT COUNT(*) AS low_stock_count
        FROM ${inventory}
        WHERE quantity < ${threshold}
    `);

    return result?.rows[0]?.low_stock_count || 0;
}




export async function getTotalInventoryToday() {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayStartIso = todayStart.toISOString();

    const result = await db.execute(sql`
        SELECT COUNT(*) AS total_inventory_count
        FROM ${inventory}
        WHERE created_at > ${todayStartIso}
    `);

    return result.rows[0].total_inventory_count || 0;
}


export async function getRecentlyAddedItems() {
    const oneHourAgo = new Date(Date.now() - 3600 * 1000).toISOString();

    const result = await db.execute(sql`
        SELECT COUNT(*) AS recent_items_count
        FROM ${inventory}
        WHERE created_at > ${oneHourAgo}
    `);

    return result.rows[0].recent_items_count || 0;
}