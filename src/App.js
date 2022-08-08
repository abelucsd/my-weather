import logo from './logo.svg';
import './App.css';
import Navbar from './Navbar';
import WeatherPage from './components/pages/WeatherPage';

/**
 * Add A router later for scale.
 */
function App() {
  return (
    <div className="App">
      <Navbar />
      <WeatherPage />
    </div>
  );
}

export default App;
