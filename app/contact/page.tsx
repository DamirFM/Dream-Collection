"use client";
import React from 'react';

import SubmitBtn from '@/app/components/UI/submit-btn';
import toast from 'react-hot-toast';
// importing server action
import { sendEmail } from "@/actions/sendEmail";

export default function Contact() {
    return (
        <section
            id="contact"
            // Adjusting width for all screens, narrower for desktop
            className="mb-28 sm:mb-28 w-[min(100%, 36rem)] text-center px-4 sm:px-6 md:px-8 lg:px-10"
        >
            <h2 className='mt-10 text-xl'>Contact Us</h2>
            <p className='text-gray-700 text-center mt-2 dark:text-white'>

                <br />
                Whether it's a general inquiry, feedback, or concerns, feel free to get in touch with us. We're always ready to assist you.
                <br />
                For quick help, you can reach us directly at <a
                    className='underline'
                    href="mailto:yakupovdamir93@gmail.com">
                    yakupovdamir93@gmail.com
                </a> or use the contact form below to send us your message.
            </p>

            <form
                action={async (formData) => {
                    console.log("Running on the client");
                    console.log(formData.get('senderEmail'));
                    console.log(formData.get('message'));

                    const { data, error } = await sendEmail(formData);

                    if (error) {
                        toast.error(error);
                        return;
                    }
                    toast.success("Email sent successfully!");
                }}
                className='mt-10 flex flex-col'
            >
                <input
                    className="mt-1 block w-full px-4 py-2 border border-stone-300 rounded-md shadow-md focus:outline-none focus:ring focus:ring-opacity-50 hover:border-stone-500 transition duration-300 ease-in-out dark:bg-slate-800 dark:border-slate-600"
                    type="email"
                    name="senderEmail"
                    required
                    maxLength={500}
                    placeholder='Your email'
                />

                <textarea
                    className='h-52 my-3 px-4 py-3 rounded-lg border border-stone-300 border-black/10   dark:bg-slate-800 dark:border-slate-600'
                    name="message"
                    placeholder='Your message'
                    required
                    maxLength={500}
                />

                <SubmitBtn />
            </form>
        </section>
    )
}
