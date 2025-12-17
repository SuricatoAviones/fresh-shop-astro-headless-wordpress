import type { APIRoute } from "astro"

export const GET: APIRoute = async ({params}) => {
    const url = `${import.meta.env.API_URL}/freshcoffee_products/${params.id}`;
    const res = await fetch(url);
    const json = await res.json();
    return new Response(JSON.stringify(json))
}