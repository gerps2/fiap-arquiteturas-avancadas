export function maskCep(value: string): string {
  const cleaned = value.replace(/\D/g, '');
  if (cleaned.length <= 5) {
    return cleaned;
  }
  return `${cleaned.slice(0, 5)}-${cleaned.slice(5, 8)}`;
}

export function unmaskCep(value: string): string {
  return value.replace(/\D/g, '');
}
