import { useInput, useApp } from "ink";
import { useState, useEffect, useCallback } from "react";
import * as path from "path";
import * as fs from "fs";
import { exec } from "child_process";
import { log } from "console";
import { ref } from "process";
interface UseFileBrowserInputProps {
  items: string[];
  selectIndex: number;
  setSelectIndex: React.Dispatch<React.SetStateAction<number>>;
  loadItems: () => void;
}

export const useFileBrowserInput = ({
  items,
  selectIndex,
  setSelectIndex,
  loadItems,
}: UseFileBrowserInputProps) => {
  const { exit } = useApp();
  const [commandMode, setCommandMode] = useState(false);
  const [commandInput, setCommandInput] = useState("");

  const handleCommand = useCallback(() => {
    if (commandInput === "q" || commandInput === "quit") {
      exit();
    } else if (commandInput.startsWith("cd ")) {
      const newPath = commandInput.substring(3).trim();
      try {
        process.chdir(path.resolve(process.cwd(), newPath));
        loadItems();
      } catch (e: any) {
        console.log(
          `Lỗi: Không thể chuyển đến thư mục "${newPath}". ${e.message}`,
        );
      }
    } else {
      console.log(`Lệnh không hợp lệ: ${commandInput}`);
    }
    setCommandInput("");
    setCommandMode(false);
  }, [commandInput, loadItems, exit]);

  const handleNavigation = useCallback(() => {
    const selectedItem = items[selectIndex];
    if (typeof selectedItem === "undefined") {
      console.log("Không có mục nào được chọn.");
      return;
    }

    const fullPath = path.join(process.cwd(), selectedItem);

    if (!fs.existsSync(fullPath) && selectedItem !== "..") {
      console.log(`Mục không tồn tại hoặc đã bị xóa: ${selectedItem}`);
      return;
    }

    if (selectedItem === "..") {
      process.chdir(path.join(process.cwd(), ".."));
      loadItems();
    } else if (fs.statSync(fullPath).isDirectory()) {
      process.chdir(fullPath);
      loadItems();
    } else {
      exec(`xdg-open ${fullPath}`, (error) => {
        if (error) {
          console.log(error);
        } else {
          exit();
        }
      });
    }
  }, [items, selectIndex, loadItems, exit]);

  useInput((input, key) => {
    if (commandMode) {
      switch (true) {
        case key.return:
          handleCommand();
          break;
        case key.escape:
          setCommandInput("");
          setCommandMode(false);
          break;
        case key.backspace || key.delete:
          setCommandInput((prev) => prev.slice(0, -1));
          break;
        case input.length === 1 && !key.ctrl && !key.meta && !key.shift:
          setCommandInput((prev) => prev + input);
          break;
      }
      return;
    }

    switch (true) {
      case key.upArrow:
        setSelectIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : items.length - 1,
        );
        break;
      case key.downArrow:
        setSelectIndex((prevIndex) =>
          prevIndex < items.length - 1 ? prevIndex + 1 : 0,
        );
        break;
      case key.rightArrow:
        const selectedItemRight = items[selectIndex];
        if (typeof selectedItemRight === "undefined") return;
        const fullPathRight = path.join(process.cwd(), selectedItemRight);
        if (
          fs.existsSync(fullPathRight) &&
          fs.statSync(fullPathRight).isDirectory()
        ) {
          process.chdir(fullPathRight);
          loadItems();
        }
        break;
      case key.leftArrow:
        process.chdir(path.join(process.cwd(), ".."));
        loadItems();
        break;
      case key.return:
        handleNavigation();
        break;
      case input === ":":
        setCommandMode(true);
        setCommandInput("");
        break;
      case input === "q":
        exit();
        break;
    }
  });

  return { commandMode, commandInput };
};
