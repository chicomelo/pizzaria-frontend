import Link from 'next/link'
import styles from './styles.module.scss'
import Image from 'next/image'
import logoImg from '/public/logo.svg'
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export function Header(){

    async function handleLogout(){
        "use server"
        const cookieStore = await cookies();
        cookieStore.delete('session');
        redirect('/');
    }

    return(
        <header>
            
            <div className={styles.headerContent}>

                <Link href="/dashboard">
                    <Image
                        alt='Logo'
                        src={logoImg}
                        width={190}
                        height={60}
                        priority={true}
                        quality={100}
                    />
                </Link>

                <nav>
                    <Link href="/dashboard/category">
                        Categoria
                    </Link>
                    <Link href="/dashboard/product">
                        Produto
                    </Link>
                    <form action={handleLogout}>
                        <button type='submit'>
                            Sair
                        </button>
                    </form>
                </nav>

            </div>

        </header>
    )
}