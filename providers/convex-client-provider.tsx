"use client";

import { ClerkProvider, SignIn, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import {
  AuthLoading,
  Authenticated,
  ConvexReactClient,
  Unauthenticated,
} from "convex/react";

import { Children } from "react";
import { Loading } from "@/components/auth/loading";

import MergedHeroNavbar from "@/app/(landingPage)/MergedHeroNavbar";

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
          <Authenticated>{children}</Authenticated>
          <AuthLoading>
            <Loading />
          </AuthLoading>
          <Unauthenticated>
            {/* <SignIn /> */}
            <main>
              <MergedHeroNavbar />
            </main>
          </Unauthenticated>
        </ConvexProviderWithClerk>
      </ClerkProvider>
    </>
  );
};
