import ProtectedComponent from "@/components/protectedComponent";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Container, Table, Button, Spinner, Modal } from "react-bootstrap"
import { int_to_char } from "@/api/util/char"

export default function CriarQuiz(){
    const [questoes, setQuestoes] = useState([])
    const [showDetalhes, setShowDetalhes] = useState(false)
    const [questao, setQuestao] = useState({})

    useEffect(() => {
        async function getQuestoes() {
            await axios.get('/api/questoes/todas').then((res) => {
                console.log(res.data);
                setQuestoes(res.data)
            }).catch((err) => {
                setQuestoes([])
                toast.error(err.message)
            })
        }
        getQuestoes()
    }, [])

    const handleCloseDetalhes = () => setShowDetalhes(false)
    const handleShowDetalhes = (questao) => {
        setQuestao(questao)
        setShowDetalhes(true)
    }

    return(
        <ProtectedComponent>
            <Container>
                <h1 className="m-4">Criar Quiz</h1>
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
                                        onClick={() => { handleShowDetalhes(questao) }}>
                                        <i className="bi bi-card-text"></i>
                                    </Button>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </Table>
            </Container>
            <Modal show={showDetalhes} onHide={handleCloseDetalhes}>
            <Modal.Header>
                <Modal.Title>{questao.codQuestao}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {questao.enunciado}
                <hr />
                {questao.alternativas && questao.alternativas.map((alt, seq) => {
                    return <p>{int_to_char(seq + 1).toLowerCase()}. {alt.texto} {alt.correta && <i className="bi bi-check-square-fill text-success"></i>}</p>
                })}
                {questao.resposta && <>
                    <p>Resposta: {questao.resposta}</p>
                </>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseDetalhes}>
                    Voltar
                </Button>
            </Modal.Footer>
        </Modal>
        </ProtectedComponent>
    )
}