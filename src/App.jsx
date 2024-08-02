import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { FiSearch } from "react-icons/fi";
import { AiFillPlusCircle } from "react-icons/ai";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./config/firebase";
import ContactCard from "./components/ContactCard";
import AddAndUpdateContact from "./components/AddAndUpdateContact";

const App = () => {
  const [conatcts, setContacts] = useState([]);

  const [isOpen, setOpen] = useState(false);

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const getContacts = async () => {
      try {
        const conatcsRef = collection(db, "contacts");

        const contactsSnapshot = await getDocs(conatcsRef);

        const contactsList = contactsSnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });

        // console.log(contactsList);
        setContacts(contactsList);
      } catch (error) {}
    };

    getContacts();
  }, []);

  return (
    <>
      <div className="max-w-[370px] mx-auto">
        <Navbar />

        <div>
          <div className="flex gap-2">
            <div className="flex relative items-center flex-grow">
              <FiSearch className="text-white text-3xl absolute ml-2" />

              <input
                type="text"
                className=" pl-10 bg-transparent border border-white rounded-md h-10 flex-grow text-white"
                placeholder="search contacts"
              ></input>
            </div>

            <AiFillPlusCircle
              onClick={onOpen}
              className="text-5xl text-white cursor-pointer"
            />
          </div>
        </div>

        <div className="mt-4 gap-4 flex flex-col">
          {conatcts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))}
        </div>
      </div>

      <AddAndUpdateContact isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default App;
