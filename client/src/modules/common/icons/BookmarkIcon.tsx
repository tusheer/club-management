import React from "react";

const BookmarkIcon = ({ fill = "#b8b8be", className = "" }: { fill: string; className?: string }) => {
	return (
		<svg
			className={className}
			id="Iconly_Light_Heart"
			data-name="Iconly/Light/Heart"
			xmlns="http://www.w3.org/2000/svg"
		>
			<defs>
				<style>
					{` .cls-1{fill:none;stroke:${fill};stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-width:1.5px}`}
				</style>
			</defs>
			<g id="Heart" transform="translate(2.274 2.728)">
				<path
					id="Stroke_1"
					data-name="Stroke 1"
					className="cls-1"
					d="M.338 7.82C-.638 4.773.5 1.291 3.7.26a5.463 5.463 0 0 1 4.94.83 5.5 5.5 0 0 1 4.929-.83c3.2 1.03 4.346 4.513 3.371 7.559-1.519 4.829-8.3 8.549-8.3 8.549S1.908 12.705.338 7.82z"
				/>
				<path
					id="Stroke_3"
					data-name="Stroke 3"
					className="cls-1"
					d="M0 0a2.529 2.529 0 0 1 1.743 2.2"
					transform="translate(12.278 3.365)"
				/>
			</g>
		</svg>
	);
};

export default BookmarkIcon;
