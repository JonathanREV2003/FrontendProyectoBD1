import React from 'react';
import { useNavigate } from 'react-router-dom';
//icons
import { RiHashtag } from "react-icons/ri";
import { SlPeople } from "react-icons/sl";
import { BsPersonCheck } from "react-icons/bs";
import {  MdHomeWork } from "react-icons/md";
import { HiIdentification } from "react-icons/hi";

function Home() {
    const navigate = useNavigate();
    {/* aca si quieren ponen mas redireccionamientos */}
    const paraPersona = () => {
      navigate('/Persona');
    };
    const paraReporte = () => {
      navigate('/Reporte');
    };
    const paraAgendarCita = () => {
      navigate('Agendarcita');
    };
    const paraServicio = () => {
        navigate('/servicio');
      };
      const paraSucursal = () => {
        navigate('/sucursal');
      };
    return (
        <>
            {/* Section 1 */}

            <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 mt-10 gap-8">
            {/* Card 1 */}
            <div className="bg-primary-100 p-8 rounded-xl text-gray-300 flex flex-col gap-6">
                <SlPeople className="text-5xl" />
                <h4 className="text-2xl">Add, modify, assign</h4>
                <span className="text-5xl text-white">Add people</span>
                <button onClick={paraPersona} className="bg-red-100/20 py-2 px-6 rounded-xl text-white w-full">
                    Add now
                    </button>
            </div>
            {/* Card 2 */}
            <div className="p-4 bg-white rounded-xl flex flex-col justify-between gap-4 drop-shadow-2xl">
                <div className="flex items-center gap-4 bg-primary-100/10 rounded-xl p-4">
                <BsPersonCheck className="text-5xl" />
                <div>
                    <h3 className="font-bold">Assign employees</h3>
                    <p className="text-gray-500">doctor, groomer, receptionist</p>
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                <button onClick={paraReporte} className="bg-primary-100 py-2 px-6 rounded-xl text-white w-full">
                        Assign
                    </button>
                </div>

                </div>
                <div className="bg-primary-100/10 rounded-xl p-4">
                <div className="flex items-center gap-4 mb-4">
                    <span className="bg-primary-100 text-gray-300 text-2xl font-bold p-4 rounded-xl">
                    10
                    </span>
                    <div>
                    <h3 className="font-bold">Assign clients</h3>
                    <p className="text-gray-500">Frequent customers</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                <button onClick={paraPersona} className="bg-primary-100 py-2 px-6 rounded-xl text-white w-full">
                    Assign
                </button>
                </div>
                </div>
            </div>
                 {/* Card 3 */}
            <div className="p-4 bg-white rounded-xl flex flex-col justify-between gap-4 drop-shadow-2xl">

                <div className="bg-primary-100/10 rounded-xl p-4">
                <div className="flex items-center gap-4 mb-4">

                    <HiIdentification className="text-4xl -rotate-12" />
                    <div>
                    <h3 className="font-bold">Create service</h3>
                    <p className="text-gray-500">Grooming, Medical</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <button onClick={paraServicio} className="bg-primary-100 py-2 px-6 rounded-xl text-white w-full">
                        Assign
                    </button>
                    </div>
                </div>

                <div className="bg-primary-100/10 rounded-xl p-4">
                    <div className="flex items-center gap-4 mb-4">
                    <MdHomeWork className="text-5xl" />
                    <div>
                    <h3 className="font-bold">Create branch office</h3>
                    <p className="text-gray-500">different departments </p>
                    </div>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <button onClick={paraSucursal} className="bg-primary-100 py-2 px-6 rounded-xl text-white w-full">
                        Assign
                    </button>
                    </div>
                </div>
            </div>

            </section>
            {/* Section 2 */}
            <section className="grid grid-cols-1 md:grid-cols-2 mt-10 gap-8">
            <div>
                <h1 className="text-2xl font-bold mb-8">Employee of the month</h1>
                <div className="bg-white p-8 rounded-xl shadow-2xl mb-8 flex flex-col gap-8">
                {/* Card 1 */}
                <div className="grid grid-cols-1 xl:grid-cols-4 items-center gap-4 mb-4">
                    <div className="col-span-2 flex items-center gap-4">
                    <img
                        src="https://scontent.fgua3-5.fna.fbcdn.net/v/t39.30808-6/311457690_124029940430566_6791945965851630984_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=qkFnkJypW70Q7kNvgFVRdlz&_nc_zt=23&_nc_ht=scontent.fgua3-5.fna&_nc_gid=ATyBk4VHDcSwcruRvxqvkFV&oh=00_AYBfe12ubPW6BjbcIxPzKyO3byrsLvgeC8W96ATER5harw&oe=67190C69"
                        className="w-14 h-14 object-cover rounded-xl"
                    />
                    <div>
                        <h3 className="font-bold">Melvin Cortez</h3>
                        <p className="text-gray-500">Medico veterinario</p>
                    </div>
                    </div>
                    <div>
                    <span className="bg-green-100 text-green-800 py-1 px-3 rounded-full font-medium">
                        Citas medicas
                    </span>
                    </div>
                    <div>
                    <span className="font-bold">8</span>
                    </div>
                </div>
                {/* Card 2 */}
                <div className="grid grid-cols-1 xl:grid-cols-4 items-center gap-4 mb-4">
                    <div className="col-span-2 flex items-center gap-4">
                    <img
                        src="https://scontent.fgua3-6.fna.fbcdn.net/v/t39.30808-6/384497621_994998641721134_3534505849006573885_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=Nu2Lhg6iQNIQ7kNvgGxuUDa&_nc_zt=23&_nc_ht=scontent.fgua3-6.fna&_nc_gid=A4xiGCSLafQnfF5pk0eVxSd&oh=00_AYABDU4RatgHG0JQHPz2CIC7Nw-A7rbiezl9as-2Zct6uw&oe=6718EB97"
                        className="w-14 h-14 object-cover rounded-xl"
                    />
                    <div>
                        <h3 className="font-bold">José Alejandro </h3>
                        <p className="text-gray-500">Gromista</p>
                    </div>
                    </div>
                    <div>
                    <span className="bg-green-100 text-red-800 py-1 px-3 rounded-full font-medium">
                        Groming citas
                    </span>
                    </div>
                    <div>
                    <span className="font-bold"> 6</span>
                    </div>
                </div>
                </div>
                <div className="bg-primary-900 text-gray-300 p-8 rounded-xl shadow-2xl flex items-center justify-between flex-wrap xl:flex-nowrap gap-8">
                <div>
                    <RiHashtag className="text-4xl -rotate-12" />
                </div>
                <div>
                    <h5 className="font-bold text-white">Schedule an appointment</h5>
                    <h5>Medical or grooming</h5>
                </div>
                <div className="w-full xl:w-auto">
                    <button onClick={paraAgendarCita} className="bg-primary-100 py-2 px-6 rounded-xl text-white w-full">
                    Schedule 
                    </button>
                </div>
                </div>
            </div>
            <div>
                <h1 className="text-2xl font-bold mb-8">oters funtions</h1>
  
            </div>
        </section>
        </>
    );


}

export default Home;