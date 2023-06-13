import "./App.css";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer.js";
import NavBar from "./components/NavBar/NavBar.js";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "./components/Cart/Cart";
import CartContextProvider from "./components/Context/CartContext";
import HomeContainer from "./components/Home/HomeContainer";

function App() {
  return (
    <>
      <CartContextProvider>
        <BrowserRouter>
          <NavBar />
          <Routes>
            {<Route path="/" element={<HomeContainer />} />}
            {<Route path="/Cart" element={<Cart />} />}
            {
              <Route
                path={"/CATEGORÍA/:categoriaID"}
                element={<ItemListContainer />}
              />
            }
            {
              <Route
                path={"/detalle/:detalleID"}
                element={<ItemDetailContainer />}
              />
            }
          </Routes>
        </BrowserRouter>
      </CartContextProvider>
    </>
  );
}

export default App;
