import crypto from "crypto";
import { db } from "@/lib/db";
import type { Prisma } from "@prisma/client";

interface LtiKeyRecord {
  kid: string;
  privateKeyPem: string;
  publicKeyPem: string;
}

interface SiteSettingsWithKeys {
  ltiKeys?: LtiKeyRecord | null;
}

export async function getPlatformKeys(): Promise<{ privateKey: crypto.KeyObject; publicKey: crypto.KeyObject; kid: string }> {
  const settings = await db.siteSettings.findUnique({ where: { id: "singleton" } });
  const existing = (settings as unknown as SiteSettingsWithKeys)?.ltiKeys as LtiKeyRecord | undefined;

  if (existing?.kid && existing.privateKeyPem && existing.publicKeyPem) {
    const privateKey = crypto.createPrivateKey(existing.privateKeyPem);
    const publicKey = crypto.createPublicKey(existing.publicKeyPem);
    return { privateKey, publicKey, kid: existing.kid };
  }

  // Generate new RSA key pair
  const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: { type: "spki", format: "pem" },
    privateKeyEncoding: { type: "pkcs8", format: "pem" },
  });

  const kid = crypto.randomUUID();

  const record: LtiKeyRecord = {
    kid,
    privateKeyPem: typeof privateKey === "string" ? privateKey : (privateKey as unknown as crypto.KeyObject).export({ type: "pkcs8", format: "pem" }) as string,
    publicKeyPem: typeof publicKey === "string" ? publicKey : (publicKey as unknown as crypto.KeyObject).export({ type: "spki", format: "pem" }) as string,
  };

  const ltiKeys = record as unknown as Prisma.InputJsonValue;
  await db.siteSettings.upsert({
    where: { id: "singleton" },
    create: { id: "singleton", ltiKeys },
    update: { ltiKeys },
  });

  const privKeyObj = crypto.createPrivateKey(record.privateKeyPem);
  const pubKeyObj = crypto.createPublicKey(record.publicKeyPem);
  return { privateKey: privKeyObj, publicKey: pubKeyObj, kid };
}

export async function getPublicJwks(): Promise<{ keys: object[] }> {
  const { publicKey, kid } = await getPlatformKeys();

  const pubKeyPem = publicKey.export({ type: "spki", format: "pem" }) as string;

  // Build JWK manually from PEM
  const keyDetails = publicKey.export({ format: "jwk" }) as {
    kty: string;
    n: string;
    e: string;
  };

  // pubKeyPem exported for future use (e.g. sending to tools during registration)
  void pubKeyPem;

  return {
    keys: [
      {
        kty: keyDetails.kty,
        use: "sig",
        alg: "RS256",
        kid,
        n: keyDetails.n,
        e: keyDetails.e,
      },
    ],
  };
}
