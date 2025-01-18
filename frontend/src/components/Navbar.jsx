import React from "react";
import { Link } from "react-router-dom";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem } from "@radix-ui/react-navigation-menu";
import clsx from "clsx";
import { useGlobalContext } from "../context/Context";

const Navbar = () => {
  const { user } = useGlobalContext();

  return (
    <nav className="bg-gray-900 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold">
          <Link to="/">Soulbuddy</Link>
        </div>
        {/* Navigation Menu */}
        <NavigationMenu>
          <NavigationMenuList className="flex space-x-4">
            <NavigationMenuItem>
              <Link to="/" className={clsx("hover:text-gray-300")}>
                Home
              </Link>
            </NavigationMenuItem>
            {user ? (
              <>
                <NavigationMenuItem>
                  <Link to="/Kundli" className={clsx("hover:text-gray-300")}>
                    Kundli
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/Horoscope" className={clsx("hover:text-gray-300")}>
                    Horoscope
                  </Link>
                </NavigationMenuItem>
              </>
            ) : (
              <>
                <NavigationMenuItem>
                  <Link to="/login" className={clsx("hover:text-gray-300")}>
                    Login
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/signup" className={clsx("hover:text-gray-300")}>
                    SignUp
                  </Link>
                </NavigationMenuItem>
              </>
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
};

export default Navbar;
