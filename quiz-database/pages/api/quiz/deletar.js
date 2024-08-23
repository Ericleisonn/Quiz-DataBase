import connect from "../../../util/dbConfig/dbConfig";
import Quiz from "../../../util/models/quizModel";

export default async function handler(req, res){
    connect()

    if (req.method === 'DELETE'){
        try{
            let result = await Quiz.findByIdAndDelete(req.query.id)

            res.status(202).json(result)
        } catch (err) {
            console.log(err)
            res.status(500).json({message: `Erro ao deletar quiz: ${err.message}.`})
        }
    } else {
        res.status(405).json({message: 'Erro: apenas requisições DELETE são permitidas.'})
    }

}