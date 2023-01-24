import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contact from "./Componenets/ContactModule/Contact";
import About from "./Componenets/Aboutus/About";
import { Loading } from 'react-loading-dot'
const App = React.lazy(() => import('./App'));

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={<Loading dots={4} background="#333333" />}>
      <Routes>
        <Route path="/"  element={<App />} />
        <Route path="/AboutUs" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
      </Routes>
      </Suspense>

    </BrowserRouter>
    {/* <App /> */}
  </React.StrictMode>,
  document.getElementById("root")
);
