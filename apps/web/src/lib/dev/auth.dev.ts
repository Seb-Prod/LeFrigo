export const authDevDefaults = {
  email:
    process.env.NODE_ENV === "development"
      ? (process.env.NEXT_PUBLIC_DEV_EMAIL ?? "")
      : "",

  password:
    process.env.NODE_ENV === "development"
      ? (process.env.NEXT_PUBLIC_DEV_PASSWORD ?? "")
      : "",
};
