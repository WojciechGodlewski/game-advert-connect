
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Bell, 
  Menu, 
  X, 
  LogOut, 
  Home, 
  Package, 
  FileText, 
  User
} from "lucide-react";
import { 
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { NotificationPanel } from "./NotificationPanel";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

export const Navbar = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  
  // Mock user state - in a real app, this would come from auth context
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  
  const navItems: NavItem[] = [
    { label: "Home", href: "/", icon: <Home className="w-4 h-4" /> },
    { label: "Products", href: "/products", icon: <Package className="w-4 h-4" /> },
    { label: "Proposals", href: "/proposals", icon: <FileText className="w-4 h-4" /> },
    { label: "Profile", href: "/profile", icon: <User className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl">GameAdConnect</span>
          </Link>
        </div>
        
        <div className="hidden md:flex flex-1 items-center justify-between">
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center transition-colors hover:text-foreground/80 ${
                  isActive(item.href) 
                    ? "text-foreground" 
                    : "text-foreground/60"
                }`}
              >
                {item.icon}
                <span className="ml-1">{item.label}</span>
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <div className="relative">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative"
                  >
                    <Bell className="h-5 w-5" />
                    <Badge 
                      className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px]" 
                      variant="destructive"
                    >
                      3
                    </Badge>
                  </Button>
                  
                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 z-50">
                      <NotificationPanel onClose={() => setShowNotifications(false)} />
                    </div>
                  )}
                </div>
                
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/auth" onClick={() => localStorage.removeItem("isLoggedIn")}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Link>
                </Button>
              </>
            ) : (
              <Button size="sm" asChild>
                <Link to="/auth">Sign In</Link>
              </Button>
            )}
          </div>
        </div>
        
        <div className="md:hidden flex flex-1 justify-end">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="px-2">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold">Menu</span>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <X className="h-4 w-4" />
                    </Button>
                  </SheetTrigger>
                </div>
                <Separator className="my-4" />
                <nav className="flex flex-col space-y-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className={`flex items-center py-2 px-3 rounded-md transition-colors ${
                        isActive(item.href)
                          ? "bg-accent"
                          : "hover:bg-accent/50"
                      }`}
                    >
                      {item.icon}
                      <span className="ml-2">{item.label}</span>
                    </Link>
                  ))}
                  <Separator className="my-2" />
                  {isLoggedIn ? (
                    <Button 
                      variant="ghost" 
                      className="justify-start" 
                      onClick={() => {
                        localStorage.removeItem("isLoggedIn");
                        window.location.href = "/auth";
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </Button>
                  ) : (
                    <Button className="w-full" asChild>
                      <Link to="/auth">Sign In</Link>
                    </Button>
                  )}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
