export type MembershipType = 'VIP' | 'CHILDREN' | 'WOMEN' | 'PLAYER' | 'FOREIGNER' | 'NORMAL';

export interface IMember {
    firstName: string;
    lastName: string;
    email: string;
    uid: string;
    number: string;
    avatar: {
        url: string;
    };
    membershipType: MembershipType;
    occupation: string;
    isDelete?: boolean;
    createdAt: Date;
    updatedAt: Date;
}
