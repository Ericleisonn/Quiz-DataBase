
import connect from "../../../../util/dbConfig/dbConfig";
import User from "../../../models/userModel";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"
import { serialize } from 'cookie';


export default async function handler(req, res){
    connect()

    if(req.method === 'POST'){
        const {email, password} = req.body

        const user = await User.findOne({email})

        if(!user){
            return res.status(400).json({ error: "Não existe usuário cadastrado" })
        }
        
        const validPassword = await bcryptjs.compare(password, user.password)
        if(!validPassword){
            return res.status(400).json({ error: "Senha inválida" });
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {expiresIn: "1d"})

        const response = res.json({
            message: "Login successful",
            success: true,
        })

        res.setHeader('Set-Cookie', serialize('token', token, {
            httpOnly: true,
        }));
        
        return response;
    }else{
        return res.status(500).json({error: error.message})
    }
}