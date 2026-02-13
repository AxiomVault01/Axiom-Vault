// npm install lucide-react

// import React from 'react';
// import { Search, Download, FileText, Bell, CheckCircle } from 'lucide-react';

// const QuickActions = () => {
//   const actions = [
//     {
//       id: 1,
//       icon: Search,
//       label: 'Run Full Audit',
//       onClick: () => console.log('Run Full Audit'),
//       bgColor: '#EFF6FF'
//     },
//     {
//       id: 2,
//       icon: Download,
//       label: 'Export Report',
//       onClick: () => console.log('Export Report'),
//       bgColor: '#F9FAFB'
//     },
//     {
//       id: 3,
//       icon: FileText,
//       label: 'Generate Report',
//       onClick: () => console.log('Generate Report'),
//       bgColor: '#F9FAFB'
//     },
//     {
//       id: 4,
//       icon: Bell,
//       label: 'Alert Settings',
//       onClick: () => console.log('Alert Settings'),
//       bgColor: '#F9FAFB'
//     }
//   ];

//   return (
//     <div style={{
//       backgroundColor: 'white',
//       padding: '24px',
//       borderRadius: '12px',
//       boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
//       maxWidth: '300px'
//     }}>
//       <h3 style={{
//         fontSize: '18px',
//         fontWeight: '600',
//         marginBottom: '16px',
//         color: '#111827'
//       }}>
//         Quick Actions
//       </h3>

//       <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
//         {actions.map(action => {
//           const Icon = action.icon;
//           return (
//             <button
//               key={action.id}
//               onClick={action.onClick}
//               style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '12px',
//                 padding: '12px 16px',
//                 backgroundColor: action.bgColor,
//                 border: 'none',
//                 borderRadius: '8px',
//                 cursor: 'pointer',
//                 fontSize: '14px',
//                 fontWeight: '500',
//                 color: '#374151',
//                 textAlign: 'left',
//                 transition: 'all 0.2s'
//               }}
//               onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E5E7EB'}
//               onMouseLeave={(e) => e.currentTarget.style.backgroundColor = action.bgColor}
//             >
//               <Icon size={18} color="#6B7280" />
//               <span>{action.label}</span>
//             </button>
//           );
//         })}
//       </div>

//       {/* System Status */}
//       <div style={{
//         marginTop: '16px',
//         padding: '16px',
//         backgroundColor: '#ECFDF5',
//         borderRadius: '8px',
//         border: '1px solid #D1FAE5'
//       }}>
//         <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
//           <CheckCircle size={18} color="#059669" />
//           <span style={{ fontSize: '14px', fontWeight: '600', color: '#065F46' }}>
//             System Status
//           </span>
//         </div>
//         <p style={{ fontSize: '13px', color: '#047857', margin: '4px 0' }}>
//           All monitoring systems operational
//         </p>
//         <p style={{ fontSize: '12px', color: '#059669' }}>
//           Last updated: 2 minutes ago
//         </p>
//       </div>
//     </div>
//   );
// };

// export default QuickActions;

// import React from "react";

const QuickActions = () => {
  const actions = [
    {
      id: 1,
      icon: "🔍",
      label: "Run Full Audit",
      onClick: () => console.log("Run Full Audit"),
      bgColor: "#EFF6FF", // light blue
    },
    {
      id: 2,
      icon: "⬇️",
      label: "Export Report",
      onClick: () => console.log("Export Report"),
      bgColor: "#F9FAFB", // light gray
    },
    {
      id: 3,
      icon: "📄",
      label: "Generate Report",
      onClick: () => console.log("Generate Report"),
      bgColor: "#F9FAFB",
    },
    {
      id: 4,
      icon: "🔔",
      label: "Alert Settings",
      onClick: () => console.log("Alert Settings"),
      bgColor: "#F9FAFB",
    },
  ];

  return (
    <div className="max-w-[400px] rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03] md:p-5">
      {/* Title */}
      <h3 className="mb-4 text-[18px] font-semibold text-gray-900 dark:text-white/90">
        Quick Actions
      </h3>

      {/* Action Buttons */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={action.onClick}
            style={{
              // Only apply dynamic color if you aren't forcing a specific dark-mode look
              backgroundColor: action.bgColor,
            }}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-700 transition-all dark:!bg-white/[0.03] dark:text-white/90 dark:hover:!bg-white/[0.08]"
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#E5E7EB")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = action.bgColor)
            }
          >
            <span style={{ fontSize: "18px" }}>{action.icon}</span>
            <span>{action.label}</span>
          </button>
        ))}
      </div>

      {/* System Status */}
      <div className="mt-4 p-4 bg-emerald-50 border border-emerald-100 rounded-lg dark:!bg-gray-900">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "4px",
          }}
        >
          <span style={{ fontSize: "18px" }}>✅</span>
          <span
            style={{ fontSize: "14px", fontWeight: "600", color: "#065F46" }}
          >
            System Status
          </span>
        </div>
        <p style={{ fontSize: "13px", color: "#047857", margin: "4px 0" }}>
          All monitoring systems operational
        </p>
        <p style={{ fontSize: "12px", color: "#059669" }}>
          Last updated: 2 minutes ago
        </p>
      </div>
    </div>
  );
};

export default QuickActions;
