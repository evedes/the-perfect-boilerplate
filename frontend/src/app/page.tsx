import Profile from "@/components/ui/Profile";
import ThemeToggle from "@/components/ui/ThemeToggle";

export const dynamic = "force-dynamic";

export default async function Home() {
  const response = await fetch(process.env.API_URL!);

  return (
    <main className="flex min-h-screen flex-col">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="flex flex-1 flex-col items-center justify-center gap-4">
        <Profile initials="EV" />
        <span className="text-xl">The Perfect Boilerplate</span>
        <span className="text-sm text-zinc-800 dark:text-zinc-400">
          /api/v1 status: {response.status}
        </span>
      </div>
    </main>
  );
}
