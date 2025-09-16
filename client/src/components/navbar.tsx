import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import {
  Menu,
  X,
  Search,
  ShoppingCart,
  User,
  Moon,
  Sun,
  MapPin,
  Store,
  Heart,
  LogOut,
  LogIn,
} from "lucide-react";
import Topbar from "./ui/topbar";
import UserContext from "../hook/context/UserContext";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [isDark, setIsDark] = useState(false);
  const user = useContext(UserContext);

  return (
    <header className="w-full sticky top-0 z-50">
      {/* Top bar - Contact info */}
      <Topbar />
      {/* Main bar */}
      <div className="bg-white shadow border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Mobile menu button & Logo */}
            <div className="flex items-center gap-4">
              <button
                className="md:hidden p-2 rounded-md hover:bg-gray-100"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>

              <Link to="/" className="flex items-center gap-3">
                <Avatar className="size-12">
                  <AvatarImage src="/logo-shop.jpg" alt="SHOP ZUES" />
                  <AvatarFallback className="w-10 h-10 bg-black text-white flex items-center justify-center font-bold rounded">SZ</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-semibold tracking-tight">Shop Zues</span>
                  <span className="leading-none text-sm text-muted-foreground">
                    Tự tin sống chất
                  </span>
                </div>
              </Link>
            </div>

            {/* Search bar */}
            <div className="flex-1 mx-6 max-w-lg relative hidden sm:block">
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Bạn đang tìm gì..."
                className="pr-10"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-500" />
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-3 text-sm">
              <Link
                to="/stores"
                className="hidden md:flex items-center gap-1 hover:underline"
              >
                <MapPin size={16} /> Cửa hàng
              </Link>

              <Link to="/cart" className="relative p-2 rounded-md hover:bg-gray-100">
                <ShoppingCart size={20} />
                <div className="absolute -top-2 -right-2">
                  <Badge variant="destructive" className="text-xs px-1 min-w-[16px] h-5">
                    3
                  </Badge>
                </div>
              </Link>

              {/* User dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="p-1 rounded-full hover:bg-gray-100 cursor-pointer">
                    <Avatar className="w-8 h-8">
                      <div className="flex items-center justify-center bg-gray-800 text-white rounded-full w-full">
                        {user ? user.name.slice(0, 2).toUpperCase() : <User size={16} />}
                      </div>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-48 ">
                  <DropdownMenuItem asChild>
                    <Link to="/account" className="flex items-center">
                      {user ? (<> <User size={16} className="mr-2" /> {user.name} </>) : (<> <User size={16} className="mr-2" /> Tài khoản </>)}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/orders"> <Store size={16} />Đơn hàng</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/wishlist"> <Heart size={16} />Yêu thích</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    {user ? (<Link to="/logout"> <LogOut size={16} className="mr-2"/> Đăng xuất</Link>) : (
                            <Link to="/login"> <LogIn size={16} className="mr-2" /> Đăng nhập</Link> )}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>


              {/* Theme toggle */}
              <div className="flex items-center">
                <button
                  className="p-2 rounded-md hover:bg-gray-100"
                  onClick={() => setIsDark(!isDark)}
                >
                  {isDark ? <Sun size={16} /> : <Moon size={16} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="bg-white border-b hidden md:block">
        <div className="container mx-auto">
          <NavigationMenu viewport={false}>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link to="/" className="px-4 py-3 hover:text-black font-medium">
                    Trang chủ
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link to="/newproduct" className="px-4 py-3 hover:text-red-500 font-medium">
                    🔥 Hàng Mới
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Áo Nam</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 w-[200px]">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link to="/tee" className="text-lg">
                          Tất cả áo nam
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link to="/polo" className="hover:text-red-500">
                          Áo Polo
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link to="/shirt" className="hover:text-red-500">
                          Áo Sơ Mi
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link to="/jacket" className="hover:text-red-500">
                          Áo Khoác
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link to="/tee" className="hover:text-red-500">
                          Áo Thun
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link to="/hoodie" className="hover:text-red-500">
                          Áo Hoodie
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link to="/sweater" className="hover:text-red-500">
                          Áo Len / Sweater
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Quần Nam</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 w-[200px]">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link to="/pants" className="text-lg">
                          Tất cả quần nam
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link to="/jeans" className="hover:text-red-500">
                          Quần Jeans
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link to="/khakis" className="hover:text-red-500">
                          Quần Kaki
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link to="/shorts" className="hover:text-red-500">
                          Quần Short
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link to="/joggers" className="hover:text-red-500">
                          Quần Joggers
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link to="/formal-pants" className="hover:text-red-500">
                          Quần Tây
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Bộ Sưu Tập</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 w-[200px]">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link to="/collections" className="text-lg">
                          Tất cả bộ sưu tập
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link to="/sets" className="hover:text-red-500">
                          Set Quần Áo
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link to="/casual-sets" className="hover:text-red-500">
                          Set Thường Ngày
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link to="/sport-sets" className="hover:text-red-500">
                          Set Thể Thao
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link to="/formal-sets" className="hover:text-red-500">
                          Set Công Sở
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Phụ Kiện</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 w-[200px]">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link to="/accessories" className="text-lg">
                          Tất cả phụ kiện
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link to="/caps" className="hover:text-red-500">
                          Mũ/Nón
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link to="/bags" className="hover:text-red-500">
                          Túi/Balo
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link to="/belts" className="hover:text-red-500">
                          Thắt Lưng
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link to="/watches" className="hover:text-red-500">
                          Đồng Hồ
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link to="/shoes" className="hover:text-red-500">
                          Giày Dép
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link to="/sale" className="px-4 py-3 text-red-500 font-bold">
                    🏷️ SALE -50%
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

            </NavigationMenuList>
          </NavigationMenu>

        </div>
      </div>


      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
            onClick={() => setMobileOpen(false)}
          />
          
          {/* Off-canvas menu */}
          <div className={`fixed left-0 top-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
            mobileOpen ? 'translate-x-0' : '-translate-x-full'
          }`}>
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-3">
                <Avatar className="size-10">
                  <AvatarImage src="/logo-shop.jpg" alt="SHOP ZUES" />
                  <AvatarFallback className="w-10 h-10 bg-black text-white flex items-center justify-center font-bold rounded">SZ</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-semibold text-sm">Shop Zues</span>
                  <span className="text-xs text-muted-foreground">Tự tin sống chất</span>
                </div>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-md hover:bg-gray-100"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Search bar */}
            <div className="p-4 border-b">
              <div className="relative">
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Bạn đang tìm gì..."
                  className="pl-10"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
              </div>
            </div>

            {/* User info */}
            {user && (
              <div className="p-4 border-b bg-gray-50">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <div className="flex items-center justify-center bg-gray-800 text-white rounded-full w-full">
                      {user?.name?.slice(0, 2).toUpperCase() || 'U'}
                    </div>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-medium text-sm">{user?.name || 'Guest'}</span>
                    <span className="text-xs text-muted-foreground">Xin chào!</span>
                  </div>
                </div>
              </div>
            )}

            {/* Menu content */}
            <div className="flex-1 overflow-y-auto">
              <div className="px-4 py-2">
                <div className="flex flex-col">
                  {/* Main navigation */}
                  <div className="mb-4">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2">
                      Danh mục
                    </h3>
                    <Link 
                      to="/" 
                      className="flex items-center px-2 py-3 hover:bg-gray-50 rounded-md transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      <span>Trang chủ</span>
                    </Link>
                    <Link 
                      to="/new" 
                      className="flex items-center px-2 py-3 hover:bg-gray-50 rounded-md text-red-500 font-medium transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      <span>🔥 Hàng Mới</span>
                    </Link>
                    <Link 
                      to="/tee" 
                      className="flex items-center px-2 py-3 hover:bg-gray-50 rounded-md transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      <span>Áo Nam</span>
                    </Link>
                    <Link 
                      to="/pants" 
                      className="flex items-center px-2 py-3 hover:bg-gray-50 rounded-md transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      <span>Quần Nam</span>
                    </Link>
                    <Link 
                      to="/collections" 
                      className="flex items-center px-2 py-3 hover:bg-gray-50 rounded-md transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      <span>Bộ Sưu Tập</span>
                    </Link>
                    <Link 
                      to="/accessories" 
                      className="flex items-center px-2 py-3 hover:bg-gray-50 rounded-md transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      <span>Phụ Kiện</span>
                    </Link>
                    <Link 
                      to="/sale" 
                      className="flex items-center px-2 py-3 hover:bg-gray-50 rounded-md text-red-500 font-medium transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      <span>🏷️ SALE -50%</span>
                    </Link>
                  </div>

                  {/* User actions */}
                  <div className="border-t pt-4">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2">
                      Tài khoản
                    </h3>
                    <Link 
                      to="/stores" 
                      className="flex items-center gap-3 px-2 py-3 hover:bg-gray-50 rounded-md transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      <MapPin size={18} className="text-gray-500" />
                      <span>Cửa hàng</span>
                    </Link>
                    <Link 
                      to="/account" 
                      className="flex items-center gap-3 px-2 py-3 hover:bg-gray-50 rounded-md transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      <User size={18} className="text-gray-500" />
                      <span>{user?.name || 'Tài khoản'}</span>
                    </Link>
                    <Link 
                      to="/orders" 
                      className="flex items-center gap-3 px-2 py-3 hover:bg-gray-50 rounded-md transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      <Store size={18} className="text-gray-500" />
                      <span>Đơn hàng</span>
                    </Link>
                    <Link 
                      to="/wishlist" 
                      className="flex items-center gap-3 px-2 py-3 hover:bg-gray-50 rounded-md transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      <Heart size={18} className="text-gray-500" />
                      <span>Yêu thích</span>
                    </Link>
                    <Link 
                      to={user ? "/logout" : "/login"}
                      className="flex items-center gap-3 px-2 py-3 hover:bg-gray-50 rounded-md transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      {user ? (
                        <>
                          <LogOut size={18} className="text-gray-500" />
                          <span>Đăng xuất</span>
                        </>
                      ) : (
                        <>
                          <LogIn size={18} className="text-gray-500" />
                          <span>Đăng nhập</span>
                        </>
                      )}
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t bg-gray-50">
              <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                <button
                  onClick={() => setIsDark(!isDark)}
                  className="flex items-center gap-2 hover:text-gray-700 transition-colors"
                >
                  {isDark ? <Sun size={16} /> : <Moon size={16} />}
                  <span>{isDark ? 'Sáng' : 'Tối'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}


