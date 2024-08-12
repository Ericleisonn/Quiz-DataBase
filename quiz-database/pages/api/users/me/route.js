

// export default async function GET(request){
//     connect()

//     try {

//         const userId = await getDataFromToken(request);

//         const user = await User.findOne({_id: userId}).
//         select("-password");
//         return NextResponse.json({
//             message: "User found",
//             data: user
//         })
//     } catch (error) {
//         return NextResponse.json({error: error.message}, {status: 400})
        
//     }
// }

import User from "../../../../util/models/userModel";
import connect from "../../../../util/dbConfig/dbConfig";
import getDataFromToken from "../../../helper/getDataFromToken";

export default async function handler(req, res) {
    await connect();

    try {
        console.log('entrou')
        const userId = await getDataFromToken(req);
        const user = await User.findOne({ _id: userId }).select("-password");

        res.status(200).json({
            message: "User found",
            data: user,
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
