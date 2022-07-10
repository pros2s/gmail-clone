import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Inbox from './pages/Inbox';
import MessageContent from './pages/MessageContent';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/Inbox' element={ <Inbox /> } />
          <Route path='/Sent' element={ <Inbox /> } />
          <Route path='/Draft' element={ <Inbox /> } />
          <Route path='/Deleted' element={ <Inbox /> } />
          <Route path='/Spam' element={ <Inbox /> } />

          <Route path='/:folder/:id' element={ <MessageContent /> } />
          <Route path='/' element={ <Navigate replace to='/Inbox'/> } />
        </Routes>

      </BrowserRouter>
    </div>
  );
};


export default App;
