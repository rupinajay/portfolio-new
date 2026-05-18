This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Features

### Interactive Terminal Mode
This portfolio includes a unique Linux-style terminal interface that allows visitors to explore your portfolio using command-line commands.

**How to access:**
- Click the "Terminal" button in the top-right corner of the page
- Press `ESC` to exit terminal mode

**Available Commands:**
- `ls [options] [path]` - List directory contents (-l for long format, -a for all files)
- `cd <path>` - Change directory (supports `..`, `~`, `-`, or no args for home)
- `cat <file>` - Display file contents (prints to terminal)
- `nano <file>` - Open file in nano editor (Ctrl+X to exit)
- `vim <file>` or `vi <file>` - Open file in vim editor (ESC to exit)
- `less <file>` or `more <file>` - View file with pager (q to quit)
- `pwd` - Print working directory
- `tree` - Display directory tree structure with counts
- `clear` or `cls` - Clear terminal screen
- `whoami` - Display current user
- `echo <text>` - Display a line of text
- `history` - Show command history
- `date` - Display current date and time
- `uname [-a]` - Display system information
- `hostname` - Display hostname
- `mkdir <dir>` - Create directory (simulated, read-only)
- `touch <file>` - Create file (simulated, read-only)
- `rm <file>` - Remove file (simulated, read-only)
- `cp <src> <dest>` - Copy file (simulated, read-only)
- `mv <src> <dest>` - Move file (simulated, read-only)
- `man <command>` - Display manual (simulated)
- `sudo <command>` - Run as superuser (simulated)
- `help` or `--help` - Show available commands
- `exit`, `quit`, or `logout` - Close terminal

**File System Structure:**
```
/home/rupin/
├── about/
│   └── bio.txt
├── experience/
│   ├── linarc.txt
│   ├── gravix.txt
│   ├── anand.txt
│   ├── zyngate.txt
│   └── glencore.txt
├── projects/
│   ├── sustain.txt
│   ├── statiq.txt
│   └── text-to-sql.txt
├── skills/
│   └── technical.txt
├── education/
│   └── academic.txt
├── contact/
│   └── info.txt
└── awards/
    └── recognition.txt
```

**Terminal Features:**
- Full-screen terminal interface with no page scrolling
- Command history navigation (↑/↓ arrow keys)
- Tab completion for file and directory names
- Theme-aware (respects light/dark mode)
- Linux-style command prompt with colored output

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
