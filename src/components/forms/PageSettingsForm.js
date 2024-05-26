'use client';
import { faImage, faPalette, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RadioTogglers from "../formItems/radioTogglers";
import Image from "next/image";
import SubmitButton from "../buttons/SubmitButton";

export default function PageSettingsForm({ page, user }) {
  function saveBaseSettings(formData){
    console.log(formData)
  }
  return (
    <div className="-m-4">
      <form action={saveBaseSettings}>
        <div className="bg-gray-300 py-16 flex justify-center items-center">
          <RadioTogglers
            options={[
              { value: 'color', icon: faPalette, label: 'Color' },
              { value: 'image', icon: faImage, label: 'Image' },
            ]}
            onChange={() => { }}
          />

        </div>
        <div className="flex justify-center -mb-12">
          <Image
            className="rounded-full relative -top-8 border-4 border-white shadow shadow-black/50"
            src={user?.image}
            alt={'avatar'}
            width={128}
            height={128} />
        </div>
        <div className="p-4">
          <label className="input-label" htmlFor="nameIn">Display name:</label>
          <input
            type="text"
            id="nameIn"
            name="displayName"
            defaultValue={page?.displayName}
            placeholder="Display name"
          />
          <label className="input-label" htmlFor="locationIn">Location:</label>
          <input
            type="text"
            id="locationIn"
            name="location"
            defaultValue={page?.location}
            placeholder="Location"
          />
          <label className="input-label" htmlFor="bioIn">Bio:</label>
          <textarea
            name="bio"
            defaultValue={page?.bio}
            id="bioIn"
            placeholder="Your bio goes here..." />
          <div className="max-w-[200px] mx-auto">
            <SubmitButton>
              <FontAwesomeIcon icon={faSave} />
              <span>Save</span>
            </SubmitButton>
          </div>
        </div>
      </form>
    </div>
  );
}