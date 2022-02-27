import axios from "../../../config/http";
import { checkHttpError, checkHttpResponse } from "../../../helpers";
import { Dispatch } from "@reduxjs/toolkit";

type Params = {
	uid?: string;
	skip: number;
	limit: number;
};

const actionGetProductGroups = (params?: Params) => async (dispatch: Dispatch) => {
	try {
		const data = await axios.get(`/product-groups`, { params: params }).then(checkHttpResponse);
		return data;
	} catch (error: any) {
		return { data: null, error: error.toString() };
	}
};

export default actionGetProductGroups;
