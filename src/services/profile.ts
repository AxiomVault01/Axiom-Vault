import api from "./Axios";

const PICTURE_URL = "/me/picture/";

export const ALLOWED_PICTURE_TYPES = ["image/jpeg", "image/png", "image/webp"];
export const MAX_PICTURE_SIZE = 2 * 1024 * 1024; // 2 MB

// Returns an error message if the file can't be uploaded, otherwise null
export const validatePicture = (file: File): string | null => {
  if (!ALLOWED_PICTURE_TYPES.includes(file.type)) {
    return "Profile picture must be a JPEG, PNG, or WebP image.";
  }
  if (file.size > MAX_PICTURE_SIZE) {
    return "Profile picture must be 2 MB or smaller.";
  }
  return null;
};

export interface ProfilePictureResponse {
  profile_picture: string | null;
}

// Works for both the upload response and the stored user object
export const getPictureUrl = (data: any): string | null =>
  data?.profile_picture ?? null;

export const uploadProfilePicture = async (
  file: File,
): Promise<ProfilePictureResponse> => {
  const formData = new FormData();
  formData.append("file", file);
  // Override the instance's JSON default, otherwise axios serializes FormData to JSON
  const res = await api.put(PICTURE_URL, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const deleteProfilePicture = async () => {
  const res = await api.delete(PICTURE_URL);
  return res.data;
};

const ME_URL = "/me/";

export interface MyProfile {
  full_name: string;
  department: string;
  phone_number: string;
  email: string;
  role: string;
  account_type: string;
  organisation: string | { name?: string } | null;
  profile_picture?: string | null;
}

// Only these fields can be changed by the user; the rest are managed elsewhere
export type MyProfileUpdate = Pick<MyProfile, "full_name" | "department" | "phone_number">;

const unwrap = (data: any) => data?.data ?? data;

export const getMe = async (): Promise<MyProfile> => {
  const res = await api.get(ME_URL);
  return unwrap(res.data);
};

export const updateMe = async (payload: MyProfileUpdate): Promise<MyProfile> => {
  const res = await api.patch(ME_URL, payload);
  return unwrap(res.data);
};
