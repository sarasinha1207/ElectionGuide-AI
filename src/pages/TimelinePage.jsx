import React from 'react';
import { Megaphone, FileText, Users, CalendarDays, BarChart3, CheckCircle2 } from 'lucide-react';

const TimelinePage = () => {
  const steps = [
    {
      id: 1,
      title: "Announcement",
      description: "The Election Commission announces the election schedule, invoking the Model Code of Conduct.",
      icon: Megaphone,
      color: "bg-blue-100 text-blue-600",
      borderColor: "border-blue-200"
    },
    {
      id: 2,
      title: "Nomination",
      description: "Candidates file their nomination papers and affidavits. Scrutiny and withdrawal follows.",
      icon: FileText,
      color: "bg-purple-100 text-purple-600",
      borderColor: "border-purple-200"
    },
    {
      id: 3,
      title: "Campaign",
      description: "Political parties and candidates campaign to reach out to voters. Ends 48 hours before voting.",
      icon: Users,
      color: "bg-amber-100 text-amber-600",
      borderColor: "border-amber-200"
    },
    {
      id: 4,
      title: "Voting Day",
      description: "Registered voters cast their ballots at designated polling stations using EVMs and VVPATs.",
      icon: CalendarDays,
      color: "bg-green-100 text-green-600",
      borderColor: "border-green-200"
    },
    {
      id: 5,
      title: "Results",
      description: "Votes are counted under strict security, and the results are officially declared.",
      icon: BarChart3,
      color: "bg-indigo-100 text-indigo-600",
      borderColor: "border-indigo-200"
    }
  ];

  return (
    <div className="max-w-3xl mx-auto p-12 flex-1 h-full overflow-y-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Election Process Timeline</h2>
        <p className="text-slate-500 mt-3 text-lg">A clear overview of how the democratic process unfolds.</p>
      </div>

      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-[27px] top-4 bottom-4 w-1 bg-slate-100 rounded-full"></div>

        <div className="space-y-10 pb-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.id} className="relative flex items-start gap-6 group">
                {/* Stepper Icon */}
                <div className={`w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 relative z-10 border-4 border-white shadow-sm transition-transform duration-300 group-hover:scale-110 ${step.color}`}>
                  <Icon size={24} />
                </div>

                {/* Content Card */}
                <div className={`flex-1 bg-white border ${step.borderColor} p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow`}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-bold text-slate-400">Phase {step.id}</span>
                    <h3 className="text-xl font-bold text-slate-800">{step.title}</h3>
                  </div>
                  <p className="text-slate-600 leading-relaxed">{step.description}</p>
                </div>

                {/* Success Checkmark overlay (simulating progress) */}
                {index < 2 && (
                  <div className="absolute left-[38px] top-10 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm z-20">
                    <CheckCircle2 size={20} className="text-green-500" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TimelinePage;
