import User from "../../../../util/models/userModel";
import connect from "../../../../util/dbConfig/dbConfig";
import getDataFromToken from "../../helper/getDataFromToken";

export default async function handler(req, res) {
    await connect();

    try {
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
