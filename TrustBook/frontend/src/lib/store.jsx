import { useEffect } from "react";
import { create } from "zustand";
import { EVMWallet } from "@catalogfi/wallets";
import { BrowserProvider } from "ethers";
import { GardenJS } from "@gardenfi/core";
import { Orderbook, Chains, TESTNET_ORDERBOOK_API } from "@gardenfi/orderbook";
import {
  BitcoinNetwork,
  BitcoinOTA,
  BitcoinProvider,
} from "@catalogfi/wallets";


const networkConfig = {
  chainId: "0xAA36A7",
  chainName: "Sepolia",
  rpcUrls: ["https://sepolia.infura.io/v3/24a8b9852823487f96e0d7de99163c74"],
  nativeCurrency: {
    symbol: "ETH",
    decimals: 18,
  },
};

const useMetaMaskStore = create((set) => ({
  metaMaskIsConnected: false,
  evmProvider: null,
  connectMetaMask: async () => {
    if (!window.ethereum) {
      alert("MetaMask is not installed. Please install MetaMask and try again.");
      return;
    }

    try {
      const provider = new BrowserProvider(window.ethereum);
      const network = await provider.getNetwork();

      if (network.chainId !== BigInt("0xAA36A7")) {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [networkConfig],
        });
      }

      const signer = await provider.getSigner();
      console.log("Signer retrieved:", signer);

      set(() => ({
        evmProvider: provider,
        metaMaskIsConnected: true,
      }));
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);

      if (error.code === 4001) {
        alert("Connection request was rejected.");
      } else {
        alert("Failed to connect to MetaMask. Check the console for details.");
      }
    }
  },
}));
  


const signer = await new BrowserProvider(window.ethereum).getSigner();

const evmWallet = new EVMWallet(signer)

const provider = new BitcoinProvider(BitcoinNetwork.Testnet)

const bitcoinWallet = new BitcoinOTA(provider, signer)



const gardenStore = create((set) => ({
  garden: null,
  bitcoin: null,
  setGarden: (garden, bitcoin) => {
    set(() => ({
      garden,
      bitcoin,
    }));
  },
}));



const useSignStore = create((set) => ({
  isMMPopupOpen: false,
  isSigned: false,
  setIsMMPopupOpen: (isMMPopupOpen) => {
    set(() => {
      return { isMMPopupOpen };
    });
  },
  setIsSigned: (isSigned) => {
    set(() => {
      return { isSigned };
    });
  },
}));

const useGarden = () => ({
  garden: gardenStore((state) => state.garden),
  bitcoin: gardenStore((state) => state.bitcoin),
});

/* Only to be used once at the root level*/
const useGardenSetup = () => {
  const { evmProvider } = useMetaMaskStore();
  const { setGarden } = gardenStore();

  useEffect(() => {
    (async () => {
      if (!evmProvider) return;
      const signer = await evmProvider.getSigner();

    //   const bitcoinProvider = new BitcoinProvider(
    //     BitcoinNetwork.Testnet,
    //     "http://localhost:30000"
    //   );

      const orderbook = await Orderbook.init({
        url: TESTNET_ORDERBOOK_API,
        signer: signer,

      });

      const wallets = {
        [Chains.bitcoin_testnet]: bitcoinWallet,
        [Chains.ethereum_sepolia]: evmWallet
      };

      const garden = new GardenJS(orderbook, wallets);

      setGarden(garden, wallets[Chains.bitcoin_testnet, Chains.ethereum_sepolia]);
    })();
  }, [evmProvider, setGarden]);
};

export { useMetaMaskStore, useGarden, useGardenSetup, useSignStore };