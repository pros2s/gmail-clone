import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { IMessage } from '../../types/message';


export const fetchApiMessages = createAsyncThunk(
  'messages/fetchAll',
  async (_, thunkAPI) => {
    try {
      const responce = await axios.get<IMessage[]>('https://jsonplaceholder.typicode.com/users');
      return responce.data;
    }
    catch(e) {
      return thunkAPI.rejectWithValue('Error with fetch messages');
    };
  }
);
