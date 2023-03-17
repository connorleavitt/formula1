import { useState } from "react";

type RaceSchedule = {
  season: number;
  round: number;
  url: string;
  raceName: string;
  Circuit: {
    circuitId: string;
    url: string;
    circuitName: string;
    Location: {
      lat: number;
      long: number;
      locality: string;
      country: string;
    };
  };
  date: string;
  time: string;
  FirstPractice: {
    date: string;
    time: string;
  };
  SecondPractice: {
    date: string;
    time: string;
  };
  ThirdPractice: {
    date: string;
    time: string;
  };
  Qualifying: {
    date: string;
    time: string;
  };
  Sprint: {
    date: string;
    time: string;
  };
};

type CarouselProps = {
  children: RaceSchedule[];
};

export function Carousel({ children }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((currentIndex + 1) % children.length);
  };

  const prev = () => {
    setCurrentIndex(
      currentIndex === 0 ? children.length - 1 : currentIndex - 1
    );
  };

  return (
    <div className="relative w-[1100px]">
      <div className="flex overflow-x-scroll scrollbar-hide">
        {children.map((child, index) => (
          <div
            key={index}
            className={`w-min flex-shrink-0 flex-grow-0 flex-basis-screen transition-all transform duration-500 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            {child.raceName}
          </div>
        ))}
      </div>
      <div className="absolute top-1/2 left-0 right-0 flex justify-between">
        <button
          className="absolute top-1/2 left-0 transform -translate-y-1/2 px-4 py-2 font-bold text-white bg-black rounded-full focus:outline-none"
          onClick={prev}
        >
          {"<"}
        </button>
        <button
          className="absolute top-1/2 right-0 transform -translate-y-1/2 px-4 py-2 font-bold text-white bg-black rounded-full focus:outline-none"
          onClick={next}
        >
          {">"}
        </button>
      </div>
    </div>
  );
}
