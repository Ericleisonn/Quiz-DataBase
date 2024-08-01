import Main from './components/main'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/globals.css'
import { Toaster } from 'react-hot-toast'

function MyApp({ Component, pageProps}){
    return (
        <Main>
            <Component {...pageProps} />
            <Toaster />
        </Main>
    )
}

export default MyApp