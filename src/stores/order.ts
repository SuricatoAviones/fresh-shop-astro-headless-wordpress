import { create } from "zustand";
import type { OrderItem, ProductWithVariablePrice, SelectedProduct } from "@/types";
import { toLowerFirstChar } from "@/utils";

type Store = {
    isOrderDrawerOpen: boolean;
    toggleOrderDrawer: () => void;
    order: OrderItem[];
    addItem: (product: SelectedProduct) => void;
    deleteItem: (product: OrderItem) => void;
    increaseQuantity: (product: OrderItem) => void;
    decreaseQuantity: (product: OrderItem) => void;
    updateItemSize: (product: OrderItem, newSize: OrderItem['size']) => void;
}

export const useOrderStore = create<Store>()((set, get)=>({
    order: [],
    isOrderDrawerOpen: false,
    toggleOrderDrawer: () => {
        const isOrderDrawerOpen = get().isOrderDrawerOpen;
        set((state) => ({isOrderDrawerOpen: !state.isOrderDrawerOpen}))
    },
    addItem: (product) => {

        const currentOrder = get().order;

        // Revisar si el producto es variable
        const hasSize = Boolean(product.size);
        const key = hasSize ? `${product.id}-${toLowerFirstChar(product.size!)}`: undefined;

        // Encontrar el producto duplicado
        const isMatch = (item: OrderItem) => hasSize ? item.key === key : item.id === product.id;
        const existingItem = currentOrder.find(isMatch); 
        
        let order : OrderItem[];
        
        if(existingItem){
            order = currentOrder.map(item => 
                isMatch(item) ? {
                    ...item,
                    quantity: item.quantity + 1,
                    subtotal: item.price * (item.quantity + 1)
                } : item
            )
        } else {
            const newItem = {
                ...product,
                quantity: 1,
                subtotal: product.price,
                key
            }
            order = [...currentOrder, newItem];
        }
        set({order})
    },
    deleteItem: (product) => {
        const order = get().order.filter(item =>
            product.key ? item.key !== product.key : item.id !== product.id
        )
        set({order})
    },
    increaseQuantity: (product) => {
        const isMatch = (item: OrderItem) => product.key ? item.key === product.key : item.id === product.id;
        const order = get().order.map(item =>
            isMatch(item) ? {
                ...item,
                quantity: item.quantity + 1,
                subtotal: item.price * (item.quantity + 1)
            } : item
        )
        set({order})
    },
    decreaseQuantity: (product) => {
        const isMatch = (item: OrderItem) => product.key ? item.key === product.key : item.id === product.id;
        const order = get().order.map(item =>
            isMatch(item) ? {
                ...item,
                quantity: item.quantity - 1,
                subtotal: item.price * (item.quantity - 1)
            } : item
        )
        set({order})
    },
    updateItemSize: async (product, newSize) => {
        if(!product.key || !newSize) return;

        const res = await fetch(`/api/products/${product.id}`)
        console.log(res)
        const data = await res.json() as ProductWithVariablePrice
   

        //Type Predicate
        const updatedData = Object.values(data.acf)
            .filter((value): value is {size:string; price: number}=>
                typeof value === 'object' && value !== null && 'size' in value && 'price' in value
            ).find(value => value.size === newSize)

        if(!updatedData) return;

        const order = get().order
        const newKey = `${product.id}-${toLowerFirstChar(newSize)}`;
        const isMatch = (item: OrderItem, key: string) => item.key === key;
        const selectedIndex = order.findIndex(item => isMatch(item, product.key!));
        const existingIndex = order.findIndex(item => isMatch(item, newKey));

        let updatedOrder = [...order];

        if(existingIndex !== -1){
            const existingItem = updatedOrder[existingIndex];
            const mergedQuantity = existingItem.quantity + product.quantity;
            updatedOrder[existingIndex] = {
                ...existingItem,
                quantity: mergedQuantity,
                subtotal: updatedData.price * mergedQuantity
            }
            if (existingIndex !== selectedIndex) {
                updatedOrder.splice(selectedIndex, 1);
            }
        } else {
            updatedOrder[selectedIndex] = {
                ...product,
                key: newKey,
                size: newSize,   
                price: updatedData.price,
                subtotal: updatedData.price * product.quantity
            }
        }
  
        set({order: updatedOrder})
    }
}))