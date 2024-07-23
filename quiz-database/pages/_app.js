import Main from './components/main'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/globals.css'

function MyApp({ Component, pageProps}){
    return (
        <Main>
            <Component {...pageProps} />
        </Main>
    )
}

export default MyApp