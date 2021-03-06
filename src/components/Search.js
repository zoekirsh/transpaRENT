import React from 'react';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from '@reach/combobox';
import '@reach/combobox/styles.css';


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

export default Search;