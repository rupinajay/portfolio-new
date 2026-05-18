"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "./theme-provider";

interface FileSystem {
  [key: string]: string | FileSystem;
}

interface CommandHistory {
  command: string;
  output: string;
  path: string; // Store the path when command was executed
}

interface FileViewerProps {
  filename: string;
  content: string;
  editor: "nano" | "vim" | "less";
  onClose: () => void;
}

function FileViewer({ filename, content, editor, onClose }: FileViewerProps) {
  const viewerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (editor === "nano" && e.ctrlKey && e.key === "x") {
        e.preventDefault();
        onClose();
      } else if (editor === "vim" && e.key === "Escape") {
        // In vim, need to type :q after escape, but we'll simplify
        onClose();
      } else if (editor === "less" && e.key === "q") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [editor, onClose]);

  const getEditorTitle = () => {
    switch (editor) {
      case "nano":
        return `GNU nano 7.2    ${filename}`;
      case "vim":
        return `${filename} [readonly]`;
      case "less":
        return filename;
    }
  };

  const getEditorFooter = () => {
    switch (editor) {
      case "nano":
        return "^X Exit    ^O Write Out    ^R Read File    ^W Where Is";
      case "vim":
        return "-- READONLY -- Press ESC to exit";
      case "less":
        return `${filename} (press q to quit)`;
    }
  };

  return (
    <div className="fixed inset-0 bg-background z-50 flex flex-col font-mono text-sm">
      {/* Editor Header */}
      <div className="bg-accent border-b border-border px-4 py-1">
        <div className="text-foreground">{getEditorTitle()}</div>
      </div>

      {/* File Content */}
      <div
        ref={viewerRef}
        className="flex-1 overflow-y-auto p-4 bg-background terminal-scroll"
      >
        <pre className="whitespace-pre-wrap text-foreground leading-relaxed">
          {content}
        </pre>
      </div>

      {/* Editor Footer */}
      <div className="bg-accent border-t border-border px-4 py-1">
        <div className="text-xs text-muted-foreground">{getEditorFooter()}</div>
      </div>
    </div>
  );
}

