import React from "react";
import { createPortal } from "react-dom";
import { AiOutlineClose } from "react-icons/ai";

const Modal = ({ onClose, isOpen, children }) => {
  return createPortal(
    <>
      {isOpen && (
        <div className=" grid place-items-center backdrop-blur h-screen w-screen  top-0 z-40 absolute">
          <div className=" m-auto min-h-[200px] max-w-[80%] bg-white p-4 z-50 relative">
            <div className="flex justify-end">
              <AiOutlineClose
                onClick={onClose}
                className=" self-end text-2xl cursor-pointer"
              />
            </div>

            {children}
          </div>
        </div>
      )}
    </>,
    document.getElementById("modal-root")
  );
};

export default Modal;
