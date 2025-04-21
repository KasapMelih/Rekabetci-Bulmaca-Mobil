export function getUserIdFromReq(req: NextRequest) {
  const auth = req.headers.get("authorization"); // ← mobilde header’dan al
  const token = auth?.startsWith("Bearer ") ? auth.slice(7) : null;
  return token ? verifyJwt<{ sub: number }>(token)?.sub : null;
}
