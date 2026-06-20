import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Project from "@/components/Project";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <section className="relative">
        <div className="lg:sticky lg:top-0 lg:z-0 lg:h-screen lg:overflow-hidden">
          <Skills />
        </div>

        <div className="relative z-10 lg:shadow-[0_-32px_80px_rgba(5,12,16,0.24)]">
          <Project />
        </div>
      </section>
      <Contact />
    </>
  );
}
