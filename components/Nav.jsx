"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    };

    setUpProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link className="flex gap-2 items-center" href="/">
        <Image
          src="./assets/images/logo.svg"
          width={30}
          height={30}
          alt="Cromptopia Logo"
          className="object-contain"
        />
        <p className="logo_text">Cromptopia</p>
      </Link>

      {/* Desktop Navigation */}

      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-3">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>

            <Link href="/profile">
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full"
              />
            </Link>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-2">
              {providers &&
                Object.values(providers).map((provider) => (
                  <button
                    key={provider.name}
                    className="black_btn"
                    onClick={() => {
                      signIn(provider.id);
                    }}
                  >
                    Sign In
                  </button>
                ))}
            </div>
          </>
        )}
      </div>

      {/* Mobile Navigation */}

      <div className="flex sm:hidden relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              alt="profile"
              className="rounded-full"
              onClick={() => {
                setToggleDropdown((prev) => !prev);
              }}
            />

            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  onClick={() => {
                    setToggleDropdown(false);
                  }}
                  className="dropdown_link"
                >
                  My Profile
                </Link>

                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => {
                    setToggleDropdown(false);
                  }}
                >
                  Create Post
                </Link>

                <button
                  type="button"
                  className="black_btn mt-5 w-full"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  className="black_btn"
                  onClick={() => signIn(provider.id)}
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};
export default Nav;
