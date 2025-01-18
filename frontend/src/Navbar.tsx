import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import axios from "axios";

axios.defaults.withCredentials = true;
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const navigate = useNavigate();

  const navItems = [{ name: "Add user", href: "/adduser" }];

  return (
    <nav className="bg-white shadow-xl">
      <div className="min-w-full px-4 mx-auto bg-gray-50">
        <div className="flex justify-between">
          {/* left most div for menus */}
          <div className="flex ml-0 md:ml-10 lg:ml-14">
            <div className="ml-5 mr-10">
              <Link to="/" className="flex items-center py-4 ">
                <h2 className="font-bold text-black text-3xl hover:scale-105 transition-all duration-300">
                  UserBoard
                </h2>
              </Link>
            </div>
            <div className="ml-10 hidden md:flex items-center justify-between space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="py-4 px-2 text-xl text-black font-semibold hover:scale-105 transition-all duration-200"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* toggle menu for smaller screens */}
          <div className="md:hidden flex items-center">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="md:hidden"
                  onClick={toggleMenu}
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col space-y-4 mt-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="hover:text-green-500  font-semibold transition duration-300 text-lg"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
