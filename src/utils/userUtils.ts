export function getInitials(name: string | undefined) {
  const initials = name
    ? name
        .split(" ")
        .map((word) => word[0])
        .join("")
    : "";

  return initials;
}
