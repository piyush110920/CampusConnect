// src/components/landing/type.jsx
import React from "react";
import Typewriter from "typewriter-effect";

const Type = () => {
  return (
    <div className="typewriter">
      <Typewriter
        options={{
          strings: [
            "Students",
            "Mess Providers",
            "Rental Services",
          ],
          autoStart: true,
          loop: true,
          deleteSpeed: 50,
        }}
      />
    </div>
  );
};

export default Type;
