import React from 'react';

const Header = ({headers}) => {
  return (
    <div>
      <div className='flex flex-wrap justify-between font-bold'>
        <p className='text-2xl'>{headers?.name}</p>
        <p><i className="fa-solid fa-phone"></i> {headers.phone}</p>
      </div>
      <div className='break-words'>
        <p><i className="fa-solid fa-envelope"></i> {headers.email}</p>
        {headers.links && headers.links.length > 0 && (
          <>
            {headers.links.map((head, index) => (
              <p key={index}><a href={head}><i className="fa-solid fa-link"></i> {head}</a></p>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
