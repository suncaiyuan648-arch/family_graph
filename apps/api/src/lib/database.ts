export function databaseEnabled() {
  return Boolean(process.env.DATABASE_URL);
}

