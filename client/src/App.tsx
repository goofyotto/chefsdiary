import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TableComponent from './TableComponent';


import Layout from "./Layout";
import RecipeList from "./RecipeList";
import UserProvider from "./UserProvider";
import RecipeListProvider from "./RecipeListProvider";
import RecipeProvider from "./RecipeProvider";
import RecipeRoute from "./RecipeRoute";

// function App() {

//   const [backendData, setBackendData] = useState([{}])

//   useEffect(() => {
//     fetch("/recipe/list").then(
//       response => response.json()
//     ).then(
//       data => {
//         setBackendData(data)
//       }
//     )
//   }, []
//   )
//   return (
//     <div>
//       <h1>Recipes</h1>
//       <TableComponent data={backendData} />
//     </div>
//   )
// }

function App() {
  return (
    <div>
      <UserProvider>
        <RecipeListProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<RecipeList />} />
                <Route
                  path="recipe"
                  element={
                    <RecipeProvider>
                      <RecipeRoute />
                    </RecipeProvider>
                  }
                />
                <Route path="*" element={"not found"} />
              </Route>
            </Routes>
          </BrowserRouter>
        </RecipeListProvider>
      </UserProvider>
    </div>
  );
}

function componentStyle() {
  return {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    backgroundColor: "#187bcd",
  };
}

export default App;
