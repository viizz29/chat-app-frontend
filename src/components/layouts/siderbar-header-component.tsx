
interface SidebarHeaderProps {
    isSidebarOpen: boolean,
    toggleSidebar: () => void
}

export const SidebarHeader = ({ isSidebarOpen, toggleSidebar }: SidebarHeaderProps) => {
    return (
        <header className="flex items-center justify-between bg-bg text-text p-4">

            <div className="text-text font-bold text-2xl">
                My App
            </div>

            <div>
                {
                    isSidebarOpen && (
                        <button
                            className="md:block text-2xl p-2 text-text"
                            onClick={toggleSidebar}
                        >
                            {'☰'}
                        </button>
                    )
                }

            </div>

        </header>
    );
};

