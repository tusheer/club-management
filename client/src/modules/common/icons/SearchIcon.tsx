import React from "react";

interface ISearchIcon {
	size?: number;
	stroke?: string;
}

const SearchIcon: React.FC<ISearchIcon> = ({ size = 24, stroke = "#9ba9ac" }) => {
	return (
		<svg viewBox="0 0 32 32" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
			<circle
				cx="14"
				cy="14"
				fill="none"
				r="9"
				stroke={stroke}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeMiterlimit="10"
				strokeWidth="3"
			/>
			<path
				fill="none"
				stroke={stroke}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeMiterlimit="10"
				strokeWidth="2"
				d="m27 27-6.634-6.634"
			/>
		</svg>
	);
};

export default SearchIcon;
