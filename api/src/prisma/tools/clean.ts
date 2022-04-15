export function cleanNullFromBoolean(
  bool: boolean | null | undefined
): boolean | undefined {
  if (bool === null) {
    return undefined;
  }
  return bool;
}
