import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface SelectedMessagesState {
  messagesId: string[]
};

const initialState: SelectedMessagesState = {
  messagesId: []
};

const selectedMessagesSlice = createSlice({
  name: 'selected',
  initialState,
  reducers: {
    addChoosed(state, { payload }: PayloadAction<string>) {
      state.messagesId = [ ...state.messagesId, payload ];
    },
    removeById(state, { payload }: PayloadAction<string>) {
      state.messagesId = state.messagesId.filter((id) => id !== payload);
    },
    clearSelected(state) {
      state.messagesId = []
    }
  }
});

export const { addChoosed, removeById, clearSelected } = selectedMessagesSlice.actions;


export default selectedMessagesSlice.reducer;
