import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../pages/Home.css';

const DashboardLayout = ({ children }) => {
  return (
    <div className="layout-page">
      <Header />
      <main className="layout-main">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default DashboardLayout;

