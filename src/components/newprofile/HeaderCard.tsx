import { useState, useRef } from "react";
import { Camera, Edit, Loader2, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "react-router";
import {
  ALLOWED_PICTURE_TYPES,
  deleteProfilePicture,
  getPictureUrl,
  uploadProfilePicture,
  validatePicture,
} from "../../services/profile";
import { getErrorMessage } from "../../services/teamMembers";

const readStoredUser = () => {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

// Keep the cached user in sync so the new picture survives a reload
const storePictureUrl = (url: string | null) => {
  const user = readStoredUser();
  if (!user) return;
  localStorage.setItem("user", JSON.stringify({ ...user, profile_picture: url }));
};

const HeaderCard = () => {
  const userData = readStoredUser();
  const [profileImage, setProfileImage] = useState<string | null>(
    getPictureUrl(userData),
  );
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    // Reset so picking the same file again still fires onChange
    event.target.value = "";
    if (!file) return;

    const validationError = validatePicture(file);
    if (validationError) {
      toast.error(validationError);
      return;
    }

    setIsSaving(true);
    try {
      const { profile_picture } = await uploadProfilePicture(file);
      setProfileImage(profile_picture);
      storePictureUrl(profile_picture);
      toast.success("Profile picture updated");
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to update profile picture"));
    } finally {
      setIsSaving(false);
    }
  };

  const handleRemovePicture = async () => {
    setIsSaving(true);
    try {
      await deleteProfilePicture();
      setProfileImage(null);
      storePictureUrl(null);
      toast.success("Profile picture removed");
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to remove profile picture"));
    } finally {
      setIsSaving(false);
    }
  };

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };
  return (
    <div className="bg-brand-500 text-white rounded-2xl p-6 md:p-8 shadow-lg relative overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex items-center gap-6">
          {/* Avatar with Camera Icon */}
          <div className="relative">
            <div className="relative w-24 h-24 rounded-2xl bg-white/20 flex items-center justify-center text-3xl font-bold overflow-hidden">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                "SA"
              )}
              {isSaving && (
                <div className="absolute inset-0 rounded-2xl bg-black/40 flex items-center justify-center">
                  <Loader2 size={24} className="animate-spin" />
                </div>
              )}
            </div>
            {/* Camera Icon Button */}
            <button
              onClick={handleCameraClick}
              disabled={isSaving}
              className="absolute bottom-0 right-0 bg-white hover:bg-brand-500 transition p-2 rounded-full text-brand-500 hover:text-white shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
              title="Change profile picture"
            >
              <Camera size={16} />
            </button>
            {/* Remove Picture Button */}
            {profileImage && (
              <button
                onClick={handleRemovePicture}
                disabled={isSaving}
                className="absolute top-0 right-0 -translate-y-1/3 translate-x-1/3 bg-white hover:bg-red-500 transition p-1.5 rounded-full text-red-500 hover:text-white shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                title="Remove profile picture"
              >
                <Trash2 size={14} />
              </button>
            )}
            {/* Hidden File Input */}
            <input
              ref={fileInputRef}
              type="file"
              accept={ALLOWED_PICTURE_TYPES.join(",")}
              onChange={handleImageSelect}
              className="hidden"
              aria-label="Upload profile image"
            />
          </div>

          <div>
            <h2 className="text-2xl font-semibold">{userData?.full_name || "Guest User"}</h2>
            <p className="text-blue-100">{userData?.job_title || "Job Title"}</p>
            <p className="text-blue-200 text-sm">{userData?.department || "Department"}</p>
          </div>
        </div>

        <Link
          to="/settings"
          className="self-start md:self-auto bg-white/20 hover:bg-white/30 transition px-4 py-2 rounded-lg text-sm flex gap-2 items-center"
        >
          <Edit size={14} /> Edit Profile
        </Link>
      </div>

      {/* Info Boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        <InfoBox title="Employee ID" value={userData?.employee_id || "EMP-2847"} />
        <InfoBox title="Join Date" value={userData?.join_date || "January 15, 2022"} />
        <InfoBox title="Last Login" value={userData?.last_login || "Today, 9:24 AM"} />
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
