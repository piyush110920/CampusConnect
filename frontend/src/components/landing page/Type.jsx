import React from "react";
import Typewriter from "typewriter-effect";

const Type = () => {
  return (
    <div className="typewriter">
      <Typewriter
        options={{
          strings: [
            "Software Developer",
            "Freelancer",
            "Open Source Contributor",
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
