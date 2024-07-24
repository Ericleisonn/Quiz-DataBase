import Link from "next/link";
import React, { useEffect } from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import styles from '../../styles/auth.module.css'

export default function SignupPage() {
    const router = useRouter();
    const [loading, setLoading] = React.useState(false);
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    })

    const [erro, setErro] = React.useState('')

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login/route", user);
            router.push("/");
            
        } catch (error) {
            setErro(error.response.data.error)
            console.log("Login failed", error.message);
            
        }finally {
            setLoading(false);
        }
    }


    return (
        <div className={styles.div_login}>
            
            <div className={styles.div_h1}>
                <h1>{loading ? "Realizando login" : "Faça Login"}</h1>
            </div>
                    
            <label htmlFor="email">Email</label>
            <input 
                id="email"
                type="text"
                value={user.email}
                onChange={(e) => setUser({...user, email: e.target.value})}
                />
            <label htmlFor="password">Senha</label>
            <input 
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({...user, password: e.target.value})}
                />
            
            {erro && <div className={styles.erro}>*{erro}</div>}
            
            <div className={styles.button_link}>
                <button onClick={onLogin}>Login</button>
                <Link href="../signup/page" className={styles.link}>Faça seu cadastro</Link>
            </div>

        </div>
    )

}