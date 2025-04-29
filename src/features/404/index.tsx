import { Button } from "../../components/common/Button"
import { Link } from "react-router"

export const PageNotFound = () => {
    return (
        <div className="w-[100vw] h-[100vh] flex flex-col justify-center items-center gap-[20px] dark:bg-[#091121]">
            <h1 className="text-primary text-3xl uppercase dark:text-white">ОШИБКА 404: СТРАНИЦА НЕ НАЙДЕНА</h1>
            <Link to='/'>
            <Button title="НА ГЛАВНУЮ" className="flex justify-center gap-[10px] items-center bg-accent hover:bg-[#edc988] hover:cursor-pointer transition duration-100 ease-in-out font-family-MontserratBold text-[25px] text-white px-[25px] py-[10px] rounded-xl"></Button>
            </Link>
        </div>
    )
}