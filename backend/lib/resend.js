import { Resend } from 'resend';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Validate Resend API key
if (!process.env.RESEND_API) {
    console.error('⚠️ RESEND_API_KEY is not configured in environment variables');
    throw new Error('RESEND_API_KEY is required');
}
export const resendClient = new Resend(process.env.RESEND_API);
// Initialize Resend client

// Configure sender details with fallbacks
export const sender = {
    email: process.env.EMAIL_FROM || 'onboarding@resend.dev',
    name: process.env.EMAIL_FROM_NAME || 'Chat Web'
};


