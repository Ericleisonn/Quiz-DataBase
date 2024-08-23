import axios from "axios"
import { useEffect, useState } from "react"
import { Button, Container, Table } from "react-bootstrap"
import toast from "react-hot-toast"


export default function Quizzes() {
    const [quizzes, setQuizzes] = useState([])

    useEffect(() => {
        async function getQuizzes() {
            try {
                let resQuizzes = await axios.get('../../api/quiz/todos')
                setQuizzes(resQuizzes.data)
                console.log(resQuizzes)
            } catch (err) {
                toast.error(err.message)
            }
        }
        getQuizzes()
    }, [])

    return (
        <div className="m-4 p-md-4">
            <Container>
                <h2>Quizzes</h2>
            </Container>
            <hr />
            <Table>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nº de Questões</th>
                        <th>Tempo</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                        {quizzes && quizzes?.map((quiz, index) => {
                            return <tr key={index}>
                                <td>{quiz.codQuiz}</td>
                                <td>{quiz.questoes.length}</td>
                                <td>{quiz.tempo}</td>
                                <td>
                                    <a href={`/quiz/responder/${quiz._id}`}><Button>Responder</Button></a>
                                </td>
                            </tr>
                        })}
                </tbody>
            </Table>
        </div>
    )
}