import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface SelectedToolsState {
  tools: string[]
};

const initialState: SelectedToolsState = {
  tools: []
};

export const selectedToolsSlice = createSlice({
  name: 'selectedTools',
  initialState,
  reducers: {
    setTool(state, { payload }: PayloadAction<string>) {
      state.tools = [ ...state.tools, payload ];
    },
    removeTool(state, { payload }: PayloadAction<string>) {
      state.tools = state.tools.filter((tool) => tool !== payload);
    },
    clearTools(state) {
      state.tools = [];
    }
  }
});

export const { removeTool, setTool, clearTools } = selectedToolsSlice.actions;


export default selectedToolsSlice.reducer;
