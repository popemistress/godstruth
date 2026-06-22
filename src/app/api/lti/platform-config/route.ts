import { NextResponse } from "next/server";

export async function GET() {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  return NextResponse.json({
    issuer: appUrl,
    authorization_endpoint: `${appUrl}/api/lti/login`,
    token_endpoint: `${appUrl}/api/lti/token`,
    jwks_uri: `${appUrl}/api/lti/jwks`,
    registration_endpoint: `${appUrl}/api/lti/register`,
    claims_supported: ["sub", "iss", "name", "email"],
    scopes_supported: ["openid"],
    response_types_supported: ["id_token"],
    id_token_signing_alg_values_supported: ["RS256"],
    token_endpoint_auth_methods_supported: ["private_key_jwt"],
  });
}
