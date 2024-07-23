import connect from "../../../../util/dbConfig/dbConfig";
import User from "../../../models/userModel";
import bcryptjs from "bcryptjs"


export default async function handler(req, res) {
  connect()

  if (req.method === 'POST'){
    const { username, password, email } = req.body;
    
    const user = await User.findOne({username})

    if(user){
      return res.status(400).json({ error: "Usuário já existente" });
    }

    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)

    const newUser = new User({
        username,
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

    // if (req.method === 'POST') {
    //   const { username, password, email } = req.body;
      
    //   const user = await User.findOne({email})

    //   if(user){
    //     return res.json({error: "Usuário já existente"}, {status: 400})
    //   }

    //   const salt = await bcryptjs.genSalt(10)
    //   const hashedPassword = await bcryptjs.hash(password, salt)

    //   const newUser = new User({
    //       username,
    //       email, 
    //       password: hashedPassword
    //   })

    //   const savedUser = await newUser.save()

    //   return res.json({
    //     message: "User created successfully",
    //     success: true,
    //     savedUser
    //   })
      
    //   if (username && password) {
    //     res.status(200).json({ message: 'User signed up successfully!' });
    //   } else {
    //     res.status(400).json({ error: 'Missing username or password' });
    //   }
    // } else {
    //   res.setHeader('Allow', ['POST']);
    //   res.status(405).end(`Method ${req.method} Not Allowed`);
    // }
  }
  