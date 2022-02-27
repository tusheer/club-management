import React, { ReactChild, useState, useRef, ReactElement, useEffect } from "react";

interface IOverflowSlider {
	children: ReactChild | ReactChild[];
	className?: string;
	duration?: number;
	slidesToShow?: number;
	gap?: number;
	prevBtn: ({ activePrev, handlePrev }: { activePrev: boolean; handlePrev: () => void }) => ReactElement;
	nextBtn: ({ activeNext, handleNext }: { activeNext: boolean; handleNext: () => void }) => ReactElement;
}

const OverflowSlider: React.FC<IOverflowSlider> = ({
	children,
	className,
	slidesToShow = 1,
	duration = 500,
	prevBtn,
	nextBtn,
}) => {
	const [activeItem, setActiveItem] = useState(1);
	const [left, setLeft] = useState(0);
	const [extraLeft, setExtraLeft] = useState(0);
	const [next, setNext] = useState(true);
	const [prev, setPrev] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (ref.current) {
			const childNodesWidth = Array.from(ref.current?.childNodes || []).reduce((acc: number, curr: any) => {
				return curr.offsetWidth + acc;
			}, 0);
			if (childNodesWidth <= ref.current?.offsetWidth) {
				setNext(false);
			}
		}
	}, []);

	const handleNext = () => {
		const childNodes = Array.from(ref.current?.childNodes || []);
		const totalWidth: number = childNodes
			.slice(activeItem - 1, activeItem + slidesToShow - 1)
			.reduce((acc: number, curr: any) => {
				return curr.offsetWidth + acc;
			}, 0);

		const nextNodesWidth: number = childNodes
			.slice(activeItem + slidesToShow - 1, childNodes.length)
			.reduce((acc: number, curr: any) => {
				return curr.offsetWidth + acc;
			}, 0);

		if (totalWidth > 0 && nextNodesWidth > 0) {
			setLeft((leftX) => {
				let total = leftX - totalWidth;
				if (nextNodesWidth + totalWidth <= Number(ref.current?.offsetWidth)) {
					setNext(false);
					return leftX;
				} else {
					setActiveItem((item) => {
						return item + slidesToShow;
					});
					if (Number(ref.current?.scrollWidth) + total < Number(ref.current?.offsetWidth)) {
						setNext(false);
					}
					return total;
				}
			});
			setPrev(true);
		} else {
			if (totalWidth > Number(ref.current?.offsetWidth)) {
				if (next) {
					setLeft((leftX) => leftX - (totalWidth - Number(ref.current?.offsetWidth)));
					setExtraLeft(totalWidth - Number(ref.current?.offsetWidth));
					setNext(false);
					setPrev(true);
				}
			}
			return;
		}
		return;
	};
	const handlePrev = () => {
		if (extraLeft) {
			setLeft((leftX) => {
				const totalLeft = leftX + extraLeft;
				if (totalLeft === 0) {
					setPrev(false);
				}
				return totalLeft;
			});
			setExtraLeft(0);
			setNext(true);
		} else {
			setNext(true);
			const childNodes = Array.from(ref.current?.childNodes || []);
			const sliceNodes: any[] = childNodes.slice(activeItem - (slidesToShow + 1), activeItem - 1);
			let totalWidth = 0;
			if (slidesToShow === sliceNodes.length) {
				for (let i = 0; i < sliceNodes.length; i++) {
					totalWidth += sliceNodes[i].offsetWidth;
				}
				setLeft((leftX) => {
					let total = leftX + totalWidth;
					setActiveItem((item) => {
						if (item - slidesToShow === 1) {
							setPrev(false);
						}
						return item - slidesToShow;
					});
					return total;
				});
			} else {
			}
		}
	};
	return (
		<div className="relative w-full">
			{prevBtn({ handlePrev, activePrev: prev })}
			<div className="overflow-hidden">
				<div
					style={{ transform: `translateX(${left}px)`, transition: `${duration}ms transform` }}
					ref={ref}
					className={`${className}`}
				>
					{children}
				</div>
			</div>

			{nextBtn({ handleNext, activeNext: next })}
		</div>
	);
};

OverflowSlider.defaultProps = {
	className: "",
	slidesToShow: 1,
	gap: 0,
	duration: 500,
};

export default OverflowSlider;
