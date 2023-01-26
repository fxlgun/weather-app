import "./App.css";
import { MapContainer, TileLayer, Marker, Popup, Pane } from "react-leaflet";
import { useEffect, useState } from "react";
import { indianCities } from "./cityData";
import axios from 'axios';

function App() {
  const [data, setData] = useState([])

  useEffect(() => {

    const getReq = async () => {
      await axios.get("https://weather-42t16aeub-fxlgun.vercel.app/weather").then((response) => {
      setData(response.data);
    })
      
    }
     getReq();
     console.log(data);
  }, [])
  



  
  return (
    
    <div style={{textAlign:"center", justifyContent:"center"}}><h1>My Weather App</h1>
      
      <MapContainer
        center={{ lat: 23.0225, lng: 72.571428 }}
        zoom={4}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {data?.map((e) => (
          <Marker position={{ lat: e['coord']['lat'], lng: e['coord']["lon"] }}>
            <Popup>{e["name"]}
            <br></br>
            Temperature: {e["main"]["temp"]}
            <br></br>
            Weather: {e["weather"][0]["main"]}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
    </div>
  );
}

export default App;
