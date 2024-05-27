interface ILink {
  title: string;
  href: string;
}

export const mainLinks: ILink[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Genres",
    href: "/genres",
  },
  {
    title: "About",
    href: "/about",
  },
];

export const socialLinks: ILink[] = [
  {
    title: "Twitter",
    href: "https://twitter.com/metalhead_robot",
  },
];

export const internalLinks: ILink[] = [
  {
    title: "To-do",
    href: "/todo",
  },
];

export const developerLinks: ILink[] = [
  {
    title: "Contact",
    href: "/contact",
  },
  {
    title: "Portfolio",
    href: "https://marcogoedert.com/",
  },
  {
    title: "Buy me a coffee",
    href: "https://www.buymeacoffee.com/marcogoedert",
  },
];

export const mainMenuLinks: ILink[] = [...mainLinks, ...socialLinks];

export const footerLinks: ILink[][] = [
  mainLinks,
  [...internalLinks, ...socialLinks],
  developerLinks,
];

export const linkClass: string =
  "font-medium leading-8 transition-all duration-300 ease-in-out";
