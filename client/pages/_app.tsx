import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../src/store';
import { ReactElement, ReactNode } from 'react';
import type { NextPage, GetServerSidePropsContext, GetServerSideProps } from 'next';
import jwt from 'jsonwebtoken';

//global css
import '../styles/build.css';
import '../styles/global.scss';

type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode;
};

interface Iuser {
    firstName: string;
    lastName: string;
    email: string;
    _id: string;
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => page);

    return <Provider store={store}>{getLayout(<Component {...pageProps} />)}</Provider>;
}

export const withSession = (getSerSideProps: (ctx: GetServerSidePropsContext, user: Iuser | null) => any): GetServerSideProps => {
    return (ctx: GetServerSidePropsContext) => {
        const { req } = ctx;
        const token = req.cookies.token || '';
        const secret = process.env.JWT_SECRET || '';
        let user: Iuser | null = null;
        if (token) {
            jwt.verify(token, secret, (err, decoded) => {
                if (err) {
                    user = null;
                } else {
                    user = decoded as Iuser;
                }
            });
        }

        return getSerSideProps(ctx, user);
    };
};

export default MyApp;
