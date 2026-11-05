import { ThemeToggle } from "@/components/layout/theme-toggle";

export default function Home() {
  return (
    <div className="p-16">
      <h1 className="font-display text-display font-bold">
        Shawn Liu<span className="text-accent">.</span>
      </h1>
      <p className="mt-6 text-body text-muted">
        Design tokens and themes (checkpoint 2.1).
      </p>
      <ThemeToggle className="mt-6 text-small underline underline-offset-4" />
    </div>
  );
}
