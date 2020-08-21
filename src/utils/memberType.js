export function sanitizeMember(type) {
  switch (type) {
    case "AB":
      return "Annual Corporate Member(With Two Members)";
    case "AA":
      return "Annual Corporate Member(With Five Members)";
    case "LB":
      return "Life Corporate Member(With Two Members)";
    case "LM":
      return "Life Individual Member";
    case "LA":
      return "Life Corporate Member(With Five Members)";
    case "LP":
      return "Life Patron";
    default:
      return "Annual Individual Member";
  }
}
