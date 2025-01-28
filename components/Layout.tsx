'use client'

// components/Layout.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import axios from "axios";
import { useRouter } from 'next/navigation';

export const Layout = ({ children }: { children: React.ReactNode }) => {

  const router = useRouter();
  const handleLogout = async () => {
    try {
      // Call the logout API route
      await axios.post('/api/auth/logout');

      // Redirect to the auth page
      router.push('/auth');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      alert('Failed to logout. Please try again.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-background border-b">
        <div className="container flex items-center justify-between h-16 px-4">
          {/* Navigation Menu */}
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/news" passHref legacyBehavior>
                  <NavigationMenuLink className="text-sm font-medium hover:underline">
                    News
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/claims" passHref legacyBehavior>
                  <NavigationMenuLink className="text-sm font-medium hover:underline">
                    Claims
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/map" passHref legacyBehavior>
                  <NavigationMenuLink className="text-sm font-medium hover:underline">
                    Map
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/profile" passHref legacyBehavior>
                  <NavigationMenuLink className="text-sm font-medium hover:underline">
                    Profile
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </header>
      <main className="flex-1 container py-6">{children}</main>
      <footer className="bg-background border-t">
        <div className="container flex items-center justify-center h-16 px-4">
          <p className="text-sm text-muted-foreground">
            © 2025 ABOBA. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};