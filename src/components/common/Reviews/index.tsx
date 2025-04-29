import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../Button";

interface ReviewsProps {
  className?: string;
}

export const Reviews = ({ className }: ReviewsProps) => {
  const ReviewArray = [
    "Лучшее место, чтобы отдохнуть и развеяться от ежедневной рутины",
    "Отличный комфортный отель по доступной цене!",
    "Шикарный отель с такой же шикарной кухней!",
  ];

  const AuthorArray = [
    "Станислав Барецкий, Россия",
    "Артем Слободянюк, Беларусь",
    "Валентин Стрыкало, Украина",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const nextReview = () => {
    setDirection("right");
    setCurrentIndex((prevIndex) =>
      prevIndex === ReviewArray.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevReview = () => {
    setDirection("left");
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? ReviewArray.length - 1 : prevIndex - 1
    );
  };

  // Варианты анимации для отзывов
  const reviewVariants = {
    enter: (direction: "left" | "right") => ({
      x: direction === "right" ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: "left" | "right") => ({
      x: direction === "right" ? -100 : 100,
      opacity: 0,
    }),
  };

  // Анимация для кнопок
  const buttonVariants = {
    hover: { scale: 1.1 },
    tap: { scale: 0.95 },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`flex flex-col items-center gap-4 sm:gap-5 md:gap-6 lg:gap-[20px] mt-8 sm:mt-10 md:mt-12 lg:mt-[46px] mb-16 sm:mb-20 md:mb-24 lg:mb-[163px] px-4 sm:px-6 ${className}`}
    >
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="font-family-Header text-2xl sm:text-3xl md:text-4xl lg:text-[2.7vw] text-primary dark:text-white text-center"
      >
        Отзывы
      </motion.h1>

      <div className="flex flex-col items-center gap-3 sm:gap-4 md:gap-5 w-full max-w-3xl min-h-[120px] sm:min-h-[140px] md:min-h-[160px] overflow-hidden relative">
        <AnimatePresence mode="popLayout" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={reviewVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute w-full"
          >
            <motion.h2
              className="font-family-Montserrat text-primary dark:text-white text-lg sm:text-xl md:text-2xl lg:text-[25px] text-center leading-tight"
            >
              "{ReviewArray[currentIndex]}"
            </motion.h2>
            <motion.p
              className="font-family-Montserrat text-primary dark:text-white text-base sm:text-lg md:text-xl lg:text-[20px] text-center mt-2"
            >
              {AuthorArray[currentIndex]}
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>

      <motion.div className="flex gap-4 sm:gap-5 md:gap-6 lg:gap-[21px] mt-2 sm:mt-3">
        <motion.div
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <Button
            url="/src/img/arrow-left.svg"
            onClick={prevReview}
            className="flex justify-center items-center bg-accent hover:bg-[#edc988] hover:cursor-pointer transition duration-100 ease-in-out p-3 sm:p-4 md:p-[15px] rounded-lg sm:rounded-xl"
            aria-label="Предыдущий отзыв"
          />
        </motion.div>
        <motion.div
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <Button
            url="/src/img/arrow-right.svg"
            onClick={nextReview}
            className="flex justify-center items-center bg-accent hover:bg-[#edc988] hover:cursor-pointer transition duration-100 ease-in-out p-3 sm:p-4 md:p-[15px] rounded-lg sm:rounded-xl"
            aria-label="Следующий отзыв"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};