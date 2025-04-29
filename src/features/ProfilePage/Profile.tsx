import { useNavigate } from "react-router";
import { Button } from "../../components/common/Button";
import { Footer } from "../../components/layouts/Footer";
import { Navbar } from "../../components/common/Navbar";
import { useFirebaseAuth } from "../../providers/FirebaseAuthProvider";
import { useFirebaseFirestore } from "../../providers/FirebaseFirestoreProvider";
import { RoomTypes } from "../../api/firebase/types";

const ImgRooms: Record<RoomTypes, { title: string, img: string }> = {
  single: { title: 'ОДИНОЧНЫЙ', img: 'src/img/SoloRoom.jpeg' },
  double: { title: 'ДВОЙНОЙ', img: 'src/img/DoubleRoom.jpeg' },
  family: { title: 'СЕМЕЙНЫЙ', img: 'src/img/FamilyRoom.jpeg' }
}

export const Profile = () => {
  const { authData: user, signOut } = useFirebaseAuth();
  const { userData } = useFirebaseFirestore();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    const res = await signOut();
    if (res && res.isSuccess) {
      navigate("/signin");
    }
  };

  return (
    <>
      <div className="bg-primary flex flex-col pb-6 md:pb-25">
        <Navbar />
        <h1 className="font-family-MontserratBold uppercase text-3xl md:text-5xl text-white self-center mt-8 md:mt-12">
          Профиль
        </h1>
      </div>
      
      <div className="bg-white dark:bg-[#091121] transition duration-200 ease-in-out">
        <div className="flex flex-col md:flex-row justify-between px-4 sm:px-6 md:px-[11.09vw] items-center pt-8 md:pt-14 gap-6 md:gap-0">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 md:gap-10 w-full md:w-auto">
            <div>
              <img 
                src={user?.photoURL || "src/img/user.svg"} 
                className="w-20 h-20 md:w-30 md:h-30 rounded-full"
                alt="User avatar"
              />
            </div>
            <div className="flex flex-col items-center sm:items-start">
              <span className="font-family-MontserratBold text-xl md:text-2xl text-primary dark:text-white text-center sm:text-left">
                {user?.displayName || "ПОЛЬЗОВАТЕЛЬ"}
              </span>
              <span className="font-family-MontserratBold text-lg md:text-2xl text-primary opacity-70 dark:text-white text-center sm:text-left">
                {user?.email || ""}
              </span>
            </div>
          </div>
          <div className="w-full md:w-auto flex justify-center md:block">
            <Button 
              title="выйти из аккаунта" 
              onClick={handleSignOut} 
              className="bg-accent uppercase font-family-MontserratBold text-white text-sm md:text-md rounded-sm py-2 px-4 md:py-3 md:px-6 hover:bg-[#edc988] transition duration-100 ease-in cursor-pointer flex-shrink-0 w-full sm:w-auto text-center"
            />
          </div>
        </div>
        
        <div className="flex flex-col items-center mt-8 md:mt-12 pb-10 md:pb-20 px-4 sm:px-6">
          <p className="font-family-Header text-primary dark:text-white text-2xl md:text-3xl uppercase text-center">
            Забронированные номера
          </p>
          
          {userData?.bookings.length !== 0 ? (
            <div className="mt-10 md:mt-20 flex flex-col gap-8 md:gap-10 w-full max-w-4xl">
              {userData?.bookings.map((bookingData, index) => (
                <div 
                  key={`booking-${index}`} 
                  className="flex flex-col sm:flex-row gap-6 md:gap-15 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg"
                >
                  <div className="w-full sm:w-64 md:w-100 flex-shrink-0">
                    <img 
                      src={ImgRooms[bookingData.roomType].img} 
                      className="w-full h-auto rounded-md object-cover"
                      alt={ImgRooms[bookingData.roomType].title}
                    />
                  </div>
                  <div className="flex flex-col justify-around gap-3 md:gap-0">
                    <p className="font-family-Header text-primary text-2xl md:text-3xl dark:text-white">
                      {ImgRooms[bookingData.roomType].title}
                    </p>
                    <div className="flex flex-col gap-1 md:gap-2">
                      <p className="text-primary font-family-Montserrat text-base md:text-xl dark:text-white">
                        {`ФИО: ${bookingData.name}`}
                      </p>
                      <p className="text-primary font-family-Montserrat text-base md:text-xl dark:text-white">
                        {`Номер комнаты: ${bookingData.roomNumber}`}
                      </p>
                      <p className="text-primary font-family-Montserrat text-base md:text-xl dark:text-white">
                        {`Дата заезда: ${bookingData.arriveDate.toDate().toLocaleDateString()}`}
                      </p>
                      <p className="text-primary font-family-Montserrat text-base md:text-xl dark:text-white">
                        {`Дата выезда: ${bookingData.leaveDate.toDate().toLocaleDateString()}`}
                      </p>
                      <p className="text-primary font-family-Montserrat text-base md:text-xl dark:text-white">
                        {`Статус: Действующий`}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="font-family-Montserrat text-primary text-xl md:text-2xl dark:text-white mt-4">
              Список Заказов пуст
            </p>
          )}
        </div>
      </div>
      
      <Footer />
    </>
  );
};