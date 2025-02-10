"use client";

import Slider from "react-slick";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/24/solid";

// Definir el tipo de datos
interface CourseType {
  id: number;
  heading: string;
  heading2: string;
  imgSrc: string;
  name: string;
  students: number;
  classes: number;
  price: number;
  rating: number;
}

// Obtener la URL del backend desde .env
const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const MultipleItems: React.FC = () => {
  const [courses, setCourses] = useState<CourseType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`${API_URL}/api/courses/`);
        if (!response.ok) {
          throw new Error("Error al cargar los cursos");
        }
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Error al obtener los cursos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Configuración del slider
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 2,
    arrows: false,
    autoplay: false,
    speed: 500,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1200,
        settings: { slidesToShow: 2, slidesToScroll: 1, infinite: true, dots: false }
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1, slidesToScroll: 1, infinite: true, dots: false }
      }
    ]
  };

  return (
    <div id="courses">
      <div className="mx-auto max-w-7xl sm:py-8 px-4 lg:px-8">
        <div className="sm:flex justify-between items-center">
          <h3 className="text-midnightblue text-4xl lg:text-55xl font-semibold mb-5 sm:mb-0">
            Popular courses.
          </h3>
          <Link href={"/"} className="text-Blueviolet text-lg font-medium space-links">
            Explore courses&nbsp;&gt;&nbsp;
          </Link>
        </div>

        {loading ? (
          <p className="text-center text-lg">Cargando cursos...</p>
        ) : (
          <Slider {...settings}>
            {courses.map((course) => (
              <div key={course.id}>
                <div className="bg-white m-3 px-3 pt-3 pb-12 my-20 shadow-courses rounded-2xl">
                  <div className="relative rounded-3xl">
                    <Image src={course.imgSrc} alt={course.heading} width={389} height={262} className="m-auto clipPath" />
                    <div className="absolute right-5 -bottom-2 bg-ultramarine rounded-full p-6">
                      <h3 className="text-white uppercase text-center text-sm font-medium">
                        best <br /> seller
                      </h3>
                    </div>
                  </div>

                  <div className="px-3">
                    <h4 className="text-2xl font-bold pt-6 text-black">{course.heading}</h4>
                    <h4 className="text-2xl font-bold pt-1 text-black">{course.heading2}</h4>

                    <div>
                      <h3 className="text-base font-normal pt-6 opacity-75">{course.name}</h3>
                    </div>

                    <div className="flex justify-between items-center py-6">
                      <div className="flex gap-4">
                        <h3 className="text-red text-22xl font-medium">{course.rating}</h3>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <StarIcon key={i} className="h-5 w-5 text-gold" />
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-3xl font-medium">${course.price}</h3>
                      </div>
                    </div>

                    <hr style={{ color: "#C4C4C4" }} />

                    <div className="flex justify-between pt-6">
                      <div className="flex gap-4">
                        <Image src={"/assets/courses/book-open.svg"} alt="classes" width={24} height={24} className="inline-block m-auto" />
                        <h3 className="text-base font-medium text-black opacity-75">{course.classes} classes</h3>
                      </div>
                      <div className="flex gap-4">
                        <Image src={"/assets/courses/users.svg"} alt="students" width={24} height={24} className="inline-block m-auto" />
                        <h3 className="text-base font-medium text-black opacity-75">{course.students} students</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
};

export default MultipleItems;
