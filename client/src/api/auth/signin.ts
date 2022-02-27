import { http } from '../../../config';

interface ISinginBody {
    email: string;
    password: string;
}

const signinAction = async (body: ISinginBody) => {
    try {
        const response = http.post('/signin', body);
        return response;
    } catch (error) {
        throw new Error();
    }
};

export default signinAction;
