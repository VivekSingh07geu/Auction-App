import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    // name: "",
    email: "",
    amount: ""
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserLogin: (state , action) => {
            // state.name = action.payload.name;
            state.email = action.payload.email;
            state.amount = action.payload.amount;
        },
        setSignOut: (state) => {
            // state.name = null;
            state.email = '';
            state.amount = '';
        }
    }
})

export const { setUserLogin , setSignOut } = userSlice.actions;

// export const selectUserName = (state) => state.user.name;
export const selectUserEmail = (state) => state.user.email;
export const selectUserAmount = (state) => state.user.amount;

export default userSlice.reducer;
