import { Header } from "../../components/layouts/Header/Header"
import { RoomsSection } from "../../components/layouts/RoomsSection"
import { Footer } from "../../components/layouts/Footer"

export const Rooms = () => {
    return (
        <>
        <Header url="src/img/HeaderBGRooms.jpeg" path="/rooms"/>
        <RoomsSection/>
        <Footer/>
        </>
    )
}