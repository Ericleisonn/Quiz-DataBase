import { useRouter } from 'next/router'
import axios from 'axios'
import { useEffect } from 'react'

const LogoutPage = () => {
    const router = useRouter()

    useEffect(() => {
        const logout = async () => {
        try {
            await axios.get('../../api/users/logout/router')
            router.push('../login/page')
        } catch (error) {
            console.log(error.message)
        }
        }

        logout()
    }, [router])

    return (
        <div>
        Logging out...
        </div>
    )
}

export default LogoutPage