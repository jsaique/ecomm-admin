import Link from "next/link";
import { BiStore } from "react-icons/bi";
import {
  AiOutlineHome,
  AiOutlineUnorderedList,
  AiOutlineClose,
} from "react-icons/ai";
import { BiCog, BiLogOut } from "react-icons/bi";
import { BsViewList } from "react-icons/bs";
import { VscPackage } from "react-icons/vsc";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import Logo from "@/components/Logo";

export default function Nav({ show, onClose }) {
  const inactiveLink = "flex gap-1 items-center p-1 rounded-sm";
  const activeLink = `${inactiveLink} bg-slate-200 text-stone-800 bg-gradient-to-r from-cyan-500 to-teal-500 active:bg-teal-800 font-semibold`;

  //Active link
  const router = useRouter();
  const { pathname } = router;

  const logOut = async function () {
    await router.push("/");
    await signOut();
  };

  return (
    <aside
      className={
        (show ? "left-0" : "-left-full") +
        " text-stone-500 p-4 fixed w-full bg-teal-500 h-full top-0 md:static md:w-auto md:bg-transparent transition-all"
      }
    >
      <div className="flex justify-between">
        <div className="mb-4 mr-4">
          <Logo />
        </div>
        <button onClick={onClose} type="button">
          <AiOutlineClose />
        </button>
      </div>
      <nav className="flex flex-col gap-2">
        <Link
          href={"/"}
          className={pathname === "/" ? activeLink : inactiveLink}
        >
          <AiOutlineHome /> Dashboard
        </Link>
        <Link
          href={"/products"}
          className={pathname.includes("/products") ? activeLink : inactiveLink}
        >
          <VscPackage /> Products
        </Link>
        <Link
          href={"/categories"}
          className={
            pathname.includes("/categories") ? activeLink : inactiveLink
          }
        >
          <AiOutlineUnorderedList /> Categories
        </Link>
        <Link
          href={"/orders"}
          className={pathname.includes("/orders") ? activeLink : inactiveLink}
        >
          <BsViewList /> Orders
        </Link>
        <Link
          href={"/settings"}
          className={pathname.includes("/settings") ? activeLink : inactiveLink}
        >
          <BiCog /> Settings
        </Link>
        <button onClick={logOut} className={inactiveLink} type="button">
          <BiLogOut /> Logout
        </button>
      </nav>
    </aside>
  );
}
