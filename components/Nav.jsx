import Link from "next/link";
import { BiStore } from "react-icons/bi";
import { AiOutlineHome, AiOutlineUnorderedList } from "react-icons/ai";
import { BiCog, BiLogOut } from "react-icons/bi";
import { BsViewList } from "react-icons/bs";
import { VscPackage } from "react-icons/vsc";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";

export default function Nav() {
  const inactiveLink = "flex gap-1 items-center p-1 rounded-sm";
  const activeLink = `${inactiveLink} bg-slate-200 text-stone-800 bg-gradient-to-r from-cyan-500 to-teal-500 active:bg-teal-800`;

  //Active link
  const router = useRouter();
  const { pathname } = router;

  const logOut = async function () {
    await router.push("/");
    await signOut();
  };

  return (
    <aside className="text-stone-500 p-4">
      <Link href={"/"} className="flex gap-1 mb-4 mr-4 items-center">
        <BiStore className="" />
        <span className="">EcommAdmin</span>
      </Link>
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
