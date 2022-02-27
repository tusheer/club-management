import { http } from '../../../config';

interface ISingupBody {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

const signupAction = async (body: ISingupBody) => {
    try {
        const response = http.post('/signup', body);
        return response;
    } catch (error) {
        return null;
    }
};

export default signupAction;
