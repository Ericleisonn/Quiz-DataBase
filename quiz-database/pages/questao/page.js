import Link from "next/link"
import { useRouter } from "next/router"
import { Container, Table, Button } from "react-bootstrap"

export default function QuestoesPage(){
    const router = useRouter()

    return (
        <Container>
            <div className="d-flex justify-content-between">
                <h1 className="m-4">Questões cadastradas</h1>
                <Button onClick={() => router.push('/questao/nova')} className="my-4">Cadastrar questão</Button>
            </div>
            <hr />
            <Table>
                
            </Table>
        </Container>
    )
}