
import {useFormStatus} from 'react-dom'
export default function SubmitButton({children}){
  const {pending} = useFormStatus();
  return(
    <button
    type="submit"
    disabled ={pending}
    className="bg-blue-500 disabled:bg-blue-300 
    text-white disabled: text-gray-200 py-2 px-4 block w-full 
  flex gap-2 items-center justify-center"
  >
    {children}
</button>
  )
}