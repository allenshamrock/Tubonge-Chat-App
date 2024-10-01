import { X } from "lucide-react";
import { PulseLoader } from "react-spinners";

export default function Modal({ open, disabled, onClose, children }) {
  return (
    <div
      onClick={() => {
        if (!disabled && onClose) {
          onClose();
        }
      }}
      className={`fixed inset-0 flex justify-center items-center transition-colors z-10 ${
        open ? "visible bg-black/60" : "invisible"
      }`}
    >
      <div
        onClick={(e) => {
          e.stopPropagation(); // Prevents this event from bubbling up to the <div>
        }}
        className={`mx-2 px-10 relative flex flex-col bg-dark-gray rounded-xl shadow transition-all ${
          open ? "scale-100 opacity-100" : "scale-125 opacity-0"
        }`}
      >
        <div className="flex justify-end">
          {
            <X
              className="cursor-pointer my-3 mr-3"
              onClick={onClick}
              color="white"
            />
          }
        </div>
        <div className="pb-6 px-6 max-h-full flex-1">
            {children}
            {disabled &&(
                <div className="w-full h-full inset-0 flex justify-center items-center absolute bg-black/50 ">
                    <PulseLoader size={15} color="white"/>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
