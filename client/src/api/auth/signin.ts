import { AxiosResponse } from 'axios';
import { http } from '../../../config';

interface ISinginBody {
    email: string;
    password: string;
}
interface SigninResponse {
    authToken: string;
    message: string;
    result: ISinginBody;
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
