"use client";

import { useState, useEffect } from "react";

export function GitHubContributions() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Set loading to false after component mounts
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-48"></div>
        <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-medium">GitHub Contributions</h4>
        <a 
          href="https://github.com/rupinajay" 
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          View on GitHub →
        </a>
      </div>
      
      <div className="overflow-x-auto">
        <div className="min-w-max">
          {/* Light mode GitHub Contribution Grid */}
          <img 
            src="https://ghchart.rshah.org/rupinajay" 
            alt="GitHub Contribution Graph"
            className="w-full max-w-4xl block dark:hidden"
          />
          
          {/* Dark mode GitHub Contribution Grid */}
          <img 
            src="https://ghchart.rshah.org/rupinajay" 
            alt="GitHub Contribution Graph"
            className="w-full max-w-4xl hidden dark:block"
            style={{
              filter: 'invert(1) hue-rotate(180deg)',
              backgroundColor: 'transparent'
            }}
          />
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
        <span>Less</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 rounded-sm bg-gray-100 dark:bg-gray-800" />
          <div className="w-3 h-3 rounded-sm bg-green-100" style={{ backgroundColor: '#0e4429' }} />
          <div className="w-3 h-3 rounded-sm bg-green-200" style={{ backgroundColor: '#006d32' }} />
          <div className="w-3 h-3 rounded-sm bg-green-300" style={{ backgroundColor: '#26a641' }} />
          <div className="w-3 h-3 rounded-sm bg-green-400" style={{ backgroundColor: '#40c463' }} />
        </div>
        <span>More</span>
      </div>
    </div>
  );
}