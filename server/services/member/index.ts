import {
    save as saveMember,
    update as updateMember,
    getById as getMemberById,
    deleteById as deleteMember,
    getAll as getAllMember,
} from '../../common/handler';
import Member, { IMember } from '../../models/member';
import { NotFound } from '../../common/errors';

const modelName = 'Member';

const get = async ({ skip, limit }: { skip: number; limit: number }) => {
    const result = await getAllMember(modelName, { skip, limit });
    return result;
};

const save = async (member: IMember) => {
    const savedItem = await saveMember(member, modelName);
    return savedItem._id;
};

const update = async (member: IMember) => {
    const updatedItem = await updateMember(member, modelName);
    return updatedItem._id;
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

const search = async (payload) => {
    const queries = [];

    if (payload.name) {
        queries.push({ name: { $regex: payload.name, $options: 'i' } });
    }

    // member.size (number)
    if (payload.size) {
        queries.push({ size: parseInt(payload.size) });
    }

    // payload.fromDate && payload.toDate
    if (payload.manufacturingDateRange) {
        let fromDate = payload.manufacturingDateRange[0];
        let toDate = payload.manufacturingDateRange[1];
        queries.push({ manufacturingDate: { $gte: new Date(fromDate), $lte: new Date(toDate) } });
    }

    const query = queries.length > 1 ? { $and: queries } : queries.length == 1 ? queries[0] : {};
    const take = parseInt(payload.pageSize);
    const skip = (parseInt(payload.current) - 1) * take;

    // sort
    let sort = {};
    if (payload.sort) {
        let key = payload.sort;
        let value = parseInt(payload.order) ?? 1;
        sort[key] = value;
    } else {
        sort = { updatedAt: -1 };
    }

    const data = await Member.collection.find(query).sort(sort).skip(skip).limit(take);
    let items = { data: await data.toArray(), total: 200 };
    return items;
};

const count = async (payload) => {
    // let searchQuery = null;
    const queries = [];

    if (payload.name) {
        queries.push({ name: { $regex: payload.name, $options: 'i' } });
    }

    // member.size (number)
    if (payload.size) {
        queries.push({ size: parseInt(payload.size) });
    }

    // payload.fromDate && payload.toDate
    if (payload.fromDate && payload.toDate) {
        queries.push({ createdAt: { $gte: new Date(payload.fromDate), $lte: new Date(payload.toDate) } });
    }

    const query = queries.length > 1 ? { $and: queries } : queries.length == 1 ? queries[0] : {};
    const t = await Member.collection.find(query).count();
    let items = { total: t };
    return items;
};

export { save, update, deleteById, getById, search, count, get };
