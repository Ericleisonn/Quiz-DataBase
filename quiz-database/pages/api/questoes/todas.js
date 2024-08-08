import connect from "../../../util/dbConfig/dbConfig.js";
import Questao from "../../../util/models/questaoModel";

export default async function handler(req, res){
    connect()

    if (req.method === 'GET'){
        try{
            let questoes = await Questao.find({})

            res.status(200).json(questoes)
        } catch (err) {
            console.log(err)
            res.status(500).json({message: `Erro ao recuperar questões: ${err.message}.`})
        }
    } else {
        res.status(405).json({message: 'Erro: apenas requisições GET são permitidas.'})
    }

}