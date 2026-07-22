const jwt = require('jsonwebtoken');

const generateTokenAndSetCookie = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "2h" });

    // 💡 এই লাইনটি মিসিং ছিল:
    // const isProduction = process.env.NODE_ENV === "production";

    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return token;
};

module.exports = generateTokenAndSetCookie;