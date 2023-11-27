import * as fs from 'fs';

export function getFileSize(filePath: string): string
{
    return (fs.statSync(filePath).size / 1024).toFixed(2);
}