import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="border-t-2 border-blue-900 bg-blue-900 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 sm:grid-cols-3 md:grid-cols-4">
          {/* Brand Section */}
          <div>
            <p className="text-lg font-bold text-amber-300">NU Bulldog Gear</p>
            <p className="mt-2 text-sm text-blue-100">
              Premium official National University merchandise for students and fans.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.1em] text-amber-300">
              Shop
            </p>
            <ul className="mt-3 space-y-2 text-sm text-blue-100">
              <li>
                <Link to="/products" className="hover:text-amber-300 transition">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-amber-300 transition">
                  Apparel
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-amber-300 transition">
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.1em] text-amber-300">
              Company
            </p>
            <ul className="mt-3 space-y-2 text-sm text-blue-100">
              <li>
                <Link to="/" className="hover:text-amber-300 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-amber-300 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/auth/signin"
                  className="hover:text-amber-300 transition"
                >
                  Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Account Links */}
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.1em] text-amber-300">
              Account
            </p>
            <ul className="mt-3 space-y-2 text-sm text-blue-100">
              <li>
                <Link
                  to="/auth/signin"
                  className="hover:text-amber-300 transition"
                >
                  Sign In
                </Link>
              </li>
              <li>
                <Link
                  to="/auth/signup"
                  className="hover:text-amber-300 transition"
                >
                  Sign Up
                </Link>
              </li>
              <li>
                <a
                  href="mailto:gear@nu.edu"
                  className="hover:text-amber-300 transition"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 border-t border-blue-800 pt-6">
          <p className="text-center text-xs text-blue-100">
            © 2026 NU Bulldog Gear. All rights reserved. | Official National University Merchandise
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
