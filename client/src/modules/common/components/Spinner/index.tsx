import { HashLoader } from "react-spinners";
const Spinner = ({ size = 30 }) => {
	return (
		<div className="w-full flex justify-center items-center mt-40">
			<HashLoader size={size} color="#27a88b" />
		</div>
	);
};
export default Spinner;
