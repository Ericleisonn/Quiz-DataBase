import connect from "../../../util/dbConfig/dbConfig.js";
import Quiz from "../../../util/models/quizModel";

export default async function handler(req, res){
    connect()
    const { codQuiz } = req.query;

    if (req.method === 'GET'){
        try{
            const quizQuery = Quiz.find()
            if (codQuiz){
                quizQuery.where({ codQuiz: codQuiz })
            }
            const quizes = await quizQuery.exec()
            
            res.status(200).json(quizes)
        } catch (err) {
            console.log(err)
            res.status(500).json({message: `Erro ao recuperar quizes: ${err.message}.`})
        }
    } else {
        res.status(405).json({message: 'Erro: apenas requisições GET são permitidas.'})
    }

}