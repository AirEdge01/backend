import React from 'react';
import { createSlice } from '@reduxjs/toolkit';
import { name } from 'ejs';

const counterSlice = createSlice({
name:'counter',
initialState:{
    allUser:[],
    counter:0
},
reducers:{
    increment:(state) =>{
        state.counter += 1

    },
    decrement:(state)=>{
        state.counter -= 1
    }
}
})

export const {increment,decrement}=counterSlice.actions
export default counterSlice.reducer;
