const contactInfo = require("../model/schema");
const { v4: uuidv4 } = require("uuid");
const { mailNotification } = require("../service/mailer");
const currentDate = require("../service/date")
 
const contact = async (req, res) => {
  const { message, subject, email, name } = req.body; 
  const userID = uuidv4();
  const newContact = contactInfo({
    message,
    subject,
    email,
    name,
    userID,
    time: currentDate('+5.5'),
  });

  const user = await contactInfo.findOne({ email }).lean();
  const isNew = user ? "Old" : "New";
  newContact.save(async (err, saved) => {
    if (err) return console.error(err);
    const send = await mailNotification({ saved, oldOrNew: isNew });
    if (send.success) {
      const reply = {
        success: true,
        message: "Message sent successfully ✔."
      };
      return res.status(200).json(reply);
    } else {
      const reply = {
        status:500,
        success: false,
        message: "Message not sent ❌.",
      };
      return res.status(500).json(reply);
    }
  });
}


module.exports = {contact}