import * as motion from "motion/react-client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const experience = [
  {
    logo: "meta.svg",
    company: "Meta",
    title: "Software Engineer II",
    start: "January 2025",
    end: "present",
    description:
      "Business Messaging: Click-to-WhatsApp Ads (CTWA) Adoption Team",
  },
  {
    logo: "assembly.jpg",
    company: "Assembly",
    title: "Co-Founder",
    start: "January 2024",
    end: "December 2024",
    description:
      "Y Combinator Winter 2024 batch. AI-native customer experience management platform.",
  },
  {
    logo: "apple.svg",
    company: "Apple",
    title: "Software Engineer I",
    start: "July 2022",
    end: "January 2024",
    description: "Wireless Technologies and Ecosystems (WTE): Apple Pay Team",
  },
];

const education = [
  {
    logo: "berkeley.svg",
    school: "University of California, Berkeley",
    start: "August 2019",
    end: "May 2022",
    description: "Bachelor of Arts in Computer Science",
  },
];

export default function Portfolio() {
  return (
    <div>
      <motion.h1
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Portfolio
      </motion.h1>
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
      >
        <h2>Work Experience</h2>

        <Accordion type="multiple">
          {experience.map((exp) => (
            <AccordionItem key={exp.title} value={exp.title}>
              <AccordionTrigger>
                <div className="flex gap-2">
                  <Avatar>
                    <AvatarImage alt={exp.company} src={exp.logo} />
                    <AvatarFallback>{exp.company}</AvatarFallback>
                  </Avatar>
                  <div>
                    <strong>{exp.company}</strong> {exp.title}
                    <br />
                    {exp.start} -{" "}
                    {exp.end === "present" ? <em>present</em> : exp.end}
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>{exp.description}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
      >
        <h2>Education</h2>
        <Accordion type="multiple">
          {education.map((edu) => (
            <AccordionItem key={edu.school} value={edu.school}>
              <AccordionTrigger>
                <div className="flex gap-2">
                  <Avatar>
                    <AvatarImage alt={edu.school} src={edu.logo} />
                    <AvatarFallback>{edu.school}</AvatarFallback>
                  </Avatar>
                  <div>
                    <strong>{edu.school}</strong>
                    <br />
                    {edu.start} -{" "}
                    {edu.end === "present" ? <em>present</em> : edu.end}
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>{edu.description}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </div>
  );
}
