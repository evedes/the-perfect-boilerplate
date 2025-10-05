import { Avatar, AvatarImage, AvatarFallback } from "../avatar";

export default function Profile({ initials }: { initials: string }) {
  return (
    <Avatar className="size-16 border border-zinc-700 dark:border-zinc-700">
      <AvatarImage src="/author.png" alt="Author of The Perfect Boilerplate" />
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  );
}
