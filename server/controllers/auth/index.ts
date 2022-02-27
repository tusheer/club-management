import express from 'express';
import { handleValidation } from '../../middlewares/index';
import { createUser, checkUser, searchOne, createUserValidate } from '../../services/auth';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

const router = express.Router();
dotenv.config();

const createToken = (id, email) =>
    jwt.sign({ id: id, email: email, exp: Math.floor(Date.now() / 1000) + parseInt(process.env.JWT_EXPIRES_IN) }, process.env.JWT_SECRET);

const createUserHandler = async (req, res, next) => {
    try {
        const user = req.body;
        const userData = await createUser(user);
        if (userData) {
            res.status(201).send({
                status: 'ok',
                message: 'User created successfully',
                result: userData,
                authToken: createToken(userData._id, userData.email),
            });
        } else {
            throw new Error('User already exist')
        }
    } catch (error) {
        next(error);
    }
};

const loginHandler = async (req, res) => {
    if (req.body.email && req.body.password) {
        let user = await checkUser(req.body.email, req.body.password);
        if (user) {
            res.status(200).send({
                status: 'ok',
                result: {
                    ...user,
                },
                authToken: createToken(user._id, user.email),
            });
            return;
        }
    }

    res.status(400).send({
        message: 'Invalid email or password ',
    });
    return;
};

const checkUserEmailHandler = async (req, res) => {
    const user = await searchOne({ username: req.body.username.toLowerCase() });
    if (user) {
        res.status(400).send({ status: 'unavailable', message: 'Username is taken' });
        return;
    }
    return res.status(200).send({ status: 'available', message: 'Username is available' });
};

router.post('/register', handleValidation(createUserValidate), createUserHandler);
router.post('/login', loginHandler);
// router.post('/check-username', handleValidation(validateUsername), checkUserEmailHandler);

export default router;
