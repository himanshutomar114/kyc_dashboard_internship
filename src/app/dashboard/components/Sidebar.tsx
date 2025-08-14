import { useState } from 'react';
import { 
  HomeIcon, 
  DocumentTextIcon, 
  CreditCardIcon, 
  ClipboardDocumentListIcon,
  DocumentDuplicateIcon,
  BellIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState('Dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { name: 'Dashboard', icon: HomeIcon, href: '/dashboard' },
    { name: 'Applications', icon: DocumentTextIcon, href: '/dashboard' },
    { name: 'Billing', icon: CreditCardIcon, href: '/dashboard' },
    { name: 'Rate Card', icon: ClipboardDocumentListIcon, href: '/dashboard' },
    { name: 'Agreement Copy', icon: DocumentDuplicateIcon, href: '/dashboard' },
    { name: 'Notices', icon: BellIcon, href: '/dashboard' },
  ];

  const handleItemClick = (itemName : string) => {
    setActiveItem(itemName);
    setIsMobileMenuOpen(false); // Close mobile menu when item is clicked
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-md bg-white shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors"
        >
          {isMobileMenuOpen ? (
            <XMarkIcon className="h-6 w-6 text-gray-600" />
          ) : (
            <Bars3Icon className="h-6 w-6 text-gray-600" />
          )}
        </button>
      </div>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 z-40 h-full w-64 bg-white  shadow-sm
        transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo */}
        <div className="flex items-center justify-center h-16 px-6 ">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">L</span>
            </div>
            <span className="text-xl font-semibold text-gray-800">Logo</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-3">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.name;
              
              return (
                <li key={item.name}>
                  <button
                    onClick={() => handleItemClick(item.name)}
                    className={`
                      w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg
                      transition-all duration-200 ease-in-out
                      ${isActive 
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700 shadow-sm' 
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }
                    `}
                  >
                    <Icon className={`
                      mr-3 h-5 w-5 flex-shrink-0
                      ${isActive ? 'text-blue-700' : 'text-gray-500'}
                    `} />
                    <span className="truncate">{item.name}</span>
                    
                    {/* Active indicator */}
                    {isActive && (
                      <div className="ml-auto w-2 h-2 bg-blue-700 rounded-full" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom section (optional) */}
        <div className="absolute bottom-4 left-3 right-3">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-3 border border-blue-100">
            <p className="text-xs text-gray-600 mb-1">Need help?</p>
            <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
              Contact Support
            </button>
          </div>
        </div>
      </div>

      
    </>
  );
};

export default Sidebar;