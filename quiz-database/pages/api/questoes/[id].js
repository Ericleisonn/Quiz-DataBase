import connect from "../../../util/dbConfig/dbConfig"
import Questao from "../../../util/models/questaoModel"


export default async function handler(req, res) {
    connect()

    if (req.method === 'GET'){
        try{
            let result = await Questao.findById(req.query.id)

            res.status(201).json(result)
        } catch (err) {
            console.log(err)
            res.status(500).json({message: `Erro ao recuperar questão: ${err.message}.`})
        }
    } else {
        res.status(405).json({message: 'Erro: apenas requisições GET são permitidas.'})
    }
}