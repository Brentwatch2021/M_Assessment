import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeView from './Views/HomeView';
import { FibreProductsProvider } from './React_Context_API/FibreProductsContext';


function App() {
  return (
    <FibreProductsProvider>
    <Router>
      <Routes>
        <Route path="/" element={<HomeView />}>
          {/* <Route path="/:selectedProviders?/:price?/:speed" element={<ProductsView />} /> */}
        </Route>
      </Routes>
    </Router>
    </FibreProductsProvider>
  );

  
}

export default App;
