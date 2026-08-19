import image from "../assets/pexels-cottonbro-3298180.webp";
import { homeNavigationItems } from "../constans/navigationItems";
import { LINK_VARIANT } from "../constans/stylesVariant";
import MainNav from "./MainNav";
import AppLogo from "./UI/AppLogo";

function Header() {
  return (
    <div className="flex flex-col lg:flex-row gap-3.75 items-center">
      <div className="space-y-5 w-full lg:w-8/12 text-center order-1 lg:order-0">
        <div className="w-8/12 md:w-6/12 mx-auto">
          <AppLogo />
        </div>

        <p className="w-full lg:w-5/6 inline-block">
          A React-based food ordering application implementing a full end-to-end
          checkout flow from meal browsing to order submission. Handles full
          client-server flow using Supabase (database + Edge Functions).
        </p>

        <MainNav items={homeNavigationItems} variant={LINK_VARIANT.TILE} />
      </div>
      <div className="w-4/12 mx-auto order-0 lg:order-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 503 524"
          fill="none"
          className="aspect-[0.96/1]"
        >
          <defs>
            <mask id="burgerMask">
              <path
                d="M258.323 -115.613C276.93 -134.796 307.099 -134.796 325.707 -115.613C344.314 -96.4304 344.314 -65.3291 325.707 -46.1465L88.1468 198.756C69.5393 217.939 39.3705 217.939 20.763 198.756C2.15546 179.573 2.15546 148.472 20.763 129.29L258.323 -115.613Z"
                fill="white"
              />
              <path
                d="M410.041 -50.4778C431.306 -72.4 465.785 -72.3999 487.051 -50.4778C508.316 -28.5548 508.316 6.99197 487.051 28.915L92.9612 435.185C71.6954 457.108 37.2144 457.108 15.9487 435.185C-5.31619 413.262 -5.31624 377.718 15.9487 355.795L410.041 -50.4778Z"
                fill="white"
              />
              <path
                d="M239.935 509.613C221.328 528.796 191.159 528.796 172.552 509.613C153.944 490.43 153.944 459.329 172.552 440.147L410.112 195.244C428.719 176.061 458.888 176.061 477.495 195.244C496.103 214.427 496.103 245.528 477.495 264.711L239.935 509.613Z"
                fill="white"
              />
            </mask>
          </defs>

          <image
            href={image}
            preserveAspectRatio="xMidYMid slice"
            mask="url(#burgerMask)"
            width="100%"
            height="100%"
          />
        </svg>
      </div>
    </div>
  );
}

export default Header;
