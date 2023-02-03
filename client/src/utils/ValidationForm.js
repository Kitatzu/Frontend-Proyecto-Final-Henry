const validationsForm = (name, value) => {
  const errors = {};
  let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
  let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
  let regexPass = /(?=.*[0-9])/;
  let regexPass1 = /(?=.*[!@#$%^&*])/;
  let regexPass2 = /(?=.{8,})/;
  let regexPass3 = /(?=.*[A-Z])/;
  console.log(name, value, errors);
  //TODO:CITY
  if (name === "city" && value && !regexName.test(value.trim())) {
    errors.city = "No se permiten caracteres especiales.";
  }
  //TODO:city
  if (name === "email" && !value.trim()) {
    errors.email = "The Email field is require";
  } else if (name === "email" && value) errors.email = undefined;

  if (name === "email" && value && !regexEmail.test(value.trim())) {
    errors.email = "Este campo es incorrecto";
  } else if (name === "email" && value && regexEmail.test(value.trim()))
    errors.email = undefined;

  if (name === "password" && !value)
    errors.password = "The password field is require";
  else if (name === "password" && value) errors.password = undefined;

  if (name === "password" && value && !regexPass.test(value.trim())) {
    errors.password = "Este campo requiere al menos 1 caracter numerico";
  }
  if (name === "password" && value && !regexPass1.test(value.trim())) {
    errors.password = "Debe contener un caracter especial";
  }
  if (name === "password" && value && !regexPass2.test(value.trim())) {
    errors.password = "Debe contener al menos 8 caracteres";
  }
  if (name === "password" && value && !regexPass3.test(value.trim())) {
    errors.password = "Debe tener al menos 1 mayùs";
  }
  //REGISTER
  //name-----------------------------------------------------

  if (name === "name" && !value.trim()) {
    //console.log("TU PERA MADRE");
    errors.name = "The name field is require";
  } else if (name === "name" && value.trim()) errors.name = undefined;
  if (name === "name" && value && !regexName.test(value.trim())) {
    errors.name = "Solo acepta letras y espacios blancos";
  }

  //-----------------------------------------------------------

  //Lastname
  if (name === "lastname" && !value.trim())
    errors.lastname = "The last name field is require";
  else if (name === "lastname" && value.trim()) errors.lastname = undefined;
  else if (name === "lastname" && !regexName.test(value.trim()))
    errors.lastname = "Solo acepta letras y espacios blancos";

  //-----------------------------------------------
  //age---------------------------------------

  if (name === "birthday" && !value.trim())
    errors.birthday = "The birthday field is require";
  else if (name === "birthday" && value.trim()) errors.birthday = undefined;
  // if (name === "birthday" && parseInt(value) < 18) errors.fechaNacimiento = "The fechaNacimiento >18";

  //----------------------------------------------------------------------
  //Password
  if (name === "registerpassword" && !value.trim())
    errors.registerpassword = "The password field is require";
  else if (name === "registerpassword" && value.trim())
    errors.registerpassword = undefined;
  if (name === "registerpassword" && value && !regexPass.test(value.trim()))
    errors.registerpassword =
      "Este campo requiere al menos 1 caracter numerico";
  if (name === "registerpassword" && value && !regexPass1.test(value.trim()))
    errors.registerpassword = "Debe contener un caracter especial";
  if (name === "registerpassword" && value && !regexPass2.test(value.trim()))
    errors.registerpassword = "Debe contener al menos 8 caracteres";
  if (name === "registerpassword" && value && !regexPass3.test(value.trim()))
    errors.registerpassword = "Debe tener al menos 1 mayùs";

  //----------------
  //verify password
  if (name === "verifypassword" && !value.trim())
    errors.verifypassword = "The password field is require";
  else if (name === "verifypassword" && value.trim())
    errors.verifypassword = undefined;
  //-------------------------
  if (name === "registerEmail" && !value.trim())
    errors.registerEmail = "The Email field is require";
  else if (name === "registerEmail" && value.trim())
    errors.registerEmail = undefined;
  if (name === "registerEmail" && value && !regexEmail.test(value.trim()))
    errors.registerEmail = "Este campo es incorrecto";

  return errors;
};
export default validationsForm;
