import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/img/nu-banner.png";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Products", to: "/products" },
];

const navLinkClassName = ({ isActive }) =>
  [
    "rounded-full border-2 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] transition",
    isActive
      ? "border-blue-900 bg-blue-900 text-amber-300"
      : "border-transparent text-blue-700 hover:border-blue-900 hover:bg-blue-100 hover:text-blue-900",
  ].join(" ");

const NavBar = () => {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();
  const role = String(user?.role || user?.userRole || "customer").toLowerCase();
  const signOut = () => { logout(); navigate("/"); };
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b-2 border-blue-900 bg-blue-50/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="NU Bulldog Gear"
            className="h-10 w-auto rounded-lg object-contain"
          />
        </NavLink>

        <nav className="hidden items-center gap-2 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={navLinkClassName}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {user ? <>
            {role === "admin" ? <NavLink to="/admin" className={navLinkClassName}>Admin</NavLink> : <>
              <NavLink to="/cart" className={navLinkClassName}>Cart ({items.length})</NavLink>
              <NavLink to="/orders" className={navLinkClassName}>Orders</NavLink>
              <NavLink to="/profile" className={navLinkClassName}>Profile</NavLink>
            </>}
            <button onClick={signOut} className={navLinkClassName({ isActive: false })}>Log out</button>
          </> : <>
            <NavLink to="/auth/signin" className={navLinkClassName}>Log In</NavLink>
            <NavLink to="/auth/signup" className={navLinkClassName}>Sign Up</NavLink>
          </>}
        </div>
      </div>
    </header>
  );
};

export default NavBar;
