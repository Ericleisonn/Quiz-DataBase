import styles from '../../styles/nav.module.css'

export default function Nav(){
    return (
        <>
            <div className={styles.nav}>
                <nav className="navbar">
                    <img src='logo.png'/>
                    <div className={styles.quadrado}>
                        <h1>Simulado de questões (Quiz DATA-Base)</h1>
                    </div>
                </nav>
            </div>
        </>
    )
}