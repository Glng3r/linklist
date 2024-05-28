'use client';
import { faArrowLeft, faChartLine} from "@fortawesome/free-solid-svg-icons";
import {faFileLines} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import LogoutButton from "../buttons/LogoutButton";
import { usePathname } from "next/navigation";

export default function AppSideBar() {
  const path = usePathname();
  console.log(path)
  return (
    <nav className="inline-flex flex-col text-center mt-8 text-gray-500 gap-2 ">
      {path === '/account' ? (
        <Link href={'/account'} className={"flex gap-4 p-2 text-blue-500"}>
          <FontAwesomeIcon fixedWidth={true} icon={faFileLines} className={"w-6 h-6"} />
          <span className="">My Page</span>
        </Link>
      ) : (
        <Link href={'/account'} className={"flex gap-4 p-2"}>
          <FontAwesomeIcon fixedWidth={true} icon={faFileLines} className={"w-6 h-6"} />
          <span className="">My Page</span>
        </Link>
      )}
      {path === '/analytics' ? (
        <Link href={'/analytics'} className="flex gap-4 p-2 text-blue-500">
          <FontAwesomeIcon fixedWidth={true} icon={faChartLine} className={"w-6 h-6"} />
          <span className="">Analytics</span>
        </Link>
      ) : (
        <Link href={'/analytics'} className="flex gap-4 p-2">
          <FontAwesomeIcon fixedWidth={true} icon={faChartLine} className={"w-6 h-6"} />
          <span className="">Analytics</span>
        </Link>
      )}
      <LogoutButton
        iconLeft={true}
        className={"flex gap-4 items-center text-gray-500 p-2"}
        iconClasses={'w-6 h-6'}
      />
      <Link href={'/'} className="flex items-center gap-2 text-xs text-gray-500 border-t pt-4">
        <FontAwesomeIcon icon={faArrowLeft} fixedWidth={true} className={"w-3 h-3"} />
        <span>Back to website</span>
      </Link>
    </nav>
  )
}