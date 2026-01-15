import CharacterInterface from "@/interfaces/character";

interface Props {
  characters: CharacterInterface;
  account: string | null;
  loading: boolean;
  onBuy: (id: number) => void;
}

export const CharacterCard = ({
  characters,
  account,
  loading,
  onBuy,
}: Props) => {
  const isOwner =
    characters.currentOwner.toLowerCase() === account?.toLowerCase();
  const isSold =
    characters.currentOwner !== "0x0000000000000000000000000000000000000000";

  return (
    <div
      key={characters.id}
      className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition border border-gray-200"
    >
      <div className="relative rounded-md overflow-hidden mb-4">
        <img
          src={characters.image || "/default-character.png"}
          alt={characters.name || "character image"}
          className="adsolute w-full h-52 object-cover"
        />
      </div>
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-bold text-gray-900">{characters.name}</h3>
        <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded">
          #{characters.id}
        </span>
      </div>

      <p className="text-gray-600">
        Price:{" "}
        <span className="font-bold text-blue-600">{characters.price} ETH</span>
      </p>

      <p className="text-sm text-gray-500 mb-4 truncate">
        Owner: {isSold ? characters.currentOwner : "System (Available)"}
      </p>

      <button
        onClick={() => onBuy(characters.id)}
        disabled={loading || isOwner || isSold}
        className={`w-full py-2 px-4 rounded-lg font-bold text-white transition ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : isOwner
            ? "bg-green-500 cursor-default"
            : isSold
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
        }`}
      >
        {loading
          ? "Processing..."
          : isOwner
          ? "You Own This"
          : isSold
          ? "Sold Out"
          : "Buy Character"}
      </button>
    </div>
  );
};
