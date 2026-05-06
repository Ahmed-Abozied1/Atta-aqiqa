import { getServerSession } from "@/lib/get-session";
import { NavbarContent } from "./NavbarContent";

export const Navbar = async () => {
  const session = await getServerSession();
  return <NavbarContent session={session} />;
};