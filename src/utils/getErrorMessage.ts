// Turns any backend error payload into a readable message.
// Handles shapes like:
//   { "error": "Your email is not verified." }
//   { "message": "..." } / { "detail": "..." }
//   { "full_name": ["This field is required."] }
//   { "non_field_errors": ["Invalid credentials."] }
//   ["Something went wrong."] / "plain string"

const MESSAGE_KEYS = ["error", "message", "detail", "non_field_errors", "errors"];

const humanize = (key: string) =>
  key.replace(/_/g, " ").replace(/^\w/, (c) => c.toUpperCase());

const flatten = (value: unknown): string => {
  if (value == null) return "";
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (Array.isArray(value)) return value.map(flatten).filter(Boolean).join(" ");
  if (typeof value === "object") return extractFromData(value as Record<string, unknown>);
  return "";
};

const extractFromData = (data: Record<string, unknown>): string => {
  for (const key of MESSAGE_KEYS) {
    const msg = flatten(data[key]);
    if (msg) return msg;
  }
  // Field-level validation errors: { field: ["msg"] }
  return Object.entries(data)
    .map(([field, value]) => {
      const msg = flatten(value);
      return msg ? `${humanize(field)}: ${msg}` : "";
    })
    .filter(Boolean)
    .join("\n");
};

export const extractBackendMessage = (data: unknown): string => {
  if (typeof data === "string") {
    // Ignore HTML error pages (e.g. a 502 from a proxy)
    return data.trim().startsWith("<") ? "" : data;
  }
  return flatten(data);
};

export const getErrorMessage = (err: any, fallback = "Something went wrong. Please try again.") => {
  if (err?.response) {
    return extractBackendMessage(err.response.data) || fallback;
  }
  if (err?.code === "ECONNABORTED") return "The request timed out. Please try again.";
  if (err?.code === "ERR_NETWORK") return "Unable to reach the server. Check your internet connection.";
  return err?.message || fallback;
};

// Per-field messages, e.g. { full_name: "This field is required." }
export const getFieldErrors = (err: any): Record<string, string> => {
  const data = err?.response?.data;
  if (!data || typeof data !== "object" || Array.isArray(data)) return {};
  const fields: Record<string, string> = {};
  for (const [key, value] of Object.entries(data)) {
    if (MESSAGE_KEYS.includes(key)) continue;
    const msg = flatten(value);
    if (msg) fields[key] = msg;
  }
  return fields;
};
