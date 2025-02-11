import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Experience() {
  return (
    <Accordion type="multiple" className="max-w-md mx-auto">
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <div>
            <strong>Meta</strong> Software Engineer II
            <br />
            January 2025 - <em>present</em>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          Business Messaging: Click-to-WhatsApp Ads (CTWA) Adoption Team
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>
          <div>
            <strong>Assembly</strong> Co-Founder
            <br />
            January 2024 - December 2024
          </div>
        </AccordionTrigger>
        <AccordionContent>
          Y Combinator Winter 2024 batch. AI-native customer experience
          management platform.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>
          <div>
            <strong>Apple</strong> Software Engineer I
            <br />
            July 2022 - January 2024
          </div>
        </AccordionTrigger>
        <AccordionContent>
          Wireless Technologies and Ecosystems (WTE): Apple Pay Team
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
