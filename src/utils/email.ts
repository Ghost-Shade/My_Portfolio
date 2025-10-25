import emailjs from '@emailjs/browser';
import { ContactForm } from '../types';

const PUBLIC_KEY = 'YOUR_PUBLIC_KEY'; //EmailJS public key
const SERVICE_ID = 'YOUR_SERVICE_ID'; // EmailJS service ID
const TEMPLATE_ID = 'YOUR_TEMPLATE_ID'; // EmailJS template ID

export const sendEmail = async (formData: ContactForm): Promise<boolean> => {
  try {
    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
      },
      PUBLIC_KEY
    );
    
    return response.status === 200;
  } catch (error) {
    console.error('Failed to send email:', error);
    return false;
  }
};

export const initEmailJS = () => {
  emailjs.init(PUBLIC_KEY);
};