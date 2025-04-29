
import { Header } from "../../components/layouts/Header/Header"
import { MainSection } from "../../components/layouts/MainSection"
import { Footer } from "../../components/layouts/Footer"

export const Home = () => {
    return (
      <div className="bg-white dark:bg-[#091121]">
      <Header url= "/src/img/HeaderBGHome.jpeg" path='rooms'/>
      <MainSection/>
      <Footer/>
      </div>
    )
    
}