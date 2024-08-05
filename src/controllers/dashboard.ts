import { getLowStockItems, getRecentlyAddedItems,  getStockLevelsByCategoryOverTime,  getTotalInventoryToday, getTotalInventoryValue } from "../drizzle/dashboarbFunctions";
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



export async function fetchStockLevelsOverTime(req:Request,res:Response){
    try{
        const interval = req.query.interval as 'day' | 'week';
        const stockLevelsOverTime = await getStockLevelsByCategoryOverTime(interval);
        res.status(200).json({stockLevelsOverTime})
    }catch(e:any){
        res.status(500).json({message:e.message})
    }
}