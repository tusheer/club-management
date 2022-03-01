import { ReactNode, FC, ReactChildren, ReactElement } from 'react';

type Props = {
    children: ReactElement;

};

const AuthLayout: FC<Props> = ({ children}) => {
	console.log(children?.props || "")
    return <>{children}</>;
};
export default AuthLayout;
