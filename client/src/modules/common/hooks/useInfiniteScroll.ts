import { useEffect, useRef, useState } from 'react';

interface IuseInfiniteScroll {
    fetchAction: ({ limit, skip }: { limit: number; skip: number }) => void;
    limit: number;
    skip: number;
    totalCount: number;
}

const useInfiniteScroll = ({ skip, limit, fetchAction, totalCount }: IuseInfiniteScroll) => {
    const scrollActiveRef = useRef<boolean>(false);

    const handleScroll = (event: Event) => {
        if (scrollActiveRef.current === false) {
            const bodySrollHeight = document.body.scrollHeight - window.innerHeight;
            const totalScrolled = window.scrollY;
            if (bodySrollHeight - totalScrolled < 60) {
                scrollActiveRef.current = true;
            }
        } else {
            if (skip < totalCount) {
                fetchAction({ limit, skip });
            }
            scrollActiveRef.current = false;
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrollActiveRef.current, totalCount, skip]);
};

export default useInfiniteScroll;
