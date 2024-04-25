// src/components/Legs.js

import React from 'react';

const Legs = ({ currentLeg, totalLegs }) => {
  return (
    <div className="legs">
      <p>Leg {currentLeg} of {totalLegs}</p>
    </div>
  );
};

export default Legs;
