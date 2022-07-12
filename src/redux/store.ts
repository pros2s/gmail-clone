import { configureStore } from '@reduxjs/toolkit';
import messagesReducer from './slices/messages';
import messageInfoReducer from './slices/messageBody';
import messageItemReducer from './slices/message';
import chosenMessagesReducer from './slices/chosenMessages';
import customFoldersReducer from './slices/customFolders';


export const store = configureStore({
  reducer: {
    messagesReducer,
    messageInfoReducer,
    messageItemReducer,
    chosenMessagesReducer,
    customFoldersReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
