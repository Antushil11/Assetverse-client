import React from "react";

const CreativeWork = () => {
  const projects = [
    {
      title: "Brand Identity Design",
      description: "Designed full branding for a startup, including logo, colors, and typography.",
      image: "https://i.ibb.co.com/xKSrqJyz/images-q-tbn-ANd9-Gc-Tm-Q9-Tmtkk-Fr-JM5q-LUZ9-CQymd3-Qfj-Ama-EVi-UCWzccw1-s.jpg",
      link: "#",
    },
    {
      title: "UI/UX Mobile App",
      description: "Created user-friendly mobile app interfaces with Figma and React Native.",
      image: "https://i.ibb.co.com/SDGbdmxb/images-q-tbn-ANd9-Gc-Q5-VDRQC6q-Sd-Lk7o-n-KRc-PGWBjdmba-Vjzef-IBL6yiu-Zew-s.jpg",
      link: "#",
    },
    {
      title: "Website Redesign",
      description: "Redesigned an e-commerce website to improve user experience and conversion.",
      image: "https://i.ibb.co.com/TMXx4Tbq/images-q-tbn-ANd9-Gc-SGF803jp46-L1b-Rj-ZT1c-J4a-YY-Oe-US-VCl-PEqqo-Jn9-s.jpg",
      link: "#",
    },
    {
      title: "Illustrations & Graphics",
      description: "Created custom illustrations for social media and web campaigns.",
      image: "https://i.ibb.co.com/M53H8Lyj/images-q-tbn-ANd9-Gc-T7-Mk6n-VAVu53r-GZ67cyes03-Jioxqqf-Jq6-Ifu-7-IIJXng-s.jpg",
      link: "#",
    },
  ];

  return (
    <section id="creative-work" className="py-20 mt-22 bg-gray-50  rounded-2xl ">
      <div className="container mx-auto px-6 md:px-20">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">
          Creative Work
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow hover:shadow-lg overflow-hidden transition duration-300"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary  font-medium"
                >
                  View Project
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CreativeWork;
