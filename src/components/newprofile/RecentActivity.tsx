const RecentActivity = () => {
  const activities = [
    { text: "Reviewed case ACC-2847", time: "2 hours ago" },
    { text: "Generated monthly report", time: "5 hours ago" },
    { text: "Updated case evidence ACC-1923", time: "Yesterday, 3:45 PM" },
    { text: "Closed investigation ACC-5621", time: "Yesterday, 11:20 AM" },
    { text: "Created new alert ACC-7634", time: "2 days ago" },
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border">
      <h3 className="font-semibold text-lg mb-6">Recent Activity</h3>

      <div className="space-y-6">
        {activities.map((item, i) => (
          <div key={i} className="flex gap-4">
            <div className="w-3 h-3 mt-2 bg-green-500 rounded-full" />
            <div>
              <p className="text-sm">{item.text}</p>
              <p className="text-xs text-gray-500">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
