import { IoTicketOutline } from "react-icons/io5";
import FormDrawer from "./FormDrawer";
import { useState } from "react";
import TicketNewForm from "./TicketNewForm";

interface AddTicketProps {
  setApiErr: React.Dispatch<React.SetStateAction<string | null>> 
}

const AddTicket:React.FC<AddTicketProps> = ({ setApiErr}) => {
  const [showForm, setShowForm] = useState<boolean>(false);

  const handleDisplayForm = () => {
    setShowForm(!showForm);
  };

  return (
    <>
      <div onClick={handleDisplayForm} className="cursor-pointer border-solid border-4 border-green-500 text-green-500 py-3 pe-6 ps-4 inline-block rounded-xl proper font-semibold hover:bg-green-500 hover:border-green-500 hover:text-white transition-all duration-500 ease-out text-xs flex gap-2 items-center">
        <IoTicketOutline size={24}/>
        <p>Add</p>
      </div>
      <FormDrawer showForm={showForm} handleDisplayForm={handleDisplayForm}>
        <TicketNewForm showForm={showForm} setShowForm={setShowForm} setApiErr={setApiErr} />
      </FormDrawer>
    </>
  );
}

export default AddTicket
