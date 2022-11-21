const nodeMailer = require("nodemailer");

const sender = {
  user: "princepr1828@gmail.com",
  pass: "itwbidlyparttbao",
};

const transport = nodeMailer.createTransport({
  service: "Gmail",
  auth: {
    user: sender.user,
    pass: sender.pass,
  },
});

const mailNotification = async (info) => {
  const {
    saved: { name, email, subject, message, time },
    oldOrNew,
  } = info;
  let setTime = time.split(",")
  let body = `<h1>Hey Prince 🙋‍♂️</h1>
  <h2>New message from <strong>${name}</strong></h2>
  <div style="padding:5px; border:0.5px solid green;">
  <span>Message</span>
  <h3>${message}</h3>
  </div>
  <div>
  <h3>About this user</h3> 
 <li>Name : ${name}</li>
 <li>email : ${email}</li>
 <li>Type : ${oldOrNew}</li>
 <li>Time : ${setTime[1]} </li>
 <li>Date : ${setTime[0]}</li>
 </ul>
 </div>`;

  try {
    transport.sendMail({
      from: sender.user,
      to: "princepr920@outlook.com",
      subject: subject || "no subject",
      html: body,
    });
    return { success: true, message: "Email sent successfully!" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Email not sent !" };
  }
};

module.exports = { mailNotification };
