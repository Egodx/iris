module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];

        if (!isValidToken(token)) {
            res.status(401).json({error: 'Invalid token'});
            return;
        }

        next();

    } catch {
        res.status(401).json({error: 'Invalid request'});
    }
};

const isValidToken = (token) => {
    const tokens = require('../../tokens/tokens.json');
    return tokens.includes(token);
}