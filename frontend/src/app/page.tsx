import Profile from "@/components/ui/Profile";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { checkApiHealth } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function Home() {
  const apiHealth = await checkApiHealth();

  return (
    <main className="flex min-h-screen flex-col">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="flex flex-1 flex-col items-center justify-center gap-4">
        <Profile initials="EV" />
        <span className="text-xl">The Perfect Boilerplate</span>
        <div className="flex flex-col items-center gap-1">
          <span className="text-sm text-zinc-800 dark:text-zinc-400">
            /api/v1 status:{" "}
            <span
              className={
                apiHealth.status === "online"
                  ? "text-green-600 dark:text-green-400"
                  : apiHealth.status === "offline"
                    ? "text-red-600 dark:text-red-400"
                    : "text-yellow-600 dark:text-yellow-400"
              }
            >
              {apiHealth.status}
              {apiHealth.statusCode && ` (${apiHealth.statusCode})`}
            </span>
          </span>
          {apiHealth.message && (
            <span className="text-xs text-zinc-600 dark:text-zinc-500">
              {apiHealth.message}
            </span>
          )}
        </div>
      </div>
    </main>
  );
}
