import Link from "next/link";
import { BiStore } from "react-icons/bi";
import {
  AiOutlineHome,
  AiOutlineUnorder,
  AiOutlineUnorderedList,
} from "react-icons/ai";
import { BiCog } from "react-icons/bi";
import { BsViewList } from "react-icons/bs";
import { VscPackage } from "react-icons/vsc";
import { useRouter } from "next/router";

export default function Nav() {
  const inactiveLink = "flex gap-1 items-center p-1 rounded-l-lg";
  const activeLink = `${inactiveLink} bg-slate-200`;

  //Active link
  const router = useRouter();
  const { pathname } = router;

  return (
    <aside className="text-stone-800 p-4 pr-0">
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
      </nav>
    </aside>
  );
}
