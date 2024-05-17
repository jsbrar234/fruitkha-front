
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import UserSlice from "./Slice/UserSlice";

const persistConfig = {
    key : "root",
    version : 1,
    storage
}

const reducer = combineReducers({
    cart : UserSlice,
})

const persistedReducer = persistReducer(persistConfig, reducer);


const store = configureStore({
    reducer : persistedReducer 
});

export default store

