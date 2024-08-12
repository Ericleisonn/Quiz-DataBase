import connect from "../../../../util/dbConfig/dbConfig";
import User from "../../../../util/models/userModel";
import bcryptjs from "bcryptjs"
import isValidatePassword from "../../../../util/functions/isValidatePassword";


export default async function handler(req, res) {
  connect()

  if (req.method === 'POST'){
    const { username, password, email, name } = req.body;
    
    const userUsername = await User.findOne({username})
    const userEmail = await User.findOne({email})

    if(!isValidatePassword(password)) return res.status(400).json({error: 'Senha deve ter ao menos 8 caractéres, números, letras maíusculas e minúsculas'})

    if(userUsername){
      return res.status(400).json({ error: "Usuário já existente" });
    }else if(userEmail){
      return res.status(400).json({ error: "Email já cadastrado" })
    }else if(password == ''){
      return res.status(400).json({ error: "Informe uma senha" })
    }else if(name == ''){
      return res.status(400).json({ error: "Informe um nome" })
    }

    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)

    const newUser = new User({
        username,
        name,
        email, 
        password: hashedPassword
    })

    const savedUser = await newUser.save()

    return res.status(201).json({
      message: "User created successfully",
      success: true,
      savedUser
    })

  }else{
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`)
    return res.status(500).json({ error: error.message })
  }
}