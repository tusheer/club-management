import type { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import React from 'react';
import DashboardContainer from '../src/modules/dashboard/containers/DashboardContainer';

const Home: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Club Management | Dashboard</title>
                <meta name='description' content='Generated by create next app' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <DashboardContainer />
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { req } = ctx;

    console.log(req.cookies.token);

    return {
        props: {},
    };

    // return { redirect: { destination: '/sign-in', permanent: false } };
};

export default Home;
