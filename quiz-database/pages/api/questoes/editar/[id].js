import connect from "../../../../util/dbConfig/dbConfig"
import Questao from "../../../../util/models/questaoModel"


export default async function handler(req, res) {
    connect()

    if (req.method === 'PUT'){
        try{
            let result = await Questao.findByIdAndUpdate(req.query.id, req.body, {new: true})

            res.status(200).json(result)
        } catch (err) {
            console.log(err)
            res.status(500).json({message: `Erro ao recuperar questão: ${err.message}.`})
        }
    } else {
        res.status(405).json({message: 'Erro: apenas requisições GET são permitidas.'})
    }
}