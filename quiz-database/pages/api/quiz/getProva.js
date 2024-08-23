import connect from "../../../util/dbConfig/dbConfig";
import Quiz from "../../../util/models/quizModel";
import Questao from "../../../util/models/questaoModel";

export default async function handler(req, res){
    connect()

    if (req.method === 'GET'){
        try{
            let quiz = await Quiz.findById(req.query.id)

            for (i = 0; i < quiz.questoes.length; i++){
                quiz.questoes[i] = await Questao.findById(quiz.questoes[i]);
                for (j=0;j<quiz.questoes[i].alternativas.length;j++){
                     quiz.questoes[i].alternativas[j] = quiz.questoes[i].alternativas[j];
                }
            }

            res.status(202).json(quiz)
        } catch (err) {
            console.log(err)
            res.status(500).json({message: `Erro ao deletar quiz: ${err.message}.`})
        }
    } else {
        res.status(405).json({message: 'Erro: apenas requisições DELETE são permitidas.'})
    }

}