import React from 'react';
const Experience = ({experience}) => {
  return (
    <div className=''>
      <p className='text-2xl'>Experience</p>
      <div className='border-t-2 border-black'></div>
      {experience && experience.length > 0 && (
        <div className='flex flex-col'>
          {experience.map((exp, index) => (
            <div className='flex flex-col' key={index}>
              <div className='flex flex-wrap justify-between'>
                <p className='font-bold text-lg'>•{exp.organization}</p>
                <p className='italic'>{exp.year}</p>
              </div>
              <div className='flex flex-wrap justify-between'>
                <p className='italic'>{exp.role}</p>
                <p>{exp.location}</p>
              </div>
              <div className='flex flex-col ml-1 justify-between'>
                {exp.description.map((desc, index) => (
                  <p key={index}> – {desc}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Experience;