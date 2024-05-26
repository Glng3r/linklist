'use server';
import mongoose from "mongoose";
import {Page} from "@/models/Page";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route"

export async function savePageSettings(formData) {
  mongoose.connect(process.env.MONGO_URI);
  const session = await getServerSession(authOptions);
  if (session) {
    const dataKeys = ['displayName', 'location', 'bio', 'bgType', 'bgColor', 'bgImage'];
    const dataToUpdate = {};

    for(const key of dataKeys){
      if(formData.has(key)){
        dataToUpdate[key] = formData.get(key);
      }
    }
    await Page.updateOne(
      { owner: session?.user?.email },
      dataToUpdate,
    );
    return true;
  }
  return false;
}