import { configureStore } from '@reduxjs/toolkit';
import { rootReducer as reducer } from './reducers';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    version: 1,
    storage
};

const persistedReducer = persistReducer(persistConfig, reducer);

const Store = configureStore({
    reducer: persistedReducer,
    devTools: true,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER
                ]
            }
        })
});

export const storeAppDispatch = Store.dispatch;
export const persistor = persistStore(Store);
export default Store;
