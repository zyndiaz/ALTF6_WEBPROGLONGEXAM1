import { Outlet } from "react-router-dom";
import logo from "../assets/img/nubdexchange_logo.png";

const AuthLayout = () => {
  return (
    <section className="min-h-screen bg-blue-50 text-blue-900">
      <div className="grid min-h-screen w-full lg:grid-cols-[1fr_0.95fr]">
        <div className="flex items-center justify-center border-b-2 border-blue-300 bg-blue-200 p-8 sm:p-10 lg:border-b-0 lg:border-r-2 lg:border-blue-300 lg:p-16">
          <div className="flex w-full max-w-md items-center justify-center p-8 sm:p-10">
            <img src={logo} alt="NU Bulldog Gear Logo" className="w-full h-auto object-contain drop-shadow-xl" />
          </div>
        </div>

        <main className="flex items-center bg-blue-50 px-6 py-10 sm:px-10 lg:px-16">
          <div className="mx-auto w-full max-w-md">
            <Outlet />
          </div>
        </main>
      </div>
    </section>
  );
};

export default AuthLayout;
