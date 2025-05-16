import Image from "next/image";
import styles from "../page.module.scss";
import logoImg from '/public/logo.svg';
import Link from "next/link";
import { SignUpForm } from './SignUpForm';

export default function SignUpPage() {
  return (
    <div className={styles.containerCenter}>
      <Image src={logoImg} alt="Logo Pizzaria" />
      <section className={styles.login}>
        <h1>Criando sua conta</h1>
        <SignUpForm />
        <Link href="/" className={styles.text}>
          Já possui uma conta? Faça o login
        </Link>
      </section>
    </div>
  );
}
