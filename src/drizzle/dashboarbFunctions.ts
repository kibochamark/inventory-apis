import db from "../utils/dbconnection";
import { categories, inventory } from "./schema";
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






export const getStockLevelsByCategoryOverTime = async (interval: 'day' | 'week' = 'day') => {
    // Define the SQL query to aggregate inventory levels by category and time period
    const query = sql`
        SELECT
            c.name AS category_name,
            DATE_TRUNC(${interval}, i.created_at) AS period,
            SUM(i.quantity) AS total_stock
        FROM
            ${inventory} i
        JOIN
            ${categories} c
        ON
            i.category_id = c.id
        GROUP BY
            c.name, i.created_at
        ORDER BY
            c.name, period;
    `;

    // Execute the query
    const result = await db.execute(query);

    // Format the result for the frontend
    const formattedResult = result.rows.reduce((acc:any, row:any) => {
        // Create a unique key for each category
        const key = row.category_name;
        if (!acc[key]) {
            acc[key] = { label: key, data: [] };
        }
        acc[key].data.push({
            period: row.period, // This will be a timestamp
            total_stock: row.total_stock
        });
        return acc;
    }, {});

    // Convert the result into an array format
    const chartData = Object.values(formattedResult).map((category:any) => ({
        label: category?.label,
        data: category?.data.map((item:any) => ({
            period: new Date(item.period).toLocaleDateString(),
            total_stock: item.total_stock
        }))
    }));

    return chartData;
};
