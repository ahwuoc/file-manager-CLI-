{{REWRITTEN_CODE}}
✨ Features
⚡️ Blazing Fast: Powered by Bun.js for near-instant startup and execution.
💅 Modern TUI: Beautiful and interactive user interface thanks to Ink.js and React.
📁 Intuitive Navigation:
  - Arrow Keys: Smoothly move up/down.
  - Right Arrow (→): Enter directories.
  - Left Arrow (←): Go back to the parent directory.
  - Enter (⏎): Enter directories or open files with the default system application (xdg-open).
🔎 File & Folder Icons: Visually appealing icons from Nerd Fonts with distinct colors for files and directories.
⬆️ Scrollable View: Automatically handles long lists of files with a simple scrollbar.
🗣️ Command Mode: Press : to enter command mode and execute commands like `cd <path>`, `q` (quit), `quit`.
TypeScript Ready: Built entirely with TypeScript for better type safety and maintainability.
🛠️ Installation
Before you begin, ensure you have Bun.js installed on your Cachy OS (or any Linux distribution). If not, follow the official Bun.js installation guide.

Clone the repository (or create your project structure):

```bash
git clone https://github.com/ahwuoc/file-manager-CLI-.git
# Or navigate to your existing project folder if you created it manually
cd file-manager-CLI
```

Install dependencies:

```bash
bun install
```

Make it an executable command (Recommended):
To run your file manager just by typing a command (e.g., `myfm`), you can link it globally.

First, create a `bin/run.js` file in your project root:

```javascript
#!/usr/bin/env bun
// This makes your TUI app runnable directly by Bun
import '../src/app.tsx';
```

Then, give it execute permissions:

```bash
chmod +x bin/run.js
```

Finally, link it globally:

```bash
bun link --global
```
