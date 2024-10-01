import { X } from "lucide-react";

const Error = ({ errrMessage, onClick }) => {
  return (
    <div className="max-w-full p-6 m-5 bg-dark-gray rounded-lg relative text-center">
      <h1 className="text-white text-lg font-semibold">{errrMessage}</h1>
      {onClick && (
        <X
          className="cursor-pointer m-2 absolute top-0 right-0 "
          onClick={onClick}
          size={15}
          color="white"
        />
      )}
    </div>
  );
};

export default Error;
