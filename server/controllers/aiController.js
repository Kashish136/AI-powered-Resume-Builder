

// controller for enhancing a resume's professional summary 
//POST:/api/ai/enhance-pro-sum

import Resume from "../models/Resume.js";
import ai from "../configs/ai.js" ;





// export const enhanceProfessionalSummary = async(req, res) => {
//     try {
//         const { userContent } = req.body;
        
//         if (!userContent) {
//             return res.status(400).json({ message: 'Missing required fields' })
//         }

//         console.log('Calling Gemini API...');

//         // Changed from /models/${...} to just /${...}
//         const response = await ai.post(
//             `/${process.env.OPENAI_MODEL}:generateContent`,
//             {
//                 contents: [{
//                     parts: [{
//                         text: `You are an expert in resume writing. Enhance this professional summary to be 3-4 sentences, highlighting key skills, experience, and career objectives. Make it compelling and ATS-friendly. Only return the enhanced text.\n\nOriginal: ${userContent}`
//                     }]
//                 }]
//             }
//         );

//         console.log('Gemini responded successfully!');

//         const enhancedContent = response.data.candidates[0].content.parts[0].text;
//         return res.status(200).json({ enhancedContent })

//     } catch(error) {
//         console.error('=== ERROR DETAILS ===');
//         console.error('Error Message:', error.message);
//         console.error('Status:', error.response?.status);
//         console.error('Data:', error.response?.data);
//         console.error('Full URL:', error.config?.baseURL + error.config?.url);
        
//         return res.status(500).json({ 
//             message: error.response?.data?.error?.message || error.message
//         })
//     }
// }



export const enhanceProfessionalSummary = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    console.log("Calling Gemini API...");

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
You are an expert in resume writing.
Enhance the following professional summary to 3–4 sentences.
Highlight key skills, experience, and career objectives.
Make it ATS-friendly.
Return ONLY the enhanced text.

Original:
${userContent}
      `,
    });

    console.log("Gemini responded successfully!");

    const enhancedContent = response.text;

    return res.status(200).json({ enhancedContent });

  } catch (error) {
    console.error("=== ERROR DETAILS ===");
    console.error(error);

    return res.status(500).json({
      message: error.message || "AI generation failed",
    });
  }
};


// controller for enhancing a resume's job description
//POST:/api/ai/enhance-job-desc

// export const enhanceJobDescription = async(req,res)=>{

// try{
//     const{userContent} = req.body;
//     if(!userContent){

//         return res.status(400).json({message:'Missing required fields'})
//     }

//    const response =  await ai.chat.completions.create({
//         model:process.env.OPENAI_MODEL,
//         messages:[

//           {role:"system" , content:"You are an expert in resume writing. Your task is to enhance the job description of  a resume.The job description should be 3-4 sentences also highlighting key responsibilities and achievements . Use action verbs and quantifiable results where possible .Make it ATS-friendly. and only return text no options or anything else."},
//           {

//             role:"user",
//             content: userContent ,


//           },

//         ]

    
//     })

//     const enhancedContent = response.choices[0].message.content;
//     return res.status(200).json({enhancedContent})

// } catch(error){
   
//     return res.status(400).json({message:error.message})

// }

// }


// controller for enhancing a resume's job description
// POST: /api/ai/enhance-job-desc

export const enhanceJobDescription = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    console.log("Calling Gemini API for job description enhancement...");

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
You are an expert in resume writing.
Enhance the following job description to 3–4 sentences.
Highlight key responsibilities, achievements, and measurable results.
Use strong action verbs and make it ATS-friendly.
Return ONLY the enhanced text.

Original:
${userContent}
      `,
    });

    console.log("Gemini responded successfully!");

    const enhancedContent = response.text;

    return res.status(200).json({ enhancedContent });

  } catch (error) {
    console.error("=== ERROR DETAILS ===");
    console.error(error);

    return res.status(500).json({
      message: error.message || "AI generation failed",
    });
  }
};







// controller for uploading a resume to the database
//POST: /api/ai/upload-resume


