import Image from "next/image";
import styles from "./page.module.scss";
import logoImg from '/public/logo.svg';
import Link from "next/link";
import { LoginForm } from './LoginForm';

export default function Home() {
  return (
    <div className={styles.containerCenter}>
      <Image src={logoImg} alt="Logo Pizzaria" />
      <section className={styles.login}>
        <LoginForm />
        <Link href="/signup" className={styles.text}>
          Não possui uma conta? Cadastre-se
        </Link>
      </section>
    </div>
  );
}
