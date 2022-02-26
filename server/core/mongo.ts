import mongoose from 'mongoose';
import dontenv from 'dotenv';

dontenv.config();
const isMongoDbUrl = process.env.IS_MONGODB_CLOUD_URL;
const uri = isMongoDbUrl ? process.env.MONGODB_CLOUD_URL : `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

const connectWithDb = async (): Promise<void> => {
    console.log(`Connecting to mongoDB...`);
    await mongoose.connect(uri);
};
export default connectWithDb;
