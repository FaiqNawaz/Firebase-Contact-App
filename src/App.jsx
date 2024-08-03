import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { FiSearch } from "react-icons/fi";
import { AiFillPlusCircle } from "react-icons/ai";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase";
import ContactCard from "./components/ContactCard";
import AddAndUpdateContact from "./components/AddAndUpdateContact";
import crudHook from "./hooks/crudHook";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContactNotFound from "./components/ContactNotFound";

const App = () => {
  const [conatcts, setContacts] = useState([]);

  const { isOpen, onOpen, onClose } = crudHook();

  useEffect(() => {
    const getContacts = async () => {
      try {
        const conatcsRef = collection(db, "contacts");

        onSnapshot(conatcsRef, (snapshot) => {
          const contactsList = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });

          setContacts(contactsList);
          return contactsList;
        });
      } catch (error) {
        console.log(error);
      }
    };

    getContacts();
  }, []);

  const filterContacts = (e) => {
    const value = e.target.value;

    const conatcsRef = collection(db, "contacts");

    onSnapshot(conatcsRef, (snapshot) => {
      const contactsList = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      const filteredContacts = contactsList.filter((contact) =>
        contact.Name.toLowerCase().includes(value.toLowerCase())
      );

      setContacts(filteredContacts);

      return filteredContacts;
    });
  };

  return (
    <>
      <div className="max-w-[420px] mx-auto">
        <Navbar />

        <div>
          <div className="flex gap-2">
            <div className="flex relative items-center flex-grow">
              <FiSearch className="text-white text-3xl absolute ml-2" />

              <input
                onChange={filterContacts}
                type="text"
                className=" pl-10 bg-transparent border border-white rounded-md h-10 flex-grow text-white"
                placeholder="Search Contacts"
              ></input>
            </div>

            <AiFillPlusCircle
              onClick={onOpen}
              className="text-5xl text-orange cursor-pointer"
            />
          </div>
        </div>

        <div className="mt-4 gap-4 flex flex-col">
          {conatcts.length <= 0 ? (
            <ContactNotFound />
          ) : (
            conatcts.map((contact) => (
              <ContactCard key={contact.id} contact={contact} />
            ))
          )}
        </div>
      </div>

      <AddAndUpdateContact isOpen={isOpen} onClose={onClose} />

      <ToastContainer position="bottom-center" />
    </>
  );
};

export default App;
