import Link from "next/link";
import { BiStore } from "react-icons/bi";

export default function Logo() {
  return (
    <Link
      href={"/"}
      className="flex gap-1
     items-center"
    >
      <BiStore className="" />
      <span className="">EcommAdmin</span>
    </Link>
  );
}
