import { Info, Star, Film, Tv, PlayCircle } from "lucide-react";

const AboutSection = () => {
  return (
    <section className="bg-gradient-to-l from-gray-900 to-black text-white py-12 px-6 md:px-16 rounded-xl">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            Discover Movies & Shows Like Never Before 🎬
          </h2>
          <p className="text-gray-300 text-lg">
            MovieInfo lets you explore details about any <span className="font-semibold text-white">movie</span> or <span className="font-semibold text-white">series</span>. Find out ratings, reviews, where to stream it, and more — all in one place.
          </p>

          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <Info className="text-yellow-400 mt-1" />
              <span>
                Detailed Information: Cast, Budget, Revenue, Runtime, and Overview.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="text-yellow-400 mt-1" />
              <span>
                Ratings & Reviews: Community reviews and IMDB-style ratings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PlayCircle className="text-yellow-400 mt-1" />
              <span>
                Streaming Availability: Know if it's available on Netflix, Prime, Disney+, etc.
              </span>
            </li>
          </ul>
        </div>

        {/* Image/Visual Content */}
        <div className="relative">
          <img
            src="https://britasia.tv/wp-content/uploads/2019/02/bollywood-collage-220151208193011.jpg"
            alt="Movie collage"
            className="rounded-xl shadow-2xl w-full object-cover"
          />
          <div className="absolute -bottom-6 -right-6 bg-yellow-400 text-black text-sm font-semibold px-4 py-2 rounded-lg shadow-md">
            Powered by TMDB
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
