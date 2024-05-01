import { Footer } from "../components/footer";
import { Navbar } from "../components/navbar";
import { getResponsiveClasses } from "../shared/constants/getResponsiveClasses";
import about_us from "../assets/about_us_image.png";
import { SubscribeSection } from "../components/home_sections/subscribe";
import Image from "next/image";

export default function AboutUs() {
  return (
    <div className="flex-grow w-full flex flex-col">
      <Navbar bgClassApplied />
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 gap-x-9 gap-y-9 grow my-16 ${"responsive"}`}
      >
        <div className="">
          <h1 className="text-primary text-3xl font-bold">About us</h1>
          <p className="my-3">
            Welcome to Xtreme Tools, a dynamic hub at the intersection of
            cutting-edge technology and limitless creativity. With a mission to
            redefine the landscape of artificial intelligence, Xtreme Tools
            stands as a beacon for innovators, creators, and businesses seeking
            to harness the true potential of AI. <br />
            <br />
            At Xtreme Tools, we believe in pushing the frontiers of what's
            possible. Our dedicated team of experts is committed to crafting
            advanced AI solutions that empower you to navigate the digital
            landscape with unprecedented intelligence and efficiency. We're not
            just a platform; we're a community of forward-thinkers on a
            collective journey to shape the future.
          </p>
        </div>
        <div className="flex justify-center items-center">
          <Image className="" src={about_us} alt="" />
        </div>
      </div>
      <SubscribeSection />
      <Footer />
    </div>
  );
}
