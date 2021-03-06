import React, { useState, useEffect, useRef } from "react";

const Carousel = ({ hits, slidesToShow }) => {
  const slidesContainer = useRef();
  const [slidesContainerWidth, setSlidesContainerWidth] = useState(100);
  const [slideItemWidth, setSlideItemWidth] = useState("auto");
  const [nextButtonDisable, setNextButtonDisable] = useState(false);
  const [prevButtonDisable, setPreButtonDisable] = useState(true);
  const [clickCount, setClickCount] = useState(0);
  const [responsiveCarousel, setResponsiveCarousel] = useState(0);

  const nextSlideHandler = () => {
    setPreButtonDisable(false);
    setClickCount(count => count + 1);
    if (responsiveCarousel <= 768) {
      if (clickCount === hits.length - 2) {
        setNextButtonDisable(true);
      }
    } else if (clickCount === hits.length - slidesToShow - 1) {
      setNextButtonDisable(true);
    }
  };

  const prevSlideHandler = () => {
    setClickCount(count => count - 1);
    setNextButtonDisable(false);
    if (clickCount === 1) {
      setPreButtonDisable(true);
    }
  };

  useEffect(() => {
    setSlidesContainerWidth(slidesContainer.current.clientWidth);
    if (responsiveCarousel > 768) {
      setSlideItemWidth(slidesContainerWidth / slidesToShow);
    } else {
      setSlideItemWidth(slidesContainerWidth);
    }
  }, [slidesContainerWidth, slidesToShow, responsiveCarousel]);

  useEffect(() => {
    const childNodes = slidesContainer.current.childNodes;
    if (responsiveCarousel <= 768) {
      childNodes.forEach(child => {
        child.style.transform = `translateX(-${clickCount * slideItemWidth}px)`;
        child.style.transition = "all 300ms";
      });
    } else {
      childNodes.forEach(child => {
        child.style.transform = `translateX(-${clickCount * slideItemWidth}px)`;
        child.style.transition = "all 300ms";
      });
    }
  }, [clickCount, slideItemWidth, responsiveCarousel]);

  useEffect(() => {
    setResponsiveCarousel(window.innerWidth);
    window.addEventListener("resize", function() {
      const childNodes = slidesContainer.current.childNodes;
      childNodes.forEach(child => {
        child.style.transform = `translateX(0px)`;
        child.style.transition = "all 300ms";
      });
      setPreButtonDisable(true);
      setNextButtonDisable(false);
      setClickCount(0);
      setResponsiveCarousel(window.innerWidth);
    });
    return () => {
      window.removeEventListener("resize", function() {});
    };
  }, [responsiveCarousel]);

  return (
    <div className="carouselContainer">
      <h1>Carousel</h1>
      <div className="carouselWrapper">
        <div className="carouselSlides" ref={slidesContainer}>
          {hits &&
            hits.map((item, index) => {
              return (
                <div
                  className={`carouselSlides_item ${
                    index === slidesToShow - 1 ? "active" : ""
                  }`}
                  key={item.id}
                  style={{ width: slideItemWidth }}
                >
                  <div className="carouselSlides_item--image">
                    <img src={item.userImageURL} alt={item.tags} />
                  </div>
                  <p className="carouselSlides_item--title">{item.tags}</p>
                </div>
              );
            })}
        </div>
        <button
          className="actionButton prev"
          onClick={prevSlideHandler}
          disabled={prevButtonDisable}
        >
          Prev
        </button>
        <button
          className="actionButton next"
          onClick={nextSlideHandler}
          disabled={nextButtonDisable}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
