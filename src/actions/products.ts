import { AddProductActionSchema, EditProductActionSchema } from "@/types/product.action.schema";
import { defineAction } from "astro:actions";
import { z } from "astro:schema";
export const products = {
  addProduct: defineAction({
    accept: "form",
    input: AddProductActionSchema,
    handler: async (input, ctx) => {
      const body = {
        title: input.title,
        freshcoffee_categories: input.freshcoffee_category,
        featured_media: input.featured_media,
        status: "publish",
        ...(input.variable_price === "true"
          ? {
              acf: {
                variable_price: input.variable_price,
                small: {
                  size: "Chico",
                  price: input.small,
                },
                medium: {
                  size: "Mediano",
                  price: input.medium,
                },
                large: {
                  size: "Grande",
                  price: input.large,
                },
              },
            }
          : {
              acf: {
                variable_price: input.variable_price,
                price: input.price,
              },
            }),
      };

      const token = ctx.cookies.get("FRESHCOFFEE_TOKEN")?.value;
      const url = `${import.meta.env.API_URL}/freshcoffee_products`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      await res.json();
      return{
        message: 'Producto agregado correctamente'
      }
    },
  }),
  updateProduct: defineAction({
    accept: "form",
    input: EditProductActionSchema,
    handler: async (input, ctx) => {
      const body = {
        title: input.title,
        freshcoffee_categories: input.freshcoffee_category,
        featured_media: input.featured_media,
        status: "publish",
        ...(input.variable_price === "true"
          ? {
              acf: {
                variable_price: input.variable_price,
                small: {
                  size: "Chico",
                  price: input.small,
                },
                medium: {
                  size: "Mediano",
                  price: input.medium,
                },
                large: {
                  size: "Grande",
                  price: input.large,
                },
              },
            }
          : {
              acf: {
                variable_price: input.variable_price,
                price: input.price,
              },
            }),
      };

      const token = ctx.cookies.get("FRESHCOFFEE_TOKEN")?.value;
      const url = `${import.meta.env.API_URL}/freshcoffee_products/${input.id}`;
      const res = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      await res.json();
      return{
        message: 'Producto actualizado correctamente'
      }
    },
  }),
  deleteProduct: defineAction({
    accept: 'json',
    input: z.object({
      id: z.number().min(1, { message: 'ID de producto no válido' }),
    }),
    handler: async (input, ctx) => {
      const token = ctx.cookies.get("FRESHCOFFEE_TOKEN")?.value;
      const url = `${import.meta.env.API_URL}/freshcoffee_products/${input.id}`;
      const res = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
      });

      await res.json();
      return{
        message: 'Producto eliminado correctamente'
      }
    },
    }),
};