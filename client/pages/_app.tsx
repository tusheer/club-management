import type { AppProps } from 'next/app'
import { Provider } from "react-redux";
import { store } from "../src/store";
import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";

//global css
import "../styles/build.css";
import "../styles/global.scss"

type NextPageWithLayout = NextPage & {
	getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
	const getLayout = Component.getLayout ?? ((page) => page);

	return <Provider store={store}>{getLayout(<Component {...pageProps} />)}</Provider>;
}


export default MyApp;
