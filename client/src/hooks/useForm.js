import { ErrorResponse } from "@remix-run/router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { loginUser } from "../Redux/Thunks/loginUsers";
import { RegisterUser } from "../Redux/Thunks/register";

export const useForm = (initialForm, validateForm, localeErrors) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [image, setImage] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImage = (el) => {
    setImage(el.target.files["0"]);
    setPreviewUrl(URL.createObjectURL(el.target.files[0]));
    console.log(el.target.files["0"]);
    console.log(image);
  };
  const handleChange = (e, type) => {
    if (type === "country" && type !== undefined) {
      form.country = e.target.attributes.value.value;
      console.log(e.target.attributes.value.value, form.country);
    }
    if (e.target.name === "verifypassword") {
      if (e.target.value !== form.registerpassword) {
        setErrors({ ...errors, verifypassword: "The passwords not match" });
      }
    }
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleBlur = (e) => {
    handleChange(e);
    setErrors({
      ...errors,
      ...validateForm(e.target.name, form[e.target.name]),
    });
    console.log(errors);
  };

  const handleSubmit = (e) => {
    // console.log(errors, form);
    if (
      errors.lastname === undefined &&
      errors.name === undefined &&
      errors.registerEmail === undefined &&
      errors.registerpassword === undefined &&
      errors.verifypassword === undefined &&
      form.lastname !== undefined &&
      form.name !== undefined &&
      form.registerEmail !== undefined &&
      form.registerpassword !== undefined &&
      form.verifypassword !== undefined &&
      form.birthday !== "" &&
      form.lastname !== "" &&
      form.name !== "" &&
      form.registerEmail !== "" &&
      form.registerpassword !== "" &&
      form.verifypassword !== ""
    ) {
      const formSend = new FormData();
      formSend.append("firstName", form.name);
      formSend.append("lastName", form.lastname);
      formSend.append("birthday", form.birthday);
      formSend.append("userName", form.name + form.lastname + form.birthday);
      formSend.append("email", form.registerEmail);
      formSend.append("password", form.registerpassword);
      formSend.append("country", form.country);
      // formSend.append("avatar", image);

      if (image) {
        console.log(image);
        formSend.append("avatar", image);
      }
      (async () => {
        dispatch(RegisterUser(formSend));
      })();
    } else {
      Swal.fire({
        icon: "error",
        title: "Form",
        text: "Completar el formulario!",
      });
    }
  };

  const handleSubmits = (e) => {
    if (
      errors.email === undefined &&
      errors.password === undefined &&
      form.email !== undefined &&
      form.password !== undefined &&
      form.email !== "" &&
      form.password !== ""
    ) {
      const formSend = {};
      formSend.email = form.email;
      formSend.password = form.password;
      (async () => {
        await dispatch(loginUser("local", formSend));
      })();
    } else {
      Swal.fire({
        icon: "error",
        title: "Form",
        text: "Completar el formulario!",
      });
    }
  };

  return {
    form,
    errors,
    loading,
    response,
    handleChange,
    handleBlur,
    handleSubmit,
    handleSubmits,
    handleImage,
    image,
    previewUrl,
  };
};
