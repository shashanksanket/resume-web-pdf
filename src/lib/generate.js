import { useEffect } from 'react';
import OpenAI from 'openai';
import { useDispatch } from 'react-redux';
import { setIsPromptOne, setIsPromptTwo } from '../store/flagSlice';

const openai = new OpenAI({
  apiKey: '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',
  dangerouslyAllowBrowser: true,
});

const useOpenAI = () => {
  const dispatch = useDispatch();
  const jsonFormat = `{
    Headers:{
        name:"",
        email:"",
        phone:"",
        links:["",""]
      }
      summary:["",""]
      Education:
        [
      {
        university:"",
        course:"",
        year:"",
        score:"",
      },{similary for othre educations}
      ]
      Experiences:[
        {
        organization:""
        role:""
        year:""
        description:["","",""......]
        location:""
      },{other experiences...}
      ],
      Projects:[
        {
        title:"",
        year:"month and year when created or worked?",
        techSTacks:"",
        descriptions:["","","",....] 
      },{other projects}
      ],
      Additional:[
        Skills:["","","",...],
        Intersets:["","","",....]
        only keep these things
      ]
      if any information is not available try not to keep it 
      blank add some fake or relevant one not like "your name 
      in name if name is not given write some random name same 
      for other fields"
      `;

  const generatePrompt = async (jobDescription, resume) => {
    const promptMessage1 = `
    You are a resume generator tool that uses keywords 
    from jobdescription provided and a old resume
    (refer it as a intro summary of a person),
    Now you have to use both of them to create a new 
    resume which contains almost 100% of the keywords from JD
    you also have liberty to include all the keywords or skills 
    mentioned in JD so that resume gets shortlisted
    This is the JD: \n\n ${jobDescription} \n\n
    old resume: \n\n ${resume} \n \n 
    Important Note: please follow the instrcutions 
    carefully you have to follow JD, Resume 
    is just for reference use keywords from jd and refer 
    the resume to make combiantions of sentences
    `;
    try {
      const resumeData = await openai.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: promptMessage1,
          },
        ],
        model: 'gpt-3.5-turbo',
      });
      const generatedResumeData = resumeData.choices[0].message.content;
      dispatch(setIsPromptOne())
      console.log(resumeData.choices[0]);
      const resumeJson = await openai.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: `${generatedResumeData} convert above resume into json format given below ${jsonFormat}`,
          },
        ],
        model: 'gpt-3.5-turbo',
      });
      dispatch(setIsPromptTwo())
      console.log(resumeJson.choices[0]);
      const generatedResume = resumeJson.choices[0].message.content;
      const parsedResume = JSON.parse(generatedResume);
      return parsedResume
    } catch (error) {
      console.error('Error generating prompt:', error);
    }
  };


  useEffect(() => {
    // You can perform any initialization or cleanup logic here if needed
    return () => {
      // Cleanup logic
    };
  }, []);

  return { generatePrompt };
};

export default useOpenAI;
