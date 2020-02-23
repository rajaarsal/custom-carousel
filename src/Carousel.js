import React from "react";

const Carousel = ({ hits }) => {
  console.log(hits);
  return (
    <div className="carouselContainer">
      <h1>Carousel</h1>
      <div className="carouselWrapper">
        <div className="carouselSlides">
          {hits &&
            hits.map(item => {
              if (item.userImageURL !== "") {
                return (
                  <div className="carouselSlides_item" key={item.id}>
                    <div className="carouselSlides_item--image">
                      <img src={item.userImageURL} alt={item.tags} />
                    </div>
                    <p className="carouselSlides_item--title">{item.tags}</p>
                  </div>
                );
              }
              return null;
            })}
        </div>
        <button className="actionButton prev">Prev</button>
        <button className="actionButton next">Next</button>
      </div>
    </div>
  );
};

export default Carousel;
