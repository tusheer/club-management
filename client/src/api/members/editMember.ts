import { AxiosResponse } from 'axios';
import { http } from '../../../config';
import { IMember } from '../../types/Member';

interface IEditMember extends IMember {
    file: File | null;
}
interface IUpdateResponse {
    success: string;
    message: string;
    result: IMember;
}

const editMemberAction = async (body: Omit<IEditMember, 'isDelete' | 'createdAt' | 'updatedAt' | 'avatar' >) => {
    const formData = new FormData();

    Object.entries(body).forEach(([key, value]) => {
        if (value !== null) {
            formData.append(key, value);
        }
    });

    try {
        const response = await http.put<typeof formData, AxiosResponse<IUpdateResponse>>('/members', formData);
        return response.data;
    } catch (error) {
        throw new Error();
    }
};

export default editMemberAction;
