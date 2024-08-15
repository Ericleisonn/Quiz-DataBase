import connect from "../../../util/dbConfig/dbConfig";
import Quiz from "../../../util/models/questaoModel";

export default async function handler(req, res){
    connect()

    if (req.method === 'POST'){
        try{
            const quiz = new Quiz(req.body)
            const quizSalvo = await quiz.save()

            res.status(201).json(quizSalvo)
        } catch (err) {
            console.log(err)
            res.status(500).json({message: `Erro ao criar questão: ${err.message}.`})
        }
    } else {
        res.status(405).json({message: 'Erro: apenas requisições POST são permitidas.'})
    }

}