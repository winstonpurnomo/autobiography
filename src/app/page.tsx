import * as motion from "motion/react-client";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Home() {
  return (
    <>
      <header>
        <motion.h1
          animate={{ opacity: 1, y: 0 }}
          className="font-bold text-6xl"
          initial={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Hello, I'm Winston
        </motion.h1>
        <motion.h3
          animate={{ opacity: 1, y: 0 }}
          className="font-thin"
          initial={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        >
          I'm a software engineer based in the San Francisco Bay Area. I
          currently work at Meta on the{" "}
          <a href="https://business.whatsapp.com/products/ads-that-click-to-whatsapp">
            Click-to-WhatsApp Ads Adoption Team
          </a>
          . I'm also an ex-YC founder.
        </motion.h3>
      </header>
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="flex gap-4"
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 1 }}
      >
        <Link href="https://www.linkedin.com/in/wpurnomo/">
          <Avatar>
            <AvatarImage
              alt="LinkedIn"
              className="dark:invert"
              src="linkedin.svg"
            />
            <AvatarFallback>LinkedIn</AvatarFallback>
          </Avatar>
        </Link>
        <Link href="https://github.com/winston-purnomo">
          <Avatar>
            <AvatarImage
              alt="GitHub"
              className="dark:invert"
              src="github.svg"
            />
            <AvatarFallback>GitHub</AvatarFallback>
          </Avatar>
        </Link>
      </motion.div>
    </>
  );
}
