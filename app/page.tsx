import Link from "next/link";
import {Search} from "lucide-react"

export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen">
    <nav className="border-b shadow-2xl shadow-white flex justify-between text-black px-6 py-4">
      <div>RepoFinder</div>
      <div className="flex gap-6">
        <p>Documentation</p>
        <Link href="https://github.com/Emafido/repo-finder" target="_blank">
          Star on github
        </Link>
      </div>
    </nav>
    <div className="border w-100 h-[90vh] my-10 rounded-[15px] border-gray-200 shadow-xl mx-auto text-black">
      <Search />
    </div>
    </div>
  );
}
