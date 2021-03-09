import React, { useState, useCallback } from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

function PureCarousel( { primary, images } ) {

  const [ index, setIndex ] = useState(0)

  const totalSlides = () => {
    images.length
  }

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

  return (
    <div className="carousel-container">
      <CarouselProvider
        naturalSlideWidth={}
        naturalSlideHeight={}
        totalSlides={21}
      >

      </CarouselProvider>
    </div>
  )
}

export default PureCarousel