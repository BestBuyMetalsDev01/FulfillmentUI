import React, { useState, useEffect } from 'react';
import {
    createReactComponent, // Import createReactComponent
    icons // Import the entire icons object
} from 'lucide-react';

// Dynamically create icon components to bypass potential bundling issues
const getIconComponent = (iconName) => {
    const IconComponent = icons[iconName];
    if (!IconComponent) {
        console.warn(`Icon "${iconName}" not found in lucide-react.`);
        return null; // Or a fallback icon
    }
    // createReactComponent is typically used internally or for advanced cases,
    // but here we're using it to ensure the icon is a valid React component.
    // However, the standard way is just to use <IconComponent /> directly.
    // The error suggests the imported 'IconComponent' itself is the issue.
    // Let's try to ensure it's rendered as a direct component.
    // If the error persists, it might mean the 'icons' object itself
    // isn't correctly populated with React components during build.
    // For now, we'll stick to direct component usage, assuming the re-install
    // and this specific error context points to a deeper bundling problem that
    // this import strategy might address.
    return IconComponent;
};


// Mock data to simulate orders with trip IDs
const mockOrders = [
    {
        id: 'ORD-0343100',
        mfgComplete: 80,
        items: 1,
        billTo: 'All Things Exteriors',
        shipTo: 'T CLEVELAND',
        customerPO: '14174',
        salesPerson: 'HESHA001',
        shipDate: '06/25',
        shipVia: 'Delivery',
        loadTime: '2PM',
        truck: 'Truck A',
        status: 'Delivered',
        weight: 18,
        priority: true,
        type: 'Panel',
        tripId: 'TRIP-001' // Added tripId
    },
    {
        id: 'ORD-0343103',
        mfgComplete: 90,
        items: 1,
        billTo: 'Smith Roofing And Exteriors',
        shipTo: 'Knoxville, TN',
        customerPO: '2111',
        salesPerson: 'SHEBHA001',
        shipDate: '06/23',
        shipVia: 'CPU - 1PM',
        loadTime: '1PM',
        truck: 'Truck B',
        status: 'In Transit',
        weight: 34,
        priority: false,
        type: 'Trim',
        tripId: 'TRIP-001' // Added tripId
    },
    {
        id: 'ORD-0343104',
        mfgComplete: 75,
        items: 1,
        billTo: 'MT PISGAH BAPTIST CHURCH & CHRISTIAN ACADEMY',
        shipTo: 'Oliver Springs, TN',
        customerPO: '115 OLD HEN VALLEY RD',
        salesPerson: 'CORSGER001',
        shipDate: '06/23',
        shipVia: 'CPU',
        loadTime: '10AM',
        truck: 'Truck C',
        status: 'Pending Pickup',
        priority: true,
        type: 'Trim',
        tripId: 'TRIP-002' // Added tripId
    },
    {
        id: 'ORD-1024765',
        mfgComplete: 100,
        items: 16,
        billTo: 'All About Recycling',
        shipTo: 'Knoxville, TN',
        customerPO: '',
        salesPerson: 'GARRETT01',
        shipDate: '06/19',
        shipVia: 'CPU',
        loadTime: '9AM',
        truck: 'Truck D',
        status: 'Completed',
        weight: 4986,
        priority: false,
        type: 'Accessories',
        tripId: 'TRIP-002' // Added tripId
    },
    {
        id: 'ORD-1037907',
        mfgComplete: 60,
        items: 2,
        billTo: 'Quality Engineering Construction',
        shipTo: 'Greenback, TN',
        customerPO: '',
        salesPerson: 'LIBESTT001',
        shipDate: '06/02',
        shipVia: 'CPU',
        loadTime: '8AM',
        truck: 'Truck E',
        status: 'Processing',
        priority: true,
        type: 'Accessories',
        tripId: 'TRIP-003' // Added tripId
    },
    {
        id: 'ORD-1045409',
        mfgComplete: 100,
        items: 1,
        billTo: 'Ray Smith',
        shipTo: 'Greenback, TN',
        customerPO: '',
        salesPerson: 'CORSBER001',
        shipDate: '05/23',
        shipVia: 'CPU',
        loadTime: '11AM',
        truck: 'Truck F',
        status: 'Completed',
        weight: 11,
        priority: false,
        type: 'Trim',
        tripId: 'TRIP-003' // Added tripId
    },
    {
        id: 'ORD-1047107',
        mfgComplete: 95,
        items: 1,
        billTo: 'Ashbusters',
        shipTo: 'TRM',
        customerPO: '',
        salesPerson: 'SCHNAT001',
        shipDate: '05/23',
        shipVia: 'CPU',
        loadTime: '1PM',
        truck: 'Truck G',
        status: 'Pending Delivery',
        priority: true,
        type: 'Accessories',
        tripId: 'TRIP-004' // Added tripId
    },
    {
        id: 'ORD-1050616',
        mfgComplete: 85,
        items: 8,
        billTo: 'B4 Lumber Knoxville TN #1203',
        shipTo: 'Knoxville, TN',
        customerPO: '',
        salesPerson: 'LIBESTT001',
        shipDate: '06/04',
        shipVia: 'CPU',
        loadTime: '2PM',
        truck: 'Truck H',
        status: 'In Transit',
        weight: 326,
        priority: false,
        type: 'Panel',
        tripId: 'TRIP-004' // Added tripId
    },
    {
        id: 'ORD-1050908',
        mfgComplete: 70,
        items: 1,
        billTo: 'SD Builders',
        shipTo: 'Friendville, TN',
        customerPO: '',
        salesPerson: 'AARONJONES',
        shipDate: '06/01',
        shipVia: 'CPU',
        loadTime: '3PM',
        truck: 'Truck I',
        status: 'Processing',
        priority: true,
        type: 'Trim',
        tripId: 'TRIP-005' // Added tripId
    },
    {
        id: 'ORD-1051480',
        mfgComplete: 92,
        items: 15,
        billTo: 'Brown Brown & West Property Management',
        shipTo: 'River County',
        customerPO: '',
        salesPerson: 'LIBESTT001',
        shipDate: '06/10',
        shipVia: 'CPU',
        loadTime: '4PM',
        truck: 'Truck J',
        status: 'Ready for Dispatch',
        weight: 1217,
        priority: false,
        type: 'Accessories',
        tripId: 'TRIP-005' // Added tripId
    },
    {
        id: 'ORD-1052070',
        mfgComplete: 98,
        items: 1,
        billTo: 'One Stop Roofing',
        shipTo: 'Maynardville, TN',
        customerPO: 'SCC BLACK',
        salesPerson: 'LIBLIV0001',
        shipDate: '06/08',
        shipVia: 'CPU',
        loadTime: '5PM',
        truck: 'Truck K',
        status: 'Pending Dispatch',
        priority: true,
        type: 'Panel',
        tripId: 'TRIP-006' // Added tripId
    },
    {
        id: 'ORD-1052795',
        mfgComplete: 100,
        items: 1,
        billTo: 'A & N Construction',
        shipTo: 'Andersonville, TN',
        customerPO: '',
        salesPerson: 'JEN',
        shipDate: '06/10',
        shipVia: 'CPU',
        loadTime: '6PM',
        truck: 'Truck L',
        status: 'Completed',
        priority: false,
        type: 'Trim',
        tripId: 'TRIP-006' // Added tripId
    },
    {
        id: 'ORD-1052840',
        mfgComplete: 88,
        items: 21,
        billTo: 'TennFab',
        shipTo: 'Knoxville, TN',
        customerPO: '6005',
        salesPerson: 'LIBEL001',
        shipDate: '06/10',
        shipVia: 'CPU',
        loadTime: '7PM',
        truck: 'Truck M',
        status: 'Quality Check',
        priority: true,
        type: 'Accessories',
        tripId: 'TRIP-007' // Added tripId
    }
];

