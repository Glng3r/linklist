import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Chart from "@/components/Chart";
import SectionBox from "@/components/layout/SectionBox";
import { Event } from "@/models/Event";
import { Page } from "@/models/Page";
import { differenceInDays } from "date-fns";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function AnalyticsPage() {
  mongoose.connect(process.env.MONGO_URI);
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect('/');
  }
  const page = await Page.findOne({ owner: session?.user?.email });
  //counting the views of the page per day
  const groupedViews = await Event.aggregate([
    {
      $match: {
        type: 'view',
        uri: 'ginger'
      }
    },
    {
      $group: {
        _id: {
          $dateToString: {
            date: "$createdAt",
            format: "%Y-%m-%d"
          },
        },
        count: {
          "$count": {},
        }
      }
    },

  ], {$order:'-_id'});

  return (
    <div>
      <SectionBox>
        {/*Prepping and passing data to the Chart component */}
        <Chart data={groupedViews.map(o => ({
          'date': o._id,
          'views': o.count
        }))} />
      </SectionBox>
    </div>
  )
}