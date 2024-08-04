import { createCategory, deletecategory, getCategories, getCategory, getInventoriesByCategory, updateCategory } from "../drizzle/categoryFunctions";
import { createInventory, deleteinventory, getinventories, getinventory, updateInvt } from "../drizzle/inventoryFunctions";
import { Request, Response } from "express";
import Joi from "joi";

// schemas ---------------------


// validation schema
const inventorySchema = Joi.object({
    name: Joi.string().min(3).max(10).required(),
    description: Joi.string().min(3).max(30).required(),
    price: Joi.number().precision(2).required(),
    quantity: Joi.number().required(),
    categoryid: Joi.number().required()
});
const updateinventorySchema = Joi.object({
    name: Joi.string().min(3).max(10),
    description: Joi.string().min(3).max(30),
    price: Joi.number().precision(2),
    quantity: Joi.number(),
    categoryid: Joi.number()
});


// --------------------

export async function InsertInventory(req:Request, res:Response){
    try{

        const { error, value } = inventorySchema.validate(req.body, { abortEarly: false });

        if (error) {
            return res.status(400).json({
                error: error.details.map(detail => detail.message),
            });
        }


        const { name, description, quantity, price, categoryid} = value;


        const invt= await createInventory({
            name:name,
            description:description,
            price:price,
            quantity:quantity,
            category_id:categoryid
        })


        return res.status(201).json(invt).end()

    }catch(e:any){
        return res.status(500).json({
            error:e?.message
        }).end()
    }
}



export async function putInventory(req:Request, res:Response){
    try{
        const {id} = req.params

        if(!id){
            return res.status(400).json({
                error:"id missing in parameters"
            })
        }

        const { error, value } = updateinventorySchema.validate(req.body, { abortEarly: false });

        if (error) {
            return res.status(400).json({
                error: error.details.map(detail => detail.message),
            });
        }


        const invt= await updateInvt(value, parseInt(id))


        return res.status(201).json(invt).end()

    }catch(e:any){
        return res.status(500).json({
            error:e?.message
        }).end()
    }
}

export async function retrieveInventory(req:Request, res:Response){
    try{
        const {id} = req.params

        if(!id){
            return res.status(400).json({
                error:"id missing in parameters"
            })
        }

        const invt= await getinventory( parseInt(id))
        return res.status(200).json(invt).end()

    }catch(e:any){
        return res.status(500).json({
            error:e?.message
        }).end()
    }
}


export async function removeInvetory(req:Request, res:Response){
    try{
        const {id} = req.params

        if(!id){
            return res.status(400).json({
                error:"id missing in parameters"
            })
        }

        const invt= await deleteinventory(parseInt(id))
        return res.status(204).json(invt).end()

    }catch(e:any){
        return res.status(500).json({
            error:e?.message
        }).end()
    }
}

export async function retrieveInventories(req:Request, res:Response){
    try{
        const inventories= await getinventories()
        return res.status(200).json(inventories).end()

    }catch(e:any){
        return res.status(500).json({
            error:e?.message
        }).end()
    }
}


