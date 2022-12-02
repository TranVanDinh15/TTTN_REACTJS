import { createStore } from "redux";
import rootReducer from "./redux/reducers";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
const persistConfig = {
    key: 'cartProduct',
    storage,
}
const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = createStore(persistedReducer)
const persistor = persistStore(store)
export default store
export { persistor }