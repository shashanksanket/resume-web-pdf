import React from 'react';

const Extras = ({ additional }) => {
  return (
    <div className=''>
      <p className='text-2xl'>Additional</p>
      <div className='border-t-2 border-black'>
        {Object.keys(additional).map((key) => (
          <p key={key}>
            <span className='font-bold'>{key}: </span>
            <span>{additional[key].join(', ')}</span>
          </p>
        ))}
      </div>
    </div>
  );
};
export default Extras;
