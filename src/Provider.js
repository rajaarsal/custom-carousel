import React, { useState, useEffect } from "react";

const Context = React.createContext();
const Provider = props => {
  const [imageData, setImageData] = useState();

  useEffect(() => {
    const fetchImages = async () => {
      const data = await fetch(
        "https://pixabay.com/api/?key=9656065-a4094594c34f9ac14c7fc4c39&q=beautiful+landscape&image_type=photo"
      );
      const jsonData = await data.json();
      setImageData(jsonData);
    };
    fetchImages();
  }, []);

  return (
    <>
      <Context.Provider value={imageData}>{props.children}</Context.Provider>
    </>
  );
};

export { Provider, Context };
