import React, { useEffect, useState, useCallback } from 'react';
//import { useHistory } from 'react-router-dom';
import { GoogleMap, Marker, InfoWindow, useLoadScript } from '@react-google-maps/api';

const libraries = ['places']
const reviewURL = "http://localhost:3000/reviews"

const mapStyles = {
  height: "100vh",
  width: "100%"
}

const defaultCenter = {
  lat: 32.730831, 
  lng: -117.142586
}

const options = {
  disableDefaultUI: true,
  zoomControl: true,
}

function ReviewMap() {

  const [ reviews, setReviews ] = useState([])
  const [ markers, setMarkers ] = useState([])

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_TRANSPARENT_GOOGLE_KEY,
    libraries
  })

  useEffect(() => {
    fetchReviews()
  }, [])

  const fetchReviews = () => {
    fetch(reviewURL)
    .then(res => res.json())
    .then(data => {
      setReviews(data)
      setMarkers(data)
    })
  }
  
  const populateMarkers = () => {
    return markers.map((marker) => (
      <Marker 
      key={marker.id}
      position={{
        lat: marker.lat,
        lng: marker.lng
      }}
      //icon={"/speechrectangle.png"}
      icon={{
        url: "/speechrectangle.png",
        scaledSize: new window.google.maps.Size(30, 30), 
        origin: new window.google.maps.Point(0,0), 
        anchor: new window.google.maps.Point(15,15)
      }}
      />
    ))
  }


  if(loadError) return "error loading map"
  if(!isLoaded) return "loading map..."

  //search bar className="address-search"

  return (
    <div>
      <GoogleMap
       mapContainerStyle={mapStyles}
       zoom={13}
       center={defaultCenter}
       options={options}
      >
        {populateMarkers()}
      </GoogleMap>
    </div>
  )
}

export default ReviewMap 

