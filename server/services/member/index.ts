import {
    save as saveMember,
    update as updateMember,
    getById as getMemberById,
    deleteById as deleteMember,
    getWithPagination,
} from '../../common/handler';
import validate from './Validator';
import Member, { IMember } from '../../models/Member';
import { NotFound } from '../../common/errors';

const modelName = 'Member';

const get = async ({ page, limit }: { page: number; limit: number }) => {
    const result = await getWithPagination(modelName, { page, limit });
    return result;
};

const save = async (member: IMember) => {
    const savedItem = await saveMember(member, Member);
    return savedItem;
};

const update = async (member: IMember) => {
    const updatedItem = await updateMember(member, modelName);
    return updatedItem;
};

const deleteById = async (id: string) => {
    const result = await deleteMember(id, modelName);
    return result;
};

const getById = async (id: string) => {
    const item = await getMemberById(id, modelName);
    if (item == null) {
        throw new NotFound('Member not found by the id: ' + id);
    }
    return item;
};

export { save, update, deleteById, getById, get, validate };
