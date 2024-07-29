import { serialize } from 'cookie';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            res.setHeader('Set-Cookie', serialize('token', '', {
                httpOnly: true,
                expires: new Date(0),
                path: '/',  
            }));

            return res.status(200).json({
                message: "Logout successful",
                success: true,
            });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    } else {
        return res.status(405).json({ error: "Method not allowed" });
    }
}
