import { useState, useEffect } from 'react';
import { NavLink } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../Button";

export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const titles: Array<{path: string, title: string}> = [
        {path: '/', title: 'Главная'},
        {path: '/services', title: 'Услуги'},
        {path: '/rooms', title: 'Номера'},
        {path: '/profile', title: 'Профиль'},
    ];

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMenuOpen]);

    const toggleTheme = () => {
        document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
        }
    }, []);

    const menuVariants = {
        hidden: { x: "100%" },
        visible: { 
            x: 0,
            transition: { 
                type: "spring", 
                stiffness: 300,
                damping: 30
            }
        },
        exit: { 
            x: "100%",
            transition: { 
                duration: 0.3,
                ease: "easeInOut"
            }
        }
    };

    // Варианты анимации для пунктов меню
    const itemVariants = {
        hidden: { x: 50, opacity: 0 },
        visible: (i: number) => ({
            x: 0,
            opacity: 1,
            transition: {
                delay: 0.1 + i * 0.1,
                duration: 0.5,
                ease: "easeOut"
            }
        })
    };

    return (
        <>
            <nav className="flex justify-between items-center px-4 sm:px-6 md:px-8 lg:px-10">
                <NavLink to="/">
                    <motion.div 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex justify-center items-center bg-accent hover:bg-[#edc988] transition duration-100 ease-in w-40 sm:w-48 md:w-[13.33vw] max-w-[200px] h-20 sm:h-24 md:h-[149px] rounded-b-lg md:rounded-b-[25px]"
                    >
                        <img 
                            src="src/img/mainlogo.svg" 
                            alt="logo" 
                            className="w-32 sm:w-36 md:w-[11vw] max-w-[180px]"
                        />
                    </motion.div>
                </NavLink>
                <motion.button 
                    className="lg:hidden flex flex-col justify-center items-center w-10 h-10 z-50 relative"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Меню"
                    aria-expanded={isMenuOpen}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <motion.span 
                        className="bg-white h-1 w-6 rounded-full mb-1.5"
                        animate={{
                            rotate: isMenuOpen ? 45 : 0,
                            y: isMenuOpen ? 8 : 0,
                            width: isMenuOpen ? '1.5rem' : '1.5rem'
                        }}
                    ></motion.span>
                    <motion.span 
                        className="bg-white h-1 w-6 rounded-full mb-1.5"
                        animate={{
                            opacity: isMenuOpen ? 0 : 1,
                            width: isMenuOpen ? 0 : '1.5rem'
                        }}
                    ></motion.span>
                    <motion.span 
                        className="bg-white h-1 w-6 rounded-full"
                        animate={{
                            rotate: isMenuOpen ? -45 : 0,
                            y: isMenuOpen ? -8 : 0,
                            width: isMenuOpen ? '1.5rem' : '1.5rem'
                        }}
                    ></motion.span>
                </motion.button>
                <div className="hidden lg:flex items-center gap-[98px]">
                    {titles.map(({path, title}, index) => (
                        <NavLink 
                            to={path} 
                            key={index}
                            className={({isActive}) => 
                                `font-family-Montserrat text-white hover:underline text-[1.3vw] ${isActive ? 'font-bold' : ''}`
                            }
                        >
                            {title}
                        </NavLink>
                    ))}
                    
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <Button 
                            url="/src/img/switchTheme.svg" 
                            onClick={toggleTheme} 
                            className="hover:cursor-pointer active:opacity-30 transition duration-50 ease-in w-8 h-8"
                            aria-label="Переключить тему"
                        />
                    </motion.div>
                </div>
            </nav>

            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
                            onClick={() => setIsMenuOpen(false)}
                        />
                        
                        {/* Само меню */}
                        <motion.div 
                            className="fixed inset-y-0 right-0 w-full sm:w-96 bg-primary dark:bg-dark-primary z-40 lg:hidden flex flex-col items-end justify-center pr-10 space-y-6"
                            variants={menuVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            {titles.map(({path, title}, index) => (
                                <motion.div
                                    key={index}
                                    custom={index}
                                    variants={itemVariants}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    <NavLink 
                                        to={path} 
                                        className={({isActive}) => 
                                            `font-family-Montserrat text-white hover:text-accent text-2xl sm:text-3xl font-medium block py-2 ${isActive ? 'text-accent' : ''}`
                                        }
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {title}
                                    </NavLink>
                                </motion.div>
                            ))}
                            
                            <motion.div
                                custom={titles.length}
                                variants={itemVariants}
                                initial="hidden"
                                animate="visible"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="mt-6"
                            >
                                <Button 
                                    url="/src/img/switchTheme.svg" 
                                    onClick={() => {
                                        toggleTheme();
                                        setIsMenuOpen(false);
                                    }} 
                                    className="hover:cursor-pointer active:opacity-30 transition duration-50 ease-in w-10 h-10 sm:w-12 sm:h-12"
                                    aria-label="Переключить тему"
                                />
                            </motion.div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};