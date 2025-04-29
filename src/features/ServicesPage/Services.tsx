import { Header } from "../../components/layouts/Header/Header"
import { ServicesSection } from "../../components/layouts/ServicesSection"
import { Footer } from "../../components/layouts/Footer"

export const Services = () =>{
    return (
        <>
     <Header url="src/img/HeaderBGFacilities.jpeg" path="/rooms"/>
     <ServicesSection/>
    <Footer/>
     </>
    )
}