import { ActionError, defineAction } from "astro:actions"
import { guestCredentials } from "../auth/dal"
import { z } from "astro:content"
import { nullToEmptyString } from "@/utils"
export const auth = {
    signInAsGuest: defineAction({
        handler: async(input, ctx) => {
            const res = await fetch(`${import.meta.env.AUTH_URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(guestCredentials)
            })

            const json = await res.json()
            ctx.cookies.set("FRESHCOFFEE_TOKEN", json.token, {
                httpOnly: true,
                sameSite: 'strict',
                path: '/',
                maxAge: 60 * 60 * 24 * 7
            });   

            return true;
        }
    }),
    signIn: defineAction({
        accept: 'form',
        input: z.object({
            username: z.preprocess(nullToEmptyString, z.string().min(1, {message: 'El usuario es requerido'})),
            password: z.preprocess(nullToEmptyString, z.string().min(1, {message: 'La contraseña es requerida'}))
        }),
        handler: async(input, ctx) => {
            const res = await fetch(`${import.meta.env.AUTH_URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(input)
            })

            const json = await res.json()
            if (json.code === '[jwt_auth] invalid_username') {
                throw new ActionError({
                  message: 'El Usuario no existe',
                  code: 'UNAUTHORIZED'
                })
            }

            if (json.code === '[jwt_auth] incorrect_password') {
                throw new ActionError({
                  message: 'La contraseña no es correcta',
                  code: 'UNAUTHORIZED'
                })
            }


            ctx.cookies.set("FRESHCOFFEE_TOKEN", json.token, {
                httpOnly: true,
                sameSite: 'strict',
                path: '/',
                maxAge: 60 * 60 * 24 * 7
            });   

            return true;
        }
    }),
    signOut: defineAction({
        handler: (_, ctx) => {
            ctx.cookies.delete("FRESHCOFFEE_TOKEN", {
                path: '/'
            });
            return true;
        }
    })
}