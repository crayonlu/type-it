"use client"; 

import { LoaderCircle } from "lucide-react";
import { Glow, GlowCapture } from "@codaworks/react-glow";

export default function Loading() {
  return (
    <GlowCapture>
      <div className="flex min-h-screen flex-col items-center justify-center bg-background">
        <Glow color="hsl(var(--primary))">
          <LoaderCircle className="
            h-12 w-12 
            animate-spin 
            text-muted-foreground
            glow:text-primary 
          " />
        </Glow>
        <p className="mt-4 text-sm text-muted-foreground">
          Loading...
        </p>
      </div>
    </GlowCapture>
  );
}