import { copy } from "@/content/copy";
import { PrimaryButton } from "@/components/ui/Primitives";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 text-center">
      <span className="mb-6 inline-block rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-medium text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
        {copy.hero.badge}
      </span>
      <h1 className="text-4xl font-semibold leading-tight tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-50">
        {copy.hero.title}
      </h1>
      <p className="mt-6 max-w-md text-lg text-zinc-600 dark:text-zinc-400">
        {copy.hero.subtitle}
      </p>
      <div className="mt-10">
        <PrimaryButton href="/report">{copy.hero.cta}</PrimaryButton>
      </div>
    </main>
  );
}
