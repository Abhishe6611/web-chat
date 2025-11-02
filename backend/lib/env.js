import dotenv from "dotenv" ;
dotenv.config();

export const ENV = {
    CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:3000',
    RESEND_API_KEY: process.env.RESEND_API_KEY || '',   
    JWT_SECRET: process.env.JWT_SECRET ,
    EMAIL_FROM: process.env.EMAIL_FROM || 'onboarding@resend.dev',
    EMAIL_FROM_NAME: process.env.EMAIL_FROM_NAME || 'Chat Web',
    MONGO_URI: process.env.MONGO_URI,
    PORT:process.env.PORT,
    NODE_ENV:process.env.NODE_ENV
}