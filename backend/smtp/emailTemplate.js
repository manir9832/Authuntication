const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Email Verification</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">

  <div style="max-width: 500px; margin: auto; background: #ffffff; padding: 30px; border-radius: 10px; text-align: center;">

    <h2 style="color: #333;">Verify Your Email</h2>

    <p>Thank you for signing up.</p>

    <p>Please use the verification code below to verify your email address.</p>

    <h1 style="background: #007bff; color: white; padding: 15px; border-radius: 8px; letter-spacing: 5px;">
      {otp}
    </h1>

    <p>This verification code will expire in <b>5 minutes</b>.</p>

    <p>If you didn't create this account, you can safely ignore this email.</p>

  </div>

</body>
</html>
`;

const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Reset Your Password</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">

  <div style="max-width: 500px; margin: auto; background: #ffffff; padding: 30px; border-radius: 10px; text-align: center;">

    <h2 style="color: #333;">Reset Your Password</h2>

    <p>We received a request to reset your password.</p>

    <p>Click the button below to create a new password.</p>

    <a href="{resetURL}"
       style="display:inline-block;
              padding:12px 25px;
              background:#007bff;
              color:#ffffff;
              text-decoration:none;
              border-radius:6px;
              font-size:16px;">
      Reset Password
    </a>

    <p style="margin-top:20px;">
      This link will expire in <b>24 hours</b>.
    </p>

    <p>
      If you did not request a password reset, you can safely ignore this email.
    </p>

  </div>

</body>
</html>
`

const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Password Reset Successful</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">

  <div style="max-width: 500px; margin: auto; background: #ffffff; padding: 30px; border-radius: 10px; text-align: center;">

    <h2 style="color: #28a745;">Password Reset Successful</h2>

    <p>Hello,</p>

    <p>Your password has been changed successfully.</p>

    <p>If you made this change, no further action is required.</p>

    <p>If you did <b>not</b> reset your password, please contact our support immediately.</p>

    <p style="margin-top:20px;">
      Thank you,<br>
      <b>SkyR Team</b>
    </p>

  </div>

</body>
</html>
`

module.exports = {
  VERIFICATION_EMAIL_TEMPLATE,PASSWORD_RESET_REQUEST_TEMPLATE,PASSWORD_RESET_SUCCESS_TEMPLATE}
