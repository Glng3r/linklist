'use client';
import { faCloudArrowUp, faImage, faPalette, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RadioTogglers from "../formItems/radioTogglers";
import Image from "next/image";
import SubmitButton from "../buttons/SubmitButton";
import { savePageSettings } from "@/actions/pageActions";
import toast from "react-hot-toast";
import { useState } from "react";
import SectionBox from "../layout/SectionBox";
import { upload } from "@/libs/upload";


export default function PageSettingsForm({ page, user }) {
  const [bgType, setBgType] = useState(page.bgType);
  const [bgColor, setBgColor] = useState(page.bgColor);
  const [bgImage, setBgImage] = useState(page.bgImage);
  const [avatar, setAvatar] = useState(user?.image);
  //when user saves the page settings
  async function saveBaseSettings(formData) {
    const result = await savePageSettings(formData);
    if (result) {
      toast.success('Saved');
    }

  }
  async function handleCoverImageChange(ev) {
    await upload(ev, link => {
      setBgImage(link);
    });
  }
  async function handleAvatarImageChange(ev) {
    await upload(ev, link => {
      setAvatar(link);
    })
  }
  return (
    <div>
      <SectionBox>
        <form action={saveBaseSettings}>
          <div
            className="py-0 -m-4 min-h-[300px] flex justify-center items-center bg-cover bg-center"
            style={
              bgType === 'color'
                ? { backgroundColor: bgColor }
                : { backgroundImage: `url(${bgImage})` }
            }
          >
            <div>
              <RadioTogglers
                defaultValue={page.bgType}
                options={[
                  { value: 'color', icon: faPalette, label: 'Color' },
                  { value: 'image', icon: faImage, label: 'Image' },
                ]}
                onChange={val => setBgType(val)}
              />
              {/*Changing Background Color */}
              {bgType === 'color' && (
                <div className="bg-gray-200 shadow text-gray-700 p-2 mt-2">
                  <div className="flex gap-2 justify-center">
                    <span>Background color:</span>
                    <input
                      type="color"
                      name="bgColor"
                      onChange={ev => setBgColor(ev.target.value)}
                      defaultValue={page.bgColor} />
                  </div>
                </div>
              )}
              {/*Changing Background Image */}
              {bgType === 'image' && (
                <div className="flex justify-center">
                  <label
                    className="bg-white shadow px-4 py-2 mt-2 flex gap-2"
                  >
                    <input type="hidden" name="bgImage" value={bgImage} />
                    <input
                      type="file"
                      onChange={handleCoverImageChange}
                      className="hidden" />
                    <div className="flex gap-2 items-center cursor-pointer">
                      <FontAwesomeIcon icon={faCloudArrowUp} className="text-gray-700" />
                      <span>Change image</span>
                    </div>
                  </label>
                </div>
              )}
            </div>
          </div>
          {/*Change Page info*/}
          {/*Avatar Image */}
          <div className="flex justify-center -mb-12">
            <div className="relative -top-8 w-[128px] h-[128px]">
              <div className="overflow-hidden h-full">
                <Image
                  className="w-full h-full object-cover rounded-full border-4 border-white shadow shadow-black/50"
                  src={avatar}
                  alt={'avatar'}
                  width={128}
                  height={128}
                />
              </div>
              <label htmlFor="avatarIn"
                className="absolute bottom-0 -right-2 bg-white p-2 rounded-full shadow shadow-black/50 aspect-square flex items-center">
                <FontAwesomeIcon size={'xl'} icon={faCloudArrowUp} />
              </label>
              <input onChange={handleAvatarImageChange} id="avatarIn" type="file" className="hidden" />
              <input type="hidden" name="avatar" value={avatar} />
            </div>
          </div>
          {/*Name,location,bio */}
          <div className="pt-2">
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
      </SectionBox>
      {/* Page Background form */}

    </div>
  );
}