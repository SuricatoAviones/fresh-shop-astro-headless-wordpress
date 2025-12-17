import { useOrderStore } from '@/stores/order'
import ProductDetails from '@/components/order/ProductDetails'
import { formatCurrency, calculateTotal } from '@/utils';
import SubmitOrderForm from './SubmitOrderForm';
export default function OrderContents() {
    const { order } = useOrderStore();
    const total = calculateTotal(order);
    return (
        <>
            {order.length === 0 ?
                <p className='text-center my-10 text-xl'>El Pedido está vacío</p>
                :
                <>
                    <h2 className='text-2xl font-bold text-gray-900'>Ajusta tu Pedido</h2>
                    {order.map((item) => {
                        const key = item.size ? `${item.size}-${item.id}` : item.id
                        return (
                            <ProductDetails key={key} item={item} />
                        )
                    })}
                    <h2 className='mt-5 text-2xl font-bold text-right'>Total a pagar: {formatCurrency(total)}</h2>
                    <SubmitOrderForm />
                </>
            }
        </>
    )
}
