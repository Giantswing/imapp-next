import Image from "next/image";
import Link from "next/link";
import MenuButton from "/components/MenuButton";

function SideMenu({ sideMenuState, setSideMenuState, currentUser }) {
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
        <h2>Welcome {currentUser}</h2>
        <MenuButton link="/" text="Home" setSideMenuState={setSideMenuState} />
        <MenuButton
          link="/stats"
          text="Stats"
          setSideMenuState={setSideMenuState}
        />
        <MenuButton
          link="/login"
          text="Login"
          setSideMenuState={setSideMenuState}
        />
      </div>
    </div>
  );
}

export default SideMenu;
