import axios, { toFormData } from "axios"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Container, Table, Button, Spinner, Modal, Form, FloatingLabel } from "react-bootstrap"
import toast from "react-hot-toast"
import { int_to_char } from "@/api/util/char"
import { useForm } from "react-hook-form";

export default function QuestoesPage() {
    const [showDelete, setShowDelete] = useState(false)
    const [showDetalhes, setShowDetalhes] = useState(false)
    const [showQuiz, setShowQuiz] = useState(false)
    const [questoesQuiz, setQuestoesQuiz] = useState([])
    
    const [quizes, setQuizes] = useState([])
    const [quiz, setQuiz] = useState({})
    const { register, handleSubmit, formState: { errors } } = useForm()
    const router = useRouter()


    const handleCloseDelete = () => setShowDelete(false)
    const handleShowDelete = (quiz) => {
        setQuiz(quiz)
        setShowDelete(true)
    }

    const handleCloseDetalhes = () => setShowDetalhes(false)
    const handleShowDetalhes = (quiz) => {
        setQuiz(quiz)
        setShowDetalhes(true)
    }

    const handleCloseQuiz = () => setShowQuiz(false)
    const handleShowQuiz = (quiz) => {
        setQuiz(quiz)
        setShowQuiz(true)
    }

    async function doQuiz(data) {
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
            await axios.post('../api/quiz/criar', quiz).then((res) => {
                toast.success(`Quiz cadastrado com sucesso!`)
                router.push('/prova')
            }).catch((err) => {
                toast.error('Erro ao cadastrar o quiz.')
                console.log(err.message)
            })
        }


    }

    async function getQuizes() {
        const user = await axios.get('../../api/users/me/route')
        await axios.get(`/api/quiz/todas/?`).then((res) => {
            setQuizes(res.data)
        }).catch((err) => {
            setQuizes([])
            toast.error(err.message)
        })
    }

    useEffect(() => {
        getQuizes()
    }, [])

    async function onDelete(quiz) {
        axios.delete(`/api/quiz/deletar/?id=${quiz._id}`,).then((res) => {
            toast.success(`Quiz '${quiz.codQuiz}' removido.`)
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

    const statusProva = (fim) =>{
        const dataFim = new Date(fim);
        const dataAgr = new Date(); 
        
        const dataFormatada = dataFim - dataAgr

        if (dataFormatada > 0){
            return 1;
        }else{
            return 0;
        }
    }

    return(<>
    <Container>
        <div className="d-flex justify-content-between">
            <h1 className="m-4">Quizes Cadastrados</h1>
        </div>
        <hr />
        <Table>
            <thead>
                <tr>
                    <td>Código</td>
                    <td>Status</td>
                    <td>Início</td>
                    <td>Fim</td>
                    <td>Ações</td>
                </tr>
            </thead>
            <tbody>
                {
                    quizes?.map((quiz, ind) => {
                        const status = statusProva(quiz.fimQuiz)
                        return <tr key={ind}>
                            <td>{quiz.codQuiz}</td>
                            <td>{status ? 'Aberta' : 'Fechada'}</td>
                            <td>{quiz.inicioQuiz}</td>
                            <td>{quiz.fimQuiz}</td>   
                            <td>
                            <Button
                                className="m-1 btn-danger"
                                style={{ backgroundColor: '#1A5847', border: '1px solid #168D73' }}
                                onClick={() => { handleShowDetalhes(quiz) }}>
                                <i className="bi bi-card-text"></i>
                            </Button>
                            <Button
                                className="m-1 btn-danger"
                                style={{ border: '1px solid #168D73' }}
                                onClick={() => { handleShowDelete(quiz) }}>
                                <i className="bi bi-trash-fill"></i>
                            </Button>
                            {status ? 
                                <Button
                                    className="m-1 btn-danger"
                                    style={{ backgroundColor: '#22F', border: '1px solid #168D73' }}
                                    onClick={() => { handleShowQuiz(quiz) }}>
                                    <i className="bi bi-pencil-fill"></i>
                                </Button>
                                : <></> 
                            }
                            </td>
                        </tr>
                    })
                }
            </tbody>
        </Table>
        {quizes.length == 0 && <Spinner />}
    </Container>

    <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header>
            <Modal.Title>Tem certeza que deseja excluir '{quiz.codQuiz}'?</Modal.Title>
        </Modal.Header>
        <Modal.Body>{quiz.codQuiz}</Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDelete}>
                Cancelar
            </Button>
            <Button variant="danger" onClick={() => onDelete(quiz)}>
                Excluir
            </Button>
        </Modal.Footer>
    </Modal>
    <Modal show={showDetalhes} onHide={handleCloseDetalhes}>
        <Modal.Header>
            <Modal.Title>{quiz.codQuiz}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {quiz.codQuiz}
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDetalhes}>
                Voltar
            </Button>
        </Modal.Footer>
    </Modal>
    <Modal show={showQuiz} onHide={handleCloseQuiz}>
        <Modal.Header>
            <Modal.Title>Tem certeza que deseja responder o quiz: '{quiz.codQuiz}'?</Modal.Title>
        </Modal.Header>
        <Modal.Body>{quiz.codQuiz}</Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseQuiz}>
                Voltar
            </Button>
            <Button variant="danger" onClick={() => doQuiz(quiz)}>
                Responder
            </Button>
        </Modal.Footer>
    </Modal>
    </>)
}
