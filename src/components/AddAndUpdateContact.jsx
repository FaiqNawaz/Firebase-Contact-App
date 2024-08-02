import React from "react";
import Modal from "./Modal";
import { Formik, Form, Field } from "formik";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../config/firebase";

const AddAndUpdateContact = ({ isOpen, onClose }) => {
  const addContact = async (contact) => {
    try {
      const contactRef = collection(db, "contacts");
      await addDoc(contactRef, contact);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Formik
          initialValues={{
            Name: "",
            Email: "",
          }}
          onSubmit={(values) => {
            console.log(values);
            addContact(values);
          }}
        >
          <Form className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="Name">Name</label>
              <Field className="border rounded h-8" name="Name" />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="Email">Email</label>
              <Field className="border rounded h-8" name="Email" />
            </div>

            <button className="bg-orange px-3 py-1.5 border rounded self-end">
              Add Contact
            </button>
          </Form>
        </Formik>
      </Modal>
    </>
  );
};

export default AddAndUpdateContact;
