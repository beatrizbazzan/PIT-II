import ButtonLogin from "@/components/ButtonLogin";
import Center from "@/components/Center";
import Header from "@/components/Header";
import InputLogin from "@/components/InputLogin";
import axios from "axios";
import { Form, Formik } from "formik";
import Link from "next/link";
import { useState } from "react";
import * as Yup from "yup";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [username, setUsername] = useState(null);
  const [isFormSubmitting, setFormSubmitting] = useState(false);
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Digite um email válido")
      .required("O campo email é obrigatório"),
    password: Yup.string().required("O campo senha é obrigatório"),
  });

  async function checkUserExists(user) {
    try {
      const response = await axios.get(`/api/user`);
      const users = response.data;

      const foundUser = users.find(
        (existingUser) => existingUser.email === user.email
      );

      if (foundUser) {
        if (foundUser.password === user.password) {
          return true;
        } else {
          setError("senha incorreta");
          return false;
        }
      } else {
        setError("usuário não cadastrado");
        return false;
      }
    } catch (error) {
      setError("erro ao verificar usuário");
      return false;
    }
  }

  async function handleSubmit(values) {
    setFormSubmitting(true);
    const { email } = values;
    try {
      const isUserRegistered = await checkUserExists(values);
      if (isUserRegistered) {
        setFormSubmitting(false);
        setUsername(email);
        window.location.href = "/";
      } else {
        setFormSubmitting(false);
      }
    } catch (error) {
      setError(error.message || "Erro desconhecido");
      setFormSubmitting(false);
    }
  }

  return (
    <>
      <Header username={username} />
      <Center>
        <div className="flex items-center justify-center">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values }) => (
              <Form noValidate className="flex flex-col gap-2 p-4">
                <InputLogin name="email" type="email" required />
                <InputLogin
                  name="password"
                  type="password"
                  required
                  autoComplete="off"
                />
                <ButtonLogin
                  type="submit"
                  text="entrar"
                  className="bg-lightgreen text-white rounded p-2 cursor-pointer"
                />
                {error && <span className="text-alertred">{error}</span>}
                <span className="text-xs text-zinc500">
                  Não possui uma conta?
                  <strong className="text-zinc700">
                    <Link href="/register"> Inscreva-se</Link>
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