import { resendClient } from '../lib/resend.js';
import { WelcomeEmailTemplate } from './emailTemplates.js';
import { ENV } from '../lib/env.js';

const CLIENT_URL = ENV.CLIENT_URL || 'http://localhost:3000';  

export const sendWelcomeEmail = async (userEmail, userName) => {
    try {
        if (!resendClient) {
            throw new Error('Resend client not initialized');
        }

        console.log('Starting email send process...');
        
        const emailHtml = WelcomeEmailTemplate(userName,CLIENT_URL);
        console.log('Generated email template');

        const { data, error } = await resendClient.emails.send({
            from: 'Chat Web <onboarding@resend.dev>',
            to: [userEmail],
            subject: 'Welcome to Chat Web! 👋',
            html: emailHtml
        });

        if (error) {
            console.error('Resend API error:', error);
            throw error;
        }

        console.log('Email sent successfully:', data);
        return data;
    } catch (error) {
        console.error('Failed to send email:', error.message);
        throw error;
    }
};