"use client"

import { use, useState } from 'react'
import { OrderProps } from '@/lib/order.type'
import styles from './styles.module.scss'
import { RefreshCw } from 'lucide-react' 
import { ModalOrder } from '../modal'
import { OrderContext } from '@/providers/orders'
import { useRouter } from 'next/navigation'
import { showToast, ToastType } from '@/utils/ToastifyHelper'

interface Props{
    orders: OrderProps[]
}

export function Orders({orders}: Props ){

    const {isOpen, onRequestOpen} = use(OrderContext)
    const router = useRouter()

    async function handleDetailOrder(order_id: string){
        await onRequestOpen(order_id);
    }

    function handleRefresh(){
        router.refresh();
        showToast(ToastType.SUCCESS, "Pedidos atualizados")
    }

    return(
        <>
        <main className={styles.container}>
        
            <section className={styles.containerHeader}>
                <h1>Últimos pedidos</h1>
                <button onClick={handleRefresh}>
                    <RefreshCw
                        size={24}
                        color='#3fffa3'
                    />
                </button>
            </section>

            <section className={styles.listOrders}>

                {
                    orders.map( order => (
                        <button
                            key={order.id}
                            className={styles.orderItem}
                            onClick={() => handleDetailOrder(order.id)}
                        >
                            Mesa {order.table}
                        </button>
                    ))
                }

                {
                    orders.length === 0 && (
                        <p className={styles.nenhumPedido}>Não há pedidos abertos</p>
                    )
                }

            </section>

        </main>

        {
            isOpen && <ModalOrder />
        }

        </>
    )
}