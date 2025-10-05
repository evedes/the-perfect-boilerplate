import Image from "next/image";

export default function Profile() {
  return (
    <Image
      src="/author.png"
      alt="Author of The Perfect Boilerplate"
      width={64}
      height={64}
      className="rounded-full border border-zinc-800"
    />
  );
}
