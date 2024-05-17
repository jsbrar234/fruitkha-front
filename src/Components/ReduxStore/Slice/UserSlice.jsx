import { createSlice } from '@reduxjs/toolkit'


const UserSlice = createSlice({
    name : "cart",
    initialState : "",
    reducers : {
        addData(state,action){
            return action.payload;
        },
    }
}) 

export default UserSlice.reducer;

export const { addData } = UserSlice.actions;


