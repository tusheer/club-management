import { useEffect, useRef, useState } from "react";

interface IuseInfiniteScroll {
	quearyFunction: Function;
	limit: number;
	skip: number;
	getData: (data: any) => any;
	getCount: (data: any) => string;
}

const useInfiniteScroll = <Type>({
	skip,
	limit,
	getData,
	getCount,
	quearyFunction,
}: IuseInfiniteScroll): { data: Type[] | []; isFetching: boolean; scrollLoading: false; count: string } => {
	const [state, setState] = useState<Type[] | []>([]);
	const scrollActiveRef = useRef<boolean>(false);
	const [skipValue, setSkip] = useState(skip);
	const [page, setPage] = useState(skip);
	const { data, isFetching } = quearyFunction({ skip: skipValue, limit });
	const [count, setCount] = useState<string>("0");

	const handleScroll = (event: Event) => {
		if (scrollActiveRef.current === false && !isFetching) {
			console.log("console");
			const bodySrollHeight = document.body.scrollHeight - window.innerHeight;
			const totalScrolled = window.scrollY;
			if (bodySrollHeight - totalScrolled < 40) {
				scrollActiveRef.current = true;
				setPage((value) => value + 1);
			}
		}
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll, { passive: true });

		return () => window.removeEventListener("scroll", handleScroll);
	}, [scrollActiveRef.current, isFetching]);

	useEffect(() => {
		if (page * limit < Number(count)) setSkip((value) => page * limit);
	}, [page]);

	useEffect(() => {
		if (data !== undefined) {
			const requestedData = (getData(data) as Type[]) || [];

			const _data = [...state, ...requestedData];
			if (state.length < Number(data.count)) {
				scrollActiveRef.current = false;
				setState(_data);
				setCount(getCount(data));
			}
		}
	}, [data]);

	return {
		data: state,
		isFetching: !!scrollActiveRef.current ? false : isFetching,
		scrollLoading: !!scrollActiveRef.current ? isFetching : false,
		count,
	};
};

export default useInfiniteScroll;
