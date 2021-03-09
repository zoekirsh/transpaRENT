import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { GoogleMap, Marker, InfoWindow, useLoadScript } from '@react-google-maps/api';
import Loading from './Loading';


const Map = () => {

  const realtorAPIKey = "1a96c214bcmshee3d6c8642e6226p1fd718jsn6cc676cb3bae"
  const realtorAPIHost = "realtor-com-real-estate.p.rapidapi.com"
  const realtorAPIURL = "https://realtor-com-real-estate.p.rapidapi.com/for-rent?city=San%20Diego&state_code=CA&limit=100&offset=0&location=92037-6941"

  //abstract city string & state code
  ////const city = "San Diego"
  ////const state = "CA"

  const [ selected, setSelected ] = useState({});
  const [ locations, setLocations ] = useState([]);
  const history = useHistory()

  const onSelect = (item) => {
    setSelected(item)
  }

  const goToShowPage = (id) => {
    history.push({
      pathname: `/viewlisting/${id}`,
      state: {
        listing: selected
      }
    })
  }

  //////get listings & mount 
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
    if (locations.length > 0) {
      //
      //console.log(locations)
      //
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
 

  ///////map tingz
  const mapStyles = {
    height: "100vh",
    width: "100%"
  }

  const photoStyles = {
    height: "300px",
    width: "75%"
  }

  // set to: Balboa Park
  const defaultCenter = {
    // Wayfarer Pastry (bird rock)
    // lat: 32.81358038304886, lng: -117.2684223435255
    lat: 32.730831, 
    lng: -117.142586
  }

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_TRANSPARENT_GOOGLE_KEY
  })

  //console.log(process.env.REACT_APP_TRANSPARENT_GOOGLE_KEY)

  if(loadError) return "load error"
  if(!isLoaded) return "loading..."

  if (locations.length === 0) {
    <Loading />
  }

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
            position={{
              lat: selected.location.address.coordinate.lat,
              lng: selected.location.address.coordinate.lon
            }}
            clickable={true}
            onCloseClick={() => setSelected({})}
            >
              <div>
                <h5>{selected.description.name}</h5>
                {
                  selected.description.beds_min === selected.description.beds_max
                  ? <p>{selected.description.beds_min} bed</p>
                  : <p>{selected.description.beds_min === 0 ? ("studio") : (selected.description.beds_min)} - {selected.description.beds_max} bed</p>
                }

                {
                  selected.description.baths_min === selected.description.baths_max
                  ? <p>{selected.description.baths_min} bath</p>
                  : <p>{selected.description.baths_min} - {selected.description.baths_max} bath</p>
                }

                {
                  selected.list_price_min === selected.list_price_max 
                  ? <p>${selected.list_price_max}</p>
                  : <p>${selected.list_price_min}- ${selected.list_price_max}</p>
                }
                
                <img src={selected.primary_photo.href} alt="property primary" style={photoStyles} onClick={() => goToShowPage(selected.property_id)}></img>
              </div>
              </InfoWindow>
          )
      }
    </GoogleMap>
  )
}

export default Map