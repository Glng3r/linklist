import { faImage, faPalette } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RadioTogglers from "../formItems/radioTogglers";

export default function PageSettingsForm({ page }) {
  return (
    <div className="-m-4">
      <form>
        <div className="bg-gray-300 h-32 flex justify-center items-center">
          <RadioTogglers selected="color" options={[]} onChange={() => {}} />

        </div> 
        <div>avatar</div>
      </form>
    </div>
  );
}