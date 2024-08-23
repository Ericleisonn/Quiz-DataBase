import mongoose from "mongoose";

const RespostaSchema = new mongoose.Schema({
    codUser: {
        type: String,
        required: true,
    },
    codQuiz: {
        type: String,
        required: true,
    },
    questoes: {
        type: Array,
        required: true,
    },
    tempo:{
        type: Number,
        required: false
    },
    inicioQuiz: {
        type: Date,
        required: true,
    },
    fimQuiz: {
        type: Date,
        required: true,
    },
})

const Quiz = mongoose.models.quiz || mongoose.model('quiz', QuizSchema)

export default Quiz
