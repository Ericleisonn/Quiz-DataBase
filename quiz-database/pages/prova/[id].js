import ProtectedComponent from "../components/protectedComponent";
import axios, { toFormData } from "axios"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Container, Table, Button, Spinner, Modal, Form, FloatingLabel } from "react-bootstrap"
import toast from "react-hot-toast"
import { int_to_char } from "@/api/util/char"
import { set, useForm } from "react-hook-form";

export default function prova(){
    const router = useRouter();
    const {id} = router.query;
    const [quiz, setQuiz] = useState({});
    const [questoes, setQuestoes] = useState([]);
    const [alts, setAlt] = useState([]);
    const [quest, setQuestao] = useState({});


    async function getQuiz(){
        
        await axios.get(`/api/quiz/getProva/?id=${id}`).then((res) => {
            setQuiz(res.data);
            console.log(res.data);
            res.data.questoes?.map((questao, ind) => {
                setQuestoes(prevQuestQuiz =>{return [...prevQuestQuiz, questao]})
            })
            questoes.alternativas?.map((alt, ind) => {
                setAlt(prev => {return [...prev, alt]})
            })
        }).catch((err) => {
            toast.error(err.message)
        })
    
    }
    useEffect(() => {
        getQuiz()
    }, [])


    async function getQuestao(idQuest) {
        await axios.get(`/api/questao/getQuestao/?id=${idQuest}`).then((res)=>{
            setQuestao(res.data)
        }).catch((err) => {
            toast.error(err.message)
        })
    }


    return(<>
        <ProtectedComponent>
        <Container>
        <div className="d-flex justify-content-between">
            <h1 className="m-4">{quiz.codQuiz}</h1>
        </div>
        <hr />
        <Table>
            <thead>
                <tr>
                    <td></td>
                    <td></td>
                </tr>
            </thead>
            <tbody>
                {
                    questoes?.map((quests, ind) => {
                        return <tr key={ind}>
                            <td>{quest.enunciado}</td>
                            <td>{quests.enunciado}</td>
                        </tr>
                    })
                }
            </tbody>
        </Table>
        </Container>
        </ProtectedComponent>
        </>)
}