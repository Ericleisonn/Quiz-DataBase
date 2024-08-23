import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Container, Form, InputGroup } from "react-bootstrap";
import toast from "react-hot-toast";


export default function ResponderQuiz() {
    const [quiz, setQuiz] = useState({});
    const [id, setId] = useState('');
    const [indexQuestao, setIndexQuestao] = useState(0);
    const [questaoAtual, setQuestaoAtual] = useState([]);
    const [questoesRespondidas, setQuestoesRespondidas] = useState([]);
    const router = useRouter();

    useEffect(() => {
        if (router.isReady & !id) {
            setId(router.query.id);
        } else if (id) {
            axios.get(`../../../api/quiz/${router.query.id}`)
                .then(res => {
                    setQuiz(res.data);
                    axios.post(`../../../api/questoes/porArray`, res.data.questoes)
                        .then(res => {
                            cleanQuestoes(res.data);
                        })
                }).catch(err => {
                    toast.error(err.message);
                })
        }
    }, [router.isReady, id])

    function cleanQuestoes(quests) {
        let questoesResp = [quests]
        questoesResp.forEach(questao => {
            let questaoSemResp = {
                enunciado: questao.enunciado,
            }
            if (questao.alternativas?.length > 0) {
                let alt = questao.alternativas.map(alter => { texto: alter.texto });
                questaoSemResp.alternativas = alt
            }
            questaoSemResp.resposta = '';
            return questaoSemResp;
        })
        setQuestoesRespondidas(questoesResp[0])
        setQuestaoAtual(questoesResp[0][0])
    }

    function proximaQuestao() {
        let index = indexQuestao + 1;
        setIndexQuestao(index);
        setQuestaoAtual(questoesRespondidas[index]);
    }

    function anteriorQuestao() {
        let index = indexQuestao - 1;
        setIndexQuestao(index);
        setQuestaoAtual(questoesRespondidas[index]);
    }

    function setCorreta(index) {
        let questao = { ...questaoAtual }
        questao.alternativas[index].correta = true;
    }

    return (
        <Container className="pt-4">
            <div className="d-flex justify-content-between">
                <h1>Respondendo: {quiz?.codQuiz}</h1>
                <Button onClick={() => router.push("/quiz/todos")}>Enviar</Button>
            </div>
            <hr />
            <div className="p-4">
                <Form>
                    <p>{questaoAtual.enunciado}</p>
                    <ol type="a">
                        {questaoAtual.alternativas?.map((alter, index) => {
                            return <li className="d-flex gap-1 m-2" key={index}><Form.Check onChange={setCorreta(index)} />{alter.texto}</li>
                        })}
                    </ol>
                    {questaoAtual?.alternativas?.length == 0 && <Form.Control type="text" />}
                </Form>
            </div>
            <div className="d-flex justify-content-between">
                {indexQuestao > 0 && <Button onClick={anteriorQuestao}>Anterior</Button>}
                <span />
                {indexQuestao < questoesRespondidas.length - 1 && <Button onClick={proximaQuestao}>Próxima</Button>}
            </div>
        </Container>
    )

}
