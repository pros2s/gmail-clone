import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface ChosenMessagesState {
  messagesId: string[]
};

const initialState: ChosenMessagesState = {
  messagesId: []
};

const chosenMessagesSlice = createSlice({
  name: 'chosen',
  initialState,
  reducers: {
    addChoosed(state, { payload }: PayloadAction<string>) {
      state.messagesId = [ ...state.messagesId, payload ];
    },
    removeById(state, { payload }: PayloadAction<string>) {
      state.messagesId = state.messagesId.filter((id) => id !== payload);
    }
  }
});

export const { addChoosed, removeById } = chosenMessagesSlice.actions;


export default chosenMessagesSlice.reducer;
