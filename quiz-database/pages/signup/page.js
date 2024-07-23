import Link from "next/link";
import React, {useEffect} from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import styles from '../../styles/signup.module.css'


export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    })


    const onSignup = async () => {
        try {
            const response = await axios.post("../api/users/signup/route", user);
            router.push("../login/page");
            
        } catch (error) {
            console.log("Signup failed", error.message);
        }
    }


    return (
        <div className={styles.div_login}>
                <div>
                    <label htmlFor="username">username</label>
                    <input
                        id="username"
                        type="text"
                        value={user.username}
                        onChange={(e) => setUser({...user, username: e.target.value})}
                        placeholder="username"
                        />
                </div>
                <div>
                    <label htmlFor="email">email</label>
                    <input 
                        id="email"
                        type="text"
                        value={user.email}
                        onChange={(e) => setUser({...user, email: e.target.value})}
                        placeholder="email"
                        />
                    
                </div>
                <div>
                    <label htmlFor="password">password</label>
                    <input 
                    id="password"
                    type="password"
                    value={user.password}
                    onChange={(e) => setUser({...user, password: e.target.value})}
                    placeholder="password"
                    />
                </div>
            
            <button onClick={onSignup}>Sign Up</button>
            <Link href="../login/page">Visit login page</Link>
        </div>
    )

}