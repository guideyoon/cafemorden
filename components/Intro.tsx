import siteData from "@/data/site.json";

export default function Intro() {

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-3xl text-center">
        <p className="text-xl text-gray-700 leading-relaxed">
          {siteData.intro}
        </p>
      </div>
    </section>
  );
}

