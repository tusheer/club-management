import React from "react";
interface IUserAvatarProps {
	height: number;
	width: number;
	className?: string;
	name: string;
	src: string;
}
const UserAvatar: React.FC<IUserAvatarProps> = ({ height, width, name, src , className }) => {
	return (
		<div className={`${className} rounded-full overflow-hidden`} style={{ height: `${height}px`, width: `${width}px` }}>
			<img className="h-full w-full" src={src} alt={name} />
		</div>
	);
};
UserAvatar.defaultProps = {
	height: 38,
	width: 38,
    className:""
};
export default UserAvatar;
