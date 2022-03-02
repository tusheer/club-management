import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import getAllMembers from '../api/members/getAllMembers';
import { IMember } from '../types/Member';
import { IMeta } from '../types/Meta';
import sleep from '../utils/sleep';

interface IState {
    members: IMember[];
    meta?: IMeta;
    loading: boolean;
    paginationLoading: boolean;
}

const initialState: IState = {
    members: [],
    loading: false,
    paginationLoading: false,
};

const globalSlice = createSlice({
    name: 'members',
    initialState,
    reducers: {
        addNewMember(state, action: PayloadAction<IMember>) {
            state.members = [action.payload, ...state.members];
        },
        editMember(state, action: PayloadAction<IMember>) {
            const findMemberIndex = state.members.findIndex((member) => member._id === action.payload._id);
            state.members[findMemberIndex] = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMembers.fulfilled, (state, action) => {
            state.members = [...state.members, ...action.payload.result];
            state.meta = action.payload.meta;
            state.loading = false;
            state.paginationLoading = false;
        });

        builder.addCase(fetchMembers.pending, (state) => {
            if (state.members.length) {
                state.paginationLoading = true;
            } else {
                state.loading = true;
            }
        });
    },
});

export const fetchMembers = createAsyncThunk('members/fetch', async ({ limit, offset }: { limit: number; offset: number }) => {
    process.env.NODE_ENV !== 'production' && (await sleep(500));
    const response = await getAllMembers({ limit, offset });
    return response;
});

export const { addNewMember, editMember } = globalSlice.actions;
export default globalSlice.reducer;
