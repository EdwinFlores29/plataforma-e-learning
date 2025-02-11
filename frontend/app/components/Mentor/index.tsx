"use client";
import Slider from "react-slick";
import React, { useState, useEffect } from "react";
import Image from "next/image";

// INTERFACE PARA LOS DATOS
interface DataType {
    profession: string;
    name: string;
    imgSrc: string;
}
// Obtener la URL del backend desde .env
const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// FUNCIONES PARA LAS FLECHAS DEL CAROUSEL
// CAROUSEL SETTINGS

function SampleNextArrow(props: { className: any; style: any; onClick: any; }) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "flex", justifyContent: "center", position: 'absolute', alignItems: "center" , background: "#D5EFFA", padding: "28px", borderRadius: "30px", border: "1px solid #1A21BC" }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props: { className: any; style: any; onClick: any; }) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "flex", justifyContent: "center", alignItems: "center" , background: "#D5EFFA", padding: "28px", borderRadius: "30px", border: "1px solid #1A21BC" }}
            onClick={onClick}
        />
    );
}

// COMPONENTE PRINCIPAL
const MultipleItems: React.FC = () => {
    const [mentors, setMentors] = useState<DataType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // FETCH A LA API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_URL}/api/mentor/`); // 🔹 Reemplaza con la URL de tu API
                if (!response.ok) throw new Error("Error al obtener datos");
                const data = await response.json();
                setMentors(data);
            } catch (err) {
                setError("No se pudieron cargar los datos.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // CONFIGURACIÓN DEL CARRUSEL
    const settings = {
        dots: false,
            infinite: true,
            slidesToShow: 3,
            // centerMode: true,
            slidesToScroll: 1,
            arrows: false,
            autoplay: false,
            speed: 4000,
            nextArrow: <SampleNextArrow className={undefined} style={undefined} onClick={undefined} />,
            prevArrow: <SamplePrevArrow className={undefined} style={undefined} onClick={undefined} />,
            autoplaySpeed: 4500,
            cssEase: "linear",
        responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: false
                    }
                },
                {
                    breakpoint: 1000,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: false
                    }
                },
                {
                    breakpoint: 530,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: false
                    }
                }
            ]
        };

    // MOSTRAR CARGANDO O ERROR
    if (loading) return <p className="text-center text-gray-500">Cargando mentores...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="py-10 sm:py-24 bg-paleblue" id="mentor">
            <div className="mx-auto max-w-2xl lg:max-w-7xl sm:py-4 px-4 lg:px-8 relative">
                <h2 className="lh-82 text-midnightblue text-4xl md:text-55xl text-center md:text-start font-semibold">
                    Meet with our <br /> mentor.
                </h2>

                <Slider {...settings}>
                    {mentors.map((mentor, i) => (
                        <div key={i}>
                            <div className="m-3 py-14 md:my-10 text-center">
                                <div className="relative">
                                    <Image src={mentor.imgSrc} alt="user-image" width={306} height={0} className="inline-block m-auto" />
                                    <div className="absolute right-[84px] bottom-[102px] bg-white rounded-full p-4">
                                        <Image src={"/assets/mentor/linkedin.svg"} alt="linkedin" width={25} height={24} />
                                    </div>
                                </div>
                                <div className="-mt-10">
                                    <h3 className="text-2xl font-semibold text-lightblack">{mentor.name}</h3>
                                    <h4 className="text-lg font-normal text-lightblack pt-2 opacity-50">{mentor.profession}</h4>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default MultipleItems;
