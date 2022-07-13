import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IMessage } from '../../types/message';
import { fetchApiMessages } from './ActionCreators';


interface MessageState {
  messages: IMessage[];
  isLoading: boolean;
  error: null | string;
};

const initialState: MessageState = {
  messages: [],
  isLoading: false,
  error: null
};

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMesage(state, { payload }: PayloadAction<IMessage>) {
      state.messages = [ ...state.messages, payload ];
    },
    purgeMessages(state) {
      state.messages = [];
    }
  },
  extraReducers: {
    [ fetchApiMessages.pending.type ]: (state) => {
      state.isLoading = true;
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

export const { addMesage, purgeMessages } = messagesSlice.actions;


export default messagesSlice.reducer;
