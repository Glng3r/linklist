'use client';
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
    return (
        <button
        className="flex gap-2 items-center border p-2 px-4 shadow"
            onClick={() => signOut()}>
            <span>Logout</span>
            <FontAwesomeIcon icon={faRightFromBracket} />
        </button>
    )
}