//npm install recharts

// import React from 'react';
// import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

// const PieCharts = () => {
//   // Your data
//   const data = [
//     { name: 'Duplicate Accounts', value: 35, color: '#EF4444' }, // red
//     { name: 'Invalid Details', value: 25, color: '#F59E0B' },    // orange
//     { name: 'Unusual Patterns', value: 25, color: '#8B5CF6' },   // purple
//     { name: 'Missing Info', value: 15, color: '#6B7280' },       // gray
//   ];

//   // Custom label to show percentage inside the pie
//   const renderLabel = (entry) => {
//     return `${entry.value}%`;
//   };

//   return (
//     <div style={{
//       backgroundColor: 'white',
//       padding: '24px',
//       borderRadius: '12px',
//       boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
//       maxWidth: '800px'
//     }}>
//       <h2 style={{
//         fontSize: '24px',
//         fontWeight: '600',
//         marginBottom: '24px',
//         color: '#1f2937'
//       }}>
//         Risk Categories
//       </h2>

//       <ResponsiveContainer width="100%" height={400}>
//         <PieChart>
//           <Pie
//             data={data}
//             cx="50%"
//             cy="50%"
//             labelLine={false}
//             label={renderLabel}
//             outerRadius={150}
//             fill="#8884d8"
//             dataKey="value"
//           >
//             {data.map((entry, index) => (
//               <Cell key={`cell-${index}`} fill={entry.color} />
//             ))}
//           </Pie>
//           <Legend 
//             verticalAlign="middle" 
//             align="right"
//             layout="vertical"
//             iconType="square"
//           />
//         </PieChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default PieCharts;