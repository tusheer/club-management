import { Schema, model } from 'mongoose';

type MembershipType = 'VIP' | 'CHILDREN' | 'WOMEN' | 'PLAYER' | 'FOREIGNER' | 'NORMAL';

export interface IMember {
    firstName: string;
    lastName: string;
    email: string;
    avatar?: {
        url: string;
    };
    membershipType?: MembershipType;
    occupation: string;
    isDelete?: boolean;
}

// schema

const schema = new Schema<IMember>(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, require: true },
        avatar: {
            url: String,
        },
        membershipType: {
            type: String,
            enum: ['NORMAL'],
            default: 'NORMAL',
        },
        isDelete: {
            type: Boolean,
            default: false,
        },
        occupation: {
            type: String,
            require: true,
        },
    },
    { timestamps: true }
);

const Product = model<IMember>('Member', schema);

export default Product;
