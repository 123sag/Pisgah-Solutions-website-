export function isAdminAuthorized(req: Request): boolean {
  const configured = Netlify.env.get("ADMIN_DASHBOARD_PASSWORD");
  if (!configured) return false;
  const provided = req.headers.get("x-admin-password");
  return provided === configured;
}
