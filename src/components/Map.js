import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { GoogleMap, Marker, InfoWindow, useLoadScript } from '@react-google-maps/api';
import { Icon } from 'semantic-ui-react';
import MapLoading from './MapLoading';


const Map = ({ favorites, listings, user }) => {

  //abstract city string & state code
  ////const city = "San Diego"
  ////const state = "CA"

  const [ selected, setSelected ] = useState({});
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

  const populateMap = () => {
    if (listings.length > 0) {
      //
      //console.log(listings)
      //
      return listings.map(place => {
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
      return <MapLoading />
    }
  }

  const isFavorite = () => {
    if (typeof(user.user) !== "string") {
      if (favorites.find(fave => fave.property_id.toString() === selected.property_id)) {
        return <Icon name='heart'/>
      } else {
        return <Icon name='heart outline'/>
      }
    }
  } 
 

  ///////map formatting
  const mapStyles = {
    height: "100vh",
    width: "100%"
  }

  const photoStyles = {
    height: "300px",
    width: "75%"
  }

  const options = {
    disableDefaultUI: true,
    zoomControl: true, 
    scaleControl: true,
    streetViewControl: true
  }

  //set to: Old Town San Diego
  const defaultCenter = {
    lat: 32.748950, 
    lng: -117.192580
  }

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_TRANSPARENT_GOOGLE_KEY
  })

  //console.log(process.env.REACT_APP_TRANSPARENT_GOOGLE_KEY)

  if(loadError) return "load error"
  if(!isLoaded) return "loading..."

  if (listings.length === 0) {
    return <MapLoading />
  }

  return (
    <GoogleMap 
      mapContainerStyle={mapStyles}
      zoom={13}
      center={defaultCenter}
      options={options}
    >
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
                <h5>{selected.description.name} <span>{isFavorite()}</span></h5>
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