import Link from "next/link";
import { ThemeToggle } from "../../components/ui/theme-toggle";

export function Masthead(): JSX.Element {
  return (
    <header className="absolute top-0 backdrop-blur-[8px] w-full z-50 transition-colors duration-500 border-b border-primary/50 h-16">
      <div className="grid items-stretch gap-x-4 gap-y-24 grid-cols-[1fr_minmax(auto,640px)_1fr] h-full">
        <div className="col-start-2 flex gap-1 justify-between items-center flex-nowrap">
          <Link
            prefetch={false}
            href="#"
            className="flex items-center gap-4"
            // onClick={() => {
            //   window.scrollTo(0, 0);
            // }}
          >
            <div className="w-9 h-9 object-contain bg-logo bg-cover" />
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
