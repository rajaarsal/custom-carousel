import React, { useContext } from "react";
import { Context } from "./Provider";
import Carousel from "./Carousel";
import "./styles.css";

const carouselSettings = {
  slidesToShow: 6
};

export default function App() {
  const data = useContext(Context);
  return (
    <div className="App">
      <Carousel {...data} {...carouselSettings} />
    </div>
  );
}
