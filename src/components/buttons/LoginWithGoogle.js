//handles login with google
'use client';
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signIn} from "next-auth/react";
export default function LoginWithGoogle() {
  return (
      <button
        onClick={() => signIn('google')}
        className="bg-white shadow text-center 
        w-full items-center py-4 flex gap-3 justify-center">
        <FontAwesomeIcon icon={faGoogle} className="h-6" />
        <span>
          Sign in with Google
        </span>
      </button>
  );
}