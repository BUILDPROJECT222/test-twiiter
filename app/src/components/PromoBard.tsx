import React from "react";

const PromoBar: React.FC = () => {
  const cards = [
    {
      name: "Abble",
      imgSrc:
        "https://pbs.twimg.com/profile_images/1766608904153141248/lM8keUnD_400x400.jpg",
      link: "https://twitter.com/Abblecoin",
    },
    {
      name: "Kero 🐸🦇🔊",
      imgSrc:
        "https://pbs.twimg.com/profile_images/1681777814926766080/2NgQaPbr_400x400.jpg",
      link: "https://twitter.com/KeroNFTs",
    },
    {
      name: "SMLE 🙂",
      imgSrc:
        "https://pbs.twimg.com/profile_images/1768711359309438976/djkqnGb0_400x400.jpg",
      link: "https://twitter.com/SMLE_SOL",
    },
  ];

  return (
    <aside className="flex flex-col items-center md:items-stretch space-y-2 md:space-y-4 md:ml-4">
      {cards.map((card, index) => (
        <div
          key={index}
          className="flex flex-col justify-center items-center w-48 bg-white border border-gray-200 rounded-lg shadow-md p-4"
        >
          <img
            src={card.imgSrc}
            alt={`Ad Spot ${index + 1}`}
            className="h-32 mb-2"
          />
          <h3 className="text-xl font-bold mb-2">{card.name}</h3>
          <a href={card.link} target="_blank" rel="noopener noreferrer">
            <button className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-full">
              @{card.name}
            </button>
          </a>
        </div>
      ))}
    </aside>
  );
};

export default PromoBar;
