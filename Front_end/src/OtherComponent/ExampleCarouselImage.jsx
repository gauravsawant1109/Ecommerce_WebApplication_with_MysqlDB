import React from "react";
import SampleImage from "../assets/CarouselImage.jpg"; 

const ExampleCarouselImage = ({ text }) => {
  return (
    <>
    <div style={{ position: "relative", textAlign: "center" }}>
      <img src={SampleImage} alt={text} style={{ width: "100%", height: "400px", objectFit: "cover" }} />
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", color: "white", fontWeight: "bold" }}>
        {text}
      </div>
    </div>

    
    </>
  );
};

export default ExampleCarouselImage;
