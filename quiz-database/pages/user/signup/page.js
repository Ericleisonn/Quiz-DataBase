import Link from "next/link";
import React, {useEffect} from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import styles from '../../../styles/auth.module.css'


export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    })
    const [erro, setErro] = React.useState('')

    const onSignup = async () => {
        try {
            const response = await axios.post("../../api/users/signup/route", user);
            router.push("../login/page");
            
        } catch (error) {
            setErro(error.response.data.error)
            console.log("Signup failed", error.response.data.error);
        }
    }


    return (
        <div className={styles.div_login}>
            <div className={styles.div_h1}>
                <h1>Cadastre-se</h1>
            </div>

            <div>
                <label htmlFor="username">Usuário</label>
                <input
                    id="username"
                    type="text"
                    value={user.username}
                    onChange={(e) => setUser({...user, username: e.target.value})}
                    />
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input 
                    id="email"
                    type="text"
                    value={user.email}
                    onChange={(e) => setUser({...user, email: e.target.value})}
                    />
                
            </div>
            <div>
                <label htmlFor="password">Senha</label>
                <input 
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({...user, password: e.target.value})}
                />
            </div>

            {erro && <div className={styles.erro}>*{erro}</div>}
            
            <div className={styles.button_link}>
                <button onClick={onSignup}>Sign Up</button> 
                <Link href="../login/page" className={styles.link}>Ir para login</Link>
            </div>
        </div>
    )

}