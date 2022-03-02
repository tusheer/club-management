import { http } from '../../../config';
import { IMember } from '../../types/Member';
import { IMeta } from '../../types/Meta';

interface ISinginBody {
    result: IMember[];
    meta: IMeta;
}

interface IParams {
    offset: number;
    limit: number;
}

const getAllMembers = async (params: IParams) => {
    try {
        const response = await http.get<ISinginBody>('/members', {
            params: params,
        });
        return response.data;
    } catch (error) {
        throw new Error();
    }
};

export default getAllMembers;
