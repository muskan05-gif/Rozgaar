import React, { useState } from 'react';
import {
  Bell,
  Search,
  Plus,
  MoreHorizontal,
  Eye,
  Ban,
  ChevronDown
} from 'lucide-react';

const initialSocieties = [
  {
    id: 'soc_40dd1dde735d',
    name: 'Navodaya Shramik Sahakari Samiti',
    district: 'Pune',
    state: 'Maharashtra',
    head: 'Rajesh Deshmukh',
    phone: '+91 98201 44521',
    status: 'Active',
    created: '2 days ago'
  },
  {
    id: 'soc_91bb2cca441f',
    name: 'Janata Vikas Mazdoor Federation',
    district: 'Bengaluru Urban',
    state: 'Karnataka',
    head: 'Kavitha Ramaswamy',
    phone: '+91 80234 88712',
    status: 'Active',
    created: '5 days ago'
  },
  {
    id: 'soc_18fe3bb2098e',
    name: 'Gramin Rozgaar Sahakari Mandali',
    district: 'Ahmedabad',
    state: 'Gujarat',
    head: 'Bhavesh Patel',
    phone: '+91 94270 19342',
    status: 'Active',
    created: '1 week ago'
  },
  {
    id: 'soc_72aa5ef9012d',
    name: 'Kisan & Karigar Sahakari Sangh',
    district: 'Ludhiana',
    state: 'Punjab',
    head: 'Harpreet Singh',
    phone: '+91 98150 77219',
    status: 'Inactive',
    created: '2 weeks ago'
  },
  {
    id: 'soc_33bc8fa11429',
    name: 'Dakshin Kamgar Sahakar Sangham',
    district: 'Ernakulam',
    state: 'Kerala',
    head: 'Anjali Menon',
    phone: '+91 94471 63098',
    status: 'Active',
    created: '3 weeks ago'
  },
  {
    id: 'soc_55de901cf882',
    name: 'Utkarsh Ekta Sahakari Manch',
    district: 'Jaipur',
    state: 'Rajasthan',
    head: 'Mahesh Sharma',
    phone: '+91 94140 55120',
    status: 'Inactive',
    created: '1 month ago'
  }
];

