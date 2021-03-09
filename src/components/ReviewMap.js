import React, { useEffect, useState, useCallback, useRef } from 'react';
import { GoogleMap, Marker, InfoWindow, useLoadScript } from '@react-google-maps/api';
import Locate from './Locate';
import Search from './Search';

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
  const [ selected, setSelected ] = useState(null)

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

  const mapRef = useRef()

  const onMapLoad = useCallback((map) => {
    mapRef.current = map
  }, [])

  const panTo = useCallback(({lat, lng}) => {
    mapRef.current.panTo({lat, lng})
    mapRef.current.setZoom(17)
  }, [])
  
  const populateMarkers = () => {
    return markers.map((marker) => (
      <Marker 
      key={marker.id}
      position={{
        lat: marker.lat,
        lng: marker.lng
      }}
      icon={{
        url: "/speechballoon.png",
        scaledSize: new window.google.maps.Size(30, 30), 
        origin: new window.google.maps.Point(0,0), 
        anchor: new window.google.maps.Point(15,10)
      }}
      onClick={() => {
        setSelected(marker)
      }}
      />
    ))
  }

  const formatText = (blah) => {
    return `${blah.substr(0, 12)}...`
  }


  if(loadError) return "error loading map"
  if(!isLoaded) return "loading map..."

  

  return (
    <div>

      <Search panTo={panTo} setSelected={setSelected} reviews={reviews}/>

      <Locate panTo={panTo}/>

      <GoogleMap
       mapContainerStyle={mapStyles}
       zoom={13}
       center={defaultCenter}
       options={options}
       onLoad={onMapLoad}
      >
        {populateMarkers()}

        {selected &&
          (<InfoWindow
            position={{lat: selected.lat, lng: selected.lng}}
            onCloseClick={() => setSelected(null)}>
            <div>
              <h2>{selected.address}</h2>
              <p>{formatText(selected.text)}</p>
            </div>
          </InfoWindow>) 
        }
      </GoogleMap>
    </div>
  )
}

export default ReviewMap 

