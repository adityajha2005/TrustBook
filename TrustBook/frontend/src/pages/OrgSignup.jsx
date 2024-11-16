import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import WalletConnect from "walletconnect";

const OrgRegister = () => {
  const [connected, setConnected] = useState(false);
  const [GstNum, setGstNum] = useState("");
  const [orgData, setOrgData] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleGstSubmit = (e) => {
    if (GstNum.trim().length === 0) {
      console.log("Can't be empty");
      return;
    }
    console.log("got number");
    const fakeData = {
      name: "dAppathon MUJ",
      reg_date: new Date(Date.now()),
      entity: "Private limited",
    };
    setOrgData(fakeData);
    setConnected(true);
  };

  const handleMetamaskConnection = async () => {
    console.log("Attempting MetaMask connection...");
    
    if (typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
  
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        
 
        if (accounts.length > 0) {
          console.log("Connected to MetaMask:", accounts[0]);
          
          const userData = {
            address: accounts[0],
            gstNum: GstNum,
            orgName: orgData.name,
            orgEntity: orgData.entity,
            orgRegDate: orgData.reg_date,
          };
          
          login(userData);
          alert("Metamask Connected")
          navigate("/marketplace");
        }
      } catch (error) {
        console.error("Failed to connect to MetaMask", error);
      }
    } else {
      console.log("Please install MetaMask!");
    }
  };

  const handleTrustWalletConnection = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        if (accounts.length > 0) {
          console.log("Connected to TrustWallet:", accounts[0]);
          alert("TrustWallet Connected")
          navigate("/marketplace");
        }
      } catch (error) {
        console.error("Failed to connect to TrustWallet", error);
      }
    } else {
      console.log("Please install TrustWallet!");
    }
  };

  const handleWellDoneConnection = async () => {
    console.log("Attempting WellDone connection...");
  
    try {
      const accounts = await connectToWellDone();
  
      if (accounts.length > 0) {
        console.log("Connected to WellDone:", accounts[0]);
        alert("WellDone Connected")
        navigate("/marketplace");
      }
    } catch (error) {
      console.error("Failed to connect to WellDone", error);
    }
  };
  
  const handleTokenPacketConnection = async () => {
    console.log("Attempting TokenPacket connection...");
  
    try {
      const accounts = await connectToTokenPacket();
  
      if (accounts.length > 0) {
        console.log("Connected to TokenPacket:", accounts[0]);
        alert("TokenPacket Connected")
        navigate("/marketplace");
      }
    } catch (error) {
      console.error("Failed to connect to TokenPacket", error);
    }
  };

  const handleTransaction = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        
        const transactionParameters = {
          to: '0xRecipientAddress', // Replace with a valid Ethereum address
          from: window.ethereum.selectedAddress,
          value: '0x9184e72a000', // Amount in wei (e.g., 0.0001 ETH)
        };

        await window.ethereum.request({
          method: 'eth_sendTransaction',
          params: [transactionParameters],
        });
        
        console.log("Transaction successful");
      } catch (error) {
        console.error("Transaction failed:", error);
      }
    } else {
      console.log("Please install MetaMask!");
    }
  };

  return (
    <>
      <div className="w-screen min-h-screen text-white bg-[#14162E]">
        <div className="flex relative min-h-[80vh] justify-between px-24 items-center">
          <div className="max-w-[30vw] overflow-hidden">
            <h1 className="text-6xl text-center font-bold">
              GET STARTED WITH THE AWESOMENESS
            </h1>
          </div>
          <img
            className="aspect-auto h-[65vh] self-end animated-element"
            src="/Character-standing.png"
          />
          <div className="flex flex-col gap-3 flex-wrap">
            <h1 className="text-center">Organization Registration</h1>
            {!connected ? (
              <>
                <Input
                  onChange={(e) => {
                    setGstNum(e.target.value);
                  }}
                  placeholder="Enter GST Number"
                  className="min-w-[20vw] text-black"
                />
                <Button
                  onClick={handleGstSubmit}
                  className="bg-[#4461F2] hover:bg-[#253896]"
                >
                  Find
                </Button>
              </>
            ) : (
              <>
                <Card className="bg-transparent text-center border-none text-white">
                  <CardHeader>
                    <CardTitle className="bg-white font-normal text-black rounded-lg p-4">
                      {orgData.name}
                    </CardTitle>
                    <CardDescription className="font-bold">
                      GST No: {GstNum}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <span className="bg-white text-black p-4 rounded-lg mr-5">
                      {orgData.entity}
                    </span>
                    <span className="bg-white text-black p-4 rounded-lg">
                      {orgData.reg_date.getDate()} /{" "}
                      {orgData.reg_date.getMonth() + 1} /{" "}
                      {orgData.reg_date.getFullYear()}{" "}
                    </span>
                  </CardContent>
                </Card>

                <Button
                  onClick={handleMetamaskConnection}
                  className="bg-[#4461F2] hover:bg-[#253896]"
                >
                  Connect to MetaMask <img className="ml-2" src="/metamask-icon.png" />
                </Button>
                <Button
                  onClick={handleTrustWalletConnection}
                  className="bg-[#2F80ED] hover:bg-[#1F5FB8] mt-3"
                >
                  Connect to TrustWallet
                </Button>
                <Button
                  onClick={handleWellDoneConnection}
                  className="bg-[#6D28D9] hover:bg-[#4B1A9F] mt-3"
                >
                  Connect to WellDone
                </Button>
                <Button
                  onClick={handleTokenPacketConnection}
                  className="bg-[#D97706] hover:bg-[#B45309] mt-3"
                >
                  Connect to TokenPacket
                </Button>

                {/* Test Transaction Button */}
                <Button
                  onClick={handleTransaction}
                  className="bg-[#FF5733] hover:bg-[#C70039] mt-3"
                >
                  Test Transaction (with Gas Fee)
                </Button>
              </>
            )}
          </div>
          <div className="aspect-square absolute opacity-65 left-32 top-24 blur-[100px] rounded-full w-56 bg-[#DDA82A]"></div>
          <div className="aspect-square absolute opacity-65 left-72 top-80 blur-[100px] rounded-full w-56 bg-[#4461F2]"></div>
        </div>
      </div>
    </>
  );
};

export default OrgRegister;
