import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PlatformPath } from 'path';

import { IMessage } from '../../types/message';
import { fetchApiMessages } from './ActionCreatores';


interface MessageState {
  messages: IMessage[];
  messageDate: string,
  isLoading: boolean;
  error: null | string;
};

const initialState: MessageState = {
  messages: [],
  messageDate: '',
  isLoading: false,
  error: null
};

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setRandomDate(state, { payload }: PayloadAction<string>) {
      state.messageDate = payload;
    }
  },
  extraReducers: {
    [ fetchApiMessages.pending.type ]: (state) => {
      state.isLoading = true;
      state.messages = [];
    },
    [ fetchApiMessages.fulfilled.type ]: (state, { payload }: PayloadAction<IMessage[]>) => {
      state.messages = payload;
      state.isLoading = false;
      state.error = null;
    },
    [ fetchApiMessages.rejected.type ]: (state, { payload }: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = payload;
      state.messages = [];
    }
  }
});

export const { setRandomDate } = messagesSlice.actions;


export default messagesSlice.reducer;
