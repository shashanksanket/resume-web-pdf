import React, { useRef, useEffect } from 'react';
import Header from '../Components/Header';
import Education from '../Components/Education';
import Experience from '../Components/Experience';
import Projects from '../Components/Projects';
import Extras from '../Components/Extras';
import jsPDF from 'jspdf';
import { toPng } from 'html-to-image';
import { useSelector } from 'react-redux';

const Resume = () => {
  const resumeData = useSelector((state) => state.resumeData);
  const headers = resumeData?.Headers || {};
  const education = resumeData?.Education || {};
  const experience = resumeData?.Experiences || {};
  const projects = resumeData?.Projects || {};
  const additional = resumeData?.Additional || {};
  const contentRef = useRef();

  const generateImage = () => {
    const contentElement = contentRef.current;
    toPng(contentElement, { cacheBust: false })
      .then((dataUrl) => {
        console.log(dataUrl)
        convertToPdf(dataUrl)
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const convertToPdf = (imageUrl) => {
    const pdf = new jsPDF('p', 'mm', 'a4');
    pdf.addImage(imageUrl, 'PNG', 0, 0, 210, 297);
    pdf.save('Resume.pdf');
  };

  return (
    <div className=''>
      <div className='w-full items-end flex '>
      <button className='py-2 px-4 mb-2 rounded-2xl border ml-auto mr-7 mt-4 text-white font-mono bg-indigo-400 hover:bg-indigo-800' onClick={generateImage}>Download</button>
      </div>
      <div className='flex rounded-2xl shadow-md border flex-col p-8 font-serif' style={{ backgroundColor: 'white' }} id="capture" ref={contentRef}>
        {resumeData ? (
          <>
            <Header headers={headers} />
            <Education Education={education} />
            <Experience experience={experience} />
            <Projects projects={projects} />
            <Extras additional={additional} />
          </>
        ) : (
          <p>Error</p>
        )}
      </div>
    </div>
  );
};


export default Resume;
