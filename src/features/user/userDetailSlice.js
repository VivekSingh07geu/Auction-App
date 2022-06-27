import { createSlice } from "@reduxjs/toolkit";

const  initialState = {
    userDetails: []
}

const userDetailSlice = createSlice({
    name: "userDetail",
    initialState,
    reducers : {
        setUserDetails: (state , action) => {
            state.userDetails = action.payload;
        }
    }
})

export const { setUserDetails } = userDetailSlice.actions;

export const selectUserDetails = (state) => state.userDetail.userDetails;

export default userDetailSlice.reducer;