import Link from "next/link";
import { auth, signIn, signOut } from "@/auth";

const Navbar = async () => {
  const session = await auth();

  return (
    <header
      className="sticky top-0 z-50 shadow-md"
      style={{ backgroundColor: "#0A2540" }}
    >
      <nav className="max-w-7xl mx-auto px-4 py-2.5 flex justify-between items-center h-13">
        <Link
          href="/"
          className="flex items-center group hover:opacity-90 transition-opacity"
        >
          <span className="text-xl font-bold" style={{ color: "#00C4A3" }}>
            Fyntra
          </span>
          <span
            className="ml-1 h-2 w-2 rounded-full"
            style={{ backgroundColor: "#0057FF" }}
          ></span>
        </Link>

        <div className="hidden md:flex items-center gap-5">
          <NavLink href="/features">Features</NavLink>
          <NavLink href="/solutions">Solutions</NavLink>
        </div>

        <div className="flex items-center gap-5 text-black">
          {session && session?.user ? (
            <>
              <Link href="/startup/create">
                <span>Create</span>
              </Link>
              <form
                action={async () => {
                  "use server";

                  await signOut({ redirectTo: "/" });
                }}
              >
                <button type="submit">Logout</button>
              </form>
              <Link href={`/user/${session?.user?.id}`}>
                <span>{session?.user?.name}</span>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <button type="submit">Login</button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <Link
    href={href}
    className="text-sm hover:text-blue-400 transition-colors px-2 py-1 rounded hover:bg-gray-700/50"
  >
    {children}
  </Link>
);
export default Navbar;
