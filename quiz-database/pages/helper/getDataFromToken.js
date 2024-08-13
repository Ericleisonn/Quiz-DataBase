import jwt from 'jsonwebtoken';

const getDataFromToken = (req, res) => {
    try {
        const token = req.cookies.token || '';

        if (!token) {
            res.status(401).json({ error: 'Token not found' });
            return null;
        }

        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

        return decodedToken.id;

    } catch (error) {
        console.error('Token validation error:', error.message);
        res.status(401).json({ error: 'Invalid or expired token' });
        return null;
    }
};

export default getDataFromToken;