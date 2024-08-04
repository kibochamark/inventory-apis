import { eq } from "drizzle-orm"
import db from "../utils/dbconnection"
import { AccessRefreshToken, accessrefreshTokens, User, users } from "./schema"


// create user
export const createUser = async(user:{
    username:string;
    email:string;
    salt:string;
    password:string;

})=>{
    return await db.insert(users).values(user).returning({
        id:users.id,
        username:users.username,
        email:users.email,
        created_at:users.created_at
    })
}




export const getUser = async(email:string)=>{
    return await db.select({
        id:users.id,
        username:users.username,
        email:users.email,
        password:users.password,
        created_at:users.created_at}
    ).from(users).where(eq(users.email, email))
}


// store user jwt tokens
export const insertToken=async(tokenObj:AccessRefreshToken)=>{
    return await
     db.insert(accessrefreshTokens).values(tokenObj)
}
export const updateToken=async(tokenObj:AccessRefreshToken, userid:number)=>{
    return await
     db.update(accessrefreshTokens).set(tokenObj).where(eq(accessrefreshTokens.user_id, userid))
}


// retieve user access token as well as if blacklisted in order to logout user
export const getTokenBlacklist= async(userid:number)=>{
    return await db.select({
        id:accessrefreshTokens.id,
        blacklisted:accessrefreshTokens.access_blacklisted
    }).from(accessrefreshTokens).where(eq(accessrefreshTokens.user_id, userid))
}

export const updateAccessBlacklist = async (blacklisted: boolean, userid: number) => {
    return await db.update(accessrefreshTokens).set({
        access_blacklisted: blacklisted 
    }).where(eq(accessrefreshTokens.user_id, userid)).returning({
        user: accessrefreshTokens.user_id,
        blacklisted: accessrefreshTokens.access_blacklisted 
    });
};


