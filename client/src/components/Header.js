import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="text-gray-600 bg-green-500 body-font">
      <div className="container flex flex-col flex-wrap items-center p-5 mx-auto md:flex-row">
        <nav className="flex flex-wrap items-center text-base lg:w-2/5 md:ml-auto">
          {/* <Link href="#" className="mr-5 hover:text-gray-900">
            링크 1
          </Link>
          <Link href="#" className="mr-5 hover:text-gray-900">
            링크 2
          </Link>
          <Link href="#" className="mr-5 hover:text-gray-900">
            링크 3
          </Link>
          <Link href="#" className="hover:text-gray-900">
            링크 4
          </Link> */}
        </nav>
        <Link className="flex items-center order-first mb-4 font-medium text-gray-900 lg:order-none lg:w-1/5 title-font lg:items-center lg:justify-center md:mb-0">
          <span className="ml-3 text-xl text-white">또박또박</span>
        </Link>
        <div className="inline-flex ml-5 lg:w-2/5 lg:justify-end lg:ml-0">
          {/* <button className="inline-flex items-center px-3 py-1 mt-4 text-base bg-gray-100 border-0 rounded focus:outline-none hover:bg-gray-200 md:mt-0">
            버튼
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokejoin="round"
              strokelinecapwidth="2"
              className="w-4 h-4 ml-1"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