// OrderListScreen Component - Handles displaying and filtering orders
const OrderListScreen = ({ onBackToDashboard, initialFilter = 'All', toggleDarkMode, isDarkMode }) => {
    // State for managing UI elements
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFilters, setSelectedFilters] = useState({
        type: 'All',
        show: initialFilter, // Initialize with prop
    });
    const [expandedOrderId, setExpandedOrderId] = useState(null); // To expand/collapse order cards

    // State for orders, initialized with mock data
    const [orders, setOrders] = useState(mockOrders);

    // Update filter when initialFilter prop changes
    useEffect(() => {
        setSelectedFilters(prev => ({ ...prev, show: initialFilter }));
    }, [initialFilter]);


    // Filtered orders based on search and filters
    const filteredOrders = orders.filter(order => {
        const matchesSearch = searchTerm === '' ||
                              order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              order.billTo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              order.shipTo.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesType = selectedFilters.type === 'All' || order.type === selectedFilters.type;
        const matchesShow = selectedFilters.show === 'All' ||
                            (selectedFilters.show === 'Priority' && order.priority) ||
                            (selectedFilters.show === 'My Orders' && order.salesPerson === 'HESHA001'); // Example for 'My Orders'

        return matchesSearch && matchesType && matchesShow;
    });

    // Toggle sidebar visibility
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // Toggle filter modal visibility
    const toggleFilterModal = () => {
        setIsFilterModalOpen(!isFilterModalOpen);
    };

    // Handle filter changes
    const handleFilterChange = (filterName, value) => {
        setSelectedFilters(prev => ({ ...prev, [filterName]: value }));
    };

    // Handle expanding/collapsing order card details
    const toggleOrderDetails = (orderId) => {
        setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
    };

    // Simulate "Claim" action (for demonstration)
    const handleClaimOrder = (orderId) => {
        alert(`Order ${orderId} has been claimed! (This is a mock action)`);
    };

    // Simulate "Open" action (for demonstration)
    const handleOpenOrder = (orderId) => {
        alert(`Opening details for Order ${orderId}. (This is a mock action)`);
    };

    const HomeIcon = getIconComponent('Home');
    const SearchIcon = getIconComponent('Search');
    const SlidersIcon = getIconComponent('Sliders');
    const SunIcon = getIconComponent('Sun');
    const MoonIcon = getIconComponent('Moon');
    const MenuIcon = getIconComponent('Menu');
    const XIcon = getIconComponent('X');
    const LayoutGridIcon = getIconComponent('LayoutGrid');
    const BellIcon = getIconComponent('Bell');
    const UserIcon = getIconComponent('User');
    const ClockIcon = getIconComponent('Clock');
    const ChevronUpIcon = getIconComponent('ChevronUp');
    const ChevronDownIcon = getIconComponent('ChevronDown');
    const EyeIcon = getIconComponent('Eye');
    const CheckCircleIcon = getIconComponent('CheckCircle');
    const ShipIcon = getIconComponent('Ship'); // Declared here
    const BoxIcon = getIconComponent('Box');   // Declared here


    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 font-sans flex flex-col antialiased text-gray-800 dark:text-gray-200">
            {/* Header for Order List Screen */}
            <header className="bg-white dark:bg-gray-800 shadow-md p-4 flex items-center justify-between sticky top-0 z-20">
                <button onClick={onBackToDashboard} className="text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-1 transition-transform duration-200 active:scale-95">
                    {HomeIcon && <HomeIcon size={24} />} {/* Home icon to go back to dashboard */}
                </button>
                <div className="flex-1 mx-3 relative">
                    <input
                        type="text"
                        placeholder="Search orders..."
                        className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {SearchIcon && <SearchIcon size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />}
                </div>
                <button onClick={toggleFilterModal} className="text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-1 transition-transform duration-200 active:scale-95">
                    {SlidersIcon && <SlidersIcon size={24} />}
                </button>
                {/* Dark Mode Toggle */}
                <button
                    onClick={toggleDarkMode}
                    className="ml-2 text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-1 transition-transform duration-200 active:scale-95"
                >
                    {isDarkMode ? (SunIcon && <SunIcon size={24} />) : (MoonIcon && <MoonIcon size={24} />)}
                </button>
            </header>

            {/* Sidebar (Mobile Nav) - Can be shared or specific to this screen */}
            <div className={`fixed inset-0 bg-gray-800 bg-opacity-75 z-30 transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={toggleSidebar}></div>
            <aside className={`fixed top-0 left-0 h-full bg-white dark:bg-gray-800 w-64 shadow-lg z-40 transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Menu</h2>
                    <button onClick={toggleSidebar} className="text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-1 transition-transform duration-200 active:scale-95">
                        {XIcon && <XIcon size={24} />}
                    </button>
                </div>
                <nav className="flex flex-col p-4 space-y-2">
                    <a href="#" className="flex items-center p-3 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 rounded-md transition-colors duration-200">
                        {LayoutGridIcon && <LayoutGridIcon size={20} className="mr-3" />} Fulfilment Dashboard
                    </a>
                    <a href="#" className="flex items-center p-3 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 rounded-md transition-colors duration-200">
                        {BellIcon && <BellIcon size={20} className="mr-3" />} Notifications
                    </a>
                    <a href="#" className="flex items-center p-3 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 rounded-md transition-colors duration-200">
                        {UserIcon && <UserIcon size={20} className="mr-3" />} Profile
                    </a>
                    {/* Add more navigation items here */}
                </nav>
            </aside>

            {/* Filter Modal */}
            {isFilterModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-30 flex items-end justify-center">
                    <div className="bg-white dark:bg-gray-800 w-full rounded-t-lg shadow-lg p-6 animate-slideUpFromBottom max-h-[80vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">Filters & Sort</h3>
                            <button onClick={toggleFilterModal} className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-1 transition-transform duration-200 active:scale-95">
                                {XIcon && <XIcon size={24} />}
                            </button>
                        </div>

                        {/* Filter by Type */}
                        <div className="mb-6">
                            <label htmlFor="filter-type" className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2">Order Type</label>
                            <select
                                id="filter-type"
                                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                value={selectedFilters.type}
                                onChange={(e) => handleFilterChange('type', e.target.value)}
                            >
                                <option value="All">All Types</option>
                                <option value="Panel">Panel</option>
                                <option value="Trim">Trim</option>
                                <option value="Lumber">Lumber</option>
                                <option value="Accessories">Accessories</option>
                            </select>
                        </div>

                        {/* Filter by Show */}
                        <div className="mb-6">
                            <label htmlFor="filter-show" className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2">Show</label>
                            <select
                                id="filter-show"
                                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                value={selectedFilters.show}
                                onChange={(e) => handleFilterChange('show', e.target.value)}
                            >
                                <option value="All">All Orders</option>
                                <option value="Priority">Priority Orders</option>
                                <option value="My Orders">My Orders</option>
                            </select>
                        </div>

                        {/* Apply Filters Button */}
                        <div className="mt-4">
                            <button
                                onClick={toggleFilterModal}
                                className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 active:scale-95"
                            >
                                Apply Filters
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content Area */}
            <main className="flex-1 p-4 pb-16 overflow-y-auto">
                {/* Priority Orders Section (If filtered) */}
                {selectedFilters.show === 'Priority' && (
                    <div className="bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-700 text-yellow-800 dark:text-yellow-200 p-3 rounded-md mb-4 flex items-center">
                        {ClockIcon && <ClockIcon size={20} className="mr-2 text-yellow-600 dark:text-yellow-400" />}
                        <span className="font-medium">Showing Priority Orders Only</span>
                    </div>
                )}
                {/* All Orders Section (If filtered) */}
                {selectedFilters.show === 'All' && (
                    <div className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 text-blue-800 dark:text-blue-200 p-3 rounded-md mb-4 flex items-center">
                        {LayoutGridIcon && <LayoutGridIcon size={20} className="mr-2 text-blue-600 dark:text-blue-400" />}
                        <span className="font-medium">Showing All Orders</span>
                    </div>
                )}


                {/* Orders List */}
                <div className="space-y-4">
                    {filteredOrders.length > 0 ? (
                        filteredOrders.map(order => (
                            <div key={order.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-200 dark:border-gray-700 transform transition-transform duration-200 active:scale-[0.98] group">
                                <div onClick={() => toggleOrderDetails(order.id)} className="cursor-pointer">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">{order.id}</h3>
                                        <div className="flex items-center space-x-2">
                                            {order.priority && (
                                                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-200">Priority</span>
                                            )}
                                            {expandedOrderId === order.id ? (
                                                <ChevronUpIcon size={20} className="text-gray-500 dark:text-gray-400" />
                                            ) : (
                                                <ChevronDownIcon size={20} className="text-gray-500 dark:text-gray-400" />
                                            )}
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                                        <span className="font-semibold">{order.billTo}</span>
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Ship to: <span className="font-medium">{order.shipTo}</span></p>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">Ship Date: <span className="font-medium">{order.shipDate}</span></p>
                                    <p className={`text-sm font-semibold mt-2 ${order.status === 'Completed' ? 'text-green-600 dark:text-green-400' : order.status === 'Delivered' ? 'text-blue-600 dark:text-blue-400' : 'text-orange-600 dark:text-orange-400'}`}>Status: {order.status}</p>
                                </div>

                                {expandedOrderId === order.id && (
                                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2 text-sm text-gray-700 dark:text-gray-300 animate-fadeIn">
                                        <p><span className="font-semibold">Type:</span> {order.type}</p>
                                        <p><span className="font-semibold">MFG Complete:</span> {order.mfgComplete}%</p>
                                        <p><span className="font-semibold">Items:</span> {order.items}</p>
                                        <p><span className="font-semibold">Customer PO:</span> {order.customerPO || 'N/A'}</p>
                                        <p><span className="font-semibold">Sales Person:</span> {order.salesPerson}</p>
                                        <p><span className="font-semibold">Ship Via:</span> {order.shipVia}</p>
                                        <p><span className="font-semibold">Load Time:</span> {order.loadTime}</p>
                                        <p><span className="font-semibold">Truck:</span> {order.truck || 'N/A'}</p>
                                        <p><span className="font-semibold">Weight:</span> {order.weight} lbs</p>

                                        {/* Action buttons for expanded view */}
                                        <div className="flex justify-end space-x-3 mt-4">
                                            <button
                                                onClick={() => handleOpenOrder(order.id)}
                                                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-md text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 active:scale-95 flex items-center"
                                            >
                                                {EyeIcon && <EyeIcon size={16} className="mr-1" />} Open
                                            </button>
                                            <button
                                                onClick={() => handleClaimOrder(order.id)}
                                                className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 active:scale-95 flex items-center"
                                            >
                                                {CheckCircleIcon && <CheckCircleIcon size={16} className="mr-1" />} Claim
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-gray-500 dark:text-gray-400 mt-10">No orders found matching your criteria.</div>
                    )}
                </div>
            </main>

            {/* Bottom Navigation Bar - Can be shared or specific to this screen */}
            <footer className="bg-white dark:bg-gray-800 shadow-lg p-3 fixed bottom-0 left-0 right-0 z-20 border-t border-gray-200 dark:border-gray-700">
                <nav className="flex justify-around items-center">
                    <a href="#" className="flex flex-col items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 active:scale-95">
                        {LayoutGridIcon && <LayoutGridIcon size={24} />}
                        <span className="text-xs mt-1">Orders</span>
                    </a>
                    <a href="#" className="flex flex-col items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 active:scale-95">
                        {ShipIcon && <ShipIcon size={24} />} {/* Corrected usage */}
                        <span className="text-xs mt-1">Ship</span>
                    </a>
                    <a href="#" className="flex flex-col items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 active:scale-95">
                        {BoxIcon && <BoxIcon size={24} />} {/* Corrected usage */}
                        <span className="text-xs mt-1">Unload</span>
                    </a>
                    <a href="#" className="flex flex-col items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 active:scale-95">
                        {SearchIcon && <SearchIcon size={24} />}
                        <span className="text-xs mt-1">Lookup</span>
                    </a>
                </nav>
            </footer>
        </div>
    );
};

// TransferScreen Component - Displays trip groups
const TransferScreen = ({ onBackToDashboard, orders, toggleDarkMode, isDarkMode }) => {
    const [expandedTripId, setExpandedTripId] = useState(null);

    // Group orders by tripId, only including orders that have a tripId
    const trips = orders.reduce((acc, order) => {
        if (order.tripId) { // Ensure the order has a tripId to be considered for a "transfer" trip
            if (!acc[order.tripId]) {
                acc[order.tripId] = [];
            }
            acc[order.tripId].push(order);
        }
        return acc;
    }, {});

    const sortedTripIds = Object.keys(trips).sort();

    const toggleTripDetails = (tripId) => {
        setExpandedTripId(expandedTripId === tripId ? null : tripId);
    };

    const HomeIcon = getIconComponent('Home');
    const SunIcon = getIconComponent('Sun');
    const MoonIcon = getIconComponent('Moon');
    const CarIcon = getIconComponent('Car');
    const ChevronUpIcon = getIconComponent('ChevronUp'); // Declared here
    const ChevronDownIcon = getIconComponent('ChevronDown'); // Declared here


    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 font-sans flex flex-col antialiased text-gray-800 dark:text-gray-200">
            {/* Header for Transfer Screen */}
            <header className="bg-blue-600 dark:bg-blue-900 text-white p-4 flex items-center justify-between shadow-md">
                <button onClick={onBackToDashboard} className="text-white focus:outline-none focus:ring-2 focus:ring-white rounded-md p-1 transition-transform duration-200 active:scale-95">
                    {HomeIcon && <HomeIcon size={24} />}
                </button>
                <h1 className="text-xl font-semibold">Transfer (Trip Groups)</h1>
                {/* Dark Mode Toggle */}
                <button
                    onClick={toggleDarkMode}
                    className="ml-auto text-white focus:outline-none focus:ring-2 focus:ring-white rounded-md p-1 transition-transform duration-200 active:scale-95"
                >
                    {isDarkMode ? (SunIcon && <SunIcon size={24} />) : (MoonIcon && <MoonIcon size={24} />)}
                </button>
            </header>

            <main className="flex-1 p-4 pb-16 overflow-y-auto">
                {sortedTripIds.length > 0 ? (
                    <div className="space-y-4">
                        {sortedTripIds.map(tripId => (
                            <div key={tripId} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-200 dark:border-gray-700">
                                <div onClick={() => toggleTripDetails(tripId)} className="cursor-pointer flex items-center justify-between">
                                    <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center">
                                        {CarIcon && <CarIcon size={24} className="mr-2 text-blue-600 dark:text-blue-400" />}
                                        Trip: {tripId}
                                    </h2>
                                    <div className="flex items-center space-x-2">
                                        <span className="bg-blue-100 dark:bg-blue-700 text-blue-800 dark:text-blue-100 text-sm font-semibold px-2.5 py-0.5 rounded-full">
                                            {trips[tripId].length} Orders
                                        </span>
                                        {expandedTripId === tripId ? (
                                            ChevronUpIcon && <ChevronUpIcon size={20} className="text-gray-500 dark:text-gray-400" />
                                        ) : (
                                            ChevronDownIcon && <ChevronDownIcon size={20} className="text-gray-500 dark:text-gray-400" />
                                        )}
                                    </div>
                                </div>
                                {expandedTripId === tripId && (
                                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3 animate-fadeIn">
                                        <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Orders in this Trip:</h3>
                                        {trips[tripId].map(order => (
                                            <div key={order.id} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md border border-gray-100 dark:border-gray-600 text-sm text-gray-700 dark:text-gray-300">
                                                <p className="font-medium">{order.id} - {order.billTo}</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">Ship Via: {order.shipVia} | Status: {order.status}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-500 dark:text-gray-400 mt-10">No trip groups found.</div>
                )}
            </main>
        </div>
    );
};


// DashboardScreen Component - Displays a grid of main navigation items
const DashboardScreen = ({ onNavigate, orders, toggleDarkMode, isDarkMode }) => {
    const priorityOrdersCount = orders.filter(order => order.priority).length;
    const totalOrdersCount = orders.length;
    const nonDeliveryOrdersCount = orders.filter(order => order.shipVia !== 'Delivery').length;
    const deliveryOrdersCount = orders.filter(order => order.shipVia === 'Delivery').length;

    // Calculate unique trip groups count
    // This now explicitly only counts trips for orders that have a tripId
    const uniqueTripIds = new Set(orders.filter(order => order.tripId).map(order => order.tripId));
    const tripGroupsCount = uniqueTripIds.size;

    const dashboardItems = [
        { name: 'Lookup', icon: 'Search', targetScreen: { name: 'orders', filter: 'All' } },
        { name: 'Transfer', icon: 'ArrowRightLeft', targetScreen: 'transfer', counter: tripGroupsCount }, // Counter for Transfer
        { name: 'Shipping (Deliveries)', icon: 'Ship', targetScreen: 'ship', counter: deliveryOrdersCount },
        { name: 'Picking (CPU)', icon: 'Package', targetScreen: 'picking', counter: nonDeliveryOrdersCount },
        { name: 'Packing', icon: 'Archive', targetScreen: 'packing' },
        { name: 'Restaging', icon: 'RefreshCcw', targetScreen: 'http://10.0.1.44/Fulfillment/RestagePage.html' },
        { name: 'Receiving', icon: 'Download', targetScreen: 'http://10.0.1.44/Receiving/PurchaseReceiving.aspx#/' },
        { name: 'Quality Control', icon: 'CheckSquare', targetScreen: 'quality_control' },
    ];

    const wideDashboardItems = [
        {
            name: 'Order Dashboard',
            icon: 'LayoutGrid',
            targetScreen: { name: 'orders', filter: 'All' },
            counter: totalOrdersCount
        },
        {
            name: 'Priority Orders',
            icon: 'Clock',
            targetScreen: { name: 'orders', filter: 'Priority' },
            counter: priorityOrdersCount
        },
    ];

    const MenuIcon = getIconComponent('Menu');
    const SunIcon = getIconComponent('Sun');
    const MoonIcon = getIconComponent('Moon');


    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 font-sans flex flex-col antialiased text-gray-800 dark:text-gray-200">
            {/* Header for Dashboard Screen */}
            <header className="bg-blue-600 dark:bg-blue-900 text-white p-4 flex items-center justify-between shadow-md">
                <button className="text-white focus:outline-none focus:ring-2 focus:ring-white rounded-md p-1 transition-transform duration-200 active:scale-95">
                    {MenuIcon && <MenuIcon size={24} />}
                </button>
                <h1 className="text-xl font-semibold">Paradigm</h1>
                {/* Dark Mode Toggle */}
                <button
                    onClick={toggleDarkMode}
                    className="ml-auto text-white focus:outline-none focus:ring-2 focus:ring-white rounded-md p-1 transition-transform duration-200 active:scale-95"
                >
                    {isDarkMode ? (SunIcon && <SunIcon size={24} />) : (MoonIcon && <MoonIcon size={24} />)}
                </button>
            </header>

            {/* Main Content Area - Dashboard Grid */}
            <main className="flex-1 p-4 overflow-y-auto">
                <div className="max-w-4xl mx-auto">
                    {/* Wide buttons section */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
                        {wideDashboardItems.map((item) => {
                            const IconComponent = getIconComponent(item.icon);
                            return (
                                <button
                                    key={item.name}
                                    onClick={() => onNavigate(item.targetScreen)}
                                    className="relative flex flex-col items-center justify-center bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-full"
                                >
                                    {IconComponent && <IconComponent size={48} className="text-green-600 dark:text-green-400 mb-3" />}
                                    <span className="text-md font-semibold text-gray-800 dark:text-gray-200">{item.name}</span>
                                    {item.counter !== undefined && (
                                        <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                            {item.counter}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Original smaller buttons section */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
                        {dashboardItems.map((item) => {
                            const IconComponent = getIconComponent(item.icon);
                            return (
                                <button
                                    key={item.name}
                                    onClick={() => onNavigate(item.targetScreen)}
                                    className="relative flex flex-col items-center justify-center bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                >
                                    {IconComponent && <IconComponent size={48} className="text-green-600 dark:text-green-400 mb-3" />}
                                    <span className="text-md font-semibold text-gray-800 dark:text-gray-200">{item.name}</span>
                                    {item.counter !== undefined && (
                                        <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                            {item.counter}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </main>
        </div>
    );
};

// Main App Component - Handles routing between dashboard and other screens
const App = () => {
    const [currentScreen, setCurrentScreen] = useState({ name: 'dashboard' });
    const [allOrders, setAllOrders] = useState(mockOrders); // Using mockOrders for now
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setIsDarkMode(prevMode => !prevMode);
        localStorage.setItem('darkMode', JSON.stringify(!isDarkMode)); // Persist preference
    };

    useEffect(() => {
        const savedMode = localStorage.getItem('darkMode');
        if (savedMode !== null) {
            setIsDarkMode(JSON.parse(savedMode));
        }
    }, []);

    const navigateTo = (screenInfo) => {
        if (typeof screenInfo === 'string' && (screenInfo.startsWith('http://') || screenInfo.startsWith('https://'))) {
            window.location.href = screenInfo;
        } else if (typeof screenInfo === 'string') {
            setCurrentScreen({ name: screenInfo });
        } else {
            setCurrentScreen(screenInfo);
        }
    };

    // Centralized rendering logic for screens
    const renderScreen = () => {
        switch (currentScreen.name) {
            case 'dashboard':
                return (
                    <DashboardScreen
                        onNavigate={navigateTo}
                        orders={allOrders}
                        toggleDarkMode={toggleDarkMode}
                        isDarkMode={isDarkMode}
                    />
                );
            case 'orders':
                return (
                    <OrderListScreen
                        onBackToDashboard={() => navigateTo('dashboard')}
                        initialFilter={currentScreen.filter}
                        orders={allOrders}
                        toggleDarkMode={toggleDarkMode}
                        isDarkMode={isDarkMode}
                    />
                );
            case 'transfer':
                return (
                    <TransferScreen
                        onBackToDashboard={() => navigateTo('dashboard')}
                        orders={allOrders}
                        toggleDarkMode={toggleDarkMode}
                        isDarkMode={isDarkMode}
                    />
                );
            // Add cases for other screens here (e.g., 'picking', 'packing', etc.)
            default:
                return (
                    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center text-gray-800 dark:text-gray-200">
                        <div className="text-center p-4">
                            <h2 className="text-2xl font-bold">Coming Soon!</h2>
                            <p className="mt-2">The '{currentScreen.name}' screen is under development.</p>
                            <button
                                onClick={() => navigateTo('dashboard')}
                                className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                            >
                                Back to Dashboard
                            </button>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className={isDarkMode ? 'dark' : ''}>
            {renderScreen()}
        </div>
    );
};

export default App;
