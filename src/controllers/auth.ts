import { createUser, getTokenBlacklist, getUser, insertToken, updateAccessBlacklist, updateToken } from "../drizzle/authFunctions";
import { Request, Response } from "express";
import Joi from "joi";
import { checkPassword, createHash } from "../utils/passwordUtil";
import { generateRefreshToken, generateTokens, getPayloadFromToken } from "../utils/tokenutils";

// validation schema
const userSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});


const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
})

// Create our user
export async function registerUser(req: Request, res: Response) {
    try {
        // Validate the request body against the schema
        const { error, value } = userSchema.validate(req.body, { abortEarly: false });

        if (error) {
            return res.status(400).json({
                error: error.details.map(detail => detail.message),
            });
        }


        const { username, email, password } = value;

        const { hashedPassword, salt } = await createHash(password)

        if (hashedPassword) {
            // proceed to create user
            const user = await createUser({
                username: username, email: email, salt: salt, password: hashedPassword,

            })
            return res.status(201).json({
                message: "User registered successfully",
                user: { username, email }
            });
        }

        return res.status(400).json({
            message: "Unable to create password hash",
        });


    } catch (e: any) {
        return res.status(500).json({
            error: e?.message,
        }).end();
    }

}


export async function loginUser(req: Request, res: Response) {
    try {
        const { error, value } = loginSchema.validate(req.body, { abortEarly: false })
        if (error) {
            return res.status(400).json({
                error: error.details.map(detail => detail.message),
            });

        }
        const { email, password } = value
        const user = await getUser(email)
        if (user) {
            const ismatch = await checkPassword(password, user[0]?.password)
            if (ismatch) {
                const { accessToken, refreshToken } = await generateTokens({
                    email: user[0]?.email,
                    id: user[0]?.id,
                    username: user[0]?.username
                })

                const tokenexists = await getTokenBlacklist(user[0]?.id)
                console.log(tokenexists)
                if (tokenexists.length > 0) {
                    await updateToken(
                        {
                            user_id: user[0]?.id,
                            access_token: accessToken,
                            refresh_token: refreshToken,
                            access_blacklisted: false
                        }, user[0]?.id
                    )
                } else {
                    await insertToken({
                        user_id: user[0]?.id,
                        access_token: accessToken,
                        refresh_token: refreshToken,
                        access_blacklisted: false
                    })
                }


                return res.status(200).json({
                    message: "logged in successfull",
                    data: {
                        access: accessToken,
                        refresh: refreshToken
                    }

                }).end()
            }
        }
        return res.status(404).json({
            message: "User not found"
        })

    } catch (e: any) {
        return res.status(500).json({
            error: e?.message,
        }).end();
    }
}


export async function logout(req: Request, res: Response) {
    try {
        const authHeader = req.headers.authorization;

        const payload = await getPayloadFromToken(authHeader)

        const token = await updateAccessBlacklist(true, payload?.id)

        return res.status(200).json({
            message: "logged out successfully",

        }).end()
    } catch (e: any) {
        return res.status(500).json({
            error: e?.message,
        }).end()
    }
}
