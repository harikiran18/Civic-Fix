const categories = [
  { emoji: "🛣️", title: "Road Damage", description: "Report potholes and damaged roads." },
  { emoji: "💡", title: "Street Lights", description: "Report broken street lights." },
  { emoji: "🗑️", title: "Garbage", description: "Report overflowing garbage bins." },
  { emoji: "🚰", title: "Water Supply", description: "Report water leakage issues." },
  { emoji: "🌳", title: "Parks", description: "Report damaged parks." },
  { emoji: "🚦", title: "Traffic Signals", description: "Report broken traffic signals." },
];

function Categories() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="text-4xl font-bold text-center mb-4">
          Complaint Categories
        </h2>

        <p className="text-center text-lg text-gray-600 mb-12">
          Select the type of civic issue you want to report.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {categories.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-gray-200 shadow-md p-8 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-5xl mb-5">{item.emoji}</div>

              <h3 className="text-2xl font-semibold mb-3">
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

export default Categories;