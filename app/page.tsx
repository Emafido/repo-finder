"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Map, SearchX, RotateCcw, Menu, Star, GitFork, CircleDot, Github, X, Telescope } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import confetti from "canvas-confetti";
import { getGithubRepo } from "./action"; 

interface RepoData {
  name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  html_url: string;
}

export default function Home() {
  const [width, setWidth] = useState<number>(0);
  const [language, setLanguage] = useState<string>("");
  const [repository, setRepository] = useState<RepoData | null>(null);
  const [repoPool, setRepoPool] = useState<RepoData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => setWidth(window.innerWidth);
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#6366f1', '#a855f7', '#3b82f6']
    });
  };

  const fetchRandomRepo = async () => {
    if (!language.trim()) {
      Swal.fire({
        title: "Input Required",
        text: "Please enter a programming language.",
        icon: "warning",
        background: "#18181b",
        color: "#f4f4f5",
        confirmButtonColor: "#6366f1"
      });
      return;
    }

    // CRACKED LOGIC: Check local pool before hitting the server
    if (repoPool.length > 0) {
      const randomIndex = Math.floor(Math.random() * repoPool.length);
      const selectedRepo = repoPool[randomIndex];
      
      // FIX: Added explicit TypeScript types to the filter parameters
      const newPool = repoPool.filter((_: RepoData, index: number) => index !== randomIndex);
      
      setRepository(selectedRepo);
      setRepoPool(newPool);
      triggerConfetti();

      const currentSearches = localStorage.getItem("repoFinderSearches");
      const newCount = currentSearches ? parseInt(currentSearches, 10) + 1 : 1;
      localStorage.setItem("repoFinderSearches", newCount.toString());
      return;
    }

    setLoading(true);

    const result = await getGithubRepo(language);

    if (result.error) {
      const messages: Record<string, string> = {
        RATE_LIMIT: "System Cooldown: GitHub is rate-limiting the server. Wait a minute!",
        FETCH_ERROR: "GitHub API returned an error. Check the language name.",
        SERVER_ERROR: "Failed to establish uplink with server."
      };
      
      Swal.fire({ 
        title: "Error", 
        text: messages[result.error as string] || "Something went wrong.", 
        icon: "error", 
        background: "#18181b", 
        color: "#f4f4f5" 
      });
      setLoading(false);
      return;
    }

    // FIX: Explicitly tell TypeScript that repos is an array of RepoData
    const repos: RepoData[] = result.data;

    if (!repos || repos.length === 0) {
      Swal.fire({
        title: "Not Found",
        text: "No repositories found for this language.",
        icon: "error",
        background: "#18181b",
        color: "#f4f4f5",
        confirmButtonColor: "#ef4444"
      });
      setLoading(false);
      return;
    }

    const randomIndex = Math.floor(Math.random() * repos.length);
    const selectedRepo = repos[randomIndex];
    
    setRepository(selectedRepo);
    
    // FIX: Added explicit TypeScript types here as well
    setRepoPool(repos.filter((_: RepoData, index: number) => index !== randomIndex));
    
    triggerConfetti();

    const currentSearches = localStorage.getItem("repoFinderSearches");
    const newCount = currentSearches ? parseInt(currentSearches, 10) + 1 : 1;
    localStorage.setItem("repoFinderSearches", newCount.toString());
    
    setLoading(false);
  };

  return (
    <div className="bg-linear-to-br from-zinc-950 to-black min-h-screen text-zinc-100 font-sans overflow-hidden">
      <nav className="relative z-50">
        {width > 0 && (
          <div>
            {width < 768 ? (
              <>
                <div className="border-b border-zinc-800 flex justify-between items-center px-4 sm:px-6 py-4 bg-zinc-900/90 backdrop-blur-md relative z-50">
                  <Link href="/" className="flex items-center gap-2 group">
                    <div className="bg-indigo-500/10 p-1.5 rounded-lg border border-indigo-500/20 group-hover:scale-110 transition-transform">
                      <Telescope className="text-indigo-400" size={20} />
                    </div>
                    <span className="text-xl font-black tracking-tighter bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-indigo-500">
                      RepoFinder
                    </span>
                  </Link>
                  <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-1 cursor-pointer">
                    {isMobileMenuOpen ? <X className="text-zinc-300" /> : <Menu className="text-zinc-300" />}
                  </button>
                </div>
                
                <AnimatePresence>
                  {isMobileMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="absolute top-full left-0 w-full bg-zinc-900/95 backdrop-blur-xl border-b border-zinc-800 flex flex-col p-4 gap-4 shadow-2xl"
                    >
                      <Link 
                        href="/docs" 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-zinc-300 hover:text-indigo-400 font-medium py-2 px-4 rounded-lg hover:bg-zinc-800 transition-colors"
                      >
                        Documentation
                      </Link>
                      <Link
                        href="https://github.com/Emafido/repo-finder"
                        target="_blank"
                        className="flex items-center gap-2 text-zinc-300 hover:text-indigo-400 font-medium py-2 px-4 rounded-lg hover:bg-zinc-800 transition-colors"
                      >
                        <Github size={18} />
                        Star on GitHub
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            ) : (
              <div className="border-b border-zinc-800 flex justify-between items-center px-4 sm:px-6 py-4 bg-zinc-900/50 backdrop-blur-md">
                <Link href="/" className="flex items-center gap-2 group">
                  <div className="bg-indigo-500/10 p-2 rounded-xl border border-indigo-500/20 group-hover:scale-110 transition-transform">
                    <Telescope className="text-indigo-400" size={24} />
                  </div>
                  <span className="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-indigo-500">
                    RepoFinder
                  </span>
                </Link>
                <div className="flex gap-2 sm:gap-6 flex-wrap items-center">
                  <Link href="/docs" className="hover:text-indigo-400 transition-colors duration-200 cursor-pointer font-medium text-sm text-zinc-300">
                    Documentation
                  </Link>
                  <Link
                    href="https://github.com/Emafido/repo-finder"
                    target="_blank"
                    className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 py-2 px-5 rounded-full transition-all duration-300 font-medium text-sm text-zinc-100 hover:scale-105"
                  >
                    <Github size={18} />
                    Star on GitHub
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </nav>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-2xl h-170 flex flex-col mt-8 sm:mt-12 mx-auto p-6 md:p-10 rounded-4xl bg-zinc-900 border border-zinc-800 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-80" />

        <div className="flex flex-col items-center gap-3 mt-4">
          <motion.div 
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="bg-zinc-800 p-4 rounded-2xl border border-zinc-700 shadow-md"
          >
            <Map size={36} className="text-indigo-400" />
          </motion.div>
          <p className="text-2xl font-bold tracking-tight text-zinc-100">Find a Repository</p>
          <p className="text-center text-zinc-400 text-sm font-medium">
            Discover your next open source contribution
          </p>
        </div>

        <div className="flex flex-col gap-2 mt-8 z-10">
          <label htmlFor="language" className="text-xs font-bold text-zinc-400 uppercase tracking-wider ml-1">
            Programming Language
          </label>
          <input
            type="text"
            id="language"
            value={language}
            onChange={(e) => {
              // FIX: Replaced the bad useEffect with this clean, synchronous state reset
              setLanguage(e.target.value);
              setRepoPool([]); 
            }}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3.5 px-5 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-inner text-sm font-medium"
            placeholder="e.g. JavaScript, Go, Python"
          />
        </div>

        <motion.button
          whileHover={{ scale: loading ? 1 : 1.01 }}
          whileTap={{ scale: loading ? 1 : 0.98 }}
          onClick={fetchRandomRepo}
          disabled={loading}
          className="flex items-center justify-center mt-6 w-full rounded-xl py-3.5 px-4 bg-linear-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-semibold cursor-pointer gap-2 transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-md z-10"
        >
          <RotateCcw size={18} className={`${loading ? "animate-spin" : ""}`} />
          <span>{loading ? "Searching..." : repository ? "Fetch Another Repository" : "Fetch Random Repository"}</span>
        </motion.button>

        <div className="grow flex flex-col justify-end mt-8 relative">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center justify-center h-55 w-full gap-4 border border-zinc-800 rounded-2xl bg-zinc-950/50"
              >
                <RotateCcw className="animate-spin text-indigo-500" size={32} />
                <p className="text-sm font-medium text-zinc-400 animate-pulse">Fetching data...</p>
              </motion.div>
            ) : repository ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col justify-center h-55 w-full border border-zinc-700 rounded-2xl p-6 bg-linear-to-br from-zinc-800 to-zinc-900 shadow-inner"
              >
                <h3 className="text-xl font-bold text-indigo-400 truncate w-full">{repository.name}</h3>
                <p className="text-zinc-300 text-sm mt-2 line-clamp-2">
                  {repository.description || "No description provided."}
                </p>

                <div className="flex gap-3 mt-4 text-xs font-semibold">
                  <div className="flex items-center gap-1.5 bg-zinc-950 px-3 py-1.5 rounded-lg border border-zinc-800 text-zinc-300">
                    <Star size={14} className="text-yellow-500" />
                    <span>{repository.stargazers_count}</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-zinc-950 px-3 py-1.5 rounded-lg border border-zinc-800 text-zinc-300">
                    <GitFork size={14} className="text-zinc-400" />
                    <span>{repository.forks_count}</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-zinc-950 px-3 py-1.5 rounded-lg border border-zinc-800 text-zinc-300">
                    <CircleDot size={14} className="text-green-500" />
                    <span>{repository.open_issues_count}</span>
                  </div>
                </div>

                <Link
                  href={repository.html_url}
                  target="_blank"
                  className="mt-5 w-full text-center bg-zinc-950 hover:bg-black border border-zinc-800 text-zinc-200 py-2.5 rounded-lg transition-colors font-medium text-sm"
                >
                  View on GitHub
                </Link>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center h-55 w-full gap-3 border border-zinc-800 rounded-2xl bg-zinc-950/50"
              >
                <SearchX size={36} className="text-zinc-600 mb-1" />
                <p className="text-lg font-semibold text-zinc-300">No Repository Fetched Yet</p>
                <p className="text-center text-zinc-500 text-sm">
                  Enter a language to start your search
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}