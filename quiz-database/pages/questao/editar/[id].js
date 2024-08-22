import { int_to_char } from "@/api/util/char";
import axios from "axios";
import { useParams } from "next/navigation";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import { Button, Container, FloatingLabel, Form, InputGroup } from "react-bootstrap";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";


export default function EditarQuestao() {
    const [respostas, setRespostas] = useState([]);
    const [questao, setQuestao] = useState({});
    const router = useRouter();
    const [id, setId] = useState(null);
    const { register, handleSubmit, reset } = useForm();
    const [correta, setCorreta] = useState(false);
    const [textoAlt, setTextoAlt] = useState('')

    useEffect(() => {
        if (router.isReady && !id) {
            setId(router.query.id);
        } else if (id) {
            axios.get(`../../api/questoes/${id}`)
                .then((res) => {
                    setQuestao(res.data);
                    reset(res.data);
                })
        }
    }, [router.isReady, id]);

    function mudarCorreta() {
        setCorreta(!correta)
    }

    function addAlternativa(event) {
        event.preventDefault()
        if (textoAlt === '') {
            toast.error('Alternativa sem texto! Adicione texto e tente novamente.')
            return
        }
        const newAlternativas = [...questao.alternativas, {
            correta: correta,
            texto: textoAlt,
        }]
        const newQuestao = { ...questao, alternativas: newAlternativas }
        setQuestao(newQuestao)
        setTextoAlt('')
        setCorreta(false)
    }

    function removeAlternativa(event) {
        const newAlternativas = [...questao.alternativas]
        newAlternativas.splice(event.currentTarget.id, 1)
        const newQuestao = {...questao, alternativas: newAlternativas}
        setQuestao(newQuestao)
    }
    const onSubmit = (data) => {
        let questaoEditada = {...questao}
        questaoEditada.codQuestao = data.codQuestao
        questaoEditada.enunciado = data.enunciado
        questaoEditada.publica = data.publica
        
        axios.put(`../../api/questoes/editar/${questao._id}`, questaoEditada)
            .then((res) => {
                toast.success(`Questão ${res.data.codQuestao} editada com sucesso!`)
                router.push('/questao')
            }).catch(err => {
                toast.error(`Erro ao editar questão: ${err.message}`)
            })
    }

    let formMultipla = <>
        {questao.alternativas?.map((alt, index) => {
            return <InputGroup key={index + 1} className="w-100 d-flex flex-fill mb-3">
                <InputGroup.Text className="flex-fill">{int_to_char(index + 1).toLowerCase()}. {alt.texto}</InputGroup.Text>
                <InputGroup.Text>{alt.correta && <i className="bi bi-check-square-fill text-success"></i>}</InputGroup.Text>
                <Button variant="danger" onClick={removeAlternativa} id={index}><i className="bi bi-trash"></i></Button>
            </InputGroup>
        })}
        <InputGroup>
            <InputGroup.Checkbox label="Correta" className={correta && 'bg-success'} checked={correta} onChange={mudarCorreta} />
            <Form.Control type="text" placeholder="Texto da alternativa" value={textoAlt} onChange={(e) => setTextoAlt(e.target.value)} />
            <Button style={{ backgroundColor: '#1A5847', border: '1px solid #168D73' }} onClick={addAlternativa}>Adicionar alternativa</Button>
        </InputGroup>
    </>

    const formDissert = <>
        <Form.Control as="textarea" placeholder="Resposta" {...register("resposta")} />
    </>

    return (
        <Container>
            <div className="d-flex justify-content-between align-items-center">
                <h2 className="ms-4">Editar questão</h2>
                <Form.Check
                    type="switch"
                    label="Pública"
                    className="me-4"
                    {...register('publica')}
                />
            </div>
            <hr />
            <Form className="mx-md-4 px-md-4" onSubmit={handleSubmit(onSubmit)}>
                <FloatingLabel
                    controlId="codQuestao"
                    label="Código da Questão"
                    className="mb-3"
                >
                    <Form.Control type="text" placeholder="Identificador da questão" {...register("codQuestao")} />
                </FloatingLabel>
                <Form.Control className="mb-3" as="textarea" placeholder="Enunciado da questão" {...register("enunciado")} />
                <div className='gap-2 mx-md-4 px-md-4'>
                    {questao?.tipoQuestao == 'dissertativa' && formDissert}
                    {questao?.tipoQuestao == 'alternativas' && formMultipla}
                </div>
                <div className="text-end mt-4 mx-md-4 px-md-4">
                    <Button style={{ backgroundColor: '#1A5847', border: '1px solid #168D73' }} type="submit">Salvar</Button>
                </div>
            </Form>
        </Container>
    )

}