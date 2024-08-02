import mongoose from "mongoose";

const QuestaoSchema = new mongoose.Schema({
    codQuestao: {
        type: String,
        required: true,
    },
    enunciado: {
        type: String,
        required: true,
    },
    tipoQuestao: {
        type: String,
        required: true,
    },
    alternativas: {
        type: Array,
        required: false,
    },
    resposta: {
        type: String,
        required: false,
    }
})

const Questao = mongoose.models.questao || mongoose.model('questao', QuestaoSchema)

export default Questao
