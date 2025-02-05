import { createSlice } from "@reduxjs/toolkit";

const userDetailsSlice = createSlice({
    name: 'userDetails',
    initialState: {
        userDetailsItem : [],
        date: "23/01/1997"
    },
    reducers: {
        addUserDetails: (state, action) => {
            state.userDetailsItem = action.payload
        },
        deleteUserDetail : (state, action) => {
            state.userDetailsItem = state.userDetailsItem.filter((user) => user._id !== action.payload)
        },
        showUserDate : (state, action) => {
            state.date = action.payload
        }
    }
})

export const {addUserDetails, deleteUserDetail, showUserDate} = userDetailsSlice.actions;
export default userDetailsSlice.reducer;