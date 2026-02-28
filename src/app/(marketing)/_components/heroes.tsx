import { BsCardText, BsController, BsCpu } from "react-icons/bs";

export const Heroes = () => {
  const features = [
    {
      icon: BsCardText,
      title: "Smart Flashcards",
      description: "Create, organize, and study with beautifully designed flashcards. Drag-and-drop reordering and collections make studying a breeze.",
      gradient: "from-blue-500/10 to-cyan-500/10 dark:from-blue-500/20 dark:to-cyan-500/20",
      border: "border-blue-200/50 dark:border-blue-700/30",
      iconBg: "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400",
    },
    {
      icon: BsController,
      title: "Pixel Adventure",
      description: "Explore a charming pixel-art game world with your character. Navigate the map, encounter NPCs, and discover hidden areas.",
      gradient: "from-emerald-500/10 to-green-500/10 dark:from-emerald-500/20 dark:to-green-500/20",
      border: "border-emerald-200/50 dark:border-emerald-700/30",
      iconBg: "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400",
    },
    {
      icon: BsCpu,
      title: "AI Image Generation",
      description: "Generate unique images with AI to enhance your flashcards and make your study materials more visual and memorable.",
      gradient: "from-teal-500/10 to-cyan-500/10 dark:from-teal-500/20 dark:to-cyan-500/20",
      border: "border-teal-200/50 dark:border-teal-700/30",
      iconBg: "bg-teal-100 dark:bg-teal-900/50 text-teal-600 dark:text-teal-400",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Section header */}
      <div className="text-center mb-12 md:mb-16 animate-fade-in-up">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
          Everything you need to{" "}
          <span className="gradient-text">learn effectively</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Memoize combines three powerful tools into one seamless experience.
        </p>
      </div>

      {/* Feature cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {features.map((feature, i) => {
          const IconComponent = feature.icon;
          return (
            <div
              key={feature.title}
              className={`group relative rounded-2xl p-6 md:p-8
                bg-gradient-to-br ${feature.gradient}
                border ${feature.border}
                backdrop-blur-sm
                transition-all duration-300
                hover:scale-[1.03] hover:shadow-xl hover:shadow-blue-500/5
                animate-fade-in-up-delay-${i + 1}`}
            >
              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl ${feature.iconBg} flex items-center justify-center mb-5
                group-hover:scale-110 transition-transform duration-300`}>
                <IconComponent className="w-6 h-6" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                {feature.description}
              </p>

              {/* Hover decorative element */}
              <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-gradient-to-br from-white/5 to-white/0 
                opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          );
        })}
      </div>
    </div>
  )
}
