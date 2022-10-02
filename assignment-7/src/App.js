import Layout from './components/Layout';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TransactionListing from './pages/TransactionListing';
function App() {
  return (
    <Layout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/transactions" element={<TransactionListing />} />
        </Routes>
      </BrowserRouter>
    </Layout>
  );
}

export default App;
