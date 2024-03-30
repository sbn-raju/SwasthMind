import jwt from 'jsonwebtoken';

const authenticateUser = async (req, res, next) => {
    const authToken = req.header('auth-token');
    try {
        if (!authToken) {
            return res.status(401).json({ 
                success: false, 
                message: 'Authentication' 
            });
        }
        jwt.verify(authToken, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    return res.status(401).json({ 
                        success: false, 
                        message: 'Token has been expired'
                     });
                } else {
                    return res.status(401).json({ 
                        success: false,
                         message: 'Invalid token' });
                }
            }

            if (!decoded.user) {
                return res.status(401).json({ 
                    success: false, 
                    message: 'Invalid token: No user data' });
            }

            req.user = decoded.user;
            next();
        });
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Internal server error' });
    }
};

export default authenticateUser;