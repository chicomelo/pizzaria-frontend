'use client'

import { UploadCloud } from 'lucide-react'
import { ChangeEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '../components/button'
import styles from './styles.module.scss'
import Image from 'next/image'
import { showToast, ToastType } from '@/utils/ToastifyHelper'

interface CategoryProps {
  id: string
  name: string
}

export function FormProduct({
  action,
  categories,
}: {
  action: (formData: FormData) => Promise<{ success: boolean; message: string }>
  categories: CategoryProps[]
}) {
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState<File>()
  const [previewImage, setPreviewImage] = useState("")
  const router = useRouter()

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0]

      if (image.type !== "image/jpeg" && image.type !== "image/jpg" && image.type !== "image/png") {
        showToast(ToastType.ERROR, "Formato de imagem inválido.")
        return
      }
      setImage(image)
      setPreviewImage(URL.createObjectURL(image))
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const result = await action(formData)

    if (result.success) {
      showToast(ToastType.SUCCESS, result.message)
      router.push("/dashboard")
    } else {
      showToast(ToastType.ERROR, result.message)
    }
  }

  return (
    <main className={styles.container}>
      <h1>Produto</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.labelImage}>
          <span>
            <UploadCloud size={42} color="#fff" />
          </span>
          <input type="file" name='image' accept="image/png, image/jpg, image/jpeg" required onChange={handleFile} />
            {previewImage && (
                <Image
                alt="Imagem de preview"
                src={previewImage}
                className={styles.preview}
                fill={true}
                quality={100}
                priority={true}
                />
            )}
        </label>

        <select name="category" required>
          <option value="">Selecione uma categoria</option>
          {categories.map((category, index) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <input type="text" name="name" placeholder="Digite o nome do produto" required />

        <input type="text" name="price" placeholder="Digite o preço do produto" required />

        <textarea name="description" placeholder="Digite a descrição do produto" required></textarea>

        <Button name={loading ? 'Cadastrando...' : 'Cadastrar'} />
      </form>
    </main>
  )
}
