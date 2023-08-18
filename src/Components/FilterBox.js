// SelectBox.js
import React from 'react';

export const FilterBox = ({ options, onChange }) => {
  return (
    <select onChange={onChange}>
      {options.map((entry, index) => (
        <option key={index} value={entry}>
          {entry}
        </option>
      ))}
    </select>
  );
};

