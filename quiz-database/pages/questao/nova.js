import { int_to_char } from "@/api/util/char";
import axios from "axios";
import { useState } from "react";
import { Container, FloatingLabel, Form, InputGroup, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function NovaQuestaoPage() {
    const [formStateTipo, setFormStateTipo] = useState('dissertativa')
    const [textoAlt, setTextoAlt] = useState('')
    const [alternativas, setAlternativas] = useState([])
    const [correta, setCorreta] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm()

    function mudarCorreta() {
        setCorreta(!correta)
    }

    function addAlternativa(event) {
        event.preventDefault()
        if (textoAlt === '') {
            toast.error('Alternativa sem texto! Adicione texto e tente novamente.')
            return
        }
        const newAlternativas = [...alternativas, {
            correta: correta,
            texto: textoAlt,
        }]
        setAlternativas(newAlternativas)
        setTextoAlt('')
        setCorreta(false)
    }

    function removeAlternativa(event) {
        const newAlternativas = [...alternativas]
        newAlternativas.splice(event.currentTarget.id, 1)
        setAlternativas(newAlternativas)
    }

    async function onSubmit(data) {
        let questao = {
            codQuestao: data.codQuestao,
            enunciado: data.enunciado,
            tipoQuestao: formStateTipo,
        }

        if (questao.tipoQuestao == "alternativas") {
            questao.alternativas = [...alternativas]
        } else {
            questao.resposta = data.resposta
        }

        console.log(questao)

        await axios.post('../api/questoes/criar/route', questao).then((res) => {
            toast.success(`Questão cadastrada com sucesso!`)
        }).catch((err) => {
            toast.error('Erro ao cadastrar a questão.')
            console.log(err.message)
        })
    }

    let formMultipla = <>
        {alternativas?.map((alt, index) => {
            return <InputGroup key={index + 1} className="w-100 d-flex flex-fill mb-3">
                <InputGroup.Text className="flex-fill">{int_to_char(index + 1).toLowerCase()}. {alt.texto}</InputGroup.Text>
                <InputGroup.Text>{alt.correta && <i className="bi bi-check-square-fill text-success"></i>}</InputGroup.Text>
                <Button variant="danger" onClick={removeAlternativa} id={index}><i className="bi bi-trash"></i></Button>
            </InputGroup>
        })}
        <InputGroup>
            <InputGroup.Checkbox label="Correta" className={correta && 'bg-success'} checked={correta} onChange={mudarCorreta} />
            <Form.Control type="text" placeholder="Texto da alternativa" value={textoAlt} onChange={(e) => setTextoAlt(e.target.value)} />
            <Button style={{backgroundColor: '#1A5847', border: '1px solid #168D73'}} onClick={addAlternativa}>Adicionar alternativa</Button>
        </InputGroup>
    </>

    const formDissert = <>
        <Form.Control as="textarea" placeholder="Resposta" {...register("resposta")} />
    </>

    return (
        <Container className="text-center">
            <h2>Cadastro de questão</h2>
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
                <div className="d-flex justify-content-around align-items flex-column flex-md-row center m-4">
                    <Form.Label><h5>Tipo de questão:</h5></Form.Label>
                    <Form.Check
                        type="radio"
                        label="Múltipla escolha"
                        onClick={(e) => { setFormStateTipo(e.target.id) }}
                        id="alternativas"
                        name="tipoQuestao"
                    />
                    <Form.Check
                        defaultChecked={true}
                        type="radio"
                        label="Dissertativa"
                        onClick={(e) => setFormStateTipo(e.target.id)}
                        id="dissertativa"
                        name="tipoQuestao"
                    />
                </div>
                <div className='gap-2 mx-md-4 px-md-4'>
                    {formStateTipo == 'dissertativa' && formDissert}
                    {formStateTipo == 'alternativas' && formMultipla}
                </div>
                <div className="text-end mt-4 mx-md-4 px-md-4">
                    <Button style={{backgroundColor: '#1A5847', border: '1px solid #168D73'}} type="submit">Salvar</Button>
                </div>
            </Form>
        </Container>
    )
}