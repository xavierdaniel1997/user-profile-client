// AdminLayout.js
import React from 'react';
import SideNavbar from '../components/admin/SideNavbar';
import TopNavbar from '../components/admin/TopNavbar';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="flex">
      <SideNavbar />
      <div className="ml-64 flex-1">
        <TopNavbar />
        <div className="pt-28 bg-slate-100 pb-16">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
