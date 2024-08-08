import axios from "axios"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Container, Table, Button, Spinner, Modal } from "react-bootstrap"
import toast from "react-hot-toast"

export default function QuestoesPage() {
    const [questoes, setQuestoes] = useState([])
    const [showDelete, setShowDelete] = useState(false)
    const [questao, setQuestao] = useState({})
    const router = useRouter()

    const handleCloseDelete = () => setShowDelete(false)
    const handleShowDelete = (questao) => {
        setQuestao(questao)
        setShowDelete(true)
    }

    useEffect(() => {
        async function getQuestoes() {
            await axios.get('/api/questoes/todas').then((res) => {
                setQuestoes(res.data)
            }).catch((err) => {
                setQuestoes([])
                toast.error(err.message)
            })
        }
        getQuestoes()
    }, [])

    async function onDelete(questao) {
        axios.delete(`/api/questoes/deletar/?id=${questao._id}`,).then((res) => {
            toast.success(`Questão '${questao.codQuestao}' removida.`)
            router.reload()
        }).catch(err => {
            toast.error(err.message)
        })
    }


    return (<>
        <Container>
            <div className="d-flex justify-content-between">
                <h1 className="m-4">Questões cadastradas</h1>
                <Button
                    style={{ backgroundColor: '#1A5847', border: '1px solid #168D73' }}
                    onClick={() => router.push('/questao/nova')}
                    className="my-4">Cadastrar questão</Button>
            </div>
            <hr />
            <Table>
                <thead>
                    <tr>
                        <td>Código</td>
                        <td>Tipo</td>
                        <td>Ações</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        questoes?.map((questao, ind) => {
                            return <tr key={ind}>
                                <td>{questao.codQuestao}</td>
                                <td>{questao.tipoQuestao.charAt(0).toUpperCase() + questao.tipoQuestao.substring(1)}</td>
                                <td className="fixed-width">
                                    <Button
                                        style={{ backgroundColor: '#1A5847', border: '1px solid #168D73' }}
                                        onClick={() => { handleShowDelete(questao) }}>
                                        <i className="bi bi-trash-fill"></i>
                                    </Button>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </Table>
            {questoes.length == 0 && <Spinner />}
        </Container>
        <Modal show={showDelete} onHide={handleCloseDelete}>
            <Modal.Header>
                <Modal.Title>Tem certeza que deseja excluir '{questao.codQuestao}'?</Modal.Title>
            </Modal.Header>
            <Modal.Body>{questao.enunciado}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseDelete}>
                    Cancelar
                </Button>
                <Button variant="danger" onClick={() => onDelete(questao)}>
                    Excluir
                </Button>
            </Modal.Footer>
        </Modal>
    </>)
}