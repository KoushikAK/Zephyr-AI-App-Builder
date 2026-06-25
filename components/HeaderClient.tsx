"use client";

import { Show, UserButton, SignInButton } from "@clerk/nextjs";
import { Zap, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { ThemeTogglerButton } from "./animate-ui/components/buttons/theme-toggler";
import { PricingModal } from "./PricingModal";
import { PLANS } from "@/lib/constants";
import { Plan } from "@/types";

interface HeaderClientProps {
  user: {
    credits: number;
    plan: string;
  } | null;
}

export function HeaderClient({ user }: HeaderClientProps) {
  return (
    <div className="flex items-center gap-3">
      <Show when="signed-in">
        <ThemeTogglerButton className="rounded-full bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.06] transition-colors" />

        {/* Dynamic Credit Counter with Shimmer Ring */}
        {user && (
          <PricingModal>
            <div className="relative hidden sm:flex cursor-pointer items-center gap-2.5 overflow-hidden rounded-full border border-blue-500/20 bg-gradient-to-b from-blue-500/[0.08] to-transparent px-4 py-1.5 transition-all duration-300 hover:border-blue-400/40 hover:shadow-[0_0_15px_rgba(59,130,246,0.15)] group">
              <Zap className="h-3.5 w-3.5 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-xs font-semibold bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
                {user.credits} / {PLANS[user?.plan as Plan].credits} credits
              </span>
            </div>
          </PricingModal>
        )}

        <div className="border-l border-white/10 pl-2 h-6 flex items-center">
          <UserButton 
            appearance={{
              elements: {
                avatarBox: "h-8 w-8 rounded-full border border-white/20 hover:scale-105 transition-transform"
              }
            }} 
          />
        </div>
      </Show>

      <Show when="signed-out">
        <SignInButton mode="modal">
          <Button variant="ghost" className="h-9 rounded-full px-4 text-xs font-medium text-white/60 hover:bg-white/[0.05] hover:text-white transition-all">
            Sign In
          </Button>
        </SignInButton>

        <SignInButton mode="modal">
          <Button className="group relative h-9 overflow-hidden rounded-full bg-white px-5 text-xs font-semibold text-black transition-all duration-300 hover:bg-white/90 hover:scale-[1.02] hover:shadow-[0_10px_25px_rgba(255,255,255,0.15)]">
            <span className="relative z-10 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-blue-600 fill-blue-600/20" />
              Start Building
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>
          </Button>
        </SignInButton>
      </Show>
    </div>
  );
}