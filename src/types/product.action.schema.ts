import { nullToEmptyString } from '@/utils'
import { z } from 'astro:schema'

const CommonFields = {
  title: z.preprocess(
    nullToEmptyString,
    z.string().trim().min(1, { message: 'El Título no puede ir vacío' }),
  ),
  featured_media: z.preprocess(
    nullToEmptyString,
    z.coerce.number().min(1, { message: 'La Imagen no puede ir vacia' }),
  ),
  freshcoffee_category: z.number({ message: 'Categoría no válida' }).min(1, { message: 'Categoría no válida' }),
};

const FixedPriceSchema = z.object({
  variable_price: z.literal('false'),
  price: z.number({ message: 'El Precio no es válido' }).min(1, { message: 'El Precio debe ser mayor a 0' }),
  ...CommonFields,
});

const VariablePriceSchema = z.object({
  variable_price: z.literal('true'),
  small: z.number({ message: 'Precio chico requerido' }),
  medium: z.number({ message: 'Precio mediano requerido' }),
  large: z.number({ message: 'Precio grande requerido' }),
  ...CommonFields,
});

export const AddProductActionSchema = z.discriminatedUnion('variable_price', [
  FixedPriceSchema,
  VariablePriceSchema,
]);
const EditFixedPriceSchema = FixedPriceSchema.extend({
  id: z.number().min(1, { message: 'ID de producto no válido' })
});

const EditVariablePriceSchema = VariablePriceSchema.extend({
  id: z.number().min(1, { message: 'ID de producto no válido' })
})

export const EditProductActionSchema = z.discriminatedUnion('variable_price', [
  EditFixedPriceSchema,
  EditVariablePriceSchema,
]);