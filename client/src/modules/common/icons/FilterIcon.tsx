import React from "react";

const FilterIcon = ({ fill }: { fill: string }) => {
	return (
		<svg fill="none" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M13.5 16a.75.75 0 0 1 0 1.5h-3a.75.75 0 0 1 0-1.5h3Zm3-5a.75.75 0 0 1 0 1.5h-9a.75.75 0 0 1 0-1.5h9Zm3-5a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1 0-1.5h15Z"
				fill={fill}
			/>
		</svg>
	);
};

export default FilterIcon;
