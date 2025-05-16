"use client"

import { X } from 'lucide-react'
import styles from './styles.module.scss'
import { use } from 'react'
import { OrderContext } from '@/providers/orders'
import Image from 'next/image'
import { calculateTotalOrder } from '@/lib/helper'

export function ModalOrder(){

    const { onRequestClose, order, finishOrder } = use(OrderContext)

    async function handleFinishOrder(){
        await finishOrder(order[0]?.order?.id)
    }

    return(
        <dialog className={styles.dialogContainer}>

            <section className={styles.dialogContent}>

                <button
                    onClick={onRequestClose} 
                    className={styles.closeButton}>
                    <X size={32} />
                </button>

                <article className={styles.container}>
                    <h2>Destalhes do pedido</h2>
                    <span className={styles.table}>Mesa <b>{order[0]?.order?.table}</b></span>
                    
                    {
                        order[0]?.order?.name && (
                            <span className={styles.name}><b>{order[0]?.order?.name}</b></span>
                        )
                    }

                    {order.map(item => (
                        <div className={styles.item} key={item.id}>
                            
                            <div className={styles.thumbProduct}>
                                <Image
                                    src={`${item.product.banner}`}
                                    alt={`Imagem de ${item.product.name}`}
                                    fill={true}
                                    className={styles.imgProduct}
                                />
                            </div>
                            <p>
                                Qtd: {item.amount} - <b>{item.product.name}</b> - R$ {(parseFloat(item.product.price) * item.amount).toFixed(2).replace('.', ',')}
                                <span>{item.product.description}</span>
                            </p>
                        </div>
                    ))}

                    <h3 className={styles.total}>Valor total: R$ {calculateTotalOrder(order).toFixed(2).replace('.', ',')}</h3>

                    <button
                        onClick={handleFinishOrder}
                        className={styles.buttonOrder}>
                        Concluir pedido
                    </button>

                </article>

            </section>
        </dialog>
    )
}