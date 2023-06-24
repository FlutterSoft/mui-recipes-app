import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Comp from './components/Comp'
import AllRecipesPage from './pages/AllRecipesPage';
import RecipesToTryPage from './pages/RecipesToTryPage';
import FavouriteRecipesPage from './pages/FavouriteRecipesPage';
import FailedRecipesPage from './pages/FailedRecipesPage';
import RecipesToReattemptPage from './pages/RecipesToReattemptPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App/>}>
        <Route path="/all-recipes" element={<AllRecipesPage />}/>
        <Route path="/recipes-to-try" element={<RecipesToTryPage />}/>
        <Route path="/favourites" element={<FavouriteRecipesPage />}/>
        <Route path="/failed" element={<FailedRecipesPage />}/>
        <Route path="/recipes-to-reattempt" element={<RecipesToReattemptPage />}/>

      </Route>
    </Routes>
</BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
