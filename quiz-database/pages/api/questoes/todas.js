import { useParams } from "next/navigation.js";
import connect from "../../../util/dbConfig/dbConfig.js";
import Questao from "../../../util/models/questaoModel";

export default async function handler(req, res){
    connect()
    const { idUser } = req.query;

    if (req.method === 'GET'){
        try{
            const questoesQuery = Questao.find()
            questoesQuery.or({ userId: idUser })
            questoesQuery.or({ publica: true })
            const questoes = await questoesQuery.exec()
            
            res.status(200).json(questoes)
        } catch (err) {
            console.log(err)
            res.status(500).json({message: `Erro ao recuperar questões: ${err.message}.`})
        }
    } else {
        res.status(405).json({message: 'Erro: apenas requisições GET são permitidas.'})
    }

}