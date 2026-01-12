import React from "react";

const RecentWork = () => {
  const recentProjects = [
    {
      title: "AssetVerse Management System",
      description: "MERN stack asset management system with role-based dashboards.",
      image: "https://i.ibb.co.com/whs57m9n/Asset-Details-View.png",
      link: "#",
    },
    {
      title: "E-commerce Platform",
      description: "Online shopping site with Stripe payment integration.",
      image: "https://i.ibb.co.com/4ZM428gN/images-q-tbn-ANd9-Gc-Th-BMIon0-FCda4-SLg-U-zb45ln-Bk0g-x-Ld6-Mr-FFashp-s.jpg",
      link: "#",
    },
    {
      title: "Portfolio Website",
      description: "Personal portfolio built with React and Tailwind CSS.",
      image: "https://i.ibb.co.com/Q7sczyx4/images-q-tbn-ANd9-Gc-Tr9-DUp-Ki-ODrtu4-PZZ5z-Up-Nd-b0-Wplb3-Stt-Mw-s.jpg",
      link: "#",
    },
  ];

  return (
    <section id="recent-work" className="py-20 bg-gray-50 mt-2 rounded-2xl">
      <div className="container mx-auto px-6 md:px-20">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">
          Recent Work
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentProjects.map((project, index) => (
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

export default RecentWork;
