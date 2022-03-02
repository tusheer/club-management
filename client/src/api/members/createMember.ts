import { AxiosResponse } from 'axios';
import { http } from '../../../config';
import { IMember, MembershipType } from '../../types/Member';

interface ICreateMember {
    firstName: string;
    lastName: string;
    email: string;
    number: string;
    file: File;
    membershipType: MembershipType;
    occupation: string;
}
interface ICreateResponse {
    success: string;
    message: string;
    result: IMember;
}

const createMemberAction = async (body: ICreateMember) => {
    const formData = new FormData();

    Object.entries(body).forEach(([key, value]) => {
        formData.append(key, value);
    });

    try {
        const response = await http.post<typeof formData, AxiosResponse<ICreateResponse>>('/members', formData);
        return response.data;
    } catch (error) {
        throw new Error();
    }
};

export default createMemberAction;
