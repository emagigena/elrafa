import "./App.css";
import ItemListConteiner from "./components/ItemListConteiner/ItemListConteiner.js";
import NavBar from "./components/NavBar/NavBar.js";
import ItemDetailContainer from "./components/ItemDetailConteiner/ItemDetailContainer.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cart from "./components/Cart/Cart";
import CartContextProvider from "./components/Context/CartContext";
import Inicio from "./components/Inicio/InicioContainer";

function App() {
  return (
    <div className="App">
      {
        <CartContextProvider>
          <Router>
            <NavBar />
            <Routes>
              {<Route path="/" element={<Inicio />} />}
              {<Route path="/Cart" element={<Cart />} />}
              {
                <Route
                  path={"/categoria/:categoriaID"}
                  element={<ItemListConteiner />}
                />
              }
              {
                <Route
                  path={"/detalle/:detalleID"}
                  element={<ItemDetailContainer />}
                />
              }
            </Routes>
          </Router>
        </CartContextProvider>
      }
    </div>
  );
}

export default App;
