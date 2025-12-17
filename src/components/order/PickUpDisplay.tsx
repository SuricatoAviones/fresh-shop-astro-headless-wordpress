

import useSWR from "swr"
import type { OrderContent } from "@/types"


export default function PickUpDisplay() {
    const url = "/api/orders/completed?per_page=5"
    const fetcher = () => fetch(url).then((res) => res.json()).then(data => data)
    const config = {
        refreshInterval: 1000 * 60,
    }
    const { data, isLoading } = useSWR<OrderContent[]>(url, fetcher, config)
    if(isLoading) return <div>Loading...</div>
  

    if(data){
        return data.length === 0 ? (
            <p className="text-center">No hay ordenes listas</p>
        ) : (
            <div className="grid grid-cols-1 gap-5 w-full">{
                data.map((order) => (
                    <div key={order.id} className="border-gray-200 border p-5 shadow">
                        <p className="font-bold text-2xl">ID: {order.id}</p>
                        <p className="text-3xl">Nombre: {order.name}</p>
                    </div>
                ))
            }</div>
        )
    }
}

