import Link from "next/link";
import Menu from "@/components/shared/header/menu";
import MainNav from "./main-nav";
import AdminSearch from "@/components/admin/admin-search";
import Logo from "@/components/shared/logo";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <div className="flex flex-col">
        <div className="border-b container mx-auto">
            <div className="flex items-center h-16 px-">
                <Link href='/' className="w-22">
                <Logo />
                </Link>
                <MainNav className="mx-6"/>
                <div className="ml-auto items-center flex space-x-4">
                  <div>
                    <AdminSearch/>
                  </div>
                    <Menu/>
                </div>
            </div>
        </div>
        <div className="flex-1 space-y- p-8 pt-6 container mx-auto">
            {children}
        </div>


    </div>
    </>
  );
}
