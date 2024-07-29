import { BrowserRouter, Routes, Route } from 'react-router-dom'

//app pages and components
import Home1 from './pages/Home1';
import Navbar from './components/Navbar';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={<Home1 />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
