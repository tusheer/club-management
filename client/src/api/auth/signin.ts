import { http } from '../../../config';

interface ISinginBody {
    email: string;
    password: string;
}

const signinAction = async (body: ISinginBody) => {
    try {
        const response = await http.post('/auth/login', body);
        return response.data;
    } catch (error) {
        throw new Error();
    }
};

export default signinAction;
