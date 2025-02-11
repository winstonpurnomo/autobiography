import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Linkedin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <header>
        <h1 className="text-8xl font-bold">Hello, I'm Winston</h1>
        <h3 className="font-thin">
          I'm a software engineer based in the San Francisco Bay Area. I
          currently work at Meta on the{" "}
          <a href="https://business.whatsapp.com/products/ads-that-click-to-whatsapp">
            Click-to-WhatsApp Ads Adoption Team
          </a>
          .
        </h3>
      </header>
      <div className="flex gap-4">
        <Link href="https://www.linkedin.com/in/wpurnomo/">
          <Avatar>
            <AvatarImage src="linkedin.svg" alt="LinkedIn" />
            <AvatarFallback>LinkedIn</AvatarFallback>
          </Avatar>
        </Link>
        <Link href="https://github.com/winston-purnomo">
          <Avatar>
            <AvatarImage src="github.svg" alt="GitHub" />
            <AvatarFallback>GitHub</AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </>
  );
}
