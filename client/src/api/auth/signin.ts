import { AxiosResponse } from 'axios';
import { http } from '../../../config';
import { IUser } from '../../types/User';

interface ISinginBody {
    email: string;
    password: string;
}
interface SigninResponse {
    authToken: string;
    message: string;
    result: IUser;
}

const signinAction = async (body: ISinginBody) => {
    try {
        const response = await http.post<ISinginBody, AxiosResponse<SigninResponse>>('/auth/login', body);
        return response.data;
    } catch (error) {
        throw new Error();
    }
};

export default signinAction;
