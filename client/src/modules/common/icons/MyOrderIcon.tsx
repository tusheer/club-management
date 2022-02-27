import React from "react";

const MyOrderIcon = ({ fill = "#b8b8be" }: { fill: string }) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="17.951" height="18.981">
			<defs>
				<style>
					{`.cls-1,.cls-2{fill:none;stroke:${fill};stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10}.cls-1{stroke-width:1.5px}.cls-2{stroke-width:2px}`}
				</style>
			</defs>
			<g id="Iconly_Light_Bag" data-name="Iconly/Light/Bag" transform="translate(.75 .75)">
				<g id="Bag">
					<path
						id="Path_33955"
						className="cls-1"
						d="M12.016 13.352H4.424C1.636 13.352-.5 12.345.1 8.291L.811 2.8C1.186.774 2.476 0 3.608 0h9.257c1.149 0 2.364.832 2.8 2.8l.708 5.494c.513 3.593-1.573 5.058-4.357 5.058z"
						transform="translate(0 4.129)"
					/>
					<path
						id="Path_33956"
						className="cls-1"
						d="M7.875 3.929A3.929 3.929 0 0 0 3.946 0h0A3.929 3.929 0 0 0 0 3.929h0"
						transform="translate(4.266)"
					/>
					<path id="Line_192" className="cls-2" d="M.476.458H.435" transform="translate(10.433 7.567)" />
					<path id="Line_193" className="cls-2" d="M.476.458H.435" transform="translate(5.13 7.567)" />
				</g>
			</g>
		</svg>
	);
};

export default MyOrderIcon;
