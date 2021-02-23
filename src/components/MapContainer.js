import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';


const MapContainer = () => {

  //state hook
  const [ selected, setSelected ] = useState({});

  const onSelect = (item) => {
    setSelected(item)
  }

  //replace this with AoH from realtor API
  const locations = [
    {
      name: "Wayfarer",
      location: {
        lat: 32.81376072133202, 
        lng: -117.26850817421087
      }
    },
    {
      name: "Windansea",
      location: {
        lat: 32.83193694233163, 
        lng: -117.28322813707157
      }
    }
  ]

  const mapStyles = {
    height: "100vh",
    width: "100%"
  }

  const defaultCenter = {
    lat: 32.81358038304886, lng: -117.2684223435255
  }

  return (
    <LoadScript
      googleMapsApiKey = "AIzaSyBwC_cTZpgGmCvwPJ8d91Pw-Gv44YeP-RA">
        <GoogleMap 
        mapContainerStyle={mapStyles}
        zoom={13}
        center={defaultCenter}>
          {
            locations.map(place => {
              return (
                <Marker key={place.name} 
                position={place.location}
                onClick={() => onSelect(place)}/>
              )
          })
          }
          {
            selected.location && (
              <InfoWindow
              position={selected.location}
              clickable={true}
              onCloseClick={() => setSelected({})}
              >
                <p>{selected.name}</p>
                </InfoWindow>
            )
          }
        </GoogleMap>
    </LoadScript>
  )
}

export default MapContainer