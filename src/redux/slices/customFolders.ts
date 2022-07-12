import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface customFoldersState {
  customFolders: string[],
  addition: boolean,
  editing: boolean,
  editingFolderName: string
};

const initialState: customFoldersState = {
  customFolders: [],
  addition: false,
  editing: false,
  editingFolderName: ''
};

const customFoldersSlice = createSlice({
  name: 'select',
  initialState,
  reducers: {
    additionToggle(state) {
      state.addition = !state.addition;
    },
    addNewFolder(state, { payload }: PayloadAction<string>) {
      state.customFolders = [ ...state.customFolders, payload ];
    },
    removeCustomFolder(state, { payload }: PayloadAction<string>) {
      state.customFolders = state.customFolders.filter((folder) => folder !== payload);
    },
    editingToggle(state) {
      state.editing = !state.editing;
    },
    setEditingFolderName(state, { payload }: PayloadAction<string>) {
      state.editingFolderName = payload;
    },
    changeFolderName(state, { payload }: PayloadAction<string>) {
      const index = state.customFolders.indexOf(state.editingFolderName);
      const arrayCustomFolders = state.customFolders;
      arrayCustomFolders[index] = payload;
      state.customFolders = arrayCustomFolders;
    }
  }
});

export const {
  additionToggle,
  addNewFolder,
  removeCustomFolder,
  editingToggle,
  setEditingFolderName,
  changeFolderName
} = customFoldersSlice.actions;


export default customFoldersSlice.reducer;
