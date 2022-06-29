import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    // name: "",
    email: "",
    amount: "0"
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserLogin: (state , action) => {
            // state.name = action.payload.name;
            localStorage.setItem("username" , action.payload.email);
            localStorage.setItem("amount" , action.payload.amount);
            state.email = action.payload.email;
            state.amount = action.payload.amount;
        },
        setSignOut: (state) => {
            // state.name = null;
            var val = "";
            localStorage.setItem("username" , val);
            val = "0";
            localStorage.setItem("amount" , val);
            state.email = '';
            state.amount = "0";
        }
    }
})

export const { setUserLogin , setSignOut } = userSlice.actions;

// export const selectUserName = (state) => state.user.name;
export const selectUserEmail = (state) => state.user.email;
export const selectUserAmount = (state) => state.user.amount;

export default userSlice.reducer;
