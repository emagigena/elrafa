import "./App.css";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer.js";
import NavBar from "./components/NavBar/NavBar.js";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "./components/Cart/Cart";
import CartContextProvider from "./components/Context/CartContext";
import HomeContainer from "./components/Home/HomeContainer";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import WhatsAppButton from "./components/WhatsappButton/WhatsAppButton";

function App() {
  return (
    <>
      <CartContextProvider>
        <BrowserRouter>
        <WhatsAppButton />

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
            {<Route path={"/contacto"} element={<Contact />} />}
          </Routes>
          <Footer/>
        </BrowserRouter>
      </CartContextProvider>
    </>
  );
}

export default App;
