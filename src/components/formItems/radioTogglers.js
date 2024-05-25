import { faImage, faPalette } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function RadioTogglers({ options, selected, onChange }) {
  return (
    <div className="radio-togglers shadow">
      <label>
        <input type="radio" name="bgType" value="color" />
        <div>
          <FontAwesomeIcon icon={faPalette} />
          <span>Color</span>
        </div>
      </label>
      <label>
        <input type="radio" name="bgType" value="image" />
        <div>
          <FontAwesomeIcon icon={faImage} />
          <span>Image</span>
        </div>
      </label>
    </div>
  )
}