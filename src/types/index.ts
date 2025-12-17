import { z } from "astro:content";

const CategorySchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  acf: z.object({
    icon: z.string(),
  }),
});

const ImageSchema = z.object({
  url: z.string().url(),
  width: z.number(),
  height: z.number(),
});

const FeaturedImageSchema = z.object({
  thumbnail: ImageSchema,
  medium: ImageSchema,
  medium_large: ImageSchema,
  large: ImageSchema,
  full: ImageSchema,
});

const VariablePairSchema = z.object({
  price: z.coerce.number(),
  size: z.string(),
});

const FixedPriceSchema = z.object({
  variable_price: z.literal(false),
  price: z.coerce.number(),
});

const VariablePriceSchema = z.object({
  variable_price: z.literal(true),
  small: VariablePairSchema,
  medium: VariablePairSchema,
  large: VariablePairSchema,
});

export const ProductPriceSchema = z.discriminatedUnion("variable_price", [
  FixedPriceSchema,
  VariablePriceSchema,
]);
export const CategoriesSchema = z.array(CategorySchema);
export type Category = z.infer<typeof CategorySchema>;

export const ProductSchema = z.object({
  id: z.number(),
  slug: z.string(),
  title: z.object({
    rendered: z.string(),
  }),
  featured_media: z.number(),
  featured_images: FeaturedImageSchema,
  acf: ProductPriceSchema,
  freshcoffee_categories: z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
  })

});

export const ProductsSchema = z.array(ProductSchema);
export type Product = z.infer<typeof ProductSchema>;

const ProductWithVariablePriceSchema = ProductSchema.extend({
  acf: VariablePriceSchema,
});

export type ProductWithVariablePrice = z.infer<
  typeof ProductWithVariablePriceSchema
>;


export const UploadedImageSchema = z.object({
    id: z.number(),
    source_url: z.string()
})

export type UploadedImage = z.infer<typeof UploadedImageSchema>

/* Orders - Client */
const SelectedProductSchema = z.object({
  id: z.number(),
  title: z.string().min(1, { message: "El nombre del producto es obligatorio" }),
  price: z.number().min(1, { message: "Precio no valido" }),
  size: z.optional(z.string().min(1, { message: "Tamaño no valido" })),
});

export type SelectedProduct = z.infer<typeof SelectedProductSchema>;


export const OrderItemSchema = SelectedProductSchema.extend({
  quantity: z.number().min(1, { message: "Cantidad no valida" }),
  subtotal: z.number().min(1, { message: "Subtotal no valido" }),
  key: z.optional(z.string().min(1, { message: "Key no valido" })),
});

export type OrderItem = z.infer<typeof OrderItemSchema>;

export const OrderContentSchema = z.object({
  id: z.number(),
  title: z.string(),
  contents: z.string(),
  status: z.string(),
  total: z.number(),
  name: z.string(),
})

export type OrderContent = z.infer<typeof OrderContentSchema>

const SizesSchema = VariablePriceSchema.omit({
    variable_price: true
})
export type Sizes = z.infer<typeof SizesSchema>