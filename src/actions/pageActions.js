'use server';
import mongoose from "mongoose";
import {Page} from "@/models/Page";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route"

export async function savePageSettings(formData) {
  mongoose.connect(process.env.MONGO_URI);
  const session = await getServerSession(authOptions);
  if (session) {
    const displayName = formData.get('displayName');
    const location = formData.get('location');
    const bio = formData.get('bio');
    const bgType = formData.get('bgType');
    const bgColor = formData.get('bgColor');
    await Page.updateOne(
      { owner: session?.user?.email },
      { displayName, location, bio, bgType, bgColor }
    );
    return true;
  }
  return false;
}