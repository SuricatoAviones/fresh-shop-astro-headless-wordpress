import type { OrderItem } from "@/types";

export function formatCurrency(amount: number) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
}

export function toLowerFirstChar(str: string) {
    return str.charAt(0).toLowerCase();
}

export const calculateTotal = (order: OrderItem[]) => {
    return order.reduce((total, item) => total + (item.quantity * item.price), 0);
}

export function formatOrder(order: OrderItem[]) {
    let contents = '';
    order.map(item => { 
          contents +=  `<li><span class="font-bold">${item.quantity} x</span> - ${item.title} ${item.size ? `(${item.size})` : ''}  - ${formatCurrency(item.price)}</li>`
    });
    return contents;
}

export function nullToEmptyString(arg: unknown) {
    return arg ?? '';
}

export const currentPage = (href: string, category: string) => href === category

