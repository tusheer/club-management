import jwt from 'jsonwebtoken';
import { GeneralError, BadRequest } from '../common/errors';

const handleError = async (err, req, res, next) => {
    if (res?.headersSent) {
        return next(err);
    }
    let code = 500;
    if (err instanceof GeneralError) {
        code = err.getCode();
    }

    let correlationId = req?.headers['x-correlation-id'];
    return (
        res &&
        res.status(code).json({
            correlationId: correlationId,
            message: err.message,
            status: code,
            error: { ...err },
        })
    );
};

const handleRequest = async (req, res, next) => {
    let correlationId = req.headers['x-correlation-id'];
    if (!correlationId) {
        correlationId = Date.now().toString();
        req.headers['x-correlation-id'] = correlationId;
    }

    res.set('x-correlation-id', correlationId);
    return next();
};

const handleValidation = (validate) => {
    return (req, res, next) => {
        const result = validate(req.body);
        const isValid = result.error == null;
        if (isValid) {
            return next();
        }

        const { details } = result.error;
        const messages = details.map((e) => e.message);
        const msg = messages.join(',');
        throw new BadRequest(msg);
    };
};

const authenticateRequest = async (req, res, next) => {
    let auth = req.headers['authorization'];
    if (auth) {
        auth = auth.replace('Bearer ', '');
        jwt.verify(auth, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                res.status(401).send({
                    success: false,
                    errorMessage: err.message || 'Invalid token',
                });
            } else {
                req.user = decoded;
                next();
            }
        });
    } else {
        res.status(401).send({ error: 'Unauthenticated request' });
    }
};

export { handleError, handleRequest, handleValidation, authenticateRequest };
