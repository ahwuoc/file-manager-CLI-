import React, { useEffect, useState, useCallback } from "react";
import { Text, Box, render } from "ink"; // Bỏ useInput, useApp ở đây vì đã ở hook
import * as fs from "fs";
import * as path from "path";
import { FileItem } from "./FileItem";
import { useFileBrowserInput } from "../hook/useFileBrowserInput";
const MAX_VISIBLE_ITEMS = 18;
export const FileBrowser = () => {
  const [items, setItems] = useState<string[]>([]);
  const [selectIndex, setSelectIndex] = useState<number>(0);

  const loadItems = useCallback(() => {
    try {
      const currentDir = process.cwd();
      const files = fs.readdirSync(currentDir);
      setItems(["..", ...files.sort((a, b) => a.localeCompare(b))]);
      setSelectIndex(0);
    } catch (e: any) {
      setItems([`Error: Cannot read directory. ${e.message || e}`]);
      setSelectIndex(0);
      console.error("Error reading directory:", e);
    }
  }, []);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  // Sử dụng custom hook để xử lý input
  const { commandMode, commandInput } = useFileBrowserInput({
    items,
    selectIndex,
    setSelectIndex,
    loadItems,
  });

  const startIndex = Math.max(
    0,
    selectIndex - Math.floor(MAX_VISIBLE_ITEMS / 2),
  );
  const endIndex = Math.min(items.length, startIndex + MAX_VISIBLE_ITEMS);
  const visibleItems = items.slice(startIndex, endIndex);

  const scrollbarPosition =
    items.length > MAX_VISIBLE_ITEMS
      ? Math.floor((selectIndex / (items.length - 1)) * (MAX_VISIBLE_ITEMS - 1))
      : -1;

  return (
    <Box
      flexDirection="column"
      padding={1}
      borderStyle="bold"
      borderColor={"cyan"}
    >
      <Box marginBottom={1}>
        <Text bold color={"green"}>
          File Browser - Nhấn Enter để chọn, q để thoát
        </Text>
      </Box>

      <Box flexDirection="row" height={MAX_VISIBLE_ITEMS} flexGrow={1}>
        <Box flexDirection="column" width="98%">
          {Array.isArray(items) && items.length > 0 ? (
            visibleItems.map((item, index) => {
              const uniqueKey = `${item}-${startIndex + index}`;
              const isSelected = item === items[selectIndex];
              const itemFullPath = path.join(process.cwd(), item);
              let isDirectory = false;

              if (fs.existsSync(itemFullPath)) {
                isDirectory = fs.statSync(itemFullPath).isDirectory();
              }

              return (
                <FileItem
                  key={uniqueKey}
                  name={item}
                  isSelected={isSelected}
                  isDirectory={isDirectory}
                />
              );
            })
          ) : (
            <Text>Thư mục trống hoặc lỗi.</Text>
          )}
        </Box>

        {items.length > MAX_VISIBLE_ITEMS && (
          <Box flexDirection="column" width="2%" alignItems="center">
            {Array.from({ length: MAX_VISIBLE_ITEMS }).map((_, i) => (
              <Text
                key={`scrollbar-${i}`}
                color={i === scrollbarPosition ? "grey" : "dim"}
              >
                {i === scrollbarPosition ? "█" : "░"}{" "}
              </Text>
            ))}
          </Box>
        )}
      </Box>
      <Box marginTop={1} flexDirection="column">
        <Text color="gray">
          Tổng số mục: {items.length} | Đang ở: {selectIndex + 1}/{items.length}
        </Text>
        {commandMode && (
          <Text color="white" bold>
            : {commandInput}
          </Text>
        )}
      </Box>
    </Box>
  );
};
