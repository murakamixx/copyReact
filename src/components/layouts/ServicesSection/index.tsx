import { ServiceCard } from "../../common/ServiceCard"
import { Reviews } from "../../common/Reviews"
export const ServicesSection = () => {
    
    let ServiceArray:Array<{title : string,path :string}> = [
        {title: 'Тренажерный зал', path: 'src/img/gym.jpeg'},
        {title: 'Бар у бассейна', path: 'src/img/bar.jpeg'},
        {title: 'СПА Услуги', path: 'src/img/spa.jpeg'},
        {title: 'Ресторан', path: 'src/img/restaraunt.jpeg'},
        {title: 'Прачечная', path: 'src/img/washer.jpeg' }
    ]
    return(
        <div className=" dark:bg-[#091121]">
        <div className="flex flex-col items-center gap-15">
            <div className="flex flex-col items-center mt-[76px] w-[60vw] gap-[20px]">
                <h1 className="font-family-Header text-primary text-5xl uppercase dark:text-white">Услуги</h1>
                <p className="font-family-Montserrat text-primary text-xl text-center dark:text-white">Мы хотим, чтобы ваше пребывание в нашем роскошном отеле было по-настоящему незабываемым.
                     Вот почему мы уделяем особое внимание всем вашим потребностям, чтобы обеспечить совершенно уникальный опыт
                     . Роскошные отели предлагают идеальные условия 
                    с потрясающими видами для отдыха, а наши современные роскошные курортные объекты
                     помогут вам насладиться наилучшим образом.</p>
            </div>
                {ServiceArray.map((service, index)=> (
                    <ServiceCard title = {service.title} path={service.path} key={index} className="w-[75vw] rounded-md flex justify-center items-end"></ServiceCard>
                ))}
                <Reviews className="w-[70vw]"/>
        </div>
        </div>
    )
}