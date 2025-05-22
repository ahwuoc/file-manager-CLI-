// src/components/FileItem.tsx
import React from "react";
import { Text } from "ink";
import { getFileIcon } from "../utils/fileIcons"; // Đảm bảo import đúng

interface FileItemProps {
  name: string;
  isSelected: boolean;
  isDirectory: boolean;
}

export const FileItem: React.FC<FileItemProps> = ({
  name,
  isSelected,
  isDirectory,
}) => {
  // Lấy icon và màu sắc từ hàm getFileIcon
  const { icon, color } = getFileIcon(name, isDirectory); // 'color' ở đây là một chuỗi hex như "#61AFEF"

  return (
    <Text color={isSelected ? "yellow" : "white"}>
      {isSelected ? "> " : "  "}
      <Text color={color}>{icon}</Text>{" "}
      {isDirectory ? (
        <Text bold color="blue">
          {name}/
        </Text>
      ) : (
        <Text>{name}</Text>
      )}
    </Text>
  );
};
