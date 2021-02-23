import './App.css';
import MapContainer from './components/MapContainer';

function App() {
  return (
    <div className="App">
      <header></header>
      <body>
        <div>
          <h1>transpa<span className="blue">rent</span></h1>
          <MapContainer />
        </div>
      </body>
    </div>
  );
}

export default App;
