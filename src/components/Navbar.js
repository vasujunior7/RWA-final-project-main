import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";

function Navbar() {
  const [connected, toggleConnect] = useState(false);
  const location = useLocation();
  const [currAddress, updateAddress] = useState("0x");
  const [open, setOpen] = useState(false);

  async function getAddress() {
    const ethers = require("ethers");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const addr = await signer.getAddress();
    updateAddress(addr);
  }

  function updateButton() {
    const ethereumButton = document.querySelector(".enableEthereumButton");
    ethereumButton.textContent = "Connected";
    ethereumButton.classList.remove("hover:bg-blue-70");
    ethereumButton.classList.remove("bg-blue-500");
    ethereumButton.classList.add("hover:bg-green-70");
    ethereumButton.classList.add("bg-green-500");
  }

  // function menu(e) {
  //   e.name === "menu" ? (e.name = "close") : (e.name = "menu");
  // }

  async function connectWebsite() {
    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    if (chainId !== "0x5") {
      //alert('Incorrect network! Switch your metamask network to Rinkeby');
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x5" }],
      });
    }
    await window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then(() => {
        updateButton();
        console.log("here");
        getAddress();
        window.location.replace(location.pathname);
      });
  }

  useEffect(() => {
    if (window.ethereum == undefined) return;
    let val = window.ethereum.isConnected();
    if (val) {
      console.log("here");
      getAddress();
      toggleConnect(val);
      updateButton();
    }

    window.ethereum.on("accountsChanged", function (accounts) {
      window.location.replace(location.pathname);
    });
  });

  return (
    <div className="">
      <nav
        className="w-screen"
        style={{
          background: "rgb(83,81,85)",
          backgroundImage:
            "linear-gradient(to right, rgba(83,81,85, 1) 24%, rgba(20,20,20,1) 80%)",
        }}
      >
        <ul className=" flex justify-between py-5 ">
          <li className="  flex items-end ml-5 pb-2">
            <Link to="/">
              {/* <img
                src={fullLogo}
                alt=""
                width={120}
                height={120}
                className="inline-block -mt-2"
              /> */}
              <div className="inline-block font-bold text-xl ml-2">
                RWA Marketplace
              </div>
            </Link>
          </li>
          <button
            onClick={() => setOpen(true)}
            className={`mr-2 lg:hidden flex flex-col items-center justify-center p-2  rounded-md shadow-md bg-gray-100`}
          >
            <span className="w-5 h-1 bg-gray-700 mb-1 "></span>
            <span className="w-5 h-1 bg-gray-700 mb-1"></span>
            <span className="w-5 h-1 bg-gray-700 "></span>
          </button>

          {/* <li className="w-2/6 hidden duration-500  lg:block "> */}
          <ul
            className={` md:flex md:items-center z-[-1] md:z-auto md:static absolute  w-full left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-7 md:opacity-100 opacity-0 top-[-400px] transition-all ease-in duration-500 text-white`}
          >
            {location.pathname === "/" ? (
              <li className="border-b-2 hover:pb-0 p-2">
                <Link to="/">Marketplace</Link>
              </li>
            ) : (
              <li className="hover:border-b-2 hover:pb-0 p-2">
                <Link to="/">Marketplace</Link>
              </li>
            )}
            {location.pathname === "/sellNFT" ? (
              <li className="border-b-2 hover:pb-0 p-2">
                <Link to="/sellNFT">List </Link>
              </li>
            ) : (
              <li className="hover:border-b-2 hover:pb-0 p-2">
                <Link to="/sellNFT">List </Link>
              </li>
            )}
            {location.pathname === "/profile" ? (
              <li className="border-b-2 hover:pb-0 p-2">
                <Link to="/profile">Profile</Link>
              </li>
            ) : (
              <li className="hover:border-b-2 hover:pb-0 p-2">
                <Link to="/profile">Profile</Link>
              </li>
            )}
            <li>
              <button
                className="enableEthereumButton bg-white  hover:bg-rgba()  text-black hover:text-white hover:bg-neutral-600 font-bold py-2 my-1 px-4 rounded text-sm"
                onClick={connectWebsite}
              >
                {connected ? "Connected" : "Connect Wallet"}
              </button>
            </li>
          </ul>
          {/* </li> */}
        </ul>
      </nav>
      <div className="text-white text-bold text-right mr-10 text-sm">
        {currAddress !== "0x"
          ? "Connected to"
          : "Not Connected. Please login to view NFTs"}{" "}
        {currAddress !== "0x" ? currAddress.substring(0, 15) + "..." : ""}
      </div>
    </div>
  );
}

export default Navbar;
