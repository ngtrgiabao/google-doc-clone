import {createTransport} from "nodemailer"

const transporter = createTransport({
  port: 465,
  host: 'smtp.gmail.com',
  auth: {
    user: "samplemail@gmail.com",
    pass: "123456",
  },
  secure: true
});

export default transporter;