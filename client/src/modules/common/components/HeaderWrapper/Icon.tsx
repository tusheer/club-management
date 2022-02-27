import React, { Fragment } from "react";

interface IIconWraperProps {
	children: React.ReactChild;
}

const Icon: React.FC<IIconWraperProps> = ({ children }) => {
	return (
		<div className="h-10 w-10 cursor-pointer bg-dh-green-800 rounded-full flex items-center justify-center">
			<Fragment>{children}</Fragment>
		</div>
	);
};

export default Icon;
