import React from 'react';
import { TypeAnimation } from 'react-type-animation';

const HighlightText = ({ text,textanimationshow }) => {
  
  const animatedtext=textanimationshow && "And Self Learning";
  return (
    <TypeAnimation
      sequence={[text,400,animatedtext]}
      speed={400}
      wrapper='span'
      style={{ textAlign: 'center', fontWeight: 'bold', color:"#118AB2"}}
      repeat={textanimationshow && Infinity}
      cursor={true}
      omitDeletionAnimation={false}
      deletionSpeed={400}
      
    />
  );
};

export default HighlightText;
