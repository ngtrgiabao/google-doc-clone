const userNotFound: Array<ResponseMessage> = [
  {
    message: "Your email or password is incorrect",
  },
];

const emailNotVerified: Array<ResponseMessage> = [
  {
    message: "Please verify your email",
  },
];

const resetPassword: Array<ResponseMessage> = [
  {
    message:
      "If a user with that email exists, you will receive an email with instruction to reset your password",
  },
];

export { userNotFound, emailNotVerified, resetPassword };
