/* eslint-disable @next/next/no-img-element */
import { useSession } from "next-auth/react";

export default function HomeHeader() {
  const { data: session } = useSession();

  return (
    <div className="text-stone-800 flex justify-between">
      <h2 className="mt-0">Hello, {session?.user?.name}</h2>
      <div className="hidden sm:block">
        <div className="flex gap-1 overflow-hidden">
          <img
            src={session?.user?.image}
            alt="avatar"
            className="w-6 h-6 rounded-full"
          />
          <span className="px-2">{session?.user?.name}</span>
        </div>
      </div>
    </div>
  );
}
