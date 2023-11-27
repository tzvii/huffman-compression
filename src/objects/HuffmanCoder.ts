import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import { MinPriorityQueue } from '@datastructures-js/priority-queue';
import { HuffmanNode } from './HuffmanNode';
import { config } from '../config/config';
import { JSONTools } from '../common/JSONTools';
import { getFileSize } from '../common/getFileSize';

export class HuffmanCoder
{
    public encode(data: string): void
    {
        // Create a frequency map for each character in the input data
        const frequencyMap = this.getCharFrequencyMap(data);

        // Build a Huffman tree with a priority queue based on the character frequency map
        const root = this.buildHuffmanTree(frequencyMap);

        // Generate a mapping of characters to Huffman codes
        const codeMap = this.getCodeMap(root, '', {});

        // Build a bit string using the Huffman codes for the input data
        const bitString = this.buildBitString(data, codeMap);

        // Create a buffer representing the bit string
        const bitStringBuffer = this.createBitStringBuffer(bitString);

        // Convert the character frequency map to JSON and create a header
        // with a split_key to separate the JSON from bin data
        const header = JSONTools.stringify(frequencyMap) + config.splitKey;

        const headerBuffer = Buffer.from(header, config.encoding.ascii);
        const buffer = Buffer.concat([headerBuffer, bitStringBuffer]);

        // Save the binary buffer to the 'bin' folder
        this.saveToBinFolder(buffer);
    }

    public decode(data: string): void
    {
        // Split the input data into header and binary data
        const [header, binData] = data.split(config.splitKey);

        // Parse the JSON-encoded header to obtain the character frequency map
        const freqMap = <{}>JSONTools.parse(header);

        // Convert binary data to buffers
        const byteBuffers = Array.from(binData).map(char => Buffer.from(char, config.encoding.ascii));

        // Convert buffers to a bit string
        const bitString = byteBuffers.reduce((acc, cur) => acc += this.convertByteBufferToBitString(cur), '');

        // Rebuild the original text using the character frequency map and bit string
        const text = this.buildText(freqMap, bitString);

        // Save the decoded text to the 'txt' folder
        this.saveToTxtFolder(text);
    }

    private getCharFrequencyMap(data: string): {[key: string]: number}
    {
        return data.split('').reduce((acc, cur) => 
        {
            acc[cur] = (acc[cur] ?? 0) + 1;
            return acc;
        }, {});
    }

    private buildHuffmanTree(freqMap: {[key: string]: number}): HuffmanNode
    {
        const pq: MinPriorityQueue<HuffmanNode> = new MinPriorityQueue((node) => node.freq);
        for (const [key, value] of Object.entries(freqMap)) 
            pq.enqueue(new HuffmanNode(key, value));
        
        if (pq.size() <= 1) 
            return pq.dequeue();

        while (pq.size() > 1)
        {
            const node1 = pq.dequeue();
            const node2 = pq.dequeue();
            const rootValue = node1.freq + node2.freq;
            const root = new HuffmanNode(rootValue.toString(), rootValue);
            root.left = node1;
            root.right = node2;
            pq.enqueue(root);
        }

        return pq.dequeue();
    }

    private getCodeMap(node: HuffmanNode, code: string, map: {}): {[key: string]: string}
    {
        if (!node.left && !node.right)
            map[node.char] = code;
        else
        {
            this.getCodeMap(node.left, code + '0', map);
            this.getCodeMap(node.right, code + '1', map);
        }
        return map;
    }

    private buildBitString(data: string, codeMap: {[key: string]: string}): string
    {
        return data.split('').map(char => codeMap[char]).join('');
    }

    private convertBitString(bitStr: string)
    {
        if (bitStr.length !== 8) 
            return 0;

        let number = 255;
        for (let i = 0; i < 8; i++)
            if (!Number(bitStr[i])) number -= (Math.ceil(256 / (2**i)) >> 1);

        return number;
    }

    private createBitStringBuffer(bitString: string): Buffer
    {
        const byteBuffers: Buffer[] = [];

        for (let i = 0; i < bitString.length; i += 8)
        {
            const bitValue = this.convertBitString(bitString.slice(i, i + 8));
            const asciiString = String.fromCharCode(bitValue);
            const buffer = Buffer.from(asciiString, config.encoding.ascii);
            byteBuffers.push(buffer);
        }

        return Buffer.concat(byteBuffers);
    }

    private convertByteBufferToBitString(buff: Buffer): string
    {
        return BigInt('0x' + buff.toString('hex')).toString(2).padStart(buff.length * 8, '0');
    }

    private buildText(freqMap: {[key: string]: number}, bitString: string): string
    {
        const root = this.buildHuffmanTree(freqMap);
        let node = root;
        let text = '';

        for (let i = 0; i < bitString.length;)
        {
            if (!node.left && !node.right) {
                text += node.char;
                node = root;
            }
            else 
                node = bitString[i++] === '0' ? node.left : node.right;
        }
        
        return text;
    }

    private saveToBinFolder(buffer: Buffer): void
    {
        const binPath = path.join(__dirname, '../..', 'bin');
        if (!fs.existsSync(binPath)) 
            fs.mkdirSync(binPath, { recursive: true });
        const filename = `compressed-${crypto.randomBytes(2).toString('hex')}.bin`;
        const filePath = path.join(binPath, filename);
        fs.writeFileSync(filePath, buffer);
        console.log(`Compressed binary file (${filename}): ${getFileSize(filePath)} KB`);
    }

    private saveToTxtFolder(text: string): void
    {
        const txtPath = path.join(__dirname, '../..', 'txt');
        if (!fs.existsSync(txtPath)) 
            fs.mkdirSync(txtPath, { recursive: true });
        const filename = `decompressed-${crypto.randomBytes(2).toString('hex')}.txt`;
        const filePath = path.join(txtPath, filename);
        fs.writeFileSync(filePath, text);
        console.log(`Decompressed txt file (${filename}): ${getFileSize(filePath)} KB`);
    }
}