import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';

export async function sendMail(email, emailType, userId){
    try {
        //generate token using userID
        const salt = genSalt(10);
        const hashed_token = await bcryptjs.hash(userId.toString(), salt);

        //add token to userData
        if (emailType === 'VERIFY'){
            await User.findByIdAndUpdate(userId, 
                {verifyToken: hashed_token, verifyTokenExpiry: Date.now() + 60*60*1000})
        }
        else if(emailType ==='RESET'){
            await User.findByIdAndUpdate(userId, 
                {forgotPasswordToken: hashed_token, forgotPasswordTokenExpiry: Date.now() + 60*60*1000})
        }
        //create a transpoter to send mail
        const transporter = nodemailer.createTransport({
            host: "sandbox.api.mailtrap.io",
            port: 2525,
            auth: {
              user: process.env.MAILTRAP_USER,
              pass: process.env.MAILTRAP_PASS,
            },
          });

        const mailOptions = {
            from : 'lohit2004@gmail.com',
            to : email,
            subject : emailType=== 'VERIFY'? 'Verify your email' : 'Reset your password',
            html : `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashed_token}" >here</a> to ${emailType=== 'VERIFY'? 'Verify your email' : 'Reset your password'} </p>`
        }
        //send mail by sending mailoptions to transpoter
        const response = await transporter.sendMail(mailOptions);
        return response


    } catch (error) {
        throw new Error(error);
    }
}