import { getLowStockItems, getRecentlyAddedItems, getTotalInventoryToday, getTotalInventoryValue } from "../drizzle/dashboarbFunctions";
import { Request, Response } from "express";

export async function getDashboardData(req:Request,res:Response){

    try{

        const totalInventoryValue = await getTotalInventoryValue();
        const lowStockItems = await getLowStockItems(10);
        const totalInventoryToday = await getTotalInventoryToday();
        const recentlyAddedItems = await getRecentlyAddedItems();

        res.status(200).json({totalInventoryValue,lowStockItems,totalInventoryToday,recentlyAddedItems})

    }catch(e:any){
        res.status(500).json({message:e.message})
    }
}