import mongoose from 'mongoose';

const save = async (item, modelName) => {
    const model = new mongoose.models[modelName](item);
    const savedItem = await model.save();
    return savedItem;
};

const update = async (item, modelName) => {
    let doc = await mongoose.models[modelName].findOneAndUpdate({ _id: item._id }, item);
    return doc;
};

const deleteById = async (id, modelName) => {
    let model = await mongoose.models[modelName].findById(id);
    if (model) {
        let result = await mongoose.models[modelName].deleteOne({ _id: id });
        return result;
    }
    throw new Error('Product not found by the id: ' + id);
};

const getById = async (id, modelName) => {
    let model = await mongoose.models[modelName].findById(id);
    if (model == null) {
        throw new Error('Product not found by the id: ' + id);
    }
    return model;
};

const getAll = async (modelName, { skip, limit }: { skip: number; limit: number }) => {
    let model = await mongoose.models[modelName].find().skip(skip).limit(limit);
    if (model == null) {
        throw new Error('Product not found by the id: ');
    }
    return model;
};

export { save, update, deleteById, getById, getAll };
