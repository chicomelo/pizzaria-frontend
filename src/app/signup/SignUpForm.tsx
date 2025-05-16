'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../page.module.scss";
import { api } from "@/services/api";
import { showToast, ToastType } from "@/utils/ToastifyHelper";

import axios from "axios";

export function SignUpForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("nome");
    const email = formData.get("email");
    const password = formData.get("password");

    if (!name || !email || !password) {
      showToast(ToastType.ERROR, 'Preencha todos os campos!');
      setLoading(false);
      return;
    }

    try {
      await api.post("/users", { name, email, password });
      showToast(ToastType.SUCCESS, 'Cadastro realizado com sucesso!');
      router.push('/');
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        const errorMessage = err.response?.data?.error || 'Erro ao cadastrar. Tente novamente.';
        showToast(ToastType.ERROR, errorMessage);
      } else {
        showToast(ToastType.ERROR, 'Erro inesperado. Tente novamente.');
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="nome"
        placeholder="Digite seu nome"
        className={styles.input}
      />
      <input
        type="email"
        name="email"
        placeholder="Digite seu e-mail"
        className={styles.input}
      />
      <input
        type="password"
        name="password"
        placeholder="Digite sua senha"
        className={styles.input}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Cadastrando...' : 'Cadastrar'}
      </button>
    </form>
  );
}