// export const uploadResume = async(req,res)=>{


//     try{
//         const {resumeText , title} = req.body;
//         const userId = req.userId;

//         if(!resumeText){

//             return res.status(400).json({message:'Missing required fields'})
//         }


    

//     const systemPrompt = "You are an expert AI agent to extract data from resume"
//     const userPrompt = `extract data from this resume: ${resumeText} 
//     Provide data in the following JSON format with no additional text before or after: 
//     {
//     professional_summary: {
//     type: String,
//     default: ""
//     },
//   skills: [{
//     type: String
//     }],
//   personal_info: {
//     image: {
//       type: String,
//       default: ""
//     },
//     full_name: {
//       type: String,
//       default: ""
//     },
//     profession: {
//       type: String,
//       default: ""
//     },
//     email: {
//       type: String,
//       default: ""
//     },
//     phone: {
//       type: String,
//       default: ""
//     },
//     location: {
//       type: String,
//       default: ""
//     },
//     linkedin: {
//       type: String,
//       default: ""
//     },
//     website: {
//       type: String,
//       default: ""
//     }
//   }, 
  
//   experience : [

//   {

//     company : {type:String},
//     position : {type:String},
//     start_date : {type:String},
//     end_date : {type : String},
//     description : {type:String},
//     is_current : {type : Boolean},
//   }
//   ],

//   project : [
//     {
    
//         name : {type : String},
//         type : {type:String},
//         description : {type:String},
//     }
//   ],

//   education : [{
//     institution: {type : String},
//     degree:{type:String},
//     field:{type:String},
//     graduation_date: {type:String},
//     gpa:{type:String},


//   }
//   ],
     
//     }`
    


//    const response =  await ai.chat.completions.create({
//         model:process.env.OPENAI_MODEL,
//         messages:[

//           {role:"system" , content: systemPrompt},
//           {  role:"user",
//             content: userPrompt ,
//         },

//         ],
//         response_format: {type: 'json_object'}
//     })

//     const extractedData = response.choices[0].message.content;
//     const parsedData = JSON.parse(extractedData)
//     const newResume = await Resume.create({userId , title , ...parsedData})

//     return res.json({resumeId: newResume._id})

// } catch(error){

//     return res.status(400).json({message: error.message})


// }
// }

















































// controller for uploading and extracting data from a resume
// POST: /api/ai/upload-resume

export const uploadResume = async (req, res) => {
  try {
    const { resumeText, title } = req.body;
    const userId = req.userId;

    if (!resumeText) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    console.log("Calling Gemini API to extract resume data...");

    const systemPrompt = "You are an expert AI agent to extract structured data from resumes.";

    const userPrompt = `
Extract data from the following resume:
${resumeText}

Return the extracted data in the following JSON format with no additional text before or after:

{
  "professional_summary": "",
  "skills": [],
  "personal_info": {
    "image": "",
    "full_name": "",
    "profession": "",
    "email": "",
    "phone": "",
    "location": "",
    "linkedin": "",
    "website": ""
  },
  "experience": [
    {
      "company": "",
      "position": "",
      "start_date": "",
      "end_date": "",
      "description": "",
      "is_current": false
    }
  ],
  "project": [
    {
      "name": "",
      "type": "",
      "description": ""
    }
  ],
  "education": [
    {
      "institution": "",
      "degree": "",
      "field": "",
      "graduation_date": "",
      "gpa": ""
    }
  ]
}
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `${systemPrompt}\n${userPrompt}`,
    });

    const extractedText = response.text;

    // Parse the JSON returned by the AI
    const parsedData = JSON.parse(extractedText);

    // Save to database
    const newResume = await Resume.create({
      userId,
      title,
      ...parsedData,
    });

    console.log("Resume extracted and saved successfully:", newResume._id);

    return res.status(200).json({ resumeId: newResume._id });
  } catch (error) {
    console.error("=== ERROR ===");
    console.error(error);

    return res.status(500).json({ message: error.message || "AI extraction failed" });
  }
};
