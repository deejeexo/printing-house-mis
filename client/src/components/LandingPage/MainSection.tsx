import { useNavigate } from "react-router-dom";

function MainSection() {
  const navigate = useNavigate();

  return (
    <div>
      <section className="mb-6">
        <nav className="navbar navbar-expand-lg shadow-md py-2 bg-white relative flex items-center w-full justify-between">
          <div className="px-6 w-full flex flex-wrap items-center justify-between">
            <div className="flex items-center">
              <a className="navbar-brand text-blue-600" href="#!">
                <svg
                  width="64px"
                  height="64px"
                  viewBox="0 0 1024 1024"
                  className="icon"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#000000"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path d="M192 234.666667h640v64H192z" fill="#424242"></path>
                    <path
                      d="M85.333333 533.333333h853.333334v-149.333333c0-46.933333-38.4-85.333333-85.333334-85.333333H170.666667c-46.933333 0-85.333333 38.4-85.333334 85.333333v149.333333z"
                      fill="#616161"
                    ></path>
                    <path
                      d="M170.666667 768h682.666666c46.933333 0 85.333333-38.4 85.333334-85.333333v-170.666667H85.333333v170.666667c0 46.933333 38.4 85.333333 85.333334 85.333333z"
                      fill="#424242"
                    ></path>
                    <path
                      d="M853.333333 384m-21.333333 0a21.333333 21.333333 0 1 0 42.666667 0 21.333333 21.333333 0 1 0-42.666667 0Z"
                      fill="#00E676"
                    ></path>
                    <path
                      d="M234.666667 85.333333h554.666666v213.333334H234.666667z"
                      fill="#90CAF9"
                    ></path>
                    <path
                      d="M800 661.333333h-576c-17.066667 0-32-14.933333-32-32s14.933333-32 32-32h576c17.066667 0 32 14.933333 32 32s-14.933333 32-32 32z"
                      fill="#242424"
                    ></path>
                    <path
                      d="M234.666667 661.333333h554.666666v234.666667H234.666667z"
                      fill="#90CAF9"
                    ></path>
                    <path
                      d="M234.666667 618.666667h554.666666v42.666666H234.666667z"
                      fill="#42A5F5"
                    ></path>
                    <path
                      d="M341.333333 704h362.666667v42.666667H341.333333zM341.333333 789.333333h277.333334v42.666667H341.333333z"
                      fill="#1976D2"
                    ></path>
                  </g>
                </svg>
              </a>
            </div>
            <div
              className="navbar-collapse collapse grow items-center"
              id="navbarSupportedContentY"
            ></div>
            <div className="flex items-center lg:ml-auto">
              <button
                type="button"
                className="inline-block px-6 py-2.5 mr-2 bg-transparent text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:text-blue-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 transition duration-150 ease-in-out"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Prisijungimas
              </button>
              <button
                type="button"
                className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Registracija
              </button>
            </div>
          </div>
        </nav>

        <div className="text-center bg-gray-50 text-gray-800 py-24 px-6">
          <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight">
            PrintHaus
            <br />
            <span className="text-blue-600">
              Jūsų vizijos įgyvendinimas po vieną spaudinį.
            </span>
          </h1>
        </div>
      </section>
    </div>
  );
}

export default MainSection;
