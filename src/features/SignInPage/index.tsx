import { Footer } from "../../components/layouts/Footer";
import { Navbar } from "../../components/common/Navbar";
import { useFirebaseAuth } from "../../providers/FirebaseAuthProvider";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { NavLink, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { Button } from "../../components/common/Button";

const SIGNINFORM_SCHEMA = yup.object({
  email: yup
    .string()
    .email("Проверьте верность ввода email")
    .required("Поле email обязательно"),
  password: yup.string().required("Поле password обязательно"),
});

export const SignIn = () => {
  const { signIn } = useFirebaseAuth();
  const navigate = useNavigate();
  const [authError, setAuthError] = useState<string | undefined>();

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(SIGNINFORM_SCHEMA),
  });

  const onSubmit = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const res = await signIn(email, password);
    if (res?.isSuccess) {
      navigate("/profile", { replace: true });
      return;
    }
    if (res?.errorMessage) {
      setAuthError(res.errorMessage);
    }
  };

  useEffect(() => {
    if (formState.isDirty) {
      setAuthError(undefined);
    }
  }, [formState.isDirty]);

  return (
    <>
      <div className="bg-primary flex flex-col pb-6 md:pb-25">
        <Navbar />
        <h1 className="font-family-MontserratBold uppercase text-3xl md:text-5xl text-white self-center mt-8 md:mt-12">
          Вход
        </h1>
      </div>
      
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="bg-white dark:bg-[#091121] flex flex-col gap-6 md:gap-10 justify-center min-h-[50vh] py-8 px-4 sm:px-6 md:px-8 lg:px-[20vw] xl:px-[25vw] 2xl:px-[30vw]"
      >
        {authError && (
          <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 p-3 rounded-md text-center">
            {authError}
          </div>
        )}
        
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-primary dark:text-gray-300 font-family-Montserrat text-xs sm:text-[12px] uppercase pl-3">
            email
          </label>
          <input 
            id="email"
            {...register("email")} 
            placeholder="Электронная почта" 
            className="bg-[#EBEBEB] dark:bg-gray-700 dark:text-white py-3 px-3 rounded-md border-primary dark:border-gray-600 border-1 focus:outline-none focus:ring-2 focus:ring-accent"
          />
          {formState.errors.email && (
            <p className="text-red-500 font-family-Montserrat text-xs sm:text-sm uppercase pl-3">
              {formState.errors.email?.message}
            </p>
          )}
        </div>
        
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-primary dark:text-gray-300 font-family-Montserrat text-xs sm:text-[12px] uppercase pl-3">
            password
          </label>
          <input 
            id="password"
            type="password"
            {...register("password")} 
            placeholder="Пароль" 
            className="bg-[#EBEBEB] dark:bg-gray-700 dark:text-white py-3 px-3 rounded-md border-primary dark:border-gray-600 border-1 focus:outline-none focus:ring-2 focus:ring-accent" 
          />
          {formState.errors.password && (
            <p className="text-red-500 font-family-Montserrat text-xs sm:text-sm uppercase pl-3">
              {formState.errors.password?.message}
            </p>
          )}
        </div>

        <Button 
          type="submit" 
          title="ВОЙТИ" 
          className="bg-accent uppercase text-white font-family-MontserratBold py-3 sm:py-4 rounded-md hover:bg-[#edc988] transition duration-100 ease-in cursor-pointer w-full"
        />
        
        <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0">
          <NavLink to="../signup" className="text-blue-600 dark:text-blue-400 hover:underline text-sm sm:text-base text-center sm:text-left">
            Зарегистрироваться
          </NavLink>
          <NavLink to="../resetpassword" className="text-blue-600 dark:text-blue-400 hover:underline text-sm sm:text-base text-center sm:text-right">
            Не помню пароль
          </NavLink>
        </div>
      </form>
      
      <Footer />
    </>
  );
};