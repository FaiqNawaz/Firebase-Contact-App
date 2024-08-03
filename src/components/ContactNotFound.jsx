import React from "react";

const ContactNotFound = () => {
  return (
    <div className="flex items-center gap-4 justify-center h-[80vh]">
      <div>
        <img src="/notfound.png"></img>
      </div>
      <h3 className="text-white font-medium text-xl">Contact Not Found !</h3>
    </div>
  );
};

export default ContactNotFound;
