import Link from "next/link";
import { ThemeButton } from "./theme-button";

export default function Navbar() {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
                <nav className="flex justify-between items-center w-full">
                    <Link href="/">
                        <h1 className="text-4xl font-bold">
                            OMNIC<span className="text-orange-500">TIMES</span>
                        </h1>
                    </Link>

                    <ThemeButton />
                </nav>
            </div>
        </div>
    );
}