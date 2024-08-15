import axios from "axios"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Container, Table, Button, Spinner, Modal, Form } from "react-bootstrap"
import toast from "react-hot-toast"
import { int_to_char } from "@/api/util/char"
import { useForm } from "react-hook-form";

export default function QuestoesPage() {
    const [questoes, setQuestoes] = useState([])
    const [showDelete, setShowDelete] = useState(false)
    const [showDetalhes, setShowDetalhes] = useState(false)
    const [showQuiz, setShowQuiz] = useState(false)
    const [questao, setQuestao] = useState({})
    const [questoesQuiz, setQuestoesQuiz] = useState([])
    const { register, handleSubmit, formState: { errors } } = useForm()
    const router = useRouter()

    const handleCloseDelete = () => setShowDelete(false)
    const handleShowDelete = (questao) => {
        setQuestao(questao)
        setShowDelete(true)
    }

    const handleCloseDetalhes = () => setShowDetalhes(false)
    const handleShowDetalhes = (questao) => {
        setQuestao(questao)
        setShowDetalhes(true)
    }

    const handleCloseQuiz = () => setShowQuiz(false)
    const handleShowQuiz = (questao) => {
        setQuestao(questao)
        setShowQuiz(true)
    }

    const cadastroQuestaoQuiz = (questao, isChecked) => {
        setQuestoesQuiz(prevQuestoesQuiz => {
            if (isChecked) {
                return [...prevQuestoesQuiz, questao]
            } else {
                return prevQuestoesQuiz.filter(q => q !== questao)
            }
        });
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

                {questoesQuiz.length >= 1 && <Button
                style={{ backgroundColor: '#1A5847', border: '1px solid #168D73' }}
                onClick={() => { handleShowQuiz(questao) }}
                className="my-4">Cadastrar Quiz</Button> }
                
            </div>
            <hr />
            <Table>
                <thead>
                    <tr>
                        <td>Quiz</td>
                        <td>Código</td>
                        <td>Tipo</td>
                        <td>Ações</td>
                    </tr>
                </thead>
                <tbody>
                    
                    {
                        questoes?.map((questao, ind) => {
                            return <tr key={ind}>
                                <td><Form.Check type={'checkbox'} id={'checkbox'} onChange={(event) => cadastroQuestaoQuiz(questao._id, event.target.checked)}/></td>
                                <td>{questao.codQuestao}</td>
                                <td>{questao.tipoQuestao.charAt(0).toUpperCase() + questao.tipoQuestao.substring(1)}</td>
                                <td className="fixed-width">
                                    <Button
                                        style={{ backgroundColor: '#1A5847', border: '1px solid #168D73' }}
                                        onClick={() => { handleShowDelete(questao) }}>
                                        <i className="bi bi-trash-fill"></i>
                                    </Button>
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

        <Modal show={showQuiz} onHide={handleCloseQuiz}>
            <Modal.Header>
                <Modal.Title>Cadastrar Quiz</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleCloseQuiz}>
                    Cancelar
                </Button>
            </Modal.Footer>
        </Modal>
    </>)
}