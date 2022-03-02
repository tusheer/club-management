import { AxiosResponse } from 'axios';
import { http } from '../../../config';
import { IMember, MembershipType } from '../../types/Member';

interface ICreateMember extends IMember {
    file: File | null;
}
interface ICreateResponse {
    success: string;
    message: string;
    result: IMember;
}

const createMemberAction = async (body: Omit<ICreateMember, 'isDelete' | 'createdAt' | 'updatedAt' | 'avatar' | 'uid'>) => {
    const formData = new FormData();

    Object.entries(body).forEach(([key, value]) => {
        if (value !== null) {
            formData.append(key, value);
        }
    });

    try {
        const response = await http.post<typeof formData, AxiosResponse<ICreateResponse>>('/members', formData);
        return response.data;
    } catch (error) {
        throw new Error();
    }
};

export default createMemberAction;
