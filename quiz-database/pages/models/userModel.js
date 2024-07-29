import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Por favor, informe o usuário'],
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'Por favor, informe o email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Informe uma senha'],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,    
})

const User = mongoose.models.users || mongoose.model("users", userSchema)

export default User