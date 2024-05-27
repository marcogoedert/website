import { footerLinks, linkClass } from "./footer.data";
import Link from "next/link";
import React from "react";
import Grid from "../../templates/Grid";

function LinkContainer({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="block">
      <span className="mb-9 text-sm">
        <div className="grid items-stretch">{children}</div>
      </span>
    </div>
  );
}

export default function Footer(): JSX.Element {
  const currentYear = new Date().getFullYear();

  const links = footerLinks.map((linkGroup, i) => (
    <LinkContainer key={`link-group-${i}`}>
      {linkGroup.map((link, j) => {
        const { href, title } = link;
        const isExternal = href.startsWith("http");
        const key = `link-group-${i}-${j}`;
        return isExternal ? (
          <a
            key={key}
            href={href}
            rel="noopener noreferrer"
            target="_blank"
            className={linkClass}
          >
            {title}
          </a>
        ) : (
          <Link key={key} href={href} className={linkClass}>
            {title}
          </Link>
        );
      })}
    </LinkContainer>
  ));

  return (
    <>
      <footer className="flex justify-center w-full h-44 mt-10 bg-transparent backdrop-blur-xl border-t-[0.0125rem]">
        <Grid>
          <div className="col-start-2 py-4 w-full h-full flex flex-col gap-6 flex-nowrap justify-evenly items-center">
            <div className="grid grid-cols-3 items-stretch w-full">{links}</div>

            <div className="flex w-full flex-wrap justify-end items-center">
              <span title="Made with love by Marco Goedert —— Brazil">
                Made with ❤️ by Marco Goedert ——{" "}
                <em className="tracking-tight">Brazil</em>
              </span>
            </div>
          </div>
        </Grid>
      </footer>
    </>
  );
}
