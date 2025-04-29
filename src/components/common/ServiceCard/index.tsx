import { motion } from "framer-motion";

interface ServiceCardProps {
  title: string;
  path: string;
  className?: string;
}

export const ServiceCard = ({ title, path, className = "" }: ServiceCardProps) => {
  return (
    <motion.div 
      style={{ 
        backgroundImage: `url(${path})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }} 
      className={`relative ${className} flex justify-center items-end overflow-hidden`}
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "0px 0px -50px 0px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
    >
      <motion.div 
        className="bg-white mt-[55vw] pt-4 pb-3 px-8
                 md:pt-5 md:pb-4 md:px-10
                 lg:pt-6 lg:pb-5 lg:px-12
                 w-max max-w-[90%]"
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <motion.h2 
          className="font-family-MontserratBold text-primary 
                   text-2xl sm:text-md md:text-md 
                   uppercase whitespace-nowrap max-sm:text-sm"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          {title}
        </motion.h2>
      </motion.div>
    </motion.div>
  );
};