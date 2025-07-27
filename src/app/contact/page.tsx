"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod/v4";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { sendEmail } from "@/lib/send-email";

const contactFormSchema = z.object({
  name: z.string().min(5, "Please enter your full name"),
  email: z.email({ message: "Please enter a valid email" }),
  message: z.string().min(10, "Your message must be at least 10 characters"),
});

type FormData = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const form = useForm<FormData>({
    resolver: zodResolver(contactFormSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(data: FormData) {
    try {
      await sendEmail({
        to: "winstonpurnomo+formdata@gmail.com",
        subject: "Contact form submission",
        body: `Received a new contact form submission on winstonpurnomo.com,
        
        Name: ${data.name}
        Email: ${data.email}

        Message:
        ${data.message}
        `,
      });

      form.reset();
      toast.success("Message sent successfully!");
    } catch {
      toast.error("There was an unexpected error. Please try again later.");
    }
  }

  return (
    <>
      <motion.h1
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Contact
      </motion.h1>
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
                    </FormControl>
                    {form.formState.errors.name && (
                      <FormMessage>This field is required</FormMessage>
                    )}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Your email" {...field} />
                    </FormControl>
                    {form.formState.errors.email && (
                      <FormMessage>This field is required</FormMessage>
                    )}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Your message" {...field} />
                    </FormControl>
                    {form.formState.errors.message && (
                      <FormMessage>This field is required</FormMessage>
                    )}
                  </FormItem>
                )}
              />

              <Button
                className="w-xfull"
                disabled={!form.formState.isValid}
                type="submit"
              >
                Send
              </Button>
            </div>
          </form>
        </Form>
      </motion.div>
    </>
  );
}
