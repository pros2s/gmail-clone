import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMessageContent } from "../../types/message";
import { fetchMessageContent } from "./ActionCreators";


interface MessageContentState {
  content: IMessageContent | null,
  isLoading: boolean,
  isError: string
}

const initialState: MessageContentState = {
  content: null,
  isLoading: false,
  isError: ''
};

export const messageInfoSlice = createSlice({
  name: 'messageBody',
  initialState,
  reducers: {},
  extraReducers: {
    [ fetchMessageContent.pending.type ]: (state) => {
      state.isLoading = true;
      state.content = null;
    },
    [ fetchMessageContent.fulfilled.type ]: (state, { payload }: PayloadAction<IMessageContent>) => {
      state.content = payload;
      state.isLoading = false;
      state.isError = '';
    },
    [ fetchMessageContent.rejected.type ]: (state, { payload }: PayloadAction<string>) => {
      state.isLoading = false;
      state.isError = payload;
      state.content = null;
    }
  }
});


export default messageInfoSlice.reducer;
