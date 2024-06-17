import { configureStore } from '@reduxjs/toolkit'
import temp from '../features/Temp'

export default configureStore({
    reducer: {
        temp
    }
})