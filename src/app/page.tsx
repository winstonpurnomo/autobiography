import * as motion from "motion/react-client";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Home() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  return (
    <motion.div animate="animate" initial="initial" variants={staggerContainer}>
      <header>
        <motion.h1 className="font-bold text-6xl" variants={fadeInUp}>
          Hello, I'm Winston
        </motion.h1>
        <motion.h3 className="font-thin" variants={fadeInUp}>
          I'm a software engineer based in the San Francisco Bay Area. I
          currently work at Meta on the{" "}
          <a href="https://business.whatsapp.com/products/ads-that-click-to-whatsapp">
            Click-to-WhatsApp Ads Adoption Team
          </a>
          . I'm also an ex-YC founder.
        </motion.h3>
      </header>
      <motion.div className="flex gap-4" variants={fadeInUp}>
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
        <Link href="https://github.com/winstonpurnomo">
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
    </motion.div>
  );
}
