import React, { useEffect, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import useOpenAI from '../lib/generate';
import { useSelector, useDispatch } from 'react-redux';
import { setResume } from '../store/resumeSlice';
import { setIsLoading, setIsPromptOne, setIsPromptTwo, setLoaded, setIndex } from '../store/flagSlice';
import uploadSvg from '../assets/upload.svg';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;

const Tool = () => {
  const resumeData = useSelector((state) => state.resumeData);
  const isLoading = useSelector((state) => state.isLoading);
  const dispatch = useDispatch();
  const { generatePrompt } = useOpenAI();
  const [resumeFile,setResumeFIle] = useState('')
  const [jobDescription, setJobDescription] = useState('');
  const [resume, setResumeString] = useState('');
  const [error, setError] = useState(null);

  const handleChange = (value) => {
    setJobDescription(value);
  };

  const readTextFromPDF = async (file) => {
    try {
      const pdf = await pdfjsLib.getDocument(await file.arrayBuffer()).promise;
      let pdfTextContent = '';

      for (let i = 0; i < pdf.numPages; i++) {
        const page = await pdf.getPage(i + 1);
        const textContent = await page.getTextContent();
        const textItems = textContent.items;
        const text = textItems.map((item) => item.str).join(' ');
        pdfTextContent += text;
      }

      return pdfTextContent;
    } catch (error) {
      console.error('Error reading text from PDF:', error);
      setError('Error reading text from PDF');
    }
  };

  const handleUpload = async (file) => {
    console.log(file)
    setResumeFIle(file[0])
    const resumeText = await readTextFromPDF(file[0]);
    setResumeString(resumeText);
  };

  const handleSubmit = async () => {
    if(jobDescription=="" || resume==""){
      alert("Please fill the basic information to continue")
      return
    }
    try {
      dispatch(setIndex(0))
      dispatch(setLoaded());
      dispatch(setIsLoading());
      const res = await generatePrompt(jobDescription, resume);
      dispatch(setResume(res));
      setTimeout(() => {
          dispatch(setLoaded());
      }, 2000);
      setError(null); // Reset error state on success
    } catch (error) {
      console.error('Error generating resume:', error);
      setError('Error generating resume');
    }
  };
    return (
        <div className='fixed w-full flex flex-col h-full items-center justify-center'>
            <div className='flex font-mono flex-col items-center'>
                <p className='text-center text-4xl'>Paste Job Description</p>
                <textarea
                    className='border-4 border-indigo-300 w-full h-[20rem] rounded-2xl my-8 py-2 px-4 overflow-auto resize-none'
                    value={jobDescription}
                    onChange={(e) => handleChange(e.target.value)}
                />
            </div>
            <div className='flex flex-col font-mono my-5 items-center'>
                <p className='text-center text-3xl'>Upload Resume</p>
                <div className=" mt-5 flex justify-between w-full">
                    <label
                        className="cursor-pointer flex w-full justify-between border-2 border-indigo-300 hover:bg-indigo-50 py-2 px-4 rounded-full"
                        htmlFor="fileInput"
                    >
                        <img src={uploadSvg} alt='uplaod' width={40} height={40} />

                        <p className='text-black rounded-2xl font-mono py-2 px-4'>
                            {resumeFile?`Uplaoded ${resumeFile.name}`:'Upload File'}
                        </p>
                    </label>
                    <input
                        id="fileInput"
                        onChange={(e) => handleUpload(e.target.files)}
                        className="hidden"
                        type="file"
                    />
                </div>
            </div>
            <div className='flex'>
                <button
                    onClick={handleSubmit}
                    className='mx-auto bg-indigo-400 hover:bg-indigo-700 text-white rounded-2xl py-2 px-4 font-mono border-2'
                >
                    {resumeData ? "Generate Again" : "Generate Resume"}
                </button>
            </div>
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
};

export default Tool;