const features = [
  {
    icon: "⚡",
    title: "Fast Reporting",
    description: "Report civic issues in less than a minute with a simple form.",
  },
  {
    icon: "📍",
    title: "Live Tracking",
    description: "Track your complaint status in real time from submission to resolution.",
  },
  {
    icon: "📸",
    title: "Photo Evidence",
    description: "Upload photos to help authorities verify and resolve issues faster.",
  },
  {
    icon: "🔒",
    title: "Secure Platform",
    description: "Your data is protected with secure authentication and encrypted access.",
  },
];

function WhyChoose() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <span className="text-blue-600 font-semibold uppercase tracking-wider">
            Why CivicFix
          </span>

          <h2 className="text-5xl font-bold mt-3 mb-5">
            Built for Citizens,
            <span className="text-blue-600"> Trusted by Communities</span>
          </h2>

          <p className="max-w-3xl mx-auto text-lg text-gray-600">
            CivicFix simplifies reporting civic issues by combining location,
            images, and real-time tracking into one modern platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-xl bg-blue-100 flex items-center justify-center text-3xl mb-6">
                {item.icon}
              </div>

              <h3 className="text-xl font-bold mb-4">
                {item.title}
              </h3>

              <p className="text-gray-600 leading-7">
                {item.description}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default WhyChoose;