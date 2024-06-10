import * as fs from "fs";

export function readJsonFile<T>(filePath: string): T | T[] {
  const data = fs.readFileSync(filePath, {
    encoding: "utf8",
  });
  return JSON.parse(data);
}

export function writeJsonFile(filePath: string, data: any) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}
