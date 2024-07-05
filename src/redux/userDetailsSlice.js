import { createSlice } from "@reduxjs/toolkit";

const userDetailsSlice = createSlice({
    name: 'userDetails',
    initialState: {
        userDetailsItem : []
    },
    reducers: {
        addUserDetails: (state, action) => {
            state.userDetailsItem = action.payload
        },
        deleteUserDetail : (state, action) => {
            state.userDetailsItem = state.userDetailsItem.filter((user) => user._id !== action.payload)
        }
    }
})

export const {addUserDetails, deleteUserDetail} = userDetailsSlice.actions;
export default userDetailsSlice.reducer;