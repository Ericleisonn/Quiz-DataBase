import axios from "axios"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Container, Table, Button, Spinner, Modal, Form, FloatingLabel } from "react-bootstrap"
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
    const [dataMinFim, setDataMinFim] = useState()

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

    async function onSubmit(data) {
        let userData
        
        try{
            const result = await axios.get('../../api/users/me/route')
            userData = result.data.data
        }catch(error){
            toast.error('Você precisa estar autenticado.')
            router.push('../user/login/page')
        }

        if (!userData || !userData._id) {
            toast.error('Você precisa estar autenticado.')
            router.push('../user/login/page')
        }else{
            let quiz = {
                codQuiz: data.codQuiz,
                tempo: data.tempo,
                inicioQuiz: data.inicioQuiz,
                fimQuiz: data.fimQuiz,
                questoes: questoesQuiz,
                usuario: userData._id
            }
    
            console.log(quiz)
    
            await axios.post('../api/quiz/criar', quiz).then((res) => {
                toast.success(`Quiz cadastrado com sucesso!`)
                router.push('/questao/')
            }).catch((err) => {
                toast.error('Erro ao cadastrar o quiz.')
                console.log(err.message)
            })
        }


    }


    useEffect(() => {
        async function getQuestoes() {
            const user = await axios.get('../../api/users/me/route')
            await axios.get(`/api/questoes/todas/?idUser=${user.data.data._id}`).then((res) => {
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

    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const hours = String(today.getHours()).padStart(2, '0');
        const minutes = String(today.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };


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
                                        onClick={() => { handleShowDetalhes(questao) }}>
                                        <i className="bi bi-card-text"></i>
                                    </Button>
                                    <Button
                                        className="m-1 btn-danger"
                                        style={{ border: '1px solid #168D73' }}
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
        <Modal show={showDetalhes} onHide={handleCloseDetalhes}>
            <Modal.Header>
                <Modal.Title>{questao.codQuestao}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {questao.enunciado}
                {questao.alternativas?.[0] && <>
                    <hr />
                    {questao.alternativas.map((alt, seq) => {
                        return <p>{int_to_char(seq + 1).toLowerCase()}. {alt.texto}</p>
                    })}
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
                <Form className="mx-md-4 px-md-4" onSubmit={handleSubmit(onSubmit)}>
                    <FloatingLabel
                        controlId="codQuiz"
                        label="Código do Quiz"
                        className="mb-3"
                    >
                        <Form.Control type="text" placeholder="Identificador do quiz" {...register("codQuiz")} required/>
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="tempo"
                        label="Tempo do Quiz"
                        className="mb-3"
                    >
                        <Form.Control type="time" placeholder="Tempo máximo para fazer o quiz" {...register("tempo")} />
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="inicioQuiz"
                        label="Início do Quiz"
                        className="mb-3"
                    >
                        <Form.Control type="datetime-local" placeholder="Início do quiz" {...register("inicioQuiz")} min={getTodayDate()} onChange={(e) => setDataMinFim(e.target.value)} required/>
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="fimQuiz"
                        label="Fim do Quiz"
                        className="mb-3"
                    >
                        <Form.Control type="datetime-local" placeholder="Fim do quiz" {...register("fimQuiz")} min={dataMinFim} required/>
                    </FloatingLabel>
                    <div>
                        <Button variant="success"  type="submit">
                            Salvar
                        </Button>
                    </div>
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