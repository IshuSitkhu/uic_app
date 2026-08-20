<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Password Reset OTP</title>
</head>

<body>

    <h2>Password Reset Request</h2>

    <p>Hello,</p>

    <p>
        We received a request to reset your password.
    </p>

    <p>
        Your verification code is:
    </p>

    <h1>{{ $otp }}</h1>

    <p>
        This code will expire in 10 minutes.
    </p>

    <p>
        If you did not request a password reset, you can safely ignore this email.
    </p>

    <p>
        Thank you.
    </p>

</body>
</html>
