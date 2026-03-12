"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Terminal, Cpu, Database, Activity, Github, Telescope } from "lucide-react";
import { motion } from "framer-motion";

export default function Documentation() {
  const [stars, setStars] = useState<number | null>(null);
  const [localSearches, setLocalSearches] = useState<number>(0);

  useEffect(() => {
    const fetchRepoStats = async () => {
      try {
        const response = await fetch("https://api.github.com/repos/Emafido/repo-finder");
        const data = await response.json();
        if (data.stargazers_count !== undefined) {
          setStars(data.stargazers_count);
        }
      } catch (error) {
        console.error("Failed to fetch repo stats:", error);
      }
    };

    fetchRepoStats();

    const searches = localStorage.getItem("repoFinderSearches");
    if (searches) {
      setTimeout(() => {
        setLocalSearches(parseInt(searches, 10));
      }, 0);
    }
  }, []);

  return (
    <div className="bg-linear-to-br from-zinc-950 to-black min-h-screen text-zinc-100 p-4 sm:p-8 md:p-12 overflow-x-hidden">
      <div className="max-w-4xl mx-auto">
        
        <Link href="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-indigo-400 transition-colors mb-6 md:mb-8 font-medium text-sm md:text-base">
          <ArrowLeft size={18} />
          Return to Dashboard
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-4xl p-6 sm:p-8 md:p-12 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-50" />

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
            <div className="bg-indigo-500/10 p-3.5 rounded-2xl border border-indigo-500/20 shadow-inner shrink-0">
              <Telescope className="text-indigo-400" size={32} />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tighter text-white">System Architecture</h1>
              <p className="text-zinc-400 mt-1 md:mt-2 font-medium tracking-wide text-sm md:text-base">RepoFinder Technical Documentation v1.0</p>
            </div>
          </div>

          <div className="space-y-10 md:space-y-12 mt-8 md:mt-10">
            
            {/* Live Telemetry Dashboard */}
            <section className="bg-zinc-950/50 border border-zinc-800 rounded-2xl p-6 md:p-8 shadow-inner">
              <h2 className="flex items-center gap-3 text-xl font-bold text-zinc-100 mb-6 pb-3 border-b border-zinc-800/80">
                <Activity size={22} className="text-pink-400 shrink-0" />
                Live System Telemetry
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-indigo-500/50 transition-colors">
                  <Github size={32} className="text-zinc-300 mb-3" />
                  <p className="text-sm font-medium text-zinc-400 uppercase tracking-widest mb-1">GitHub Stars</p>
                  <p className="text-4xl font-black text-white font-(family-name:--font-jetbrains-mono)">
                    {stars !== null ? stars : "..."}
                  </p>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-pink-500/50 transition-colors">
                  <Activity size={32} className="text-pink-400 mb-3" />
                  <p className="text-sm font-medium text-zinc-400 uppercase tracking-widest mb-1">Your Local Searches</p>
                  <p className="text-4xl font-black text-white font-(family-name:--font-jetbrains-mono)">
                    {localSearches}
                  </p>
                </div>
              </div>
            </section>

            {/* Section 1: Overview */}
            <section>
              <h2 className="flex items-center gap-3 text-xl md:text-2xl font-bold text-zinc-100 mb-4 md:mb-5 pb-3 border-b border-zinc-800/80">
                <Terminal size={22} className="text-blue-400 shrink-0" />
                Core Mechanism
              </h2>
              <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                RepoFinder operates as a high-speed discovery client for the GitHub ecosystem. Rather than requiring users to manually sift through search results, the engine isolates a single, highly-rated repository based on string-matching language parameters, accelerating the open-source contribution pipeline.
              </p>
            </section>

            {/* Section 2: Algorithm */}
            <section className="w-full">
              <h2 className="flex items-center gap-3 text-xl md:text-2xl font-bold text-zinc-100 mb-4 md:mb-5 pb-3 border-b border-zinc-800/80">
                <Cpu size={22} className="text-purple-400 shrink-0" />
                Randomization Algorithm
              </h2>
              <p className="text-zinc-400 mb-4 leading-relaxed text-sm md:text-base">
                The GitHub Search API does not natively support random object retrieval. To bypass this limitation, the application executes a highly targeted query fetching an array of the top 30 repositories for a given language, sorted by star count.
              </p>
              
              <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 md:p-5 w-full overflow-x-auto shadow-inner">
                <pre className="text-xs md:text-sm text-zinc-300 leading-loose whitespace-pre-wrap break-all font-(family-name:--font-jetbrains-mono)">
                  <span className="text-pink-400">const</span> response = <span className="text-purple-400">await</span> fetch(<span className="text-green-400">{`\`https://api.github.com/search/repositories?q=language:\${language}&sort=stars&per_page=30\``}</span>);<br/>
                  <span className="text-pink-400">const</span> data = <span className="text-purple-400">await</span> response.<span className="text-blue-400">json</span>();<br/>
                  <span className="text-zinc-500 italic">{"// Mathematical isolation of a single repository index"}</span><br/>
                  <span className="text-pink-400">const</span> randomRepo = data.items[Math.<span className="text-blue-400">floor</span>(Math.<span className="text-blue-400">random</span>() * data.items.length)];
                </pre>
              </div>
            </section>

            {/* Section 3: State Management */}
            <section>
              <h2 className="flex items-center gap-3 text-xl md:text-2xl font-bold text-zinc-100 mb-4 md:mb-5 pb-3 border-b border-zinc-800/80">
                <Database size={22} className="text-green-400 shrink-0" />
                State & Memory Management
              </h2>
              <p className="text-zinc-400 mb-6 leading-relaxed text-sm md:text-base">
                The UI is heavily constrained by fixed dimensions to prevent layout shifting (CLS) during asynchronous data fetching. Transition states are managed via React Hooks and mapped to strict TypeScript interfaces.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-zinc-950/50 border border-zinc-800 rounded-xl p-4 md:p-5">
                  <h3 className="text-indigo-400 font-bold mb-2 font-(family-name:--font-jetbrains-mono) text-sm md:text-base">loading State</h3>
                  <p className="text-xs md:text-sm text-zinc-400">A boolean trigger that disables the main execution button and mounts a pulsing Framer Motion skeleton loader.</p>
                </div>
                <div className="bg-zinc-950/50 border border-zinc-800 rounded-xl p-4 md:p-5">
                  <h3 className="text-indigo-400 font-bold mb-2 font-(family-name:--font-jetbrains-mono) text-sm md:text-base">repository State</h3>
                  <p className="text-xs md:text-sm text-zinc-400">A typed object storing the exact payload required for the UI (name, description, stargazers, forks, issues, url).</p>
                </div>
              </div>
            </section>

          </div>
        </motion.div>
      </div>
    </div>
  );
}