import { eq } from "drizzle-orm"
import db from "../utils/dbconnection"
import { AccessRefreshToken, accessrefreshTokens, categories, Category, inventory, User, users } from "./schema"
import { sql } from 'drizzle-orm';



// create user
export const createCategory = async(cat:{name:string; description:string})=>{
    return await db.insert(categories).values(cat).returning({
        id:categories.id,
        name:categories.name,
        description:categories.description,
        created_at:categories.created_at
    })
}


export const getCategories = async()=>{
    return await db.select({
        id:categories.id,
        name:categories.name,
        description:categories.description,
        created_at:categories.created_at
    }).from(categories)
}


export const getCategory = async(catid:number)=>{
    return await db.select({
        id:categories.id,
        name:categories.name,
        description:categories.description,
        created_at:categories.created_at
    }).from(categories).where(eq(categories.id, catid))
}




export const getInventoriesByCategory = async () => {
    const result = await db.execute<{ name: string; inventoryCount: number }>(
        sql`
            SELECT 
                c.name,
                COUNT(i.id) as "inventoryCount"
            FROM 
                categories c
            LEFT JOIN 
                inventory i 
            ON 
                c.id = i.category_id
            GROUP BY 
                c.name
        `
    );

    // Return the formatted result
    return result?.rows
};









export const updateCategory = async (cat:any, catid: number) => {
    return await db.update(categories).set({
        ...cat
    }).where(eq(categories.id, catid)).returning({
        name:categories.name,
        description:categories.description,
        updated_at:categories.updated_at
    });
};




export const deletecategory= async(catid:number)=>{
    return await db.delete(categories).where(eq(categories.id, catid))
}
