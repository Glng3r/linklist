import { Page } from "@/models/Page";
import { User } from "@/models/User";
import { faInstagram, faFacebook, faDiscord, faTiktok, faYoutube, faWhatsapp, faGithub, faTelegram } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faLocationDot, faMobile, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import mongoose from "mongoose";
import Image from "next/image";
import Link from "next/link";
export const buttonsIcons = {
  email:faEnvelope,
  mobile:faPhone,
  instagram:faInstagram,
  facebook:faFacebook,
  discord:faDiscord,
  tiktok:faTiktok,
  youtube:faYoutube,
  whatsapp:faWhatsapp,
  github:faGithub,
  telegram:faTelegram,
  
};

export default async function UserPage({ params }) {
  const uri = params.uri;
  mongoose.connect(process.env.MONGO_URI);
  const page = await Page.findOne({ uri });
  const user = await User.findOne({ email: page.owner });
  return (
    <div className="bg-blue-950 text-white">
      <div
        className="h-36 bg-gray-400 bg-cover bg-center"
        style={
          page.bgType === 'color'
            ? { backgroundColor: page.bgColor }
            : { backgroundImage: `url(${page.bgImage})` }
        }
      >
      </div>
      <div className="aspect-square w-36 h-36 mx-auto relative -top-16 -mb-12">
        <Image
          className="rounded-full w-full h-full object-cover"
          src={user.image}
          alt={'avatar'} width={256} height={256}
        />
      </div>
      <h2 className="text-2xl text-center mb-1">{page.displayName}</h2>
      <h3 className="text-md flex gap-2 justify-center items-center text-white/70">
        <FontAwesomeIcon className="h-4" icon={faLocationDot} />
        <span>{page.location}</span>
      </h3>
      <div className="max-w-xs mx-auto text-center my-2">
        <p>{page.bio}</p>
      </div>
      <div className="flex gap-2 justify-center pb-4 mt-4">
        {Object.keys(page.buttons).map(buttonKey => (
          <Link href={'/'} 
          className="rounded-full bg-white text-blue-950 p-2 flex items-center justify-center">
            <FontAwesomeIcon className="w-5 h-5"icon={buttonsIcons[buttonKey]} />
          </Link>
        ))}
      </div>
      <div>
        {page.links.map(link => (
          <Link href={'/'}>
            <div>
              icon
              </div>
            <div>
              <h3>{link.title}</h3>
              <p>{link.subtitle}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}