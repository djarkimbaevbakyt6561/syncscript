import Image from "next/image";
import LogoImage from "../assets/logo.png";
import Link from "next/link";
import {ArrowRight, Sparkles, Users, Wand2} from "lucide-react";

export const HomePage = () => {
  return (
    <main className="min-h-screen">
      <div className="h-screen relative isolate overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-40 left-1/2 h-128 w-lg -translate-x-1/2 rounded-full bg-secondary-gold/15 blur-3xl" />
          <div className="absolute -bottom-40 right-1/2 h-112 w-md translate-x-1/2 rounded-full bg-primary-gold/10 blur-3xl" />
        </div>

        <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-6">
          <div className="flex items-center gap-2">
            <Image src={LogoImage} alt="SyncScript Logo" className="size-12" />
            <div className="leading-tight">
              <div className="text-sm font-semibold">SyncScript</div>
              <div className="text-xs text-muted-foreground">
                Notion-like editor + AI
              </div>
            </div>
          </div>

          <Link
            href="/editor?exampleId=1"
            className="inline-flex items-center gap-2 rounded-md bg-secondary-gold px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Let’s start
            <ArrowRight className="size-4" />
          </Link>
        </header>

        <section className="mx-auto w-full max-w-6xl px-4 pb-14 pt-10 md:pb-20 md:pt-16">
          <div className="max-w-2xl">
            <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-6xl">
              Write, collaborate, and ship ideas faster.
            </h1>
            <p className="mt-5 text-pretty text-base text-muted-foreground md:text-lg">
              A clean rich-text editor with real-time collaboration and an AI
              assistant that helps you rewrite, expand, and structure content —
              directly where you type.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/editor?exampleId=1"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-secondary-gold px-5 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Open the editor
                <ArrowRight className="size-4" />
              </Link>
              <div className="text-xs text-muted-foreground">
                Tip: share the URL to collaborate with others.
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-4 md:mt-14 md:grid-cols-3">
            <div className="rounded-lg border bg-primary p-5">
              <div className="flex items-center gap-2">
                <Users className="size-4 text-secondary-gold" />
                <div className="text-sm font-semibold">Collaboration</div>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Work together in real time with presence and threads.
              </p>
            </div>
            <div className="rounded-lg border bg-primary p-5">
              <div className="flex items-center gap-2">
                <Wand2 className="size-4 text-secondary-gold" />
                <div className="text-sm font-semibold">AI Assist</div>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Rewrite, summarize, or expand selected content with tone
                control.
              </p>
            </div>
            <div className="rounded-lg border bg-primary p-5">
              <div className="flex items-center gap-2">
                <Sparkles className="size-4 text-secondary-gold" />
                <div className="text-sm font-semibold">Structured Output</div>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Generates clean HTML fragments ready for your editor.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};
