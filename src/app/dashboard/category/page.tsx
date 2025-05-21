import styles from './styles.module.scss'
import { FormCategory } from './FormCategory'
import { handleRegisterCategory } from './actions'

//export default function Category(formData: FormData){
export default function Category(){

    return(
        <main className={styles.container}>
            <h1>Nova Categoria</h1>

            <FormCategory action={handleRegisterCategory} />

        </main>
    )
}