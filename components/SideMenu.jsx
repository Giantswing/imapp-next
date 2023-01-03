import Image from "next/image";
import Link from "next/link";
import MenuButton from "/components/MenuButton";

function SideMenu({ sideMenuState, setSideMenuState }) {
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

      <MenuButton link="/" text="Home" setSideMenuState={setSideMenuState} />
      <MenuButton
        link="/stats"
        text="Stats"
        setSideMenuState={setSideMenuState}
      />
    </div>
  );
}

export default SideMenu;
