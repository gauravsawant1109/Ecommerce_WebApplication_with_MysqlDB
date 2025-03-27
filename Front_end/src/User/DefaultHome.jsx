import React from 'react'
import { Carousel } from "react-bootstrap";

import ExampleCarouselImage from '../OtherComponent/ExampleCarouselImage';
// import Products from '../Component/Products';
import UserProducts from './UserProduct';

const DefaultHome = () => {
  return (
    <>
   {/* courosel  */}
   {/* <Carousel>
      <Carousel.Item>
        <ExampleCarouselImage />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <ExampleCarouselImage  />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <ExampleCarouselImage  />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel> */}

<UserProducts/>
    </>
  )
}

export default DefaultHome