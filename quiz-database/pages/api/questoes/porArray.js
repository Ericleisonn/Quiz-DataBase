import connect from "../../../util/dbConfig/dbConfig";
import Questao from "../../../util/models/questaoModel";

export default async function handler(req, res){
    connect()

    if (req.method === 'POST'){
        try{
            const questoes = await Questao.find({
                _id: { $in: req.body }
            });
            
            if(questoes.length > 0){
                res.status(200).json(questoes);
            } else {
                res.status(404).json("Nenhuma questão cadastrada no quiz!");
            }
        } catch (err) {
            console.log(err)
            res.status(500).json({message: `Erro ao criar questão: ${err.message}.`})
        }
    } else {
        res.status(405).json({message: 'Erro: apenas requisições POST são permitidas.'})
    }

}