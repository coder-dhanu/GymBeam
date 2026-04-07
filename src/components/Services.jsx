import React from 'react';
import { ArrowRight } from 'lucide-react';

const Services = () => {
  const servicesData = [
    {
      title: "GROUP CLASSES",
      desc: "High-intensity interval training, strength cycles, and mobility sessions led by expert instructors.",
      linkText: "VIEW SCHEDULE"
    },
    {
      title: "PERSONAL TRAINING",
      desc: "Customized one-on-one coaching specifically for your physiological metrics and performance goals.",
      linkText: "LEARN MORE"
    },
    {
      title: "ELITE COACHING",
      desc: "Professional athlete preparation, competition programming, and technical analysis.",
      linkText: "LEARN MORE"
    },
    {
      title: "YOUTH ACADEMY",
      desc: "Specialized movement development programs for toddlers and young athletes to build a foundation.",
      linkText: "ENROLL NOW"
    }
  ];

  return (
    <section id="services" className="py-20 bg-bg-sec border-t border-white/5">
      <div className="max-w-[1280px] mx-auto px-5">
        
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-[56px] italic mb-2.5 tracking-[2px] font-heading">
            <span className="text-white">OUR</span> <span className="text-primary text-[56px] font-heading">SERVICES</span>
          </h2>
          <div className="w-[60px] h-1 bg-primary"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {servicesData.map((service, index) => (
            <div className="bg-bg-tert p-10 px-8 flex flex-col justify-between min-h-[280px] border-t-4 border-transparent transition-all duration-300 hover:border-t-primary hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] group" key={index}>
              <div>
                <h3 className="text-2xl italic mb-4 font-heading">{service.title}</h3>
                <p className="text-[13px] text-text-sec leading-[1.6]">{service.desc}</p>
              </div>
              <a href="#" className="flex items-center gap-2.5 text-[11px] font-bold tracking-[1px] text-text-sec uppercase mt-8 transition-colors duration-300 group-hover:text-primary">
                {service.linkText} <ArrowRight size={16} />
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Services;
