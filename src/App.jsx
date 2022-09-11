import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Header from './components/Header'

// import RandomNumber from './pages/RandomNumber'
import RandomNames from './pages/RandomNames'
// import History from "./pages/History";
import WalletContextWrapper from "./utilities/WalletContext";

function App() {
  return (
    <WalletContextWrapper>

<Header />
<RandomNames />
    {/* <Router>

      <Routes>
        <Route path="/" element={<RandomNames />} />
        <Route path="/randomNumber" element={<RandomNumber />}/>   
        <Route path="/history" element={<History />} />
      </Routes>
    </Router> */}
    
    </WalletContextWrapper>
  );
}

export default App;
// 