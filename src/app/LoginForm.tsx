'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.scss";
import { api } from "@/services/api";
import { showToast, ToastType } from "@/utils/ToastifyHelper";
import { setCookie } from "cookies-next";


export function LoginForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {

      showToast(ToastType.ERROR, 'Preencha todos os campos!');
      setLoading(false);
      return;

    }

    try {
      
      const response = await api.post("/session", { email, password });

      if(!response.data.token){
        showToast(ToastType.ERROR, 'Erro ao validar o token de login!');
        return
      }
      const expiredCookie = 60 * 60 * 24 * 30 * 1000;

      setCookie("session", response.data.token,{
        maxAge: expiredCookie,
        path: "/",
        httpOnly: false,
        secure: process.env.NODE_ENV === "production"
      })

    } catch (err: any) {
      const errorMessage = err.response?.data?.error || 'Erro ao fazer login. Verifique seus dados.';
      showToast(ToastType.ERROR, errorMessage);
      return false;
    } finally {
      setLoading(false);
    }

    showToast(ToastType.SUCCESS, 'Login realizado com sucesso!');
    router.push('/dashboard');
    
  }

  return (
    <form onSubmit={handleSubmit}>
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
        {loading ? 'Entrando...' : 'Acessar'}
      </button>
    </form>
  );
}
