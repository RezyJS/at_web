/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import axios from "axios";
import { useRouter, usePathname } from 'next/navigation';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { cn } from "@/lib/utils"; // Assuming you have a cn utility - if not, you can use template strings

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await axios.post('/api/auth/logout');
      router.push('/auth');
    } catch (error) {
      alert('Произошла ошибка. Попробуйте снова!');
    }
  };

  // Helper function to check active link
  const isActive = (href: string) => pathname?.startsWith(href);

  return (
    <div className="flex flex-col min-h-screen min-w-[320px]">
      {/* Header */}
      <header className="bg-blue-600 shadow-lg sticky top-0 z-50">
        <div className="flex items-center justify-between gap-4 h-20 p-4">
          {/* Company Name */}
          <Link href="/" passHref legacyBehavior>
            <a className="text-white text-xl font-bold hover:text-gray-200 transition-colors duration-200">
              ВЦВ
            </a>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="space-x-6">
              <NavigationMenuItem>
                <Link href="/content/news" passHref legacyBehavior>
                  <NavigationMenuLink className={cn(
                    "text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-200",
                    isActive('/content/news') 
                      ? "bg-white text-blue-600" 
                      : "text-white hover:text-gray-200 hover:bg-white/10"
                  )}>
                    Новости
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/content/claims" passHref legacyBehavior>
                  <NavigationMenuLink className={cn(
                    "text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-200",
                    isActive('/content/claims') 
                      ? "bg-white text-blue-600" 
                      : "text-white hover:text-gray-200 hover:bg-white/10"
                  )}>
                    Заявки
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/content/map" passHref legacyBehavior>
                  <NavigationMenuLink className={cn(
                    "text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-200",
                    isActive('/content/map') 
                      ? "bg-white text-blue-600" 
                      : "text-white hover:text-gray-200 hover:bg-white/10"
                  )}>
                    Карта
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Logout Button */}
          <Button 
            variant="outline" 
            onClick={handleLogout}
            className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600 transition-colors duration-200 hidden md:inline-flex"
          >
            Выйти
          </Button>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon" className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-blue-600 text-white">
              <VisuallyHidden>
                <SheetTitle>Меню</SheetTitle>
              </VisuallyHidden>
              <nav className="flex flex-col space-y-4 mt-6">
                <Link href="/content/news" passHref legacyBehavior>
                  <a className={cn(
                    "text-sm text-center font-medium px-4 py-2 rounded-lg transition-colors duration-200",
                    isActive('/content/news') 
                      ? "bg-white text-blue-600" 
                      : "text-white hover:text-gray-200 hover:bg-white/10"
                  )}>
                    Новости
                  </a>
                </Link>
                <Link href="/content/claims" passHref legacyBehavior>
                  <a className={cn(
                    "text-sm text-center font-medium px-4 py-2 rounded-lg transition-colors duration-200",
                    isActive('/content/claims') 
                      ? "bg-white text-blue-600" 
                      : "text-white hover:text-gray-200 hover:bg-white/10"
                  )}>
                    Заявки
                  </a>
                </Link>
                <Link href="/content/map" passHref legacyBehavior>
                  <a className={cn(
                    "text-sm text-center font-medium px-4 py-2 rounded-lg transition-colors duration-200",
                    isActive('/content/map') 
                      ? "bg-white text-blue-600" 
                      : "text-white hover:text-gray-200 hover:bg-white/10"
                  )}>
                    Карта
                  </a>
                </Link>
                <Button 
                  variant="outline" 
                  onClick={handleLogout}
                  className="text-sm font-medium bg-transparent text-white hover:text-blue-600 hover:bg-white px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  Выйти
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container min-w-[320px] py-6">{children}</main>

      {/* Footer */}
      <footer className="bg-background min-w-[320px] border-t">
        <div className="flex items-center justify-center h-16 px-4">
          <p className="text-sm text-muted-foreground">
            © 2025 В Центре внимания.
          </p>
        </div>
      </footer>
    </div>
  );
};