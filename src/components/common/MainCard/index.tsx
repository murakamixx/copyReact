import { Button } from "../Button"
import { NavLink } from "react-router"

interface MainCardProps {
    header: string,
    title: string,
    path: string,
    className?: string
}

export const MainCard = ({header, title, path} : MainCardProps) => {
    return(
        <div className="flex flex-col lg:flex-row px-4 sm:px-6 md:px-8 lg:px-[11.09vw] items-center gap-6 md:gap-8 lg:gap-[50px] w-full">
            <div className="flex flex-col gap-4 sm:gap-5 md:gap-6 lg:gap-6 border-l-2 border-primary dark:border-accent pl-4 sm:pl-6 md:pl-8 lg:pl-[40px] order-2 lg:order-1 lg:w-1/2 lg:h-full">
                <div className="flex flex-col gap-4 lg:gap-6">
                    <h1 className="text-primary dark:text-white font-family-Header text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-[2.7vw]">
                        {header}
                    </h1>
                    <p className="text-primary dark:text-white font-family-Montserrat text-base sm:text-lg md:text-xl lg:text-xl">
                        {title}
                    </p>
                </div>
                <NavLink to="/services" className="mt-2 lg:mt-4">
                    <Button className="font-family-MontserratBold text-base sm:text-lg md:text-xl lg:text-xl rounded-lg md:rounded-xl px-6 py-3 lg:px-8 lg:py-4 text-white uppercase flex justify-center items-center bg-accent hover:bg-[#edc988] hover:cursor-pointer transition duration-100 ease-in-out w-full sm:w-auto" 
                            title="Подробнее"/>
                </NavLink>
            </div>
            <div className="order-1 lg:order-2 w-full lg:w-1/2 lg:h-full">
                <img className="w-full h-full object-cover rounded-lg md:rounded-xl" src={path} alt={header} />
            </div>
        </div>
    )
}