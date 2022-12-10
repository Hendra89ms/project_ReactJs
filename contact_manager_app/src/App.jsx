import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Navbar, ContactList, AddContact, ViewContact, EditContact } from './components'

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Navigate to={'/contacts/list'} />} />
        <Route path='/contacts/list' element={<ContactList />} />
        <Route path='/contacts/Add' element={<AddContact />} />
        <Route path='/contacts/edit/:contactId' element={<EditContact />} />
        <Route path='/contacts/view/:contactId' element={<ViewContact />} />
      </Routes>
    </>

  );
}
