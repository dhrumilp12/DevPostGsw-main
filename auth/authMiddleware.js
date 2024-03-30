const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SIGNING_SECRET || '';

class UnauthorizedError extends Error {
    constructor(message) {
        super(message);
        this.name = 'UnauthorizedError';
        this.statusCode = 401;
    }
}

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            throw new UnauthorizedError('Authorization header is missing');
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            throw new UnauthorizedError('Bearer token is missing');
        }

        const decoded = jwt.verify(token, jwtSecret);

        if (!decoded) {
            throw new UnauthorizedError('Invalid token');
        }

        // Add the user payload to the request object
        req.user = decoded;

        // Continue to the next middleware or route handler
        next();
    } catch (err) {
        if (err instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ message: 'Invalid token' });
        } else if (err instanceof UnauthorizedError) {
            return res.status(err.statusCode).json({ message: err.message });
        } else {
            console.error('Error in authMiddleware:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
};

module.exports = authMiddleware;
