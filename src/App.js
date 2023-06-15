import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeView from './Views/HomeView';
import { FibreProductsProvider } from './React_Context_API/FibreProductsContext';
import ProductDetailsView from './Views/ProductDetailsView/ProductDetailsView';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FibreProductsProvider> <HomeView /> </FibreProductsProvider>}>
          {/* <Route path="/:selectedProviders?/:price?/:speed" element={<ProductsView />} /> */}
        </Route>
        <Route path="/productDetails/:promoCodeForProduct/:id_For_Product" element={<ProductDetailsView />}></Route>
      </Routes>
    </Router>
  );

  
}

export default App;
