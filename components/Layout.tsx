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
import { useRouter } from 'next/navigation';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.post('/api/auth/logout');
      router.push('/auth');
    } catch (error) {
      alert('Произошла ошибка. Попробуйте снова!');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-blue-600 shadow-lg sticky top-0 z-50">
        <div className="container flex items-center justify-between h-20 px-4">
          {/* Company Name (Shortened) */}
          <Link href="/" passHref legacyBehavior>
            <a className="text-white text-xl font-bold hover:text-gray-200 transition-colors duration-200">
              ВЦВ
            </a>
          </Link>

          {/* Navigation Menu for larger screens */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="space-x-6">
              <NavigationMenuItem>
                <Link href="/news" passHref legacyBehavior>
                  <NavigationMenuLink className="text-sm font-medium text-white hover:text-gray-200 hover:bg-white/10 px-4 py-2 rounded-lg transition-colors duration-200">
                    Новости
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/claims" passHref legacyBehavior>
                  <NavigationMenuLink className="text-sm font-medium text-white hover:text-gray-200 hover:bg-white/10 px-4 py-2 rounded-lg transition-colors duration-200">
                    Заявки
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/map" passHref legacyBehavior>
                  <NavigationMenuLink className="text-sm font-medium text-white hover:text-gray-200 hover:bg-white/10 px-4 py-2 rounded-lg transition-colors duration-200">
                    Карта
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/profile" passHref legacyBehavior>
                  <NavigationMenuLink className="text-sm font-medium text-white hover:text-gray-200 hover:bg-white/10 px-4 py-2 rounded-lg transition-colors duration-200">
                    Профиль
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Burger Menu for smaller screens */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon" className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-blue-600 text-white">
              {/* Add a visually hidden SheetTitle for accessibility */}
              <VisuallyHidden>
                <SheetTitle>Меню</SheetTitle>
              </VisuallyHidden>
              <nav className="flex flex-col space-y-4 mt-6">
                <Link href="/news" passHref legacyBehavior>
                  <a className="text-sm font-medium text-white hover:text-gray-200 hover:bg-white/10 px-4 py-2 rounded-lg transition-colors duration-200">
                    Новости
                  </a>
                </Link>
                <Link href="/claims" passHref legacyBehavior>
                  <a className="text-sm font-medium text-white hover:text-gray-200 hover:bg-white/10 px-4 py-2 rounded-lg transition-colors duration-200">
                    Заявки
                  </a>
                </Link>
                <Link href="/map" passHref legacyBehavior>
                  <a className="text-sm font-medium text-white hover:text-gray-200 hover:bg-white/10 px-4 py-2 rounded-lg transition-colors duration-200">
                    Карта
                  </a>
                </Link>
                <Link href="/profile" passHref legacyBehavior>
                  <a className="text-sm font-medium text-white hover:text-gray-200 hover:bg-white/10 px-4 py-2 rounded-lg transition-colors duration-200">
                    Профиль
                  </a>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

          {/* Logout Button */}
          <Button 
            variant="outline" 
            onClick={handleLogout}
            className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600 transition-colors duration-200 hidden md:inline-flex"
          >
            Выйти
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container py-6">{children}</main>

      {/* Footer */}
      <footer className="bg-background border-t">
        <div className="container flex items-center justify-center h-16 px-4">
          <p className="text-sm text-muted-foreground">
            © 2025 В Центре внимания. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
};