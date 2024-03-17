import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import WavingHand from "@/ui/atoms/icons/waving-hand";
import { Paragraph } from "@/ui/atoms/typography";
import { EnvelopeClosedIcon, GitHubLogoIcon, InstagramLogoIcon, LinkedInLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="grid items-stretch gap-x-4 gap-y-24 grid-cols-[1fr_minmax(auto,640px)_1fr] min-h-screen flex-col justify-between p-24">
      <div id="personal-info" className="col-start-2 flex flex-col gap-y-12">
        <section id="about-me" className="grid grid-cols-1 gap-y-4">
          <div className="flex gap-6 mb-6">
            <Avatar className="h-24 w-24 hover:scale-125 transition-transform duration-300">
              <AvatarImage
                src="https://github.com/marcogoedert.png"
                alt="Marco Goedert"
              />
              <AvatarFallback>MG</AvatarFallback>
            </Avatar>
            <div className="flex flex-col self-center">
              <span className="font-bold text-2xl">Marco Goedert</span>
              <span className="text-gray-700/70 dark:text-rose-100/50">
                Software Engineer 2 @ Dell Technologies
              </span>
            </div>
          </div>
          <div>
            <Paragraph className="font-semibold text-lg inline-flex gap-2">
              Olá! Hello!{" "}
              <Suspense fallback={<span>👋🏻</span>}>
                <WavingHand />
              </Suspense>
            </Paragraph>
            <Paragraph>
              I&apos;m a Brazil based music enthusiast and software engineer
              currently working at Dell Technologies on DevOps Test Tools team.
            </Paragraph>
            <Paragraph>
              I love improving workflows and creating great experiences for
              developers and end users. I think every developer should have
              access to great tools that make creating performant applications
              seamless, which is one of the main reasons I enjoy working with
              software engineering best practices.
            </Paragraph>
            <Paragraph>
              I am always interested in new projects, tech, and ways people
              architect software. If you would like to connect, feel free to
              reach out via the links below.
            </Paragraph>
          </div>
        </section>
        <section id="contact" className="grid grid-cols-5">
          <Link href="https://www.linkedin.com/in/marcogoedert" target="_blank">
            <Button variant="ghost">
              <LinkedInLogoIcon className="mr-2" />
              LinkedIn
            </Button>
          </Link>
          <Link href="https://github.com/marcogoedert" target="_blank">
            <Button variant="ghost">
              <GitHubLogoIcon className="mr-2" />
              GitHub
            </Button>
          </Link>
          <Link href="https://twitter.com/Marco_Goedert" target="_blank">
            <Button variant="ghost">
              <TwitterLogoIcon className="mr-2" />
              Twitter
            </Button>
          </Link>
          <Link href="https://www.instagram.com/marco.goedert" target="_blank">
            <Button variant="ghost">
              <InstagramLogoIcon className="mr-2" />
              Instagram
            </Button>
          </Link>
          <Link href="mailto:hello@marcogoedert.com" target="_blank">
            <Button variant="ghost">
              <EnvelopeClosedIcon className="mr-2" />
              E-mail
            </Button>
          </Link>
        </section>
      </div>
    </main>
  );
}
