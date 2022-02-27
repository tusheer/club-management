import { ReactNode, FC } from "react";

type Props = {
	children: ReactNode;
};

const AuthLayout: FC<Props> = ({ children }) => {
	return <>{children}</>
};
export default AuthLayout;
