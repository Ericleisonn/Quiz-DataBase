import connect from "../../../../util/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"

connect()

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { username, password, email } = req.body;
        
        const user = await User.findOne({email})

        if(user){
            return res.json({error: "Usuário já existente"}, {status: 40})
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            username,
            email, 
            password: hashedPassword
        })

        const savedUser = await newUser.save()
      
      if (username && password) {
        res.status(200).json({ message: 'User signed up successfully!' });
      } else {
        res.status(400).json({ error: 'Missing username or password' });
      }
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  