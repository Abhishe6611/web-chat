import jwt from 'jsonwebtoken';

export const generateToken = (userId, res) => {
    //create a token for user
    const token = jwt.sign({userId}, process.env.JWT_SECRET,{expiresIn: "7d"});

    res.cookie('token', token, {
        maxAge: 7*24*60*60*1000, //7 days
        httpOnly: true, //prevent XSS attacks: cross-site scripting
        sameSite: "strict", //prevet CSRF attacks
        secure: process.env.NODE_DEV === "development" ? false : true,
    });
    return token;
};