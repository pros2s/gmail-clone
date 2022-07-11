import { configureStore } from '@reduxjs/toolkit';
import messagesReducer from './slices/messages';
import messageInfoReducer from './slices/messageBody';
import messageItemReducer from './slices/message';
import foldersReducer from './slices/folders';
import chosenMessagesReducer from './slices/chosenMessages';


export const store = configureStore({
  reducer: {
    messagesReducer,
    messageInfoReducer,
    messageItemReducer,
    foldersReducer,
    chosenMessagesReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
