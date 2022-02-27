import Cookies from 'js-cookie';

interface Token {
    token: string;
}

const getToken = (): string => (typeof window !== 'undefined' && Cookies.get('token')) || '';

const setToken = (token: Token): void => {
    Cookies.set('token', token.token);
};

const removeToken = (): void => {
    Cookies.remove('token');
};

export { getToken, setToken, removeToken };
