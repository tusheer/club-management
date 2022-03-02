import { useEffect, useRef, useState } from 'react';

interface IuseInfiniteScroll {
    fetchAction: ({ limit, offset }: { limit: number; offset: number }) => void;
    limit: number;
    offset: number;
    totalCount: number;
}

const useInfiniteScroll = ({ offset, limit, fetchAction, totalCount }: IuseInfiniteScroll) => {
    const scrollActiveRef = useRef<boolean>(false);

    const handleScroll = (event: Event) => {
        if (scrollActiveRef.current === false) {
            const bodySrollHeight = document.body.scrollHeight - window.innerHeight;
            const totalScrolled = window.scrollY;
            if (bodySrollHeight - totalScrolled < 60) {
                scrollActiveRef.current = true;
            }
        } else {
            if (offset < totalCount) {
                fetchAction({ limit, offset });
            }
            scrollActiveRef.current = false;
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrollActiveRef.current, totalCount, offset]);
};

export default useInfiniteScroll;
