import Link from "next/link";

function MenuButton({ setSideMenuState, link, text }) {
  return (
    <Link
      href={link}
      className="c-side-menu__button"
      onClick={() => setSideMenuState("hidden")}
    >
      {text}
    </Link>
  );
}

export default MenuButton;
