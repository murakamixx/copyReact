import { motion } from "framer-motion";
import { MainCard } from "../../common/MainCard";
import { Reviews } from "../../common/Reviews";

// Варианты анимации для контейнера
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      when: "beforeChildren",
    },
  },
};

// Варианты анимации для элементов
const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

// Варианты анимации для карточек
const cardVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.2 + i * 0.3,
      duration: 0.8,
      ease: "easeOut",
    },
  }),
};

export const MainSection = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="bg-white dark:bg-[#091121] flex flex-col gap-12 md:gap-16 lg:gap-[69px] justify-between items-center transition duration-150 ease-in px-4 sm:px-6 md:px-8 lg:px-0"
    >
      <motion.p
        variants={itemVariants}
        className="text-xl sm:text-2xl md:text-3xl lg:text-[30px] text-primary dark:text-white mt-12 md:mt-16 lg:mt-[69px] text-center"
      >
        В стоимость всех наших номеров включен бесплатный завтрак.
      </motion.p>

      <motion.div className="w-full max-w-[1800px] flex flex-col gap-30">
        <motion.div
          custom={0}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          <MainCard
            header="Люксовые номера"
            title="Наши номера созданы для того, чтобы создать атмосферу уюта и тепла. Отвлекитесь от повседневной домашней жизни и найдите для себя личный рай."
            path="/src/img/MainCard1.jpeg"
          />
        </motion.div>

        <motion.div
          custom={1}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          <MainCard
            header="Отдохните на пляже"
            title="Мы любим жизнь на пляже. Близость к океану с доступом к бесконечному песчаному пляжу обеспечивает расслабленное состояние ума. Кажется, что время замирает, наблюдая за океаном."
            path="/src/img/MainCard2.jpeg"
          />
        </motion.div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="w-full"
      >
        <Reviews />
      </motion.div>
    </motion.div>
  );
};