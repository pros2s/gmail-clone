import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import MessagesFolder from './pages/MessagesFolder';
import MessageContent from './pages/MessageContent';
import NotFound from './pages/NotFound/NotFound';
import FooterWrapper from './wrappers/FooterWrapper';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/mailclone/:folder' element={ <MessagesFolder /> } />
          <Route path='/mailclone/:folder/:id' element={ <MessageContent /> } />
          <Route path='/' element={ <Navigate replace to='/mailclone/Inbox'/> } />
          <Route path='*' element={ <NotFound /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
};


export default FooterWrapper(App);
