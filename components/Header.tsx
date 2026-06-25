import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { checkUser } from "@/lib/checkUser";
import { HeaderClient } from "./HeaderClient";

export default async function Header() {
  // Safe backend data fetching
  const user = await checkUser();

  return (
    <header className={cn("fixed inset-x-0 top-6 z-50 flex justify-center px-4 transition-all duration-300 ease-out")}>
      <nav className="relative w-full max-w-7xl">
        <div className="absolute -inset-10 bg-gradient-to-r from-blue-600/10 via-violet-600/5 to-cyan-600/10 blur-[100px] pointer-events-none animate-pulse" />

        <div className={cn("relative flex h-[74px] items-center justify-between overflow-hidden rounded-[24px] border border-white/[0.08] px-6 backdrop-blur-xl shadow-[0_30px_100px_rgba(0,0,0,0.8),0_0_50px_rgba(59,130,246,0.05)] transition-all duration-300 ease-in-out")}>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.15),transparent_45%)]" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

          {/* LEFT SECTION */}
          <div className="flex items-center gap-8">
            <Link href="/" className="group relative flex items-center gap-3">
              <div className="leading-none hidden sm:block">
                <span className="font-sans font-bold text-base tracking-tight text-white bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/70 group-hover:to-blue-400 transition-all duration-300">
                  <Image
                    src="/logo-short2.png"
                    alt="Forge"
                    width={58}
                    height={58}
                    className="relative transition-transform duration-500 group-hover:scale-105 group-hover:rotate-2"
                  />
                </span>
                <p className="mt-0.5 text-[8px] uppercase tracking-[0.35em] text-white/30 font-medium">
                  AI APP BUILDER
                </p>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-2 rounded-full border border-emerald-500/15 bg-emerald-500/5 pl-2.5 pr-3 py-1 hover:border-emerald-500/30 hover:bg-emerald-500/10 transition-all duration-300 cursor-default">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[11px] font-medium tracking-wide text-emerald-400/90 uppercase">Engine Online</span>
            </div>
          </div>

          {/* RIGHT SECTION - Entirely delegated to Client part safely passing user details */}
          <HeaderClient user={user} />
        </div>
      </nav>
    </header>
  );
}