"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import emblaCarousel from "embla-carousel";
import { useEffect, useRef, useState } from "react";

const TeamScroll = () => {
  const users = [
    {
      name: "Sophie Chamberlain",
      role: "Specialized Support",
      image: "/headshot/Image-user-1.jpg",
    },
    {
      name: "Lana Steiner",
      role: "VP of Customer Success",
      image: "/headshot/Image-user-2.jpg",
    },
    {
      name: "Orlando Diggs",
      role: "Customer Success Lead",
      image: "/headshot/Image-user-3.jpg",
    },
    {
      name: "Sasha Kindred",
      role: "Customer Success Lead",
      image: "/headshot/Image-user-4.jpg",
    },
    {
      name: "Sasha Kindred",
      role: "Customer Success Lead",
      image: "/headshot/Image-user-5.jpg",
    },
    {
      name: "Sasha Kindred",
      role: "Customer Success Lead",
      image: "/headshot/Image-user-6.jpg",
    },
    {
      name: "Sasha Kindred",
      role: "Customer Success Lead",
      image: "/headshot/Image-user-7.jpg",
    },
    {
      name: "Sasha Kindred",
      role: "Customer Success Lead",
      image: "/headshot/Image-user-8.jpg",
    },
  ];
  const emblaRef = useRef<HTMLDivElement>(null);
  const [embla, setEmbla] = useState<ReturnType<typeof emblaCarousel> | null>(
    null
  );
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(true);

  useEffect(() => {
    if (emblaRef.current) {
      const emblaInstance = emblaCarousel(emblaRef.current, { loop: false });
      setEmbla(emblaInstance);

      emblaInstance.on("select", () => {
        setPrevBtnEnabled(emblaInstance.canScrollPrev());
        setNextBtnEnabled(emblaInstance.canScrollNext());
      });
    }
  }, []);

  const scrollPrev = () => embla?.scrollPrev();
  const scrollNext = () => embla?.scrollNext();

  return (
    <div className="relative w-full">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex space-x-4 py-4">
          {users.map((user, index) => (
            <div
              key={index}
              className="min-w-[200px] bg-white shadow-lg rounded-lg p-4 flex flex-col items-center"
            >
              <div className="w-32 h-32 relative">
                <Image
                  src={user.image}
                  alt={user.name}
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-full"
                />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{user.name}</h3>
              <p className="text-gray-500">{user.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <button
        onClick={scrollPrev}
        disabled={!prevBtnEnabled}
        className={`absolute left-0 top-1/2 transform -translate-y-1/2 p-2 ${
          !prevBtnEnabled ? "opacity-50" : ""
        }`}
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={scrollNext}
        disabled={!nextBtnEnabled}
        className={`absolute right-0 top-1/2 transform -translate-y-1/2 p-2 ${
          !nextBtnEnabled ? "opacity-50" : ""
        }`}
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default TeamScroll;
