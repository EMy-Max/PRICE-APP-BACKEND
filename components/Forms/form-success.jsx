import { CheckCircleIcon } from "lucide-react";

const FormSuccess = ({ message }) => {
    if(!message) return null;
  return (
    <div className="w-full md:4/6 flex items-center gap-x-2 text-sm rounded-md p-3 bg-emerald-500/15 text-emerald-500 ">
        <CheckCircleIcon/>
        {message}
    </div>
  );
};

export default FormSuccess;
