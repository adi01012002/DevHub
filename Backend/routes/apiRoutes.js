const express=require("express");
const router=express.Router();
const  { GoogleGenAI }=require("@google/genai");
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

router.post("/prompt",async (req,res)=>{
    // const {prompt}=req.body;
    console.log(prompt)
    try {
        const result=await ai.models.generateContent({
            model:"gemini-2.0-flash",
            contents:prompt,
        })
        const response=result.text
        res.json({response});
    } catch (error) {
        res.status(500).json({error:"Something went wrong !"})
        
    }

})

// router.post("/prompt", async (req, res) => {
//     const { prompt } = req.body;
  
//     try {
//       const result = await ai.models.generateContent({
//         model: "gemini-2.0-flash",
//         contents: prompt,
//       });
  
//       // const response = result.res.text();
//       const response =  result.text;
//       res.json({ response });
//     } catch (err) {
//       console.error("Gemini error:", err);
//       res.status(500).json({ error: "Something went wrong!" });
//     }
//   });

module.exports=router