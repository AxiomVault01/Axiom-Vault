import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router";
import { FileBox, FileText, LogOut, Menu, Search, Settings, X } from "lucide-react";
import toast from "react-hot-toast";
import { Modal } from "../components/ui/modal";
import { LogoutUser } from "../services/Axios";

const mainLinks = [
  { name: "Cases", path: "/member/cases", icon: Search },
  { name: "Reports", path: "/member/reports", icon: FileText },
  { name: "Evidence Archive", path: "/member/evidence", icon: FileBox },
];

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
    isActive
      ? "bg-brand-500 text-white dark:bg-white/10"
      : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5"
  }`;

const Logo = () => (
  <>
    <img className="dark:hidden" src="/full-logo-nbg.png" alt="AxiomVault" width={140} height={34} />
    <img className="hidden dark:block" src="/AXIOM _VAULT_B.png" alt="AxiomVault" width={140} height={34} />
  </>
);

export default function TeamMemberLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Close the mobile drawer after navigating
  useEffect(() => setIsMenuOpen(false), [location.pathname]);

  const handleLogout = async () => {
    try {
      await LogoutUser();
      toast.success("Logout Successful");
    } catch {
      // LogoutUser already cleared the local session
    } finally {
      setIsLogoutOpen(false);
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Mobile top bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 lg:hidden dark:border-gray-800 dark:bg-gray-900">
        <Logo />
        <button
          onClick={() => setIsMenuOpen(true)}
          className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>
      </header>

      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-gray-200 bg-white px-4 py-5 transition-transform duration-300 dark:border-gray-800 dark:bg-gray-900 lg:translate-x-0 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-8 flex items-center justify-between px-2">
          <Logo />
          <button
            onClick={() => setIsMenuOpen(false)}
            className="rounded-lg p-1 text-gray-500 lg:hidden"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex flex-1 flex-col justify-between overflow-y-auto">
          <ul className="space-y-1">
            {mainLinks.map(({ name, path, icon: Icon }) => (
              <li key={path}>
                <NavLink to={path} className={linkClass}>
                  <Icon size={18} />
                  {name}
                </NavLink>
              </li>
            ))}
          </ul>

          <ul className="space-y-1 border-t border-gray-200 pt-4 dark:border-gray-800">
            <li>
              <NavLink to="/member/settings" className={linkClass}>
                <Settings size={18} />
                Settings
              </NavLink>
            </li>
            <li>
              <button
                onClick={() => setIsLogoutOpen(true)}
                className={`${linkClass({ isActive: false })} w-full`}
              >
                <LogOut size={18} />
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="min-w-0 p-4 md:p-6 lg:ml-64">
        <Outlet />
      </main>

      <Modal isOpen={isLogoutOpen} onClose={() => setIsLogoutOpen(false)} className="max-w-md mx-4">
        <div className="p-6">
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Confirm Logout</h2>
          <p className="mb-6 text-gray-600 dark:text-gray-300">Are you sure you want to log out?</p>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setIsLogoutOpen(false)}
              className="rounded-lg bg-gray-100 px-4 py-2 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              onClick={handleLogout}
              className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
