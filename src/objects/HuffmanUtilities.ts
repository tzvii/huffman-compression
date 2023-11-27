import { HuffmanCoder } from "./HuffmanCoder";

export class HuffmanUtilities
{
    public static compress(data: string): void
    {
        const huffmanCoder = new HuffmanCoder();
        huffmanCoder.encode(data);
    }

    public static decompress(data: string): void
    {
        const huffmanCoder = new HuffmanCoder();
        huffmanCoder.decode(data);
    }
}