export default function SocietiesDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('All States');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');
  const [activeTab, setActiveTab] = useState('Active Roster');
  const [openDropdownId, setOpenDropdownId] = useState(null);

  const toggleDropdown = (id) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-800 flex flex-col">
      
      {/* HEADER */}
      <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <span>Federation Panel</span>
          <span>/</span>
          <span className="text-slate-800 font-medium">Regional Oversight</span>
        </div>

        <div className="flex items-center gap-4">
          <button className="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-full transition">
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="flex items-center gap-3 pl-2 border-l border-slate-200">
            <div className="text-right">
              <div className="text-sm font-semibold text-slate-800">Vikram Malhotra</div>
              <div className="text-xs text-slate-500">Federation Admin</div>
            </div>
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80"
              alt="Profile"
              className="w-9 h-9 rounded-full object-cover border border-slate-200"
            />
          </div>
        </div>
      </header>

      {/* PAGE CONTENT */}
      <main className="p-8 max-w-[1400px] w-full mx-auto flex-1">
        
        {/* TITLE & ACTION */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-slate-900">Societies</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                28 Total
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              Manage state cooperative societies, regional chapters, and cooperative heads across all federation nodes.
            </p>
          </div>
          <button className="bg-[#0B192C] text-white hover:bg-[#1E293B] px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 shadow-sm transition">
            <Plus size={16} />
            Create Society
          </button>
        </div>

        {/* FILTERS & SEARCH */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="relative flex-1 min-w-[280px] max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search by ID, name, district or head..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400/20 focus:border-slate-400"
            />
          </div>

          <div className="flex items-center gap-3 text-sm text-slate-600">
            <div className="relative">
              <select 
                value={selectedState} 
                onChange={(e) => setSelectedState(e.target.value)}
                className="appearance-none bg-white border border-slate-200 rounded-lg pl-3 pr-8 py-2 text-sm text-slate-700 cursor-pointer focus:outline-none"
              >
                <option>State: All States</option>
                <option>Maharashtra</option>
                <option>Karnataka</option>
                <option>Gujarat</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
            </div>

            <div className="relative">
              <select 
                value={selectedStatus} 
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="appearance-none bg-white border border-slate-200 rounded-lg pl-3 pr-8 py-2 text-sm text-slate-700 cursor-pointer focus:outline-none"
              >
                <option>Status: All Statuses</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
            </div>

            <span className="text-slate-500 text-xs ml-2 font-medium">
              Showing <strong className="text-slate-700 font-semibold">6</strong> of 28 societies
            </span>
          </div>
        </div>

        {/* TABS & SYNC STATUS */}
        <div className="flex justify-between items-center border-b border-slate-200 mb-4">
          <div className="flex gap-6">
            <button
              onClick={() => setActiveTab('Active Roster')}
              className={`pb-3 text-sm font-semibold transition relative ${
                activeTab === 'Active Roster'
                  ? 'text-slate-900 border-b-2 border-slate-900'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Active Roster
            </button>
            <button
              onClick={() => setActiveTab('Empty State Preview')}
              className={`pb-3 text-sm font-semibold transition relative ${
                activeTab === 'Empty State Preview'
                  ? 'text-slate-900 border-b-2 border-slate-900'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Empty State Preview
            </button>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium pb-3">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            Synced with Regional Ledger
          </div>
        </div>

        {/* DATA TABLE */}
        <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-[11px] font-bold tracking-wider text-slate-500 uppercase bg-slate-50/50">
                  <th className="py-3 px-4">Society ID</th>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">District / State</th>
                  <th className="py-3 px-4">Society Head</th>
                  <th className="py-3 px-4">Contact Phone</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Created</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {initialSocieties.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-4 px-4 font-mono text-slate-500">{row.id}</td>
                    <td className="py-4 px-4 font-bold text-slate-800 max-w-[180px] leading-snug">
                      {row.name}
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-semibold text-slate-800">{row.district}</div>
                      <div className="text-slate-400">{row.state}</div>
                    </td>
                    <td className="py-4 px-4 font-medium text-slate-800">{row.head}</td>
                    <td className="py-4 px-4 font-mono text-slate-600">{row.phone}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold ${
                          row.status === 'Active'
                            ? 'bg-[#0B192C] text-white'
                            : 'bg-white border border-slate-300 text-slate-500'
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-slate-500 font-medium">{row.created}</td>
                    <td className="py-4 px-4 text-right relative">
                      <button
                        onClick={() => toggleDropdown(row.id)}
                        className="p-1 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
                      >
                        <MoreHorizontal size={16} />
                      </button>

                      {openDropdownId === row.id && (
                        <div className="absolute right-4 top-10 z-10 w-40 bg-white border border-slate-200 rounded-lg shadow-lg py-1 text-left">
                          <button className="w-full px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                            <Eye size={14} className="text-slate-400" />
                            View Details
                          </button>
                          <button className="w-full px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2">
                            <Ban size={14} />
                            Deactivate
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* TABLE FOOTER / PAGINATION */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-slate-200 text-xs text-slate-500">
            <div>Showing <strong className="font-semibold text-slate-700">1 to 6</strong> of 28 societies</div>
            
            <div className="flex items-center gap-1 font-medium">
              <button className="px-3 py-1 text-slate-400 hover:text-slate-600 cursor-not-allowed">Previous</button>
              <button className="px-2.5 py-1 rounded border border-slate-900 font-bold text-slate-900 bg-white">1</button>
              <button className="px-2.5 py-1 hover:text-slate-800">2</button>
              <button className="px-2.5 py-1 hover:text-slate-800">3</button>
              <span className="px-1 text-slate-400">...</span>
              <button className="px-2.5 py-1 hover:text-slate-800">5</button>
              <button className="px-3 py-1 text-slate-700 hover:text-slate-900">Next</button>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}