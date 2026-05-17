const pdfParse = require("pdf-parse")
const {generateInterviewReport, generateResumePdf} = require("../services/ai.service")
const InterviewReportModel = require("../models/interviewReport.model")


/**
 * @description generate new interview report on the basis of user self description, resume pdf and job description.
 */
async function generaterInterviewReportController(req,res){
    
    const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()
    const {selfDescription, jobDescription} = req.body

    const interviewReportByAi = await generateInterviewReport({
        resume: resumeContent.text,
        selfDescription,
        jobDescription
    })

    const interviewReport = await InterviewReportModel.create({
        user: req.user.id,
        resume: resumeContent.text,
        selfDescription,
        jobDescription,
        ...interviewReportByAi       //destructuring fully
    })

    res.status(201).json({
        message:"Interview Report generated successfully",
        interviewReport
    })

}

/**
 * @description controller to get interview report by interview id.
 */
async function getInterviewReportByIdController(req,res){

    const {interviewId} = req.params

    const interviewReport = await InterviewReportModel.findOne({
        _id: interviewId,
        user: req.user.id
    })

    if(!interviewReport){
        return res.status(404).json({
            message: "Interview report not found"
        })
    }

    res.status(200).json({
        message: "Interview report fetched successfully",
        interviewReport
    })
}

/**
 * @description controller to get all interview reports of logged in user.
 */
async function getAllInterviewReportController(req,res){
    const interviewReports = await InterviewReportModel.find({user: req.user.id}).sort({createdAt: -1}).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")  //exclude certain fields from response

    res.status(200).json({
        message: "Interview reports fetched successfully",
        interviewReports
    })
}

/**
 * @description controller to generate resume pdf on the basis of user self description, resume pdf and job description.
 */
async function generateResumePdfController(req,res){

    const {interviewReportId} = req.params
    
    const interviewReport = await InterviewReportModel.findById(interviewReportId)

    if(!interviewReport){
        return res.status(404).json({
            message: "Interview report not found"
        })
    }

    const {resume, jobDescription, selfDescription} = interviewReport

    const pdfBuffer = await generateResumePdf({resume, jobDescription, selfDescription})

    res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`
    })

    res.send(pdfBuffer)
}


module.exports = {
    generaterInterviewReportController,
    getInterviewReportByIdController,
    getAllInterviewReportController,
    generateResumePdfController
}