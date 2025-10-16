import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function AddBook() {
  const navigate = useNavigate();

  const schema = Yup.object({
    title: Yup.string().min(2, "At least 2 chars").required("Required"),
    author: Yup.string().required("Required"),
    genre: Yup.string()
      .oneOf(["fiction", "nonfiction", "tech"], "Invalid genre")
      .required("Required"),
    rating: Yup.number().min(0).max(5).required("Required"),
  });

  const handleSubmit = (values) => {
    const newBook = { id: Date.now(), ...values };

    const saved = JSON.parse(localStorage.getItem("books")) || [];
    localStorage.setItem("books", JSON.stringify([...saved, newBook]));

    navigate("/books");
  };

  return (
    <div className="page">
      <h2>Add a New Book</h2>

      <Formik
        initialValues={{ title: "", author: "", genre: "", rating: "" }}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        <Form className="form">
          <label>Title</label>
          <Field name="title" />
          <ErrorMessage name="title" component="div" className="error" />

          <label>Author</label>
          <Field name="author" />
          <ErrorMessage name="author" component="div" className="error" />

          <label>Genre</label>
          <Field as="select" name="genre">
            <option value="">Select...</option>
            <option value="fiction">Fiction</option>
            <option value="nonfiction">Nonfiction</option>
            <option value="tech">Tech</option>
          </Field>
          <ErrorMessage name="genre" component="div" className="error" />

          <label>Rating</label>
          <Field name="rating" type="number" step="0.1" />
          <ErrorMessage name="rating" component="div" className="error" />

          <button type="submit">Add Book</button>
        </Form>
      </Formik>
    </div>
  );
}
