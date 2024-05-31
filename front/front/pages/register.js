import ButtonLogin from "@/components/ButtonLogin";
import Center from "@/components/Center";
import Header from "@/components/Header";
import InputLogin from "@/components/InputLogin";
import axios from "axios";
import { Form, Formik } from "formik";
import Link from "next/link";
import { useState } from "react";
import * as Yup from "yup";

export default function RegisterPage() {
  const [error, setError] = useState("");
  const [isFormSubmitting, setFormSubmitting] = useState(false);

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("o campo nome é obrigatório"),
    email: Yup.string()
      .email("digita um email válido")
      .required("o campo email é obrigatório"),
    password: Yup.string().required("o campo senha é obrigatório"),
  });

  async function checkUserExists(user) {
    try {
      const response = await axios.get(`/api/user`);
      const users = response.data;

      return users.some(existingUser => existingUser.email === user.email);
    } catch (error) {
      console.error("Erro ao verificar usuário:", error);
      return false;
    }
  }

  async function handleSubmit(values) {
    setFormSubmitting(true);

    const isUserRegistered = await checkUserExists(values);

    if (isUserRegistered) {
      setError("usuário já cadastrado");
      setFormSubmitting(false);
      return;
    }
    try {
      await axios.post("/api/user", {
        name: values.name,
        email: values.email,
        password: values.password,
      });
      window.location.href = "/login";
    } catch (error) {
      setError("Erro ao cadastrar usuário");
    }
    setFormSubmitting(false);
  }

  return (
    <>
      <Header />
      <Center>
        <div className="flex items-center justify-center">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values }) => (
              <Form noValidate className="flex flex-col gap-2 p-4">
                <InputLogin name="name" type="name" required/>
                <InputLogin name="email" type="email" required />
                <InputLogin name="password" type="password" required autoComplete="off"/>
                <ButtonLogin 
                  type="submit"
                  text={isFormSubmitting ? "carregando..." : "inscrever-se"} 
                  disabled={isFormSubmitting}
                  className="bg-lightgreen text-white rounded p-2 cursor-pointer"
                />
                <p className="">{error && (
                  <span className="text-alertred text-sm text-center">{error}</span>
                )}</p>
                <span className="text-xs text-zinc500">
                  já possui uma conta?
                  <strong className="text-zinc700">
                    <Link href="/login"> entre</Link>
                  </strong>
                </span>
              </Form>
            )}
          </Formik>
        </div>
      </Center>
    </>
  );
}