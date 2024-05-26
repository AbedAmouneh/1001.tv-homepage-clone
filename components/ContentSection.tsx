import React from "react";

interface ContentSectionProps {
  title: string;
  items: { title: string; imageUrl: string }[];
}

const ContentSection: React.FC<ContentSectionProps> = ({ title, items }) => {
  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-gray-800 text-white rounded-lg overflow-hidden"
          >
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold">{item.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ContentSection;
