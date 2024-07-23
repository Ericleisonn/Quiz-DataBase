import styles from '../../styles/nav.module.css'
import Image from 'next/image';

export default function Nav(){
    return (
        <>  
            <link href="https://fonts.googleapis.com/css2?family=Jura:wght@300..700&display=swap" rel="stylesheet"></link>
            <link href="https://fonts.googleapis.com/css2?family=Jura:wght@300..700&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet"></link>

            <div>
                <nav className="d-flex justify-content-between" id={styles.nav}>
                    <Image src='/logo.png' alt='logo' width={70} height={50}/>
                    <div className={styles.quadrado}>
                        <h1>Simulado de questões <br/> (Quiz DATA-Base)</h1>
                    </div>
                    <button type="button" id={styles.button_login} class="btn">Login</button>
                </nav>
            </div>
        </>
    )
}