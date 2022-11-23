const express = require("express");
const contactRouter = express.Router();
const nodemailer = require("nodemailer");
const contactEmail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "foodswipe897@gmail.com",
      pass: "qfutscxnbltaxrvg",
    },
  });
  
  contactEmail.verify((error) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Ready to Send");
    }
  });


contactRouter.post("/contact", (req, res) => {
    alert("Mail Sent");
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message; 
    const subject = req.body.subject; 
    const phone = req.body.phone; 
    
    const mail = {
      from: name,
      to: email,
      subject: `FoodSwipe: Thank you for contacting Us`,
      html: `<p>Name: ${name}</p>
             <p>Phone: ${phone}</p>
             <p>Subject: ${subject}</p>
             <p>Message: ${message}</p>`,
    };
    contactEmail.sendMail(mail, (error) => {
      if (error) {
        res.json({ status: "ERROR" });
      } else {
        res.json({ status: "Mail Sent" });
      }
    });
  });
module.exports = contactRouter; 