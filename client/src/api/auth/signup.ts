import { http } from '../../../config';

interface ISingupBody {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

const signupAction = async (body: ISingupBody) => {
    try {
        const response = await http.post('/auth/register', body);
        if (response.status === 201) {
            return response.data;
        }
        throw new Error();
    } catch (error) {
        throw new Error();
    }
};

export default signupAction;
