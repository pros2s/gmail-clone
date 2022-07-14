import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IMessage } from '../../types/message';


interface filteredMessagesState {
  filteredMessages: IMessage[];
};

const initialState: filteredMessagesState = {
  filteredMessages: []
};

export const filteredMessagesSlice = createSlice({
  name: 'filteredMessages',
  initialState,
  reducers: {
    setFilteredMessages(state, { payload }: PayloadAction<IMessage[]>) {
      state.filteredMessages = payload;
    },
    addNewMessage(state, { payload }: PayloadAction<IMessage>) {
      state.filteredMessages = [ ...state.filteredMessages, payload ];
    }
  }
});

export const { setFilteredMessages, addNewMessage } = filteredMessagesSlice.actions;


export default filteredMessagesSlice.reducer;
