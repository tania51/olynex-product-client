import React, { useContext } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import olynexLogo from "../../assets/olynex-logo.png"
import { AuthContext } from "../../Provider/AuthProvider";


export function StickyNavbar() {
  const [openNav, setOpenNav] = React.useState(false);
  const { user, logOut } = useContext(AuthContext);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);

  const logOutHandeler = e => {
    e.preventDefault();
    logOut();
  }



  return (
    <div className="max-h-[768px]">
      <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography
            as="a"
            href="/"
            className="mr-4 cursor-pointer py-1.5 font-medium"
          >
            <img className="h-20 w-full" src={olynexLogo} alt="Olynex Logo" />
          </Typography>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-x-1">
              {
                user ? <>
                  <Button
                    variant="text"
                    size="sm"
                    className="hidden lg:inline-block text-white"
                  >
                    <a href="/dashboard">DashBoard</a>
                  </Button>
                  <Button onClick={logOutHandeler}
                    variant="text"
                    size="sm"
                    className="hidden lg:inline-block text-white"
                  >
                    <span>Log Out</span>
                  </Button>
                </>
                  :
                  <Button
                    variant="text"
                    size="sm"
                    className="hidden lg:inline-block text-white"
                  >
                    <a href="/login"><span>Login</span></a>
                  </Button>
              }
              <Button
                variant="gradient"
                size="sm"
                className="hidden lg:inline-block"
              >
                <a href="/sign-up"><span>Sign Up</span></a>
              </Button>
            </div>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <MobileNav open={openNav}>
          <div className="flex items-center gap-x-1 text-white">
            {
              user ? <>
                <Button fullWidth variant="text" size="sm" className="text-white">
                  <a href="/dashboard">DashBoard</a>
                </Button>
                <Button onClick={logOutHandeler} fullWidth variant="text" size="sm" className="text-white">
                  <span>Log Out</span>
                </Button>
              </>
                :
                <Button fullWidth variant="text" size="sm" className="text-white">
                  <a href="/login"><span>Login</span></a>
                </Button>
            }
            <Button fullWidth variant="gradient" size="sm" className="">
              <a href="/sign-up"><span>Sign Up</span></a>
            </Button>
          </div>
        </MobileNav>
      </Navbar>
    </div>
  );
}