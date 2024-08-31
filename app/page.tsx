import NavBar from "@/components/NavBar/NavBar";
import Hero from "./Hero/page";
import Particle from "@/components/Particules/Particule";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <div>
        <NavBar />
        <div className="mt-0">
          <Hero />
        </div>
        <Footer />
      </div>
    </div>
  );
}
