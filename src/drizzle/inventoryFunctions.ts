import { eq } from "drizzle-orm"
import db from "../utils/dbconnection"
import { categories, Category, InsertInventory, inventory } from "./schema"


// create user
export const createInventory = async(invt:InsertInventory)=>{
    return await db.insert(inventory).values(invt).returning({
        id:inventory.id,
        name:inventory.name,
        description:inventory.description,
        quantity:inventory.quantity,
        category_id:inventory.category_id,
        price: inventory.price,
        created_at:inventory.created_at,

    })
}


export const getinventories = async()=>{
    return await db.query.inventory.findMany({
    
    })
}



export const getinventory = async(invtid:number)=>{
    return await db.query.inventory.findFirst({
        where:(eq(inventory.id, invtid)),
        
    })
}


export const updateInvt = async (invt:any, invtid: number) => {
    return await db.update(inventory).set({
        ...invt
    }).where(eq(inventory.id, invtid)).returning({
        id:inventory.id,
        name:inventory.name,
        description:inventory.description,
        quantity:inventory.quantity,
        category_id:inventory.category_id,
        price: inventory.price,
        updated_at:inventory.updated_at,
    });
};




export const deleteinventory= async(invtid:number)=>{
    return await db.delete(inventory).where(eq(inventory.id, invtid))
}
