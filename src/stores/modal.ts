import { create } from 'zustand'

type Store = {
    productId: number | null;
    open: boolean
    setProductId: (productId: number) => void;
    setOpen: (open: boolean) => void;
}

export const useModalStore = create<Store>((set) => ({
    productId: null,
    open: false,
    setProductId: (productId) => set({ productId }),
    setOpen: (open) => set({ open }),
}))