'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '../components/button'
import styles from './styles.module.scss'
import 'react-toastify/dist/ReactToastify.css'
import { showToast, ToastType } from '@/utils/ToastifyHelper'

export function FormCategory({ action }: { action: (formData: FormData) => Promise<{ success: boolean, message: string }> }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const result = await action(formData)

    setLoading(false)

    if (result.success) {
      showToast(ToastType.SUCCESS, result.message);
      router.push('/dashboard')  // redireciona após sucesso
    } else {
      showToast(ToastType.ERROR, result.message);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type='text'
          name='name'
          placeholder='Digite o nome da categoria'
          required
        />
        <Button name={loading ? 'Cadastrando...' : 'Cadastrar'} />
      </form>
    </>
  )
}
