import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';

import messagesReducer from './slices/messages';
import messageInfoReducer from './slices/messageBody';
import messageItemReducer from './slices/message';
import selectedMessagesReducer from './slices/selectedMessages';

import customFoldersReducer from './slices/customFolders';
import selectedMenuReducer from './slices/selectedMenu';
import selectedToolsReducer from './slices/selectedTools';
import filteredMessagesReducer from './slices/filteredMessages';


const persistConfig = {
  key: 'root',
  version: 1,
  storage
};

const rootRducer = combineReducers({
  messagesReducer,
  messageInfoReducer,
  messageItemReducer,
  selectedMessagesReducer,
  customFoldersReducer,
  selectedMenuReducer,
  selectedToolsReducer,
  filteredMessagesReducer
});

const persistedReducer = persistReducer(persistConfig, rootRducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [ FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER ],
    },
  })
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
