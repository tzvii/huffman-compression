import * as fs from 'fs';
import { getFileSize } from './getFileSize';

export function readFile(encoding: BufferEncoding): string
{
    if (process.argv.length < 3)
    {
        console.error("Incorrect number of arguments given:", process.argv.length);
        process.exit(1);
    }

    const filename = process.argv[2];

    

    try
    {
        console.log(`File with ${encoding} encoding size: ${getFileSize(filename)} KB`);
        return fs.readFileSync(filename, encoding);
    }
    catch (err)
    {
        console.error(err);
        process.exit(1);
    }
}