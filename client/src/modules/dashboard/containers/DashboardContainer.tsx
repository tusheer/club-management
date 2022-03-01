import Image from 'next/image';
import React from 'react';
import Button from '../../common/components/Button';
import Header from '../components/Header';
import MemberLists from '../components/MemberLists';

const DashboardContainer = () => {
    return (
        <React.Fragment>
            <Header />
            <MemberLists />
        </React.Fragment>
    );
};

export default DashboardContainer;
