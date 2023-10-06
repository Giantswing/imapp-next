"use client";

import Image from "next/image";
import MenuButton from "/components/MenuButton";
import { signIn, signOut, useSession } from "next-auth/react";

function SideMenu({ sideMenuState, setSideMenuState }) {
  const { data: session } = useSession();

  return (
    <div className={`c-side-menu c-side-menu--${sideMenuState}`}>
      <div className="c-side-menu__header">
        <Image
          alt="close menu"
          src="menu-close.svg"
          width={40}
          height={40}
          onClick={() => {
            setSideMenuState("hidden");
          }}
        />
      </div>

      <div className="c-side-menu__buttons">
        <h2>Welcome {session?.user?.name}</h2>
        <MenuButton link="/" text="Home" setSideMenuState={setSideMenuState} />
        <MenuButton
          link="/stats"
          text="Stats"
          setSideMenuState={setSideMenuState}
        />

        {!session ? (
          <MenuButton
            link="/api/auth/signin"
            text="Login"
            setSideMenuState={setSideMenuState}
          />
        ) : (
          <MenuButton
            link="/api/auth/signout"
            text="Logout"
            setSideMenuState={setSideMenuState}
          />
        )}
      </div>
    </div>
  );
}

export default SideMenu;
