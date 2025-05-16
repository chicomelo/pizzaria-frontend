"use client"

import styles from './styles.module.scss'
import { useFormStatus } from 'react-dom'

interface ButtonProps{
    name: string
}

export function Button({ name }: ButtonProps){
    
    const { pending } = useFormStatus()
    
    return(
        <button type='submit' 
            disabled={pending}
            className={styles.button}>
            {
                pending ? "Carregando ..." : name
            }
        </button>
    )
}