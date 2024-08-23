import connect from "../../../util/dbConfig/dbConfig.js";
import Quiz from "../../../util/models/quizModel.js";

export default async function handler(req, res){
    connect()

    if (req.method === 'GET'){
        try{
            const quizzes = await Quiz.find({})
            
            if(quizzes.length > 0){
                res.status(200).json(quizzes);
            } else {
                res.status(404).json("Nenhum quiz cadastrado!");
            }
        } catch (err) {
            console.log(err)
            res.status(500).json({message: `Erro ao recuperar quizzes: ${err.message}.`})
        }
    } else {
        res.status(405).json({message: 'Erro: apenas requisições GET são permitidas.'})
    }

}