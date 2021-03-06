import React, { useEffect, useState, useCallback, useRef } from 'react';
//import { useHistory } from 'react-router-dom';
import { GoogleMap, Marker, InfoWindow, useLoadScript } from '@react-google-maps/api';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from '@reach/combobox';
import '@reach/combobox/styles.css';

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
        anchor: new window.google.maps.Point(15,15)
      }}
      onClick={() => {
        setSelected(marker)
      }}
      />
    ))
  }


  if(loadError) return "error loading map"
  if(!isLoaded) return "loading map..."

  //search bar className="address-search"

  return (
    <div>

      <Search panTo={panTo}></Search>

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
              <p>{selected.text}</p>
            </div>
          </InfoWindow>) 
        }
      </GoogleMap>
    </div>
  )
}

function Locate({ panTo }) {
  return (
  <button 
    className="locate" 
    onClick={() => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          panTo({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        }, 
        () => null
      )
    }}
  >
    <img src="/favicon.ico" alt="locate me"/>
  </button>
  )
}



function Search( { panTo } ) {
  const { 
    ready, 
    value, 
    suggestions: {status, data}, 
    setValue, 
    clearSuggestions
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 32.715736, lng: () => -117.161087 },
      radius: 100 * 1000
    }
  })

  //getGeocode, getLatLng
  return (
    <div className="address-search">
      <Combobox 
      onSelect={ async (address) => {
        setValue(address, false)
        clearSuggestions()

        try {
          const results = await getGeocode({ address })
          const { lat, lng } = await getLatLng(results[0])
          panTo({ lat, lng })
        } catch(error) {
          console.log("ERROR", error)
        }

        //console.log(address)
      }}
      >
      <ComboboxInput 
        value={value} 
        onChange={(e) => {
          setValue(e.target.value)
        }}
        disabled={!ready}
        placeholder="Enter an address"
      />
      <ComboboxPopover>
        <ComboboxList>
          {status == "OK" && 
            data.map(({ id, description }) => (
              <ComboboxOption key={id} value={description}/>
            ))
          }
        </ComboboxList>
      </ComboboxPopover>
      </Combobox>
    </div>
    


  )
}

export default ReviewMap 

