import mongoose from "mongoose";

const QuizSchema = new mongoose.Schema({
    codQuiz: {
        type: String,
        required: true,
    },
    questoes: {
        type: Array,
        required: true,
    },
    criacao: {
        type: Date,
        required: true,
        default: Date.now,
    },
    tempo:{
        type: Number,
        required: true
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
