import { FaHome, FaInfoCircle, FaRegUser, FaRocketchat } from "react-icons/fa";

import { FaPeopleLine } from "react-icons/fa6";
import Link from "next/link";
import React from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useRouter } from "next/router";
import { useWallet } from "@solana/wallet-adapter-react";

const TheSidebar: React.FC = () => {
  const router = useRouter();
  const { publicKey, connected } = useWallet();

  const isActive = (href: string) => {
    return router.pathname === href ? "bg-purple-500/30" : "";
  };

  return (
    <>
      {/* Sidebar for larger screens */}
      <aside className="hidden md:flex flex-col items-center md:items-stretch space-y-2 md:space-y-4 md:mr-4">
        <Link href="/" passHref>
          <div className="text-sm md:text-4xl font-bold flex flex-row">
            <img
              src="/logo.png"
              alt="logo"
              className="w-8 h-8 md:w-16 md:h-16"
            />
          </div>
        </Link>
        <div className="flex flex-col items-center md:items-stretch space-y-2">
          <Link href="/" passHref>
            <div
              className={`gap-2 flex flex-row hover:bg-purple-500/30 transition-all duration-300 p-2 rounded-lg justify-start items-center ${isActive(
                "/"
              )}`}
            >
              <FaHome size={24} />
              <div className="text-xl hidden md:block">Home</div>
            </div>
          </Link>
          <Link href="/topics" passHref>
            <div
              className={`gap-2 flex flex-row hover:bg-purple-500/30 transition-all duration-300 p-2 rounded-lg justify-start items-center ${isActive(
                "/topics"
              )}`}
            >
              <FaRocketchat size={24} />
              <div className="text-xl hidden md:block">Topics</div>
            </div>
          </Link>
          <Link href="/users" passHref>
            <div
              className={`gap-2 flex flex-row hover:bg-purple-500/30 transition-all duration-300 p-2 rounded-lg justify-start items-center ${isActive(
                "/users"
              )}`}
            >
              <FaPeopleLine size={24} />
              <div className="text-xl hidden md:block">Users</div>
            </div>
          </Link>
          <Link href="/info" passHref>
            <div
              className={`gap-2 flex flex-row hover:bg-purple-500/30 transition-all duration-300 p-2 rounded-lg justify-start items-center ${isActive(
                "/info"
              )}`}
            >
              <FaInfoCircle size={24} />
              <div className="text-xl hidden md:block">Info</div>
            </div>
          </Link>
          {connected && publicKey && (
            <Link href={`/profile/${publicKey.toBase58()}`} passHref>
              <div
                className={`gap-2 flex flex-row hover:bg-purple-500/30 transition-all duration-300 p-2 rounded-lg justify-start items-center ${isActive(
                  `/profile/${publicKey.toBase58()}`
                )}`}
              >
                <FaRegUser size={24} />
                <div className="text-xl hidden md:block">Profile</div>
              </div>
            </Link>
          )}
        </div>
        <div className="fixed bottom-8 right-8 md:static w-48 md:w-full">
          <WalletMultiButton />
        </div>
      </aside>

      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white shadow-md">
        <ul className="flex justify-between px-6 py-1 pb-2">
          <li>
            <Link href="/" passHref>
              <div
                className={`text-gray-600 flex flex-col items-center p-2 rounded-lg p-2 rounded-lg ${isActive(
                  "/"
                )}`}
              >
                <FaHome size={24} />
                <span className="text-xs">Home</span>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/topics" passHref>
              <div
                className={`text-gray-600 flex flex-col items-center p-2 rounded-lg ${isActive(
                  "/topics"
                )}`}
              >
                <FaRocketchat size={24} />
                <span className="text-xs">Topics</span>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/users" passHref>
              <div
                className={`text-gray-600 flex flex-col items-center p-2 rounded-lg ${isActive(
                  "/users"
                )}`}
              >
                <FaPeopleLine size={24} />
                <span className="text-xs">Users</span>
              </div>
            </Link>
          </li>
          {connected && publicKey && (
            <li>
              <Link href={`/profile/${publicKey.toBase58()}`} passHref>
                <div
                  className={`text-gray-600 flex flex-col items-center p-2 rounded-lg ${isActive(
                    `/profile/${publicKey.toBase58()}`
                  )}`}
                >
                  <FaRegUser size={24} />
                  <span className="text-xs">Profile</span>
                </div>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
};

export default TheSidebar;
