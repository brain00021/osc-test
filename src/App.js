import { useState, useEffect } from "react";
import Header from "./components/Header";
import Banner from "./components/Banner";
import Footer from "./components/Footer";
import Producsts from "./components/Producsts";
import GlobalContext from "./context.js";
import LoadingItem from "./components/Loading";
import "./App.scss";

const shoppingList = [];

function App() {
  const [currentProductsList, setCurrentProductsList] = useState([]);
  const [shoppingCart, setShoppingCart] = useState(shoppingList);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // init setting

    // get Product
    const fetchProductsData = async () => {
      setLoading(true);
      const request = await fetch(
        "https://mock.shop/api?query={products(first:%2020){edges%20{node%20{id%20title%20description%20featuredImage%20{id%20url}%20variants(first:%203){edges%20{node%20{price%20{amount%20currencyCode}}}}}}}}"
      );
      const response = await request.json();
      const currentList = response.data.products.edges;
      if ((currentList.length > 0, currentProductsList.length < 1)) {
        setCurrentProductsList(currentList);
      }
    };

    fetchProductsData()
      .catch(console.error)
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <div className="App">
      <GlobalContext.Provider
        value={{
          shoppingCartStatus: [shoppingCart, setShoppingCart],
          loadingStatus: [loading, setLoading],
        }}
      >
        <LoadingItem message="Welcome to Shopping Website"></LoadingItem>
        <Header
          productsData={currentProductsList}
          shoppingCart={shoppingCart.current}
        ></Header>
        <Banner></Banner>
        <Producsts
          productsData={currentProductsList}
          shoppingCart={shoppingCart.current}
        ></Producsts>
        <Footer></Footer>
      </GlobalContext.Provider>
    </div>
  );
}

export default App;
