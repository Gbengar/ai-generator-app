import Image from "next/image";

export default function About() {
  return (
    <div className="max-w-7xl mx-auto p-10 flex flex-col space-y-16">
      {/* Our Mission Section */}
      <div className="flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 md:pr-8">
          <h2 className="text-4xl font-bold mb-4 text-primary">Our Mission</h2>
          <p className="text-gray-700">
            At Creatotum Inc, our mission is to revolutionize content creation
            through cutting-edge AI technology. We strive to offer accessible,
            efficient, and high-quality content generation services tailored to
            the unique needs of every user, from bloggers and marketers to
            developers and social media influencers. By continuously refining
            our tools and templates, we aim to simplify the creative process,
            helping users transform their ideas into engaging, impactful
            content.
          </p>
        </div>
        <div className="w-full md:w-1/2 mt-8 md:mt-0 flex justify-center items-center">
          <div className="relative w-full max-w-md aspect-[4/3] animate__animated animate__wobble animate__delay-2s">
            <Image
              src="/about-mission.jpg"
              alt="Team members and dog"
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          </div>
        </div>
      </div>

      {/* Our Vision Section */}
      <div className="flex flex-col md:flex-row-reverse items-center">
        <div className="w-full md:w-1/2 md:pl-8">
          <h2 className="text-4xl font-bold mb-4 text-red-700">Our Vision</h2>
          <p className="text-gray-700">
            At Creatotum Inc., we envision a future where content creation is
            seamless, intelligent, and accessible to everyone. By harnessing the
            power of artificial intelligence, we aim to empower creators,
            entrepreneurs, and businesses to bring their ideas to life
            effortlessly. Our vision is to redefine the boundaries of
            creativity, allowing anyone to produce high-quality content quickly
            and easily, no matter their skill level. We strive to be the go-to
            platform for innovative content solutions, fueling the next
            generation of creators and helping them share their stories with the
            world.
          </p>
          <div className="animate__animated animate__heartBeat animate__delay-2s"></div>
        </div>
        <div className="w-full md:w-1/2 mt-8 md:mt-0 flex justify-center items-center">
          <div className="relative w-full max-w-md aspect-[4/3] animate__animated animate__wobble animate__delay-2s">
            <Image
              src="/about-vision.jpg"
              alt="Creative Vision"
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
