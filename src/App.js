import {
  Details,
  Main,
} from './pages';
import { Route, Routes } from 'react-router-dom';

import React from "react";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path=":id">
        <Route index element={<Details />} />
      </Route>
    </Routes>
  );
}

export default App;