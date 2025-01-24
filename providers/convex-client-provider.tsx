"use client";

import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { AuthLoading, Authenticated, ConvexReactClient } from "convex/react";

import { Children } from "react";

interface ConvexClientProviderProps {
  children: React.ReactNode;
}

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL!;
const convex = new ConvexReactClient(convexUrl);
const publishablekey = process.env.NEXT_PUBLIC_CONVEX_PUBLISHABLE_KEY!;

export const ConvexClientProvider = ({
  children,
}: ConvexClientProviderProps) => {
  return (
    <>
      <ClerkProvider publishableKey="pk_test_Y2xlYW4tc3dpZnQtNjAuY2xlcmsuYWNjb3VudHMuZGV2JA">
        <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
          {children}
        </ConvexProviderWithClerk>
      </ClerkProvider>
    </>
  );
};
