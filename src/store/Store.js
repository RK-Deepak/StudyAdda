import { configureStore } from '@reduxjs/toolkit'
import React from 'react'
import rootReducer from './reducer'

export const Store=configureStore({
    reducer:rootReducer
})