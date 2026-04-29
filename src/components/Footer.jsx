import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#F8FAFC] border-t border-slate-200 py-8 px-8 mt-auto flex-shrink-0 w-full z-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-sm text-slate-500 gap-6">
        <div className="max-w-xl">
          <p className="font-bold text-slate-900 text-base mb-2">ElectionGuide AI</p>
          <p className="leading-relaxed">
            © 2024 Election Commission Assistant. All rights reserved.<br />
            For educational purposes only. Empowering every citizen with accurate information.
          </p>
        </div>
        <div className="flex flex-wrap gap-6 md:gap-8 font-medium">
          <a href="#" className="hover:text-slate-800 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-slate-800 transition-colors">Accessibility Settings</a>
          <a href="#" className="hover:text-slate-800 transition-colors">Contact Support</a>
          <a href="#" className="text-[#E84E1B] hover:underline transition-all">Official ECI Portal</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
