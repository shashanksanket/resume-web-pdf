import React from 'react';

const Education = ({ Education }) => {
  return (
    <div className='mt-1 overflow-x-auto !mr-0' style={{marginRight:'8px'}}>
      <p className='text-2xl'>Education</p>
      <div className='border-t-2 border-black'></div>
      <div className='flex flex-col !mr-0 min-w-100' style={{marginRight:'12px'}} >
        {Education && Education.length > 0 && (
          <>
            {Education.map((educationItem, index) => (
              <div className='flex flex-col ' key={index}>
                <div className='flex justify-between'>
                  <p className='font-bold text-lg'>•{educationItem.university}</p>
                  <p className='italic font-[100] '>{educationItem.year || '2020'}</p>
                </div>
                <div className='flex justify-between'>
                  <p className='italic font-[100] ml-2'>{educationItem.course}</p>
                  <p>{educationItem.score}</p>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Education;
