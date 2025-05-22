import * as path from "path";
type IconMapKeys =
  | "folder"
  | "git_folder"
  | "node_modules"
  | "config_folder"
  | "dot_folder"
  | ".ts"
  | ".tsx"
  | ".js"
  | ".jsx"
  | ".json"
  | ".html"
  | ".css"
  | ".scss"
  | ".md"
  | ".yml"
  | ".yaml"
  | ".go"
  | ".py"
  | ".rs"
  | ".toml"
  | ".lock"
  | ".log"
  | ".env"
  | ".sh"
  | ".zsh"
  | ".bash"
  | ".vim"
  | ".git"
  | ".gitignore"
  | ".npmrc"
  | "dockerfile"
  | ".dockerignore"
  | ".zip"
  | ".tar"
  | ".gz"
  | ".rar"
  | ".jpg"
  | ".jpeg"
  | ".png"
  | ".gif"
  | ".svg"
  | ".pdf"
  | ".ttf"
  | ".otf";
interface FileIcon {
  icon: string;
  color: string;
}

const ICON_MAP: Record<IconMapKeys, FileIcon> = {
  // Folders
  folder: { icon: "", color: "#61AFEF" },
  git_folder: { icon: "", color: "#E06C75" },
  node_modules: { icon: "", color: "#98C379" },
  config_folder: { icon: "", color: "#E5C07B" },
  dot_folder: { icon: "", color: "#C678DD" },

  // Files
  ".ts": { icon: "", color: "#007ACC" },
  ".tsx": { icon: "", color: "#007ACC" },
  ".js": { icon: "", color: "#F7DF1E" },
  ".jsx": { icon: "", color: "#F7DF1E" },
  ".json": { icon: "", color: "#E5C07B" },
  ".html": { icon: "", color: "#E34C26" },
  ".css": { icon: "", color: "#563D7C" },
  ".scss": { icon: "", color: "#CC6699" },
  ".md": { icon: "", color: "#61AFEF" },
  ".yml": { icon: "", color: "#C678DD" },
  ".yaml": { icon: "", color: "#C678DD" },
  ".go": { icon: "", color: "#00ADD8" },
  ".py": { icon: "", color: "#306998" },
  ".rs": { icon: "", color: "#DEA584" },
  ".toml": { icon: "", color: "#C678DD" },
  ".lock": { icon: "", color: "#E5C07B" },
  ".log": { icon: "", color: "#ABB2BF" },
  ".env": { icon: "", color: "#E5C07B" },
  ".sh": { icon: "", color: "#89DDFF" },
  ".zsh": { icon: "", color: "#89DDFF" },
  ".bash": { icon: "", color: "#89DDFF" },
  ".vim": { icon: "", color: "#019833" },
  ".git": { icon: "", color: "#F14E32" },
  ".gitignore": { icon: "", color: "#F14E32" },
  ".npmrc": { icon: "", color: "#CB3837" },
  dockerfile: { icon: "", color: "#0db7ed" },
  ".dockerignore": { icon: "", color: "#0db7ed" },
  ".zip": { icon: "", color: "#E5C07B" },
  ".tar": { icon: "", color: "#E5C07B" },
  ".gz": { icon: "", color: "#E5C07B" },
  ".rar": { icon: "", color: "#E5C07B" },
  ".jpg": { icon: "", color: "#98C379" },
  ".jpeg": { icon: "", color: "#98C379" },
  ".png": { icon: "", color: "#98C379" },
  ".gif": { icon: "", color: "#98C379" },
  ".svg": { icon: "", color: "#98C379" },
  ".pdf": { icon: "", color: "#E06C75" },
  ".ttf": { icon: "", color: "#C678DD" },
  ".otf": { icon: "", color: "#C678DD" },
};

export const getFileIcon = (name: string, isDirectory: boolean): FileIcon => {
  if (isDirectory) {
    if (name === ".git") {
      return ICON_MAP["git_folder"];
    }
    if (name === "node_modules") {
      return ICON_MAP["node_modules"];
    }
    if (name.startsWith(".")) {
      return ICON_MAP["dot_folder"];
    }
    if (name.includes("config") || name.includes("conf")) {
      return ICON_MAP["config_folder"];
    }
    return ICON_MAP["folder"];
  }
  const ext = path.extname(name).toLowerCase();
  if (ext in ICON_MAP) {
    return ICON_MAP[ext as IconMapKeys]!;
  }
  const lowerName = name.toLowerCase();
  if (lowerName in ICON_MAP) {
    return ICON_MAP[lowerName as IconMapKeys]!;
  }
  return { icon: "", color: "#ABB2BF" };
};
