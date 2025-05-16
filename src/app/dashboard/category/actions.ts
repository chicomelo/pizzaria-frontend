'use server'

import { api } from '@/services/api'
import { getCookieServer } from '@/lib/cookieServer'

export async function handleRegisterCategory(formData: FormData) {
  const name = formData.get('name')
  if (!name) {
    return { success: false, message: 'Nome da categoria não pode ser vazio.' }
  }

  const data = { name }
  const token = await getCookieServer()

  try {
    await api.post('/category', data, {
      headers: { Authorization: `Bearer ${token}` }
    })

    return { success: true, message: 'Categoria cadastrada com sucesso!' }
  } catch (err: any) {
    console.error(err)
    return { success: false, message: 'Erro ao cadastrar categoria.' }
  }
}
