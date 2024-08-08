import connect from "../../../util/dbConfig/dbConfig";
import Questao from "../../../util/models/questaoModel";

export default async function handler(req, res){
    connect()

    if (req.method === 'POST'){
        try{
            const questao = new Questao(req.body)
            const questaoSalva = await questao.save()

            res.status(201).json(questaoSalva)
        } catch (err) {
            console.log(err)
            res.status(500).json({message: `Erro ao criar questão: ${err.message}.`})
        }
    } else {
        res.status(405).json({message: 'Erro: apenas requisições POST são permitidas.'})
    }

}