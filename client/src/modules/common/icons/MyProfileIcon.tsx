import React from "react";

const MyProfileIcon = ({ fill = "#b8b8be" }: { fill: string }) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="16.176" height="20.301">
			<defs>
				<style>
					{`.cls-1{stroke-width:1.5px;fill:none;stroke:${fill};stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10}
                        .cls-2{stroke-width:1.429px;fill:none;stroke:${fill};stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10}
                    `}
				</style>
			</defs>
			<g data-name="Iconly/Light/Profile">
				<path
					data-name="Stroke 1"
					d="M7.338 0C3.38 0 0 .6 0 3s3.359 3.012 7.338 3.012c3.958 0 7.337-.6 7.337-3S11.318 0 7.338 0z"
					transform="translate(.75 13.539)"
					className="cls-1"
				/>
				<path
					data-name="Stroke 3"
					d="M4.7 9.407a4.687 4.687 0 1 0-.033 0z"
					transform="translate(3.384 .714)"
					className="cls-2"
				/>
			</g>
		</svg>
	);
};

export default MyProfileIcon;
