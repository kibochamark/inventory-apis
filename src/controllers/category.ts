import { createCategory, deletecategory, getCategories, getCategory, getInventoriesByCategory, updateCategory } from "../drizzle/categoryFunctions";
import { Request, Response } from "express";
import Joi from "joi";

// schemas ---------------------


// validation schema
const categorySchema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    description: Joi.string().min(3).required(),
});



// --------------------

export async function insertCategory(req:Request,res:Response,){
    try{

        const { error, value } = categorySchema.validate(req.body, { abortEarly: false });

        if (error) {
            return res.status(400).json({
                error: error.details.map(detail => detail.message),
            });
        }


        const { name, description} = value;


        const category= await createCategory({
            name:name,
            description:description
        })


        return res.status(201).json(category).end()

    }catch(e:any){
        return res.status(500).json({
            error:e?.message
        }).end()
    }
}



export async function putCategory(req:Request, res:Response){
    try{
        const {id} = req.params

        if(!id){
            return res.status(400).json({
                error:"id missing in parameters"
            })
        }

        const { error, value } = categorySchema.validate(req.body, { abortEarly: false });

        if (error) {
            return res.status(400).json({
                error: error.details.map(detail => detail.message),
            });
        }


        const { name, description} = value;


        const category= await updateCategory({
            name:name,
            description:description
        }, parseInt(id))


        return res.status(201).json(category).end()

    }catch(e:any){
        return res.status(500).json({
            error:e?.message
        }).end()
    }
}

export async function retrieveCategory(req:Request, res:Response){
    try{
        const {id} = req.params

        if(!id){
            return res.status(400).json({
                error:"id missing in parameters"
            })
        }

        const category= await getCategory( parseInt(id))
        return res.status(200).json(category).end()

    }catch(e:any){
        return res.status(500).json({
            error:e?.message
        }).end()
    }
}


export async function removeCategory(req:Request, res:Response){
    try{
        const {id} = req.params

        if(!id){
            return res.status(400).json({
                error:"id missing in parameters"
            })
        }

        const category= await deletecategory(parseInt(id))
        return res.status(204).json(category).end()

    }catch(e:any){
        return res.status(500).json({
            error:e?.message
        }).end()
    }
}


export async function retrieveInventoriesCountByCategory(req:Request, res:Response){
    try{
        const inventories= await getInventoriesByCategory()
        return res.status(200).json(inventories).end()

    }catch(e:any){
        return res.status(500).json({
            error:e?.message
        }).end()
    }
}


export async function retrieveCategories(req:Request, res:Response){
    
    try{
        const category= await getCategories()
        return res.status(200).json(category).end()

    }catch(e:any){
        return res.status(500).json({
            error:e?.message
        }).end()
    }
}