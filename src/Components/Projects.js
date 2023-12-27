import React from 'react';

const Projects = ({projects}) => {
  
  return (
    <div className=''>
    <p className='text-2xl'>Personal Projects </p>
    <div className='border-t-2 border-black'></div>
    {projects && projects.length>0 && (
    <div className='flex flex-col'>
    {projects.map((proj, index) => (
        <div className='flex flex-col ' key={index}>
          <div className='flex justify-between'>
            <p className='font-bold text-lg'> – {proj.title}</p>
            <p>{proj.year}</p>
          </div>
          <div className='flex justify-between'>
            <p className='italic ml-4'>Techstack: {proj.techstacks}</p>
          </div>
          { proj.descriptions && proj.descriptions.length>0 && (
          <div className='flex flex-col ml-5 justify-between'>
            {proj.descriptions.map((desc,index) =>(
              <p key={index}> ∗ {desc}</p>
            ))}
          </div>
          )}
        </div>
      ))}
    </div>
    )}
  </div>
  );
};

export default Projects;