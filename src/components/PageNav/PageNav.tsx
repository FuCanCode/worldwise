import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "../Logo/Logo";

function PageNav() {
  const navLinks = [
    {
      path: "/product",
      displayName: "Product",
    },
    {
      path: "/pricing",
      displayName: "Pricing",
    },
    {
      path: "/login",
      displayName: "Login",
    },
  ];

  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        {navLinks.map((l) => (
          <li key={l.displayName}>
            <NavLink
              /* className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ""}`
              } */
              className={
                l.displayName === "Login" ? styles.ctaLink : styles.navLink
              }
              to={l.path}
            >
              {l.displayName}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default PageNav;
