import styles from './HomePage.module.css';
import UserInputs from './Form/UserInputs';


export default function HomePage() {
    return (
        <div id={styles.background}>
            <div id={styles.main}>
            {/* Criar um website namoral aqui antes colocar um outro container sobre o website e etc */}
                <UserInputs/>
            </div> 
        </div>
    )
  }