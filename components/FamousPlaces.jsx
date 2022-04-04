import React from "react";
import Link from "next/link";
import Image from "next/image";

// import Images

import LondonImg from "../public/images/london.jpg";
import ToshkentImg from "../public/images/Tashkent.jpg";
import NewYorkImg from "../public/images/new-york.jpg";
import ParisImg from "../public/images/paris.jpg";

const places = [
  {
    name: "Toshkent",
    image: ToshkentImg,
    url: "/location/toshkent-viloyati-1484838",
  },
  {
    name: "London",
    image: LondonImg,
    url: "/location/londonderry-county-borough-2643734",
  },
  {
    name: "New York",
    image: NewYorkImg,
    url: "/location/new-york-mills-5039192",
  },
  {
    name: "Paris",
    image: ParisImg,
    url: "/location/paris-2968815",
  },
];

export default function FamousPlaces() {
  console.log(places[0].image);
  return (
    <div className="places">
      <div className="places__row">
        {places.map((place, index) => (
          <div className="places__box" key={index}>
            <Link href={place.url}>
              <a>
                <div className="places__image-wrapper">
                  <Image
                    src={place.image}
                    alt={`Image ${place.name}`}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <span>{place.name}</span>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
