'use client';

import { FingerprintProvider } from '@fingerprint/react';

export default function FingerprintProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <FingerprintProvider
      apiKey={process.env.NEXT_PUBLIC_FINGERPRINT_API_KEY || ""}
    >
      {children}
    </FingerprintProvider>
  );
}
