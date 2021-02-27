import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, InfoWindow, useLoadScript } from '@react-google-maps/api';


const Map = () => {

  const realtorAPIKey = "1a96c214bcmshee3d6c8642e6226p1fd718jsn6cc676cb3bae"
  const realtorAPIHost = "realtor-com-real-estate.p.rapidapi.com"
  const realtorAPIURL = "https://realtor-com-real-estate.p.rapidapi.com/for-rent?city=San%20Diego&state_code=CA&limit=42&offset=0&location=92037-6941"

  //abstract city string & state code
  ////const city = "San Diego"
  ////const state = "CA"

  //state hooks
  const [ selected, setSelected ] = useState({});
  const [ locations, setLocations ] = useState([]);

  const onSelect = (item) => {
    setSelected(item)
  }


  //effect hook
  useEffect(() => {
    loadData()
  }, [] )

  const loadData = () => {
    fetch(realtorAPIURL, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': realtorAPIKey,
        'x-rapidapi-host' : realtorAPIHost
      }
    })
    .then(res => res.json())
    // .then(data => console.log(data.data.results))
    .then(data => setLocations(data.data.results))
  }

  const populateMap = () => {
    //console.log(locations)
    if (locations.length > 0) {
      console.log(locations)
      return locations.map(place => {
        if (place.location?.address?.coordinate?.lat && place.location?.address?.coordinate?.lon) {
          return (
            <Marker key={place.description.name} 
            position={{
              lat: place.location.address.coordinate.lat,
              lng: place.location.address.coordinate.lon  
            }}
            onClick={() => onSelect(place)}/>
          )
        }
    })}
    else {
      console.log("not ready yet.")
    }
  }
 

  const mapStyles = {
    height: "100vh",
    width: "100%"
  }

  ///// set to Balboa Park
  const defaultCenter = {
    // wayfarer pastry
    // lat: 32.81358038304886, lng: -117.2684223435255
    lat: 32.730831, lng: -117.142586
  }

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_TRANSPARENT_GOOGLE_KEY
  })

  console.log(process.env.REACT_APP_TRANSPARENT_GOOGLE_KEY)

  if(loadError) return "load error"
  if(!isLoaded) return "is loaded?"

  return (
    <GoogleMap 
      mapContainerStyle={mapStyles}
      zoom={13}
      center={defaultCenter}>
        {
          populateMap()
        }
        {
          selected.location && (
            <InfoWindow
            position={selected.location.address.coordinate}
            clickable={true}
            onCloseClick={() => setSelected({})}
            >
              <p>{selected.description.name}</p>
              </InfoWindow>
          )
      }
    </GoogleMap>
  )
}

export default Map