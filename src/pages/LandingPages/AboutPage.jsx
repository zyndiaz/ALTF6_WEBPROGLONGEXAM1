import Button from "../../components/Button";
import logo from "../../assets/img/nubdexchange_logo.png";

const AboutPage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-blue-900 bg-blue-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="rounded-3xl border-2 border-dashed border-blue-300 bg-blue-100 p-6">
            <div className="flex min-h-72 items-center justify-center rounded-[1.25rem] bg-blue-200">
              <img
                src={logo}
                alt="NU Bulldog Gear"
                className="h-32 w-32 rounded-full border-2 border-blue-900 bg-blue-50 object-contain"
              />
            </div>
          </div>

          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-blue-700">
              About NU Gear
            </p>
            <h1 className="max-w-xl text-3xl font-bold leading-tight text-blue-900 sm:text-4xl">
              Authentic National University merchandise for Bulldogs pride.
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-blue-800 sm:text-base">
              NU Bulldog Gear celebrates school spirit with premium official National University merchandise featuring authentic Bulldogs apparel, accessories, and sports gear. We provide quality products that let students and fans show their NU pride with confidence.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button to="/" variant="primary">
                Back Home
              </Button>
              <Button to="/products">Shop Gear</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y-2 border-blue-900 bg-blue-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-blue-700">
            About NU Gear
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-blue-900">
            Why choose NU merchandise
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl border-2 border-blue-900 bg-blue-100 p-5">
            <p className="text-2xl font-bold text-blue-900">8</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-blue-700">
              Products
            </p>
          </div>
          <div className="rounded-3xl border-2 border-blue-900 bg-blue-100 p-5">
            <p className="text-2xl font-bold text-blue-900">Est. 1900</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-blue-700">
              NU Legacy
            </p>
          </div>
          <div className="rounded-3xl border-2 border-blue-900 bg-blue-100 p-5">
            <p className="text-2xl font-bold text-blue-900">100%</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-blue-700">
              Official
            </p>
          </div>
          <div className="rounded-3xl border-2 border-blue-900 bg-blue-100 p-5">
            <p className="text-2xl font-bold text-blue-900">♥</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-blue-700">
              Bulldog Pride
            </p>
          </div>
        </div>
      </section>

      <section className="border-y-2 border-blue-900 bg-blue-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-blue-700">
              Why NU Bulldog Gear
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-blue-900">
              The gear that matters
            </h2>

            <div className="mt-6 space-y-4">
              <article className="rounded-3xl border-2 border-blue-900 bg-blue-100 p-5">
                <h3 className="text-lg font-semibold text-blue-900">
                  Premium Quality
                </h3>
                <p className="mt-3 text-sm leading-6 text-blue-800">
                  Every piece is crafted with high-quality materials and authentic NU branding for exceptional durability and comfort.
                </p>
              </article>

              <article className="rounded-3xl border-2 border-blue-900 bg-blue-100 p-5">
                <h3 className="text-lg font-semibold text-blue-900">
                  Official Designs
                </h3>
                <p className="mt-3 text-sm leading-6 text-blue-800">
                  Licensed merchandise featuring authentic National University logos, colors, and symbols that celebrate Bulldog pride.
                </p>
              </article>

              <article className="rounded-3xl border-2 border-blue-900 bg-blue-100 p-5">
                <h3 className="text-lg font-semibold text-blue-900">
                  Perfect for Everyone
                </h3>
                <p className="mt-3 text-sm leading-6 text-blue-800">
                  From students to alumni to fans, our collection offers gear for everyone who loves National University.
                </p>
              </article>
            </div>
          </div>

          <div className="rounded-3xl border-2 border-blue-900 bg-blue-100 p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-blue-700">
              Product Range
            </p>
            <div className="mt-5 space-y-3 text-sm">
              <div className="rounded-2xl border border-blue-900 bg-blue-50 p-3">
                <p className="font-semibold text-blue-900">
                  👕 T-Shirts
                </p>
                <p className="mt-1 text-xs text-blue-700">
                  ₱800 - Classic & Retro designs
                </p>
              </div>
              <div className="rounded-2xl border border-blue-900 bg-blue-50 p-3">
                <p className="font-semibold text-blue-900">
                  🧥 Jackets & Hoodies
                </p>
                <p className="mt-1 text-xs text-blue-700">
                  ₱1,750-₱2,250 - Varsity style
                </p>
              </div>
              <div className="rounded-2xl border border-blue-900 bg-blue-50 p-3">
                <p className="font-semibold text-blue-900">
                  🧢 Accessories
                </p>
                <p className="mt-1 text-xs text-blue-700">
                  ₱400-₱950 - Caps, scarves & more
                </p>
              </div>
              <div className="rounded-2xl border border-blue-900 bg-blue-50 p-3">
                <p className="font-semibold text-blue-900">
                  🎽 Sports Gear
                </p>
                <p className="mt-1 text-xs text-blue-700">
                  ₱1,250 - Football kits & apparel
                </p>
              </div>
            </div>
            <Button to="/products" className="mt-5">
              Shop Gear
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
