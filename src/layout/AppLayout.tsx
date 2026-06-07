import { SidebarProvider, useSidebar } from "../context/SidebarContext";
import { Outlet } from "react-router";
import AppHeader from "./AppHeader";
import Backdrop from "./Backdrop";
import AppSidebar from "./AppSidebar";
import { Modal } from "../components/ui/modal";
import { useNavigate } from "react-router";
import { LogoutUser } from "../services/Axios";
import toast from "react-hot-toast";

const LayoutContent: React.FC = () => {
  const {
    isExpanded,
    isHovered,
    isMobileOpen,
    isLogoutModalOpen,
    closeLogoutModal,
  } = useSidebar();
  const navigate = useNavigate();

  const handleLogout = async () => {
    // Here you can add any logout logic like clearing tokens, etc.
    try {
      await LogoutUser();
      navigate("/");
      closeLogoutModal();
      toast.success('Logout Successful');
    } catch (err: any) {
      toast.error("Error logging you out", {
        style: {
          zIndex: 99999,

        }, 
      }) 
    }
    // For now, just navigate to home/login page
    
  };

  return (
    <div className="min-h-screen overflow-hidden xl:flex">
      <div>
        <AppSidebar />
        <Backdrop />
      </div>
      <div
        className={`flex-1 flex flex-col overflow-hidden h-full transition-all duration-300 ease-in-out ${
          isExpanded || isHovered ? "lg:ml-72.5" : "lg:ml-22.5"
        } ${isMobileOpen ? "ml-0" : ""}`}
      >
        <AppHeader />
        <div className="flex-1 overflow-hidden max-w-(--breakpoint-2xl) w-full mx-auto p-4 md:p-6">
          <Outlet />
        </div>

        {/* Logout Confirmation Modal */}
        <Modal isOpen={isLogoutModalOpen} onClose={closeLogoutModal}>
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Confirm Logout
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to log out?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={closeLogoutModal}
                className="px-4 py-2 text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

const AppLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
  );
};

export default AppLayout;
