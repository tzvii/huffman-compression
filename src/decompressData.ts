import { readFile } from './common/readFile';
import { config } from './config/config';
import { HuffmanUtilities } from './objects/HuffmanUtilities';

function decompressData(): void
{
    const fileData: string = readFile(config.encoding.binary);
    HuffmanUtilities.decompress(fileData);
}

decompressData();
