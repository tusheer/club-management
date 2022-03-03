import Cookies from 'js-cookie';

const getToken = (): string => (typeof window !== 'undefined' && Cookies.get('token')) || '';

const setToken = (token: string): void => {
    Cookies.set('token', token);
};

const removeToken = (): void => {
    Cookies.remove('token');
};

export { getToken, setToken, removeToken };
