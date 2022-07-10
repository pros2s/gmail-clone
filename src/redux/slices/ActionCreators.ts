import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { IMessage, IMessageContent } from '../../types/message';


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

export const fetchApiMessageById = createAsyncThunk(
  'messageInfo/fetchInfo',
  async (id: string | undefined, thunkAPI) => {
    try {
      const responce = await axios.get<IMessage>(`https://jsonplaceholder.typicode.com/users/${ id }`);
      return responce.data;
    }
    catch(e) {
      return thunkAPI.rejectWithValue(`Error with fetch message(id: ${ id }`);
    };
  }
);

export const fetchMessageContent = createAsyncThunk(
  'messageBody/fetchBody',
  async (id: string | undefined, thunkAPI) => {
    try {
      const responce = await axios.get<IMessageContent>(`https://jsonplaceholder.typicode.com/posts/${ id }`);
      return responce.data;
    }
    catch(e) {
      return thunkAPI.rejectWithValue(`Error with fetch message(id: ${ id }) Content`);
    };
  }
);

export const randomDate = (firstDate?: string, secondDate?: string) => {
  const getRandomArbitrary = (min: number, max: number) => Math.random() * (max - min) + min;

  let theFirstDate: string | number = firstDate || '01-01-1970';
  let theSecondDate: string | number = secondDate || new Date().toLocaleDateString();

  theFirstDate = new Date(theFirstDate).getTime();
  theSecondDate = new Date(theSecondDate).getTime();

  if( theFirstDate > theSecondDate){
    return new Date(getRandomArbitrary(theSecondDate, theFirstDate)).toLocaleDateString();
  }

  return new Date(getRandomArbitrary(theFirstDate, theSecondDate)).toLocaleDateString();
};