export function Terminal({ onClose }: { onClose: () => void }) {
  const { theme } = useTheme();
  const [currentPath, setCurrentPath] = useState("/home/rupin");
  const [previousPath, setPreviousPath] = useState("/home/rupin");
  const [commandHistory, setCommandHistory] = useState<CommandHistory[]>([]);
  const [currentCommand, setCurrentCommand] = useState("");
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [commandQueue, setCommandQueue] = useState<string[]>([]);
  const [fileViewer, setFileViewer] = useState<{
    filename: string;
    content: string;
    editor: "nano" | "vim" | "less";
  } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const getDisplayPath = (path: string): string => {
    if (path === "/home/rupin") {
      return "~";
    } else if (path.startsWith("/home/rupin/")) {
      return "~" + path.substring("/home/rupin".length);
    }
    return path;
  };

  const fileSystem: FileSystem = {
    home: {
      rupin: {
        about: {
          "bio.txt": `Rupin Ajay - Software Engineer

I'm a software engineer passionate about creating intelligent systems that solve real-world problems. Currently working as an SDE Intern at Linarc, where I build scalable solutions and contribute to cutting-edge projects.

My expertise spans AI/ML systems, RAG architectures, and full-stack development. I enjoy turning complex technical challenges into elegant, user-friendly solutions. When I'm not coding, you'll find me contributing to open source projects or exploring the latest developments in artificial intelligence.`,
        },
        
        experience: {
          "linarc.txt": `SDE Intern at Linarc
Jan 2026 - Present

- Working on software development and engineering projects
- Contributing to product development and technical solutions`,

          "gravix.txt": `Developer Advocate at Gravix Layer
Jul 2025 - Dec 2025

- Created Automated GitHub Changelog and Text-to-SQL Multi-Agent systems
- Authored MCP Server guides and documentation
- Published open-source projects, demos, and educational content`,

          "anand.txt": `Software Engineer Intern (AI/ML) at Anand & Anand
May 2025 - Jul 2025

- Implemented RAG architectures (HyDE, graph-based, hybrid indexing)
- Built conversational legal AI assistant
- Improved system accuracy through partner-validated pipelines`,

          "zyngate.txt": `AI Intern at Zyngate
Jan 2025 - Feb 2025

- Reduced redundant API calls by 70%
- Improved job-apply success rate to 85%
- Automated LinkedIn job applications with Python & Selenium`,

          "glencore.txt": `Data Engineer Intern at Glencore International AG
May 2024 - Jul 2024

- Replaced VBA workflows with automated pipelines
- Reduced 30 minutes of manual work to 15 seconds
- Improved reliability through automated email/Excel integration`,
        },

        projects: {
          "sustain.txt": `Sustain: ESG Analytics Platform

AI-powered ESG analytics platform with RAG, sentiment analysis, and real-time dashboards.

Tech Stack: Python, LangChain, FastAPI, PostgreSQL
GitHub: https://github.com/rupinajay`,

          "statiq.txt": `StatIQ

No-code AI business intelligence tool for automated data analysis and dashboarding.

Tech Stack: Python, Streamlit, Pandas, OpenAI
GitHub: https://github.com/rupinajay`,

          "text-to-sql.txt": `Text-to-SQL Engine

Schema-aware natural language to SQL engine using multi-agent orchestration.

Tech Stack: Python, LangGraph, CrewAI, SQLAlchemy
GitHub: https://github.com/rupinajay`,
        },

        skills: {
          "technical.txt": `Skills & Technologies

Languages & Databases:
- Python
- JavaScript
- SQL
- MySQL
- MongoDB
- PostgreSQL
- PineconeDB
- Qdrant

AI/ML & Tools:
- Gen AI
- TensorFlow
- LangChain
- LangGraph
- CrewAI
- FastAPI
- AWS
- Docker`,
        },

        education: {
          "academic.txt": `Education

B.Tech Computer Science and Engineering
Shiv Nadar University Chennai
Aug 2022 - Apr 2026
CGPA: 8.3/10.0

Senior Secondary (CBSE)
Sri Chaitanya Techno School
Jul 2020 - Mar 2022
Score: 88.2%`,
        },

        contact: {
          "info.txt": `Contact Information

Email: rupinajay@gmail.com
GitHub: https://github.com/rupinajay
LinkedIn: https://linkedin.com/in/rupinajay
Twitter: https://x.com/RupinAjay`,
        },

        awards: {
          "recognition.txt": `Recognition & Awards

- AI/ML Senior Core, SNU Coding Club (Dec 2024)
- Top 10: IndustriAI Hackathon, IIT Madras (2025)
- Top 10: Google Hack4Change (2024)
- Top 12: OpenHack Hackathon, IISc (2024)`,
        },
      },
    },
  };

  const welcomeMessage = `Welcome to Rupin's Portfolio Terminal v1.0.0

Type 'help' to see available commands.
Type 'ls' to list directories.
Use 'cd <folder>' to navigate and 'nano <file>' to view files.
Press Tab for auto-completion.
Type 'exit' to close terminal.

`;

  useEffect(() => {
    setCommandHistory([
      {
        command: "",
        output: welcomeMessage,
        path: currentPath,
      },
    ]);
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commandHistory]);

  // Process command queue
  useEffect(() => {
    if (commandQueue.length > 0 && !fileViewer) {
      const timer = setTimeout(() => {
        const nextCommand = commandQueue[0];
        setCommandQueue(commandQueue.slice(1));
        executeCommand(nextCommand);
      }, 50); // Small delay between commands for readability
      return () => clearTimeout(timer);
    }
  }, [commandQueue, fileViewer]);

  const getDirectoryContents = (path: string): FileSystem | string | null => {
    const parts = path.split("/").filter(Boolean);
    let current: FileSystem | string = fileSystem;

    for (const part of parts) {
      if (typeof current === "string") return null;
      current = current[part];
      if (!current) return null;
    }

    return current;
  };

  const isDirectory = (item: FileSystem | string): boolean => {
    return typeof item === "object";
  };

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim();
    
    // Handle empty command - just show new prompt
    if (!trimmedCmd) {
      setCommandHistory([...commandHistory, { command: "", output: "", path: currentPath }]);
      setCurrentCommand("");
      return;
    }
    
    // Split command properly handling quotes
    const parts = trimmedCmd.split(" ").filter(part => part.length > 0);
    const command = parts[0];
    const args = parts.slice(1);

    let output = "";

    switch (command) {
      case "help":
      case "--help":
        output = `Available commands:

  ls [path]       List directory contents
  cd <path>       Change directory
  cat <file>      Display file contents
  nano <file>     Open file in nano editor (Ctrl+X to exit)
  vim <file>      Open file in vim editor (ESC to exit)
  less <file>     View file with less pager (q to quit)
  pwd             Print working directory
  clear           Clear terminal screen
  tree            Display directory tree
  whoami          Display current user
  echo <text>     Display a line of text
  mkdir <dir>     Create directory (simulated)
  touch <file>    Create file (simulated)
  rm <file>       Remove file (simulated)
  help            Show this help message
  exit            Close terminal

Navigation:
  cd ..           Go to parent directory
  cd ~            Go to home directory
  cd              Go to home directory (same as cd ~)

File Viewing:
  cat file.txt    Quick view (prints to terminal)
  nano file.txt   Interactive editor view
  vim file.txt    Vim-style viewer
  less file.txt   Paginated viewer

Examples:
  ls              List current directory
  cd experience   Enter experience folder
  nano bio.txt    Open bio.txt in nano
  vim linarc.txt  Open linarc.txt in vim
`;
        break;

      case "ls":
        // Check for flags
        const lsFlags = args.filter(arg => arg.startsWith("-"));
        const lsArgs = args.filter(arg => !arg.startsWith("-"));
        const showLong = lsFlags.some(f => f.includes("l"));
        const showAll = lsFlags.some(f => f.includes("a"));
        
        const lsPath = lsArgs[0] ? (lsArgs[0].startsWith("/") ? lsArgs[0] : `${currentPath}/${lsArgs[0]}`) : currentPath;
        const lsContents = getDirectoryContents(lsPath);
        
        if (!lsContents) {
          output = `ls: cannot access '${lsArgs[0] || "."}': No such file or directory`;
        } else if (typeof lsContents === "string") {
          output = lsArgs[0] || currentPath.split("/").pop() || "";
        } else {
          let items = Object.keys(lsContents);
          
          // Add . and .. if -a flag
          if (showAll) {
            items = [".", "..", ...items];
          }
          
          if (showLong) {
            // Long format
            const lines = items.map(key => {
              if (key === "." || key === "..") {
                return `drwxr-xr-x  2 rupin rupin  4096 Mar 21 12:00 ${key}`;
              }
              const item = lsContents[key];
              const isDir = isDirectory(item);
              const perms = isDir ? "drwxr-xr-x" : "-rw-r--r--";
              const size = isDir ? "4096" : "1024";
              return `${perms}  1 rupin rupin  ${size} Mar 21 12:00 ${key}`;
            });
            output = lines.join("\n");
          } else {
            // Normal format
            const displayItems = items.map((key) => {
              if (key === "." || key === "..") return key;
              const item = lsContents[key];
              return isDirectory(item) ? `${key}/` : key;
            });
            output = displayItems.length > 0 ? displayItems.join("    ") : "";
          }
        }
        break;

      case "cd":
        if (!args[0]) {
          // cd without arguments goes to home directory
          setPreviousPath(currentPath);
          setCurrentPath("/home/rupin");
        } else {
          let newPath = currentPath;
          
          // Remove trailing slashes from argument
          const targetPath = args[0].replace(/\/+$/, "");
          
          if (targetPath === "~" || targetPath === "/home/rupin") {
            newPath = "/home/rupin";
          } else if (targetPath === "/") {
            newPath = "/";
          } else if (targetPath === "..") {
            const parts = currentPath.split("/").filter(Boolean);
            parts.pop();
            newPath = "/" + parts.join("/");
            // Don't go above /home/rupin
            if (newPath === "/home" || newPath === "/" || !newPath.startsWith("/home/rupin")) {
              newPath = "/home/rupin";
            }
          } else if (targetPath === "-") {
            // cd - goes to previous directory
            newPath = previousPath;
            output = newPath;
          } else if (targetPath.startsWith("/")) {
            newPath = targetPath;
          } else {
            newPath = `${currentPath}/${targetPath}`.replace(/\/+/g, "/");
          }

          const contents = getDirectoryContents(newPath);
          if (!contents) {
            output = `cd: ${args[0]}: No such file or directory`;
          } else if (typeof contents === "string") {
            output = `cd: ${args[0]}: Not a directory`;
          } else {
            setPreviousPath(currentPath);
            setCurrentPath(newPath);
          }
        }
        break;

      case "cat":
        if (!args[0]) {
          output = "cat: missing file operand\nTry 'cat --help' for more information.";
        } else {
          const catPath = args[0].startsWith("/") ? args[0] : `${currentPath}/${args[0]}`;
          const contents = getDirectoryContents(catPath);
          
          if (!contents) {
            output = `cat: ${args[0]}: No such file or directory`;
          } else if (typeof contents === "object") {
            output = `cat: ${args[0]}: Is a directory`;
          } else {
            output = contents;
          }
        }
        break;

      case "nano":
      case "vim":
      case "vi":
      case "less":
      case "more":
        if (!args[0]) {
          output = `${command}: missing file operand\nTry '${command} --help' for more information.`;
        } else {
          const filePath = args[0].startsWith("/") ? args[0] : `${currentPath}/${args[0]}`;
          const contents = getDirectoryContents(filePath);
          
          if (!contents) {
            output = `${command}: ${args[0]}: No such file or directory`;
          } else if (typeof contents === "object") {
            output = `${command}: ${args[0]}: Is a directory`;
          } else {
            // Add command to history before opening viewer
            setCommandHistory([...commandHistory, { command: trimmedCmd, output: "", path: currentPath }]);
            setCurrentCommand("");
            setHistoryIndex(-1);
            
            // Open file viewer
            const editorType = command === "nano" ? "nano" : 
                              (command === "vim" || command === "vi") ? "vim" : "less";
            setFileViewer({
              filename: args[0],
              content: contents,
              editor: editorType,
            });
            return; // Don't add to history again
          }
        }
        break;

      case "pwd":
        output = currentPath;
        break;

      case "clear":
      case "cls":
        setCommandHistory([]);
        setCurrentCommand("");
        return;

      case "whoami":
        output = "rupin";
        break;

      case "echo":
        output = args.join(" ");
        break;

      case "mkdir":
        if (!args[0]) {
          output = "mkdir: missing operand\nTry 'mkdir --help' for more information.";
        } else {
          output = `mkdir: cannot create directory '${args[0]}': Read-only file system\n(This is a simulated terminal - directories cannot be created)`;
        }
        break;

      case "touch":
        if (!args[0]) {
          output = "touch: missing file operand\nTry 'touch --help' for more information.";
        } else {
          output = `touch: cannot touch '${args[0]}': Read-only file system\n(This is a simulated terminal - files cannot be created)`;
        }
        break;

      case "rm":
      case "rmdir":
        if (!args[0]) {
          output = `${command}: missing operand\nTry '${command} --help' for more information.`;
        } else {
          output = `${command}: cannot remove '${args[0]}': Read-only file system\n(This is a simulated terminal - files cannot be deleted)`;
        }
        break;

      case "cp":
      case "mv":
        if (args.length < 2) {
          output = `${command}: missing ${args.length === 0 ? 'file operand' : 'destination file operand after \'' + args[0] + '\''}\nTry '${command} --help' for more information.`;
        } else {
          output = `${command}: cannot ${command === 'cp' ? 'copy' : 'move'} '${args[0]}' to '${args[1]}': Read-only file system\n(This is a simulated terminal - files cannot be modified)`;
        }
        break;

      case "grep":
        output = "grep: missing operand\nTry 'grep --help' for more information.\n(This is a simulated terminal - grep is not fully implemented)";
        break;

      case "find":
        output = "find: missing operand\nTry 'find --help' for more information.\n(This is a simulated terminal - find is not fully implemented)";
        break;

      case "man":
        if (!args[0]) {
          output = "What manual page do you want?";
        } else {
          output = `No manual entry for ${args[0]}\n(This is a simulated terminal - man pages are not available)`;
        }
        break;

      case "sudo":
        output = "[sudo] password for rupin: \nSorry, this is a simulated terminal. Sudo is not available.";
        break;

      case "history":
        const historyCommands = commandHistory
          .map((entry, index) => entry.command ? `  ${index + 1}  ${entry.command}` : "")
          .filter(line => line.length > 0)
          .join("\n");
        output = historyCommands || "No command history";
        break;

      case "date":
        output = new Date().toString();
        break;

      case "uname":
        if (args[0] === "-a") {
          output = "Linux portfolio 5.15.0 #1 SMP x86_64 GNU/Linux";
        } else {
          output = "Linux";
        }
        break;

      case "hostname":
        output = "portfolio";
        break;

      case "tree":
        const buildTree = (obj: FileSystem | string, prefix = "", isLast = true): string => {
          if (typeof obj === "string") return "";
          
          const keys = Object.keys(obj);
          let result = "";
          
          keys.forEach((key, index) => {
            const isLastItem = index === keys.length - 1;
            const item = obj[key];
            const connector = isLastItem ? "└── " : "├── ";
            const extension = isDirectory(item) ? "/" : "";
            
            result += prefix + connector + key + extension + "\n";
            
            if (isDirectory(item)) {
              const newPrefix = prefix + (isLastItem ? "    " : "│   ");
              result += buildTree(item as FileSystem, newPrefix, isLastItem);
            }
          });
          
          return result;
        };
        
        const treeContents = getDirectoryContents(currentPath);
        if (treeContents && typeof treeContents === "object") {
          const keys = Object.keys(treeContents);
          const dirCount = keys.filter(k => isDirectory(treeContents[k])).length;
          const fileCount = keys.length - dirCount;
          output = ".\n" + buildTree(treeContents) + `\n${dirCount} directories, ${fileCount} files`;
        } else {
          output = "tree: Not a directory";
        }
        break;

      case "exit":
      case "quit":
      case "logout":
        onClose();
        return;

      default:
        output = `${command}: command not found`;
    }

    setCommandHistory([...commandHistory, { command: trimmedCmd, output, path: currentPath }]);
    setCurrentCommand("");
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(currentCommand);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const commands = commandHistory.filter((h) => h.command).map((h) => h.command);
      if (commands.length > 0) {
        const newIndex = historyIndex === -1 ? commands.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentCommand(commands[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const commands = commandHistory.filter((h) => h.command).map((h) => h.command);
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commands.length) {
          setHistoryIndex(-1);
          setCurrentCommand("");
        } else {
          setHistoryIndex(newIndex);
          setCurrentCommand(commands[newIndex]);
        }
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      // Tab completion for files and directories
      const parts = currentCommand.split(" ");
      const command = parts[0];
      
      if (parts.length === 1 && !currentCommand.endsWith(" ")) {
        // Command completion
        const commands = ["ls", "cd", "cat", "nano", "vim", "vi", "less", "more", "pwd", "clear", "cls", "tree", "help", "exit", "quit", "whoami", "echo", "mkdir", "touch", "rm", "cp", "mv", "history", "date", "uname", "hostname", "man", "sudo", "grep", "find"];
        const matches = commands.filter((cmd) => cmd.startsWith(command));
        if (matches.length === 1) {
          setCurrentCommand(matches[0] + " ");
        } else if (matches.length > 1) {
          // Show available completions
          const output = matches.join("  ");
          setCommandHistory([...commandHistory, { command: currentCommand, output, path: currentPath }]);
          setCurrentCommand(command);
        }
      } else if ((parts.length >= 2 || currentCommand.endsWith(" ")) && (command === "cd" || command === "ls" || command === "cat" || command === "nano" || command === "vim" || command === "vi" || command === "less" || command === "more" || command === "rm" || command === "rmdir")) {
        // File/directory completion
        let partial = "";
        let lastArg = "";
        
        if (currentCommand.endsWith(" ")) {
          // Just typed "cd " - show all files
          partial = "";
        } else {
          // Get the last argument
          lastArg = parts[parts.length - 1];
          
          // Skip if it's a flag
          if (lastArg.startsWith("-")) {
            return;
          }
          
          // If it ends with / and is a valid directory, don't complete further
          if (lastArg.endsWith("/")) {
            const dirPath = lastArg.substring(0, lastArg.length - 1);
            const contents = getDirectoryContents(currentPath);
            if (contents && typeof contents === "object" && contents[dirPath] && isDirectory(contents[dirPath])) {
              // Valid complete directory - don't show completions
              return;
            }
          }
          
          partial = lastArg;
        }
        
        const contents = getDirectoryContents(currentPath);
        if (contents && typeof contents === "object") {
          const allItems = Object.keys(contents);
          
          // Filter based on command type
          let itemsToShow = allItems;
          if (command === "cd") {
            // cd: only directories
            itemsToShow = allItems.filter(key => isDirectory(contents[key]));
          } else if (command === "cat" || command === "nano" || command === "vim" || command === "vi" || command === "less" || command === "more") {
            // File viewers: only files
            itemsToShow = allItems.filter(key => !isDirectory(contents[key]));
          } else if (command === "rmdir") {
            // rmdir: only directories
            itemsToShow = allItems.filter(key => isDirectory(contents[key]));
          }
          // ls and rm show both files and directories
          
          // Always filter based on partial - even if empty string (shows all)
          const matches = itemsToShow.filter((key) => key.startsWith(partial));
          
          if (matches.length === 0) {
            // No matches
            return;
          } else if (matches.length === 1) {
            // Single match - auto complete
            const isDir = isDirectory(contents[matches[0]]);
            const suffix = isDir ? "/" : "";
            
            if (currentCommand.endsWith(" ")) {
              setCurrentCommand(currentCommand + matches[0] + suffix);
            } else {
              const newParts = [...parts.slice(0, -1), matches[0] + suffix];
              setCurrentCommand(newParts.join(" "));
            }
          } else if (matches.length > 1) {
            // Multiple matches - show them
            const output = matches.map(m => isDirectory(contents[m]) ? `${m}/` : m).join("  ");
            setCommandHistory([...commandHistory, { command: currentCommand, output, path: currentPath }]);
            
            // Find common prefix for partial completion
            if (partial) {
              const commonPrefix = matches.reduce((prefix, match) => {
                let i = 0;
                while (i < prefix.length && i < match.length && prefix[i] === match[i]) {
                  i++;
                }
                return prefix.substring(0, i);
              }, matches[0]);
              
              if (commonPrefix.length > partial.length) {
                // Complete to common prefix
                const newParts = [...parts.slice(0, -1), commonPrefix];
                setCurrentCommand(newParts.join(" "));
              } else {
                setCurrentCommand(currentCommand);
              }
            } else {
              setCurrentCommand(currentCommand);
            }
          } else if (matches.length === 0 && partial) {
            // No matches - do nothing
          }
        }
      }
    } else if (e.key === "c" && e.ctrlKey) {
      e.preventDefault();
      // Ctrl+C - cancel current command
      setCommandHistory([...commandHistory, { command: currentCommand + "^C", output: "", path: currentPath }]);
      setCurrentCommand("");
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      // Ctrl+L - clear screen
      setCommandHistory([]);
      setCurrentCommand("");
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedText = e.clipboardData.getData("text");
    const lines = pastedText.split("\n").map(line => line.trim()).filter(line => line.length > 0);
    
    if (lines.length > 1) {
      e.preventDefault();
      // Multiple lines pasted - queue them
      setCommandQueue([...commandQueue, ...lines]);
      setCurrentCommand("");
    }
    // Single line paste is handled by default browser behavior
  };

  return (
    <>
      {fileViewer && (
        <FileViewer
          filename={fileViewer.filename}
          content={fileViewer.content}
          editor={fileViewer.editor}
          onClose={() => setFileViewer(null)}
        />
      )}
      
      <div
        className="fixed inset-0 z-50 bg-background font-mono text-sm overflow-hidden flex flex-col"
        onClick={() => inputRef.current?.focus()}
        style={{ display: fileViewer ? "none" : "flex" }}
      >
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-accent border-b border-border">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <button
              onClick={onClose}
              className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
              aria-label="Close terminal"
            />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="text-xs text-muted-foreground ml-2">rupin@portfolio:~</span>
        </div>
        <button
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground transition-colors text-xs"
        >
          ESC to exit
        </button>
      </div>

      {/* Terminal Content */}
      <div
        ref={terminalRef}
        className="flex-1 overflow-y-auto p-4 space-y-1 terminal-scroll"
      >
        {commandHistory.map((entry, index) => (
          <div key={index}>
            {entry.command && (
              <div className="flex gap-2">
                <span className="text-green-500">rupin@portfolio</span>
                <span className="text-blue-500">{getDisplayPath(entry.path)}</span>
                <span className="text-foreground">$</span>
                <span className="text-foreground">{entry.command}</span>
              </div>
            )}
            {entry.output && (
              <div className="whitespace-pre-wrap text-muted-foreground mt-1 mb-2">
                {entry.output.split(/(\s+)/).map((part, i) => {
                  // Check if this part is a directory (ends with /)
                  if (part.trim().endsWith("/") && part.trim().length > 1) {
                    return (
                      <span key={i} className="text-blue-400">
                        {part}
                      </span>
                    );
                  }
                  return <span key={i}>{part}</span>;
                })}
              </div>
            )}
            {!entry.command && !entry.output && index > 0 && <div className="h-1" />}
          </div>
        ))}

        {/* Current Input Line */}
        <div className="flex gap-2">
          <span className="text-green-500">rupin@portfolio</span>
          <span className="text-blue-500">{getDisplayPath(currentPath)}</span>
          <span className="text-foreground">$</span>
          <input
            ref={inputRef}
            type="text"
            value={currentCommand}
            onChange={(e) => setCurrentCommand(e.target.value)}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            className="flex-1 bg-transparent outline-none text-foreground caret-foreground"
            autoFocus
            spellCheck={false}
            disabled={commandQueue.length > 0}
          />
        </div>
      </div>
    </div>
    </>
  );
}
