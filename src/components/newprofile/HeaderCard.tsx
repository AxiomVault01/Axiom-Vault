import { useState, useRef } from "react";
import { Camera, Edit } from "lucide-react";

const HeaderCard = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-gradient-to-r from-[#2D91D1] to-[#41a3e0] text-white rounded-2xl p-6 md:p-8 shadow-lg relative overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex items-center gap-6">
          {/* Avatar with Camera Icon */}
          <div className="relative">
            <div className="w-24 h-24 rounded-2xl bg-white/20 flex items-center justify-center text-3xl font-bold overflow-hidden">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                "SA"
              )}
            </div>
            {/* Camera Icon Button */}
            <button
              onClick={handleCameraClick}
              className="absolute bottom-0 right-0 bg-white hover:bg-[#2D91D1] transition p-2 rounded-full text-[#2D91D1] hover:text-white shadow-lg"
              title="Change profile picture"
            >
              <Camera size={16} />
            </button>
            {/* Hidden File Input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
              aria-label="Upload profile image"
            />
          </div>

          <div>
            <h2 className="text-2xl font-semibold">Sarah Anderson</h2>
            <p className="text-blue-100">Senior Auditor</p>
            <p className="text-blue-200 text-sm">Internal Audit Division</p>
          </div>
        </div>

        <button className="bg-white/20 hover:bg-white/30 transition px-4 py-2 rounded-lg text-sm flex gap-2 items-center">
         <Edit size={14}/> Edit Profile
        </button>
      </div>

      {/* Info Boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        <InfoBox title="Employee ID" value="EMP-2847" />
        <InfoBox title="Join Date" value="January 15, 2022" />
        <InfoBox title="Last Login" value="Today, 9:24 AM" />
      </div>
    </div>
  );
};

const InfoBox = ({ title, value }: { title: string; value: string }) => (
  <div className="bg-white/10 backdrop-blur-md rounded-xl p-4">
    <p className="text-xs text-blue-200">{title}</p>
    <p className="font-medium">{value}</p>
  </div>
);

export default HeaderCard;
