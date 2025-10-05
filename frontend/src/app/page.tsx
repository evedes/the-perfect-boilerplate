import Profile from "@/components/ui/Profile";

export const dynamic = "force-dynamic";

export default async function Home() {
  const response = await fetch(`${process.env.API_URL!}/api/v1`);
  const { message = "", time = "" } = await response.json();

  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex flex-1 flex-col items-center justify-center gap-4">
        <Profile />
        <span className="text-2xl">The Perfect Boilerplate</span>
        <span className="text-4xl">Landing Page</span>
        <span>{message}</span>
        <span className="text-xs">request time: {time}</span>
      </div>
      <div className="flex h-24 items-center justify-center">
        <span>&copy; 2025 &bull; Eduardo &quot;Edo&quot; Vedes</span>
      </div>
    </main>
  );
}
