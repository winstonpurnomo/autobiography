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
      <h1>Portfolio</h1>
      <h2>Work Experience</h2>
      <Accordion type="multiple">
        {experience.map((experience) => (
          <AccordionItem key={experience.title} value={experience.title}>
            <AccordionTrigger>
              <div className="flex gap-2">
                <Avatar>
                  <AvatarImage src={experience.logo} alt={experience.company} />
                  <AvatarFallback>{experience.company}</AvatarFallback>
                </Avatar>
                <div>
                  <strong>{experience.company}</strong> {experience.title}
                  <br />
                  {experience.start} -{" "}
                  {experience.end === "present" ? (
                    <em>present</em>
                  ) : (
                    experience.end
                  )}
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>{experience.description}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <h2>Education</h2>
      <Accordion type="multiple">
        {education.map((education) => (
          <AccordionItem key={education.school} value={education.school}>
            <AccordionTrigger>
              <div className="flex gap-2">
                <Avatar>
                  <AvatarImage src={education.logo} alt={education.school} />
                  <AvatarFallback>{education.school}</AvatarFallback>
                </Avatar>
                <div>
                  <strong>{education.school}</strong>
                  <br />
                  {education.start} -{" "}
                  {education.end === "present" ? (
                    <em>present</em>
                  ) : (
                    education.end
                  )}
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>{education.description}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
