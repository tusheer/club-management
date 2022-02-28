import { AxiosResponse } from 'axios';
import { http } from '../../../config';

interface ISingupBody {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

interface SignupResponse {
    authToken: string;
    message: string;
    result: ISingupBody;
}

const signupAction = async (body: ISingupBody) => {
    try {
        const response = await http.post<ISingupBody, AxiosResponse<SignupResponse>>('/auth/register', body);
        if (response.status === 201) {
            return response.data;
        }
        throw new Error();
    } catch (error) {
        throw new Error();
    }
};

export default signupAction;
