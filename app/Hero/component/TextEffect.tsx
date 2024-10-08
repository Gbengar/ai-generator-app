import { useState } from "react";
import { TypeAnimation } from "react-type-animation";

const TextEffect = () => {
  return (
    <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        "CREATOTUM",
        5000, // wait 1s before replacing "Mice" with "Hamsters"
        "AI Content Generation",
        1500,
      ]}
      speed={50}
      className="text-[2rem] md:text-[3rem] text-red-700 font-bold uppercase"
      repeat={Infinity}
    />
  );
};

export default TextEffect;
