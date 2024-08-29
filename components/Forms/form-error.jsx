import { BsExclamationTriangle } from "react-icons/bs";

const FormError = ({ message }) => {
  if (!message) return null;
  return (
    <div className="w-full flex items-center gap-x-2 text-sm rounded-md p-3 bg-destructive/15 text-destructive ">
      <BsExclamationTriangle />
      {message}
    </div>
  );
};

export default FormError;
