import siteData from "@/data/site.json";

export default function Intro() {

  return (
    <section className="py-16 bg-cream-light">
      <div className="container mx-auto px-4 max-w-3xl text-center">
        <p className="text-xl text-text-base leading-relaxed">
          {siteData.intro}
        </p>
      </div>
    </section>
  );
}

