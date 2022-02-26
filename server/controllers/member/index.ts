import express from 'express';
import { save, update, deleteById, getById, search, count, get } from '../../services/member';
import { NotFound } from '../../common/errors';
import validate from '../../services/member/validation';
import { handleValidation } from '../../middlewares/index';
const router = express.Router();

const getByIdHandler = async (req, res, next) => {
    try {
        const id = req.params.id;
        const item = await getById(id);
        if (item) {
            res.status(200).send(item);
        } else {
            throw new NotFound('Product not found by the id: ' + id);
        }
    } catch (error) {
        return next(error, req, res);
    }
};

const postHandler = async (req, res, next) => {
    try {
        const body = req.body;
        const id = await save(body);
        res.status(201).send(id);
    } catch (error) {
        return next(error, req, res);
    }
};

const searchHandler = async (req, res, next) => {
    try {
        if (!req.body.pageSize) {
            req.body.pageSize = 10;
        }
        if (!req.body.current) {
            req.body.current = 1;
        }
        const result = await search(req.body);
        const response = { success: true, ...result };
        res.status(200).send(response);
        // const response = { success: false, errorMessage: 'Super duper error handling mechanism', ...result };
        // res.status(400).send(response);
    } catch (error) {
        return next(error, req, res);
    }
};

const countHandler = async (req, res, next) => {
    try {
        const result = await count(req.body);
        const response = { success: true, ...result };
        res.status(200).send(response);
    } catch (error) {
        return next(error, req, res);
    }
};

const putHandler = async (req, res, next) => {
    try {
        const body = req.body;
        const id = await update(body);
        res.status(200).send(id);
    } catch (error) {
        return next(error, req, res);
    }
};

const deleteHandler = async (req, res, next) => {
    try {
        const id = req.params.id;
        await deleteById(id);
        res.status(200).send({ success: true, message: 'Deleted successfully' });
    } catch (error) {
        return next(error, req, res);
    }
};

const getHandler = async (req, res, next) => {
    const { skip = 0, limit = 10 } = req.query;
    try {
        const data = await get({ skip, limit });
        res.status(200).send(data);
    } catch (error) {
        return next(error, req, res);
    }
};

router.get('/', getHandler);
router.get('/:id', getByIdHandler);
router.post('/', handleValidation(validate), postHandler);
router.put('/', putHandler);
router.post('/search', searchHandler);
router.post('/count', countHandler);
router.delete('/:id', deleteHandler);

export default router;
