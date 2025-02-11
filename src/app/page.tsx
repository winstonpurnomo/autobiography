import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import * as motion from "motion/react-client";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <header>
        <motion.h1
          className="text-8xl font-bold"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Hello, I'm Winston
        </motion.h1>
        <motion.h3
          className="font-thin"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        >
          I'm a software engineer based in the San Francisco Bay Area. I
          currently work at Meta on the{" "}
          <a href="https://business.whatsapp.com/products/ads-that-click-to-whatsapp">
            Click-to-WhatsApp Ads Adoption Team
          </a>
          .
        </motion.h3>
      </header>
      <motion.div
        className="flex gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 1 }}
      >
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
      </motion.div>
    </>
  );
}
