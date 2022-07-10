import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import MessagesFolder from './pages/MessagesFolder';
import MessageContent from './pages/MessageContent';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/:folder' element={ <MessagesFolder /> } />
          <Route path='/:folder/:id' element={ <MessageContent /> } />
          <Route path='/' element={ <Navigate replace to='/Inbox'/> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
};


export default App;
