import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "achyutneupane2004@gmail.com",
        pass: "hloa tzgb psoi imdq",
    },
});


const sendemail = async(email, subject, html)=>{
    await transporter.sendMail({
        from: 'NewsApp " <noreply@newsapp.com>',
        to: email,  
        subject: subject,
        html: html,
    });
    console.log("Email sent successfully");
}

export {sendemail}
