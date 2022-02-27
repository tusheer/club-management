import mongoose from 'mongoose';
import dontenv from 'dotenv';
dontenv.config();

const isMongoDbUrl = JSON.parse(process.env.IS_MONGODB_CLOUD_URL ? process.env.IS_MONGODB_CLOUD_URL : 'false');
const uri =
    isMongoDbUrl === true
        ? process.env.MONGODB_CLOUD_URL
        : `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
 console.log(uri , isMongoDbUrl)
const connectWithDb = async (): Promise<void> => {
    console.log(`Connecting to mongoDB...`);
    await mongoose.connect(uri);
};
export default connectWithDb;
