"use client";

import { useSession, signOut } from "@/lib/auth-client";
import { Button } from "../ui/button";

export function UserSession() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="flex items-center gap-4">
      <div className="text-sm">
        <p className="font-medium">{session.user.name}</p>
        <p className="text-gray-600">{session.user.email}</p>
      </div>
      <Button onClick={() => signOut()} variant="outline" size="sm">
        Sign Out
      </Button>
    </div>
  );
}
