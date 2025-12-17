import React from "react";

const CaseStudies = () => {
  const caseStudies = [
    {
      title: "AssetVerse Management System",
      description: "A full MERN stack asset management web application.",
      challenge: "Managing asset allocation and employee assignments efficiently.",
      solution: "Implemented a role-based system with dashboards, JWT authentication, and Stripe payments.",
      technologies: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
      image: "https://i.ibb.co.com/JRrqS3mc/images-q-tbn-ANd9-Gc-SUYsb6hu-KT4t-Zak6dfhm-Nj-JMv-Wc-Bz-Cr-Hk-Az-Q-s.jpg",
      link: "#",
    },
    {
      title: "E-commerce Website",
      description: "Online shopping platform with payment integration.",
      challenge: "Secure checkout and dynamic product management.",
      solution: "Integrated Stripe for payments and MongoDB for product database.",
      technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe"],
      image: "https://i.ibb.co.com/zhL5hzLC/images-q-tbn-ANd9-Gc-RZFc-ARAx82-Qf6-P-yts-Qu-DF2-UYHh-U85e93-AAc6-ADs1-X-s.jpg",
      link: "#",
    },
    {
      title: "Portfolio Website",
      description: "Personal portfolio to showcase projects and skills.",
      challenge: "Responsive and modern design with smooth scrolling.",
      solution: "Used React + Tailwind CSS with react-scroll for smooth navigation.",
      technologies: ["React", "Tailwind CSS", "React Scroll"],
      image: "https://i.ibb.co.com/60VYyMF2/images-q-tbn-ANd9-Gc-Ru-LEjo4upe8l-BNb-VXh1-UP-K-A6o52z99-Nflfcf87-Dw-s.jpg",
      link: "#",
    },
  ];

  return (
    <section id="case-studies" className="py-20 bg-gray-50 mt-2 rounded-2xl">
      <div className="container mx-auto px-6 md:px-20">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">
          Case Studies
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((caseStudy, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow hover:shadow-lg overflow-hidden transition duration-300"
            >
              <img
                src={caseStudy.image}
                alt={caseStudy.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{caseStudy.title}</h3>
                <p className="text-gray-600 mb-2">{caseStudy.description}</p>
                <p className="text-gray-700 mb-2">
                  <strong>Challenge:</strong> {caseStudy.challenge}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Solution:</strong> {caseStudy.solution}
                </p>
                <p className="text-gray-700 mb-4">
                  <strong>Technologies:</strong>{" "}
                  {caseStudy.technologies.join(", ")}
                </p>
                <a
                  href={caseStudy.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 font-medium"
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

export default CaseStudies;
