import Profile from "@/components/ui/Profile";

export const dynamic = "force-dynamic";

export default async function Home() {
  const response = await fetch(process.env.API_URL!);

  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex flex-1 flex-col items-center justify-center gap-4">
        <Profile />
        <span className="text-xl">The Perfect Boilerplate</span>
        <span className="text-sm text-zinc-300">
          /api/v1 status: {response.status}
        </span>
      </div>
    </main>
  );
}
