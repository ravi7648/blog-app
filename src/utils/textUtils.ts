export function ObfuscateIf(
  condition: boolean | undefined | null,
  text: string | undefined | null
) {
  return condition ? "*".repeat(text?.length || 0) : text;
}
