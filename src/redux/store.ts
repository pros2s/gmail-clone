import { configureStore } from '@reduxjs/toolkit';
import messagesReducer from './slices/messages';
import messageInfoReducer from './slices/messageBody';
import messageItemReducer from './slices/message';
import selectFolderReducer from './slices/selectFolder';


export const store = configureStore({
  reducer: {
    messagesReducer,
    messageInfoReducer,
    messageItemReducer,
    selectFolderReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
