import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import SummaryApi from "../common";
import ROLE from "../common/role";
import Context from "../context";
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdArrowDropdown } from "react-icons/io";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Collection", to: "/collection" },
  { label: "About", to: "/about-us" },
  { label: "Contact", to: "/contact-us" },
];

const Header = () => {
  const [menuDisplay, setMenuDisplay] = useState(false);
  const [visible, setVisible] = useState(false);
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const context = useContext(Context);
  const navigate = useNavigate();

  const getCartCount = () => {
    return context?.cartProductCount || 0;
  };

  const handleScroll = () => {
    if (menuDisplay) {
      setMenuDisplay(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [menuDisplay]);

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: "include",
    });
    const data = await fetchData.json();
    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate("/");
    } else if (data.error) {
      toast.error(data.message);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".user-menu") && menuDisplay) {
        setMenuDisplay(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [menuDisplay]);

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="w-full border border-slate-200/80 bg-white/90 px-4 py-3 shadow-none backdrop-blur-xl sm:px-6 sm:shadow-[0_16px_50px_rgba(15,23,42,0.08)] lg:px-16">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="shrink-0">
            <span className="select-none text-xl font-extrabold tracking-tight text-slate-950 sm:text-2xl">
              Adimia
            </span>
          </Link>

          <nav className="hidden items-center gap-2 lg:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-slate-950 text-white shadow-[0_10px_24px_rgba(15,23,42,0.18)]"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => navigate("/search")}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition-all duration-300 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950"
              aria-label="Search products"
            >
              <GrSearch className="h-4 w-4" />
            </button>

            <div className="user-menu relative hidden sm:block">
              <button
                type="button"
                onClick={() => setMenuDisplay((prev) => !prev)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition-all duration-300 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950"
                aria-label="User menu"
              >
                <FaRegCircleUser className="h-4 w-4" />
              </button>

              {menuDisplay && (
                <div className="absolute right-0 top-[120%] w-52 rounded-[24px] border border-slate-200 bg-white p-2 shadow-[0_24px_60px_rgba(15,23,42,0.12)]">
                  <button
                    type="button"
                    onClick={() => {
                      setMenuDisplay(false);
                      navigate(user ? "/notifications" : "/login");
                    }}
                    className="w-full rounded-2xl px-4 py-3 text-left text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-950"
                  >
                    {user ? "My Account" : "Login"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMenuDisplay(false);
                      navigate(user ? "/order" : "/login");
                    }}
                    className="w-full rounded-2xl px-4 py-3 text-left text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-950"
                  >
                    Orders
                  </button>
                  {user && (
                    <button
                      type="button"
                      onClick={() => {
                        setMenuDisplay(false);
                        handleLogout();
                      }}
                      className="w-full rounded-2xl px-4 py-3 text-left text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-950"
                    >
                      Logout
                    </button>
                  )}
                </div>
              )}
            </div>

            {user?.role === ROLE.ADMIN && (
              <button
                type="button"
                onClick={() => navigate("/admin-overview/overview")}
                className="hidden rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 sm:inline-flex"
              >
                Admin
              </button>
            )}

            <Link
              to="/cart"
              className="relative hidden h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition-all duration-300 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950 sm:inline-flex"
              aria-label="Cart"
            >
              <PiShoppingCartSimpleBold className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-slate-950 px-1 text-[10px] font-semibold text-white">
                {getCartCount()}
              </span>
            </Link>

            <button
              type="button"
              onClick={() => setVisible(true)}
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 transition-all duration-300 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950 sm:h-11 sm:w-11 sm:px-0 lg:hidden"
              aria-label="Open menu"
            >
              <span className="sm:hidden">Menu</span>
              <GiHamburgerMenu className="hidden h-5 w-5 sm:block" />
            </button>
          </div>
        </div>
      </div>

      <div
        role="presentation"
        onClick={() => setVisible(false)}
        className={`fixed inset-0 z-50 bg-slate-950/30 backdrop-blur-sm transition-all duration-300 ${
          visible ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div
          role="dialog"
          aria-modal="true"
          onClick={(e) => e.stopPropagation()}
          className={`absolute right-0 top-0 flex h-full w-full max-w-sm flex-col bg-white p-5 shadow-[0_24px_80px_rgba(15,23,42,0.18)] transition-transform duration-300 ${
            visible ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="mb-8 flex items-center justify-between">
            <Link to="/" className="shrink-0" onClick={() => setVisible(false)}>
              <span className="select-none text-lg font-extrabold tracking-tight text-slate-950">
                Adimia
              </span>
            </Link>
            <button
              type="button"
              onClick={() => setVisible(false)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-700"
              aria-label="Close menu"
            >
              <IoMdArrowDropdown className="h-5 w-5 rotate-90" />
            </button>
          </div>

          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                onClick={() => setVisible(false)}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `rounded-2xl px-4 py-4 text-base font-medium transition ${
                    isActive ? "bg-slate-950 text-white" : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-2 border-t border-slate-200 pt-6 sm:hidden">
            <button
              type="button"
              onClick={() => {
                setVisible(false);
                navigate("/search");
              }}
              className="rounded-2xl bg-slate-50 px-4 py-4 text-left text-base font-medium text-slate-700 transition hover:bg-slate-100"
            >
              Search
            </button>
            <button
              type="button"
              onClick={() => {
                setVisible(false);
                navigate(user ? "/notifications" : "/login");
              }}
              className="rounded-2xl bg-slate-50 px-4 py-4 text-left text-base font-medium text-slate-700 transition hover:bg-slate-100"
            >
              {user ? "My Account" : "Login"}
            </button>
            <button
              type="button"
              onClick={() => {
                setVisible(false);
                navigate(user ? "/order" : "/login");
              }}
              className="rounded-2xl bg-slate-50 px-4 py-4 text-left text-base font-medium text-slate-700 transition hover:bg-slate-100"
            >
              Orders
            </button>
            <Link
              onClick={() => setVisible(false)}
              to="/cart"
              className="rounded-2xl bg-slate-50 px-4 py-4 text-left text-base font-medium text-slate-700 transition hover:bg-slate-100"
            >
              Cart ({getCartCount()})
            </Link>
            {user?.role === ROLE.ADMIN && (
              <NavLink
                onClick={() => setVisible(false)}
                className="rounded-2xl bg-slate-50 px-4 py-4 text-base font-medium text-slate-700 transition hover:bg-slate-100"
                to="/admin-overview/overview"
              >
                Admin
              </NavLink>
            )}
            {user && (
              <button
                type="button"
                onClick={() => {
                  setVisible(false);
                  handleLogout();
                }}
                className="rounded-2xl bg-slate-950 px-4 py-4 text-left text-base font-medium text-white transition hover:bg-slate-800"
              >
                Logout
              </button>
            )}
          </div>

          <div className="mt-6 hidden flex-col gap-2 border-t border-slate-200 pt-6 sm:flex">
            {user?.role === ROLE.ADMIN && (
              <NavLink
                onClick={() => setVisible(false)}
                className="rounded-2xl bg-slate-50 px-4 py-4 text-base font-medium text-slate-700 transition hover:bg-slate-100"
                to="/admin-overview/overview"
              >
                Admin
              </NavLink>
            )}
          </div>

          <div className="mt-auto rounded-[28px] border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              Adimia
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Clean shopping for modern tech essentials with a polished browsing experience.
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
