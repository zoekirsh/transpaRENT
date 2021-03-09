import React, { useState, useCallback } from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

//refactor without bootstrap?? 
//messing up my css 

function ImageCarousel( { primary, images } ) {

  console.log(primary)

  const [ index, setIndex ] = useState(0)

  const populateCarousel = useCallback(() => {
    let keyNum = 0
    return images.slice(0, 20).map(image => {
      keyNum += 1
      return (
      <Carousel.Item key={keyNum}>
        <img src={image.href} alt="property"/>
      </Carousel.Item>
      )
    })
  })

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex)
  }

  return (
    <div className="carousel">
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <img src={primary} alt="primary"/>
        </Carousel.Item>
        {populateCarousel()}
      </Carousel>
    </div>
  )
}

export default ImageCarousel