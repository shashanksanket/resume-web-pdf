import React, { useState, useEffect } from 'react';
import Tool from '../Pages/Tool';
import Resume from '../Pages/Resume';
import { useDispatch, useSelector } from 'react-redux';
import { setIndex } from '../store/flagSlice';

const Home = () => {
  const resumeData = useSelector((state) => state.resumeData);
  const isLoading = useSelector((state) => state.flag.isLoading);
  const isPromptOne = useSelector((state) => state.flag.isPromptOne);
  const isPromptTwo = useSelector((state) => state.flag.isPromptTwo);
  const index = useSelector((state) => state.flag.index);
  const [restrict, setRestrict] = useState(false);
  const flag = ['Generating', 'Extracting Resume Data', 'Parsing Job Description', 'Creating Resume', 'Resume Created', 'Formatting Resume', 'Giving it a last shot', 'ye sab aniamtion h bahot pahle hi ho chuka tha'];

  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
      const isRestricted = window.innerWidth < 1080 || window.innerHeight < 620;
      setRestrict(isRestricted);
    };

    // Initial check on mount
    handleResize();

    // Event listener for resize
    window.addEventListener('resize', handleResize);

    const timeoutId = setTimeout(() => {
      if (isLoading) {
        if (index === 3) {
          dispatch(setIndex(3));
        } else {
          dispatch(setIndex(index + 1));
        }
      } else if (isPromptOne) {
        if (index === 7) {
          dispatch(setIndex(7));
        } else {
          dispatch(setIndex(index + 1));
        }
      }
    }, 2400);

    // Clean up event listener and timeout
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, [isLoading, isPromptOne, isPromptTwo, resumeData, index]);

  return (
    <div className='bg-indigo-50 h-screen'>
      {isLoading || isPromptOne || isPromptTwo ? (
        <div className='fixed top-0 left-0 h-screen w-screen flex justify-center items-center animation-gradient'>
          <p className='text-white text-4xl font-mono transition-all duration-500'>{flag[index]}</p>
        </div>
      ) : restrict ? (
        <div className='fixed top-0 left-0 h-screen w-screen bg-indigo-500 text-white font-mono text-2xl text-center flex flex-col justify-center items-center'>
          <p className=''>
            Not allowed - Screen size must be at least 1080x620
          </p>
          <p className='mt-5'>
            Attempted to convert the generated resume to a mobile-friendly PDF, but the result wasn't satisfactory. Exploring alternative methods—stay tuned for updates.
          </p>
        </div>
      ) : (
        <div className='flex  w-full justify-around'>
          <div className='w-full flex flex-col items-center'>
            <Tool />
          </div>
          {resumeData && (
            <div className='w-full -ml-7 rounded mr-5'>
              <Resume />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
