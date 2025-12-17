
import { UploadedImageSchema } from "@/types";
import { ActionError, defineAction } from "astro:actions";

export const upload ={
    UploadImage : defineAction({
        accept: 'form',
        handler: async (input, context) => {
            const token = context.cookies.get('FRESHCOFFEE_TOKEN')?.value

            const url = `${import.meta.env.API_URL}/media`
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: input
            })

            if (!res.ok) {
                throw new ActionError({
                    message: 'Error al subir la imagen',
                    code: 'BAD_REQUEST'
                })
            }

            const json = await res.json()
            const image = UploadedImageSchema.parse(json)
            return image
        }
    })
}