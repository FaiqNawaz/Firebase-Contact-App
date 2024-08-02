import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { HiOutlineUserCircle } from "react-icons/hi";
import { IoMdTrash } from "react-icons/io";
import { RiEditCircleLine } from "react-icons/ri";
import { db } from "../config/firebase";

const ContactCard = ({ contact }) => {
  const deleteContact = async (id) => {
    try {
      await deleteDoc(doc(db, "contacts", id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      key={contact.id}
      className="bg-yellow flex p-2 rounded-lg justify-between items-center"
    >
      <div className="flex gap-1">
        <HiOutlineUserCircle className="text-orange text-4xl" />

        <div>
          <h2 className="font-medium">{contact.Name}</h2>
          <p className="text-sm">{contact.Email}</p>
        </div>
      </div>

      <div className="text-3xl flex">
        <RiEditCircleLine />
        <IoMdTrash
          onClick={() => deleteContact(contact.id)}
          className="text-orange"
        />
      </div>
    </div>
  );
};

export default ContactCard;
