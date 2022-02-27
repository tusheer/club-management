import React from "react";

const CheckmarkIcon = ({ className = "", fill = "#01896a" }) => {
	return (
		<svg
			className={className}
			data-name="Group 5174"
			xmlns="http://www.w3.org/2000/svg"
			width="15"
			height="15"
			viewBox="0 0 15 15"
		>
			<g data-name="Group 5166">
				<circle data-name="Ellipse 221" cx="7.5" cy="7.5" r="7.5" style={{ fill }} />
			</g>
			<path
				data-name="Path 3453"
				d="m-13535.178 2862.667 2.7 2.7 4.509-4.509"
				transform="translate(13538.979 -2855.365)"
				style={{ fill: "none", stroke: "#fff", strokeWidth: "1.5px" }}
			/>
		</svg>
	);
};

export default CheckmarkIcon;
