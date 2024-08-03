import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { HiOutlineUserCircle } from "react-icons/hi";
import { IoMdTrash } from "react-icons/io";
import { RiEditCircleLine } from "react-icons/ri";
import { db } from "../config/firebase";
import crudHook from "../hooks/crudHook";
import AddAndUpdateContact from "../components/AddAndUpdateContact";
import { toast } from "react-toastify";

const ContactCard = ({ contact }) => {
  const deleteContact = async (id) => {
    try {
      await deleteDoc(doc(db, "contacts", id));
      toast.success("Contact Deleted Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const { isOpen, onOpen, onClose } = crudHook();

  return (
    <>
      <div
        onClick={onOpen}
        key={contact.id}
        className="bg-yellow flex p-2 rounded-lg justify-between items-center cursor-pointer"
      >
        <div className="flex gap-1">
          <HiOutlineUserCircle className="text-orange text-4xl" />

          <div>
            <h2 className="font-medium">{contact.Name}</h2>
            <p className="text-sm">{contact.Email}</p>
          </div>
        </div>

        <div className="text-3xl flex">
          <RiEditCircleLine onClick={onOpen} className="cursor-pointer" />
          <IoMdTrash
            onClick={() => deleteContact(contact.id)}
            className="text-orange cursor-pointer"
          />
        </div>
      </div>

      <AddAndUpdateContact
        contact={contact}
        isUpdate
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};

export default ContactCard;
