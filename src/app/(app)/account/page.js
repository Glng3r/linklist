//account page
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import UsernameForm from "@/components/forms/UsernameForm";
import mongoose from "mongoose";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import PageSettingsForm from "@/components/forms/PageSettingsForm";
import { Page } from "@/models/Page";
import PageButtonsForm from "@/components/forms/PageButtonsForm";
import PageLinksForm from "@/components/forms/PageLinksForm";

export default async function AccountPage({ searchParams }) {

  const session = await getServerSession(authOptions);
  const desiredUsername = searchParams?.desiredUsername;
  if (!session) { // redirect if not logged in
    redirect('/');
  }
  mongoose.connect(process.env.MONGO_URI);
  const page = await Page.findOne({ owner: session?.user?.email });
  if(page){
    return(
      <>
            <PageSettingsForm page={page} user={session.user}/>
            <PageButtonsForm page={page} user = {session.user}/>
            <PageLinksForm page={page} user = {session.user}/>
      </>
    )
  }
  return (
    <div>
      <UsernameForm desiredUsername={desiredUsername} />
    </div>
  )
}