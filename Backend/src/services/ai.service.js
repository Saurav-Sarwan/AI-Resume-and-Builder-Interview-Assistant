const { GoogleGenAI } = require('@google/genai');
const { z } = require("zod");
const puppeteer = require("puppeteer-core")

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job describe"),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("7 Technical questions that can be asked in the interview along with their intention and how to answer them"),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("3 Behavioral questions that can be asked in the interview along with their intention and how to answer them"),
    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z.enum([ "low", "medium", "high" ]).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
    })).describe("List of skill gaps in the candidate's profile along with their severity"),
    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan, starting from 1"),
        focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
        tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.")
    })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively "),
    title: z.string().describe("The title of the job for which the interview report is generated"),
})

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {

    const prompt = `Generate an interview report for a candidate based on the following information:
        Resume: ${resume}
        Self Description: ${selfDescription}
        Job Description: ${jobDescription}`

    
    const jsonSchema = z.toJSONSchema(interviewReportSchema);

    const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseJsonSchema: jsonSchema,
        }
    });

    // console.log(response.text);
    return JSON.parse(response.text);
    
}


async function generatePdfFromHtml(htmlContent) {
    const browser = await puppeteer.launch({
        executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    
    const pdfBuffer = await page.pdf({
            format: "A4",margin:{
                top: "0mm",
                bottom: "0mm",
                left: "0mm",
                right: "0mm"
         }
        });
    await browser.close();
    return pdfBuffer;
}  


async function generateResumePdf({ resume, selfDescription, jobDescription }) {

    const resumePdfSchema = z.object({
        html: z.string().describe("Return ONLY the inner body HTML content — no <html>, <head>, <body>, or <style> tags. Use only inline styles."),
    })

    const prompt = `Generate a detailed resume for a candidate based on the following information:
        Resume: ${resume}
        Self Description: ${selfDescription}
        Job Description: ${jobDescription}
        
        IMPORTANT INSTRUCTIONS:
        - Return ONLY the inner body HTML (no <html>, <head>, <body>, or <style> tags)
        - Use ONLY inline styles (no class-based or external CSS)
        - The resume should be tailored for the job description, highlighting relevant strengths
        - Content should sound human-written, not AI-generated
        - Keep design simple, professional, with subtle color accents
        - Must be ATS friendly — no tables, complex layouts, or graphics
        - Limit content to 1-2 pages max. Focus on quality over quantity.`

    const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseJsonSchema: z.toJSONSchema(resumePdfSchema),
        }
    });

    const jsonContent = JSON.parse(response.text);

    // Wrap AI body content in a proper A4-constrained HTML shell
    const fullHtml = `<!DOCTYPE html>
                        <html>
                        <head>
                            <meta charset="UTF-8">
                            <style>
                                @page {
                                    size: A4;
                                    margin: 0;
                                }

                                * {
                                    margin: 0;
                                    padding: 0;
                                    box-sizing: border-box;
                                }

                                body {
                                    width: 210mm;
                                    min-height: 297mm;
                                    padding: 12mm 15mm;
                                    font-family: Arial, sans-serif;
                                    font-size: 12px;
                                    line-height: 1.5;
                                    color: #222;
                                    background: #fff;
                                }
                            </style>
                        </head>
                        <body>
                            ${jsonContent.html}
                        </body>
                        </html>`

    const pdfBuffer = await generatePdfFromHtml(fullHtml);
    return pdfBuffer;
}

module.exports = { generateInterviewReport, generateResumePdf };