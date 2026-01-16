import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import CharacterInterface from "@/interfaces/character";
import PurchaseInterface from "@/interfaces/purchase";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/constants/ethereum";

export function useWeb3Market() {
  const [account, setAccount] = useState<string | null>(null);
  const [characters, setCharacters] = useState<CharacterInterface[]>([]);
  const [history, setHistory] = useState<PurchaseInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const [transactionLoading, setTransactionLoading] = useState(false);

  const loadData = useCallback(async () => {
    if (!window.ethereum) return;
    try {
      setLoading(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        provider
      );

      const [chars, historyData] = await Promise.all([
        contract.getAllCharacters(),
        contract.getHistory(),
      ]);

      setCharacters(
        chars.map((char: CharacterInterface) => ({
          id: Number(char.id),
          name: char.name,
          image: char.image,
          price: ethers.formatEther(char.price ?? 0),
          currentOwner: char.currentOwner,
        }))
      );

      setHistory(
        historyData.map((h: PurchaseInterface) => ({
          timestamp: new Date(Number(h.timestamp) * 1000).toLocaleString(),
          characterName: h.characterName,
          buyer: h.buyer,
        }))
      );

      setLoading(false);
    } catch (error) {
      console.error("Load data failed", error);
    }
  }, []);

  const connectWallet = async () => {
    if (!window.ethereum) return alert("Please install Metamask!");
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      setAccount(await signer.getAddress());
    } catch (error) {
      console.error("Connection failed", error);
    }
  };

  const buyCharacter = async (id: number) => {
    if (!account) return alert("Please connect wallet first");
    setTransactionLoading(true);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
      );

      const tx = await contract.buyCharacter(id, {
        value: ethers.parseEther("0.001"),
      });
      await tx.wait();
      alert("Purchase Successful!");
      loadData();
    } catch (error: any) {
      alert("Transaction failed: " + (error.reason || error.message));
    } finally {
      setTransactionLoading(false);
    }
  };

  useEffect(() => {
    connectWallet();
    loadData();
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts: any) => {
        setAccount(accounts.length > 0 ? accounts[0] : null);
        loadData();
      });
      window.ethereum.on("chainChanged", () => window.location.reload());
    }
  }, [loadData]);

  return {
    account,
    characters,
    history,
    loading,
    transactionLoading,
    connectWallet,
    buyCharacter,
  };
}
