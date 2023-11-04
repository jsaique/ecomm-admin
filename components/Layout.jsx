import Nav from "@/components/Nav";
import { useSession, signIn } from "next-auth/react";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import Logo from "@/components/Logo";

export default function Layout({ children }) {
  const { data: session } = useSession();
  const [showNav, setShowNav] = useState(false);

  const onClose = () => {
    setShowNav(!showNav);
  };

  if (!session) {
    return (
      <div className="bg-gradient-to-b from-teal-500 w-screen h-screen flex items-center">
        <div className="text-center w-full">
          <button
            onClick={() => signIn("google")}
            className="bg-white py-2 px-4 rounded-lg"
          >
            Login with Google
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-gradient-to-b from-teal-500 min-h-screen">
      <div className="flex items-center md:hidden p-4">
        <button onClick={() => setShowNav(true)}>
          <GiHamburgerMenu />
        </button>
        <div className="flex grow justify-center mr-6">
          <Logo />
        </div>
      </div>
      <div className="flex">
        <Nav show={showNav} onClose={onClose} />
        <div className="flex-grow p-4">{children}</div>
      </div>
    </div>
  );
}
