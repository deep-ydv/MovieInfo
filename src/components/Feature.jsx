import { Film, Star, Tv, Clapperboard, Users, PlayCircle, BadgeHelp } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  { icon: <Film size={36} />, title: 'Movies' },
  { icon: <Tv size={36} />, title: 'Series' },
  { icon: <Clapperboard size={36} />, title: 'Cast & Crew' },
  { icon: <Star size={36} />, title: 'Ratings & Reviews' },
  // { icon: <PlayCircle size={36} />, title: 'Watch Platforms' },
  // { icon: <BadgeHelp size={36} />, title: 'Trailers & Clips' },
  // { icon: <Users size={36} />, title: 'Community' },
];

const FeatureSection = () => {
  return (
    <section className="w-full bg-gradient-to-r from-gray-900  to-[#000000] py-10 px-6 md:px-16 rounded-xl flex flex-col justify-center items-center">
      <h2 className="text-white text-3xl md:text-4xl font-bold text-center mb-10">
        Explore Features
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8 justify-around w-[80%] ">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-white/10 border border-white/20 text-white p-4 rounded-2xl shadow-md flex flex-col items-center justify-center h-32 hover:scale-105 transition-all"
          >
            <div className="mb-2">{feature.icon}</div>
            <h3 className="font-semibold text-center text-sm md:text-base">
              {feature.title}
            </h3>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeatureSection;
