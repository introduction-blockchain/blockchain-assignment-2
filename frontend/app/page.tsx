"use client";
import { useWeb3Market } from "@/hooks/useWeb3Market";
import { CharacterCard } from "@/components/CharacterCard";
import { CharacterSkeleton } from "@/components/CharacterSkeleton";

export default function Home() {
  const { account, characters, history, loading, connectWallet, buyCharacter } =
    useWeb3Market();
  console.log("history", history);
  return (
    <div className="p-8 font-sans mx-auto max-w-504">
      <header className="flex justify-between items-center mb-12">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
          🧙‍♂️ Stranger Things Market
        </h1>
        <button
          onClick={connectWallet}
          className={`px-4 py-2 rounded-lg font-bold cursor-pointer ${
            account
              ? "bg-green-500 text-white"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {account
            ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}`
            : "Connect Wallet"}
        </button>
      </header>

      <div className="flex flex-col xl:flex-row items-center-safe xl:items-start justify-center gap-12 ">
        {/* Character Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:w-[60%] max-w-4xl">
          {loading || characters.length === 0
            ? // แสดง Skeleton 6 อันตอนกำลังโหลดครั้งแรก
              Array.from({ length: 6 }).map((_, i) => (
                <CharacterSkeleton key={i} />
              ))
            : // แสดงข้อมูลจริง
              characters.map((char) => (
                <CharacterCard
                  key={char.id}
                  characters={char}
                  account={account}
                  loading={loading}
                  onBuy={buyCharacter}
                />
              ))}
        </section>

        {/* Purchase History */}
        <section className="relative w-full xl:w-[40%] h-screen">
          <div className="sticky top-[2%]">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-200">
              📜 Purchase History
            </h2>
            <div className="bg-white shadow-md rounded-lg overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Character
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Owner (Address)
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {history.length === 0 ? (
                    <tr>
                      <td className="px-6 py-4 text-center text-gray-500">
                        No history yet
                      </td>
                    </tr>
                  ) : (
                    history.map((h, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {h.timestamp}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {h.characterName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                          {h.buyer}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
