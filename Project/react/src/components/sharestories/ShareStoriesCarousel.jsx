import React from "react";
import { Carousel, Image } from "react-bootstrap";

function ShareStoryCarousel() {
  return (
    <div className="container">
      <Carousel controls={false} indicators={false}>
        <Carousel.Item>
          <Image
            className="share-story-carousel-image"
            src="https://rumbappve.com/assets/images/banners/banner3.jpg"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <Image
            className="share-story-carousel-image"
            src="https://rumbappve.com/assets/images/banners/banner6.jpg"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <Image
            className="share-story-carousel-image"
            src="https://rumbappve.com/assets/images/banners/lagars.png"
            alt="Third slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <Image
            className="share-story-carousel-image"
            src="https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Fourth slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <Image
            className="share-story-carousel-image"
            src="https://images.pexels.com/photos/1649691/pexels-photo-1649691.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Fifth slide"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default ShareStoryCarousel;
