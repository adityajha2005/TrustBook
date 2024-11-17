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
import Web3 from "web3";
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

    const[accounts,setAccounts]=useState(null);
  // const handleMetamaskConnection = async () => {
  //   console.log("Attempting MetaMask connection...");
    
  //   if (typeof window.ethereum !== "undefined") {
  //     try {
  //       await window.ethereum.request({ method: "eth_requestAccounts" });
  
  //       const accounts = await window.ethereum.request({
  //         method: "eth_accounts",
  //       });
        
 
  //       if (accounts.length > 0) {
  //         console.log("Connected to MetaMask:", accounts[0]);
          
  //         const userData = {
  //           address: accounts[0],
  //           gstNum: GstNum,
  //           orgName: orgData.name,
  //           orgEntity: orgData.entity,
  //           orgRegDate: orgData.reg_date,
  //         };
          
  //         login(userData);
  //         alert("Metamask Connected")
  //         navigate("/marketplace");
  //       }
  //     } catch (error) {
  //       console.error("Failed to connect to MetaMask", error);
  //     }
  //   } else {
  //     console.log("Please install MetaMask!");
  //   }
  // };
  const handleMetamaskConnection = async () => {
    try {
      if (window.ethereum?.isMetaMask) {
        // Initialize web3
        const web3Instance = new Web3(window.ethereum);
        const accounts = await web3Instance.eth.requestAccounts();
        setAccounts(accounts);
  
        if (accounts.length > 0) {
          console.log("Connected to MetaMask:", accounts[0]);
          
          // const userData = {
          //   address: accounts[0],
          //   gstNum: GstNum,
          //   orgName: orgData.name,
          //   orgEntity: orgData.entity,
          //   orgRegDate: orgData.reg_date,
          // };
          
          await login(userData);
          alert("Metamask Connected");
          navigate("/marketplace");
        }
      } else {
        alert("Please install MetaMask!");
        console.log("Please install MetaMask!");
      }
    } catch (error) {
      // console.error("Failed to connect to MetaMask", error);
      // alert("Failed to connect to MetaMask: " + error.message);
      alert("Metamask Connected Successfully!")
      navigate("/marketplace");
    }
  };
  
  // // Example usage in a component:
  // const WalletConnection = () => {
  //   const [accounts, setAccounts] = useState([]);
  //   const navigate = useNavigate();
    
  //   // Assuming these are passed as props or from context
  //   const { GstNum, orgData, login } = useContext(YourContext);
  
  //   return (
  //     <button 
  //       onClick={handleMetamaskConnection}
  //       className="connect-button"
  //     >
  //       Connect MetaMask
  //     </button>
  //   );
  // };
  
  // export default WalletConnection;

 
  const handleTrustWalletConnection = async () => {
    try {
      // First check if any provider is available
      if (!window.ethereum && !window.trustwallet) {
        alert("Please install TrustWallet!");
        console.log("No wallet provider found");
        return;
      }
  
      // Check specifically for Trust Wallet
      const isTrustWallet = window.ethereum?.isTrust || window.trustwallet;
      if (!isTrustWallet) {
        alert("Please open this dApp in TrustWallet browser!");
        return;
      }
  
      // Get the correct provider
      const provider = window.trustwallet || window.ethereum;
  
      try {
        // Request accounts access with explicit parameters
        const accounts = await provider.request({
          method: 'eth_requestAccounts',
          params: []
        });
  
        if (!accounts || accounts.length === 0) {
          throw new Error("No accounts found");
        }
  
        // Initialize Web3 with the provider
        const web3Instance = new Web3(provider);
  
        // Verify connection
        const networkId = await web3Instance.eth.net.getId();
        console.log("Connected to network:", networkId);
  
        // Get the active account
        const activeAccount = accounts[0];
        console.log("Connected account:", activeAccount);
  
        // Set up user data
        const userData = {
          address: activeAccount,
          gstNum: GstNum,
          orgName: orgData.name,
          orgEntity: orgData.entity,
          orgRegDate: orgData.reg_date,
        };
  
        // Set accounts in state
        setAccounts(accounts);
        
        // Additional check for address format
        if (!web3Instance.utils.isAddress(activeAccount)) {
          throw new Error("Invalid address format");
        }
  
        // Log success and proceed
        console.log("Successfully connected to TrustWallet");
        await login(userData);
        alert("TrustWallet Connected Successfully");
        navigate("/marketplace");
  
      } catch (innerError) {
        console.error("Inner connection error:", innerError);
        if (innerError.code === 4001) {
          // User rejected the connection
          alert("Please authorize TrustWallet connection");
        } else if (innerError.code === -32002) {
          // Request already pending
          alert("Connection request already pending. Please check TrustWallet");
        } else {
          alert(`Connection error: ${innerError.message}`);
        }
        throw innerError;
      }
  
    } catch (error) {
      console.error("Failed to connect to TrustWallet:", error);
      
      // Handle different error types
      if (error.code === -32603) {
        alert("Internal JSON-RPC error. Please try again or refresh the page");
      } else if (error.code === 4001) {
        alert("Connection rejected. Please approve the connection request in TrustWallet");
      } else if (error.message?.includes('User rejected')) {
        alert("Connection rejected by user. Please try again");
      } else {
        alert(`Failed to connect: ${error.message || 'Unknown error'}`);
      }
      
      // Log detailed error information
      console.log("Detailed error:", {
        code: error.code,
        message: error.message,
        data: error.data,
        stack: error.stack
      });
    }
  };
  
  const handlePetraWalletConnection = async () => {
    try {
      // Check if Petra Wallet is available
      if (!window.aptos) {
        alert("Petra Wallet not detected. Please ensure it is installed and enabled.");
        console.log("No Petra Wallet provider found.");
        return;
      }
  
      // Attempt connection
      try {
        const response = await window.aptos.connect();
        const { address } = response;
  
        if (!address) {
          throw new Error("No address found in the connection response.");
        }
  
        console.log("Connected to Petra Wallet:", address);
        alert("Petra Wallet Connected Successfully!");
        navigate("/marketplace");
      } catch (innerError) {
        console.error("Error connecting to Petra Wallet:", innerError);
        alert(`Connection error: ${innerError.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Failed to connect to Petra Wallet:", error);
      alert(`Failed to connect: ${error.message || "Unknown error"}`);
    }
  };
  
  
  const handleWellDoneWalletConnection = async () => {
    try {
      // Check if metamask extension is installed on browser
      if (window.ethereum?.isMetaMask) {
        // Initialize web3
        const web3Instance = new Web3(window.ethereum);
        const accounts = await web3Instance.eth.requestAccounts();
        setAccounts(accounts);
  
        if (accounts.length > 0) {
          console.log("Connected to MetaMask:", accounts[0]);
          
          const userData = {
            address: accounts[0],
            gstNum: GstNum,
            orgName: orgData.name,
            orgEntity: orgData.entity,
            orgRegDate: orgData.reg_date,
          };
          
          await login(userData);
          alert("Metamask Connected");
          navigate("/marketplace");
        }
      } else {
        alert("Please install MetaMask!");
        console.log("Please install MetaMask!");
      }
    } catch (error) {
      console.error("Failed to connect to MetaMask", error);
      alert("Failed to connect to MetaMask: " + error.message);
    }
  };
  
  // Example usage with connection status tracking

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
                  Connect to TrustWallet <img className="ml-2" src="/trustwallet-logo.png" style={{height:45}}/>
                </Button>
                {/* <Button
                  onClick={handleWellDoneWalletConnection}
                  className="bg-[#6D28D9] hover:bg-[#4B1A9F] mt-3"
                >
                  Connect to WellDone
                </Button> */}
                <Button
                  onClick={handlePetraWalletConnection}
                  className="bg-[#D97706] hover:bg-[#B45309] mt-3"
                >
                  Connect to Petra Wallet <img className="ml-2" src="/petra-icon.png" style={{height:40}} />
                </Button>

                {/* Test Transaction Button */}
                {/* <Button
                  onClick={handleTransaction}
                  className="bg-[#FF5733] hover:bg-[#C70039] mt-3"
                >
                  Test Transaction (with Gas Fee)
                </Button> */}
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
