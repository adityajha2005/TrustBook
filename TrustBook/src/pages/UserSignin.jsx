import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Web3 from "web3";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

const UserSignin = () => {
  const [connected, setConnected] = useState(false);
  const [GstNum, setGstNum] = useState("");
  const [orgData, setOrgData] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState(null);

  const handleMetmaskConnection = async () => {
    try {
      if (window.ethereum?.isMetaMask) {
        const web3Instance = new Web3(window.ethereum);
        const accounts = await web3Instance.eth.requestAccounts();
        setAccounts(accounts);

        if (accounts.length > 0) {
          console.log("Connected to MetaMask:", accounts[0]);

          const userData = {
            address: accounts[0],
            gstNum: GstNum,
            orgName: orgData?.name,
            orgEntity: orgData?.entity,
            orgRegDate: orgData?.reg_date,
          };

          await login(userData);
          alert("Metamask Connected");
          navigate("/home");
        }
      } else {
        alert("Please install MetaMask!");
      }
    } catch (error) {
      console.error("Failed to connect to MetaMask:", error);
      alert("Failed to connect to MetaMask");
    }
  };

  const handleTrustWalletConnection = async () => {
    try {
      const provider = window.trustwallet || window.ethereum;

      if (!provider) {
        alert("TrustWallet not detected. Please install TrustWallet.");
        return;
      }

      const accounts = await provider.request({
        method: "eth_requestAccounts",
        params: [],
      });

      if (accounts.length === 0) {
        throw new Error("No accounts found");
      }

      const web3Instance = new Web3(provider);
      const activeAccount = accounts[0];

      const userData = {
        address: activeAccount,
        gstNum: GstNum,
        orgName: orgData?.name,
        orgEntity: orgData?.entity,
        orgRegDate: orgData?.reg_date,
      };

      setAccounts(accounts);
      await login(userData);
      alert("TrustWallet Connected Successfully");
      navigate("/home");
    } catch (error) {
      console.error("Failed to connect to TrustWallet:", error);
      alert(`Failed to connect to TrustWallet: ${error.message}`);
    }
  };

  const handlePetraWalletConnection = async () => {
    try {
      if (!window.aptos) {
        alert("Petra Wallet not detected.");
        return;
      }

      const response = await window.aptos.connect();
      const { address } = response;

      if (!address) {
        throw new Error("No address found in connection response.");
      }

      alert("Petra Wallet Connected Successfully!");
      navigate("/home");
    } catch (error) {
      console.error("Failed to connect to Petra Wallet:", error);
      alert(`Failed to connect: ${error.message}`);
    }
  };

  return (
    <div className="w-screen min-h-screen text-white bg-[#14162E]">
      <div className="flex relative w-full min-h-[80vh] justify-between px-20 items-center ">
        <div className="flex w-[32vw] z-10 ">
          <h1 className="text-6xl text-center opacity-95 tracking-normal font-sans font-bold">
            SIGN IN TO AWESOMENESS
          </h1>
        </div>
        <img className="animated-element aspect-auto " src="/Character-falling.png" />
        <div className="flex flex-col gap-7 min-w-[30vw] items-center justify-center">
          <h1 className="text-3xl text-center">User Login</h1>
          <Button
            onClick={handleMetmaskConnection}
            className="bg-[#4461F2] w-[22vw] hover:bg-[#253896]"
          >
            Connect to MetaMask
            <img className="ml-2" src="/metamask-icon.png" />
          </Button>
          <Button
            onClick={handleTrustWalletConnection}
            className="bg-[#2F80ED] w-[22vw] hover:bg-[#1F5FB8]"
          >
                  Connect to TrustWallet <img className="ml-2" src="/trustwallet-logo.png" style={{height:45}}/>
                  </Button>
          <Button
            onClick={handlePetraWalletConnection}
            className="bg-[#D97706] w-[22vw] hover:bg-[#B45309]"
          >
                  Connect to Petra Wallet <img className="ml-2" src="/petra-icon.png" style={{height:40}} />
                  </Button>
        </div>
        <div className="aspect-square absolute opacity-65 left-32 top-24 blur-[100px] rounded-full w-56 bg-[#DDA82A]"></div>
        <div className="aspect-square absolute opacity-65 left-72 top-80 blur-[100px] rounded-full w-56 bg-[#4461F2]"></div>
      </div>
    </div>
  );
};

export default UserSignin;
