import { Footer } from "../../components/layouts/Footer";
import { Navbar } from "../../components/common/Navbar";
import { useFirebaseAuth } from "../../providers/FirebaseAuthProvider";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { NavLink, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { Button } from "../../components/common/Button";

const RESETPASSWORDFORM_SCHEMA = yup.object({
  email: yup
    .string()
    .email("Проверьте верность ввода email")
    .required("Поле email обязательно"),
});

export const ResetPassword = () => {
  const { resetPassword } = useFirebaseAuth();
  const navigate = useNavigate();
  const [authError, setAuthError] = useState<string | undefined>();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(RESETPASSWORDFORM_SCHEMA),
  });

  const onSubmit = async ({ email }: { email: string }) => {
    const res = await resetPassword(email);
    if (res?.isSuccess) {
      setIsSubmitted(true);
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
          Восстановление пароля
        </h1>
      </div>
      
      {isSubmitted ? (
        <div className="bg-white dark:bg-[#091121] flex flex-col gap-6 justify-center min-h-[50vh] py-8 px-4 sm:px-6 md:px-8 lg:px-[20vw] xl:px-[25vw] 2xl:px-[30vw]">
          <div className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-100 p-4 rounded-md text-center">
            Ссылка для сброса пароля отправлена на вашу электронную почту
          </div>
          <Button 
            onClick={() => navigate("/signin")}
            title="ВЕРНУТЬСЯ К ВХОДУ" 
            className="bg-accent uppercase text-white font-family-MontserratBold py-3 sm:py-4 rounded-md hover:bg-[#edc988] transition duration-100 ease-in cursor-pointer w-full"
          />
        </div>
      ) : (
        <form 
          onSubmit={handleSubmit(onSubmit)} 
          className="bg-white dark:bg-[#091121] flex flex-col gap-6 md:gap-8 justify-center min-h-[50vh] py-8 px-4 sm:px-6 md:px-8 lg:px-[20vw] xl:px-[25vw] 2xl:px-[30vw]"
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
              type="email"
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

          <Button 
            type="submit" 
            title="СБРОСИТЬ ПАРОЛЬ" 
            className="bg-accent uppercase text-white font-family-MontserratBold py-3 sm:py-4 rounded-md hover:bg-[#edc988] transition duration-100 ease-in cursor-pointer w-full"
          />
          
          <div className="flex justify-center">
            <NavLink 
              to="../signin" 
              className="text-blue-600 dark:text-blue-400 hover:underline text-sm sm:text-base text-center"
            >
              Вспомнили пароль? Войти
            </NavLink>
          </div>
        </form>
      )}
      
      <Footer />
    </>
  );
};