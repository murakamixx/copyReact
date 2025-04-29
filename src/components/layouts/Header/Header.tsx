import { motion } from "framer-motion";
import { NavLink } from "react-router";
import { Button } from "../../common/Button";
import { Navbar } from "../../common/Navbar";

export const Header = ({ url, path }: { url: string; path: string }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        when: "beforeChildren",
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };
  const buttonVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 0.92,
      opacity: 1,
      transition: {
        delay: 0.5,
        duration: 0.5,
        type: "spring",
        stiffness: 100,
      },
    },
    hover: {
      scale: 0.93,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col gap-16 sm:gap-20 md:gap-24 lg:gap-[137px] bg-cover bg-center transition duration-200 ease-in min-h-screen"
      style={{ backgroundImage: `url(${url})` }}
    >
      <Navbar />
      <motion.div
        className="flex flex-col flex-grow justify-between px-4 sm:px-6 md:px-8 lg:pl-[11.09vw] pt-10 sm:pt-12 md:pt-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="TextContainer">
          <motion.h1
            variants={itemVariants}
            className="font-family-Montserrat text-xl sm:text-2xl md:text-3xl lg:text-[2.6vw] text-white uppercase mb-4 sm:mb-6 md:mb-[30px]"
          >
            Добро пожаловать
          </motion.h1>
          <motion.h2
            variants={itemVariants}
            className="font-family-LogoFont text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[154px] tracking-wide lg:tracking-[0.69vw] leading-tight sm:leading-snug md:leading-[70px]"
          >
            LUXURY <br />
            <motion.span
              variants={itemVariants}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[60px]"
            >
              HOTELS
            </motion.span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="w-full md:w-3/4 lg:w-[40vw] font-family-Montserrat text-base sm:text-lg md:text-xl lg:text-[23px] text-left text-white tracking-normal lg:tracking-[1px] mt-4 sm:mt-6 md:mt-8"
          >
            Забронируйте проживание и насладитесь роскошью нового поколения по
            самым доступным ценам
          </motion.p>
        </div>
        <motion.div
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          className="flex justify-center mb-12 sm:mb-16 md:mb-20 lg:mb-[165px]"
        >
          <NavLink to={path}>
            <Button
              url="/src/img/Reserve.svg"
              title="ОНЛАЙН БРОНЬ"
              className="flex justify-center gap-2 sm:gap-3 items-center bg-accent hover:bg-[#edc988] hover:cursor-pointer transition duration-100 ease-in-out font-family-MontserratBold text-sm sm:text-base md:text-lg lg:text-xl xl:text-[25px] text-white p-3 sm:p-4 md:p-5 lg:p-[25px] rounded-lg md:rounded-xl"
            />
          </NavLink>
        </motion.div>
      </motion.div>
    </motion.header>
  );
};