'use client';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SectionBox from "../layout/SectionBox";
import { faEnvelope, faMobile, faPlus, faSave } from "@fortawesome/free-solid-svg-icons";
import { faDiscord, faFacebook, faGithub, faInstagram, faTelegram, faTiktok, faWhatsapp, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";
import SubmitButton from "../buttons/SubmitButton";
import { savePageButtons } from "@/actions/pageActions";
import toast from "react-hot-toast";
const allButtons = [
  { key: 'email', 'label': 'e-mail', icon: faEnvelope, placeholder: 'test@example.com' },
  { key: 'mobile', 'label': 'mobile', icon: faMobile, placeholder: '123-123-1234' },
  { key: 'instagram', 'label': 'instagram', icon: faInstagram, placeholder: 'https://instagram.com/...' },
  { key: 'facebook', 'label': 'facebook', icon: faFacebook },
  { key: 'discord', 'label': 'discord', icon: faDiscord },
  { key: 'tiktok', 'label': 'tiktok', icon: faTiktok },
  { key: 'youtube', 'label': 'youtube', icon: faYoutube },
  { key: 'whatsapp', 'label': 'whatsapp', icon: faWhatsapp },
  { key: 'github', 'label': 'github', icon: faGithub },
  { key: 'telegram', 'label': 'telegram', icon: faTelegram },

];
function upperFirst(str) {
  return str.slice(0, 1).toUpperCase() + str.slice(1)
}
export default function PageButtonsForm() {

  const [activeButtons, setActiveButtons] = useState([]);
  function addButtonToProfile(button) {
    setActiveButtons(prevButtons => {
      return [...prevButtons, button];
    })
  }
  async function saveButtons(formData){
    await savePageButtons(formData);
    toast.success('Settings Saved!')
  }
  const availableButtons = allButtons.filter(b1 => !activeButtons.find(b2 => b1.key === b2.key))
  return (
    <SectionBox>
      <form action={saveButtons}>
        <h2 className="text-2xl font-bold mb-4">Buttons</h2>
        {activeButtons.map(b => (
          <div className="mb-4 flex items-center">
            <div className="w-36 flex h-full text-gray-700 p-2 gap-2 items-center">
              <FontAwesomeIcon icon={b.icon} />
              <span>{upperFirst(b.label)}:</span>
            </div>
            <input
              placeholder={b.placeholder}
              name={b.key}
              type="text" style={{ marginBottom: '0' }} />
          </div>
        ))}
        <div className="flex flex-wrap gap-2 mt-4 border-y py-4">
          {availableButtons.map(b => (
            <button
              type="button"
              onClick={() => addButtonToProfile(b)}
              className="flex items-center gap-1 p-2 bg-gray-200">
              <FontAwesomeIcon icon={b.icon} />
              <span className="">
                {upperFirst(b.label)}
              </span>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          ))}
        </div>
        <div className="max-w-xs mx-auto mt-8">
          <SubmitButton>
            <FontAwesomeIcon icon={faSave} />
            <span>Save</span>
          </SubmitButton>
        </div>
      </form>
    </SectionBox>
  );
}