'use server'

import { api } from '@/services/api'
import { getCookieServer } from '@/lib/cookieServer'

export async function handleRegisterProduct(formData: FormData) {
  const category = formData.get('category')
  const name = formData.get('name')
  const price = formData.get('price')
  const description = formData.get('description')
  const image = formData.get('image') as File

  if (!name || !category || !price || !description || !image) {
    return { success: false, message: 'Preencha todos os campos obrigatórios.' }
  }

  const token = await getCookieServer()

  try {
    const data = new FormData()
    data.append('name', name as string)
    data.append('category_id', category as string)
    data.append('price', price as string)
    data.append('description', description as string)
    data.append('file', image) 

    await api.post('/product', data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data', // importante para enviar arquivo
      },
    })

    return { success: true, message: 'Produto cadastrado com sucesso!' }
  } catch (err: any) {
    console.error(err)
    return { success: false, message: 'Erro ao cadastrar produto.' }
  }
}
