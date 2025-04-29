import { Link } from "react-router"
import { Button } from "../../common/Button"

export const Footer = () => {
    const SocialTitles : Array<{path: string, title: string}> = [
        {path: 'src/img/facebook.svg', title: 'Facebook'},
        {path: 'src/img/twitter.svg', title: 'Twitter'},
        {path: 'src/img/instagram.svg', title: 'Instagram'}
    ]

    return (
        <footer className="bg-primary py-8 sm:py-10 md:py-12 lg:py-16 xl:h-[266px]">
            <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
                <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-6 lg:gap-10 xl:gap-0">
                    {/* Лого и контакты */}
                    <div className="flex flex-col gap-4 sm:gap-5 md:gap-6 lg:gap-[22px] w-full md:w-auto">
                        <Link to='/'>
                            <img 
                                src="src/img/logo.svg" 
                                alt="logo" 
                                className="w-32 sm:w-36 md:w-40 lg:w-auto"
                            />
                        </Link>
                        <p className="font-family-Montserrat text-white text-xs sm:text-sm md:text-[14px] w-full md:w-[200px] lg:w-[14.75vw] max-w-[300px]">
                            497 Evergreen Rd. Roseville, CA 95673<br />
                            +44 345 678 903<br />
                            luxury_hotels@gmail.com
                        </p>
                    </div>

                    {/* Социальные сети */}
                    <div className="flex flex-col gap-3 sm:gap-4 md:gap-5 lg:gap-[20px] w-full md:w-auto">
                        {SocialTitles.map(({path, title}, index) => (
                            <div key={index} className="flex items-center gap-3 sm:gap-4 md:gap-5 lg:gap-[20px]">
                                <img 
                                    src={path} 
                                    alt={`${title} icon`}
                                    className="w-5 h-5 sm:w-6 sm:h-6"
                                />
                                <Link to='/pageNotFound' className="hover:opacity-80 transition">
                                    <p className="font-family-Montserrat text-white text-sm sm:text-base md:text-[16px]">
                                        {title}
                                    </p>
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* Подписка на рассылку */}
                    <div className="flex flex-col gap-3 sm:gap-4 md:gap-5 lg:gap-[15px] w-full md:w-auto lg:max-w-[300px]">
                        <h1 className="font-family-Montserrat text-white text-sm sm:text-base md:text-[16px]">
                            Subscribe to our newsletter
                        </h1>
                        <form className="flex w-full">
                            <input 
                                type="email" 
                                placeholder="Email Address" 
                                className="flex-grow text-white bg-transparent border-2 border-accent rounded-l-sm px-3 py-2 sm:px-4 sm:py-2 md:px-[17px] md:py-[10px] text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                                required
                            />
                            <Button 
                                type="submit" 
                                title="OK" 
                                className="bg-accent hover:bg-[#edc988] transition py-2 px-3 sm:py-2 sm:px-4 md:py-[11px] md:px-[15px] font-family-MontserratBold text-primary text-xs sm:text-sm md:text-base rounded-r-sm"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </footer>
    )
}