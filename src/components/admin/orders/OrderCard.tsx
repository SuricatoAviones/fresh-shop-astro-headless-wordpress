import type { OrderContent } from '@/types'
import { orderStatusOptions } from '@/utils/constants'
import { formatCurrency } from '@/utils'
import { actions } from 'astro:actions'
import type { KeyedMutator } from 'swr'
import { toast } from 'react-toastify'
type Props = {
    order: OrderContent,
    mutate: KeyedMutator<OrderContent[]>
}
export default function OrderCard({order, mutate}: Props) {

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value
    const { data, error } = await actions.orders.updateStatus({id: order.id, status})

    if (data && !error) {
      toast.success(data.message)
      mutate()
    }
  }

  return (
    <div className="p-5 shadow-lg space-y-5 border border-gray-200 ">
      <div className='text-sm grid grid-cols-2 justify-between text-gray-600'>
        <h2>ID Orden: <span className='font-black'>{order.id}</span></h2>
        <p className='text-right'>Cliente: {order.name}</p>
      </div>
      <div>
        Contenido: 
        <div dangerouslySetInnerHTML={{__html: order.contents}}></div>
      </div>

      <select onChange={handleChange} className='border border-gray-300 w-full p-2 text-center' value={order.status}>
        {orderStatusOptions.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>

      <p className='text-right text-lg'>Total orden: 
        <span className='text-amber-400 font-black'>
          {formatCurrency(order.total)}
        </span>
      </p>
    </div>
  )
}
