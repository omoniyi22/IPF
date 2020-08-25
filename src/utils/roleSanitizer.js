export default function roleSanitizer(role) {
  switch (role) {
    case "super-admin":
      return "Platform Admin";
    case "super-user":
      return "Company Admin";
    default:
      return "Member";
  }
}
