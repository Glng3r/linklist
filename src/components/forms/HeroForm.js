'use client';

import { signIn} from "next-auth/react";
import { redirect,useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HeroForm({ user }) {
  const router = useRouter();
  //click join, redirects to login, get sent back to homepage and useEffect runs removing localstorage so you don't get redirected again
  useEffect(() => {
    //checks if username is stored in local storage to create account and redirect
    if ('localStorage' in window
      && window.localStorage.getItem('desiredUsername')) {
      const username = window.localStorage.getItem('desiredUsername');
      window.localStorage.removeItem('desiredUsername');
      redirect(`/account?desiredUsername=${username}`);
    }
  }, [])
  //handles logic for picking username and redirect to login page
  async function handleSubmit(ev) {
    ev.preventDefault();
    const form = ev.target;
    const input = form.querySelector('input');
    const username = input.value;
    if (username.length > 0) {
      if (user) {
        router.push(`/account?desiredUsername=${username}`)
      }
      else {
        window.localStorage.setItem('desiredUsername', username);
        await signIn('google')
      }
    }
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="inline-flex items-center shadow-lg bg-white shadow-gray-700/30">
      <span className="bg-white py-4 pl-4">linklist.to/</span>
      <input
        type="text" 
        className=""
        style={{backgroundColor:'white',marginBottom:0,paddingLeft:0}} 
        placeholder="username" />
      <button
        type="submit" className="bg-blue-500 text-white py-4 px-6 whitespace-nowrap">
        Join for Free
      </button>
    </form>
  )
}