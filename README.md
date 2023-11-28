# Huffman Encoder/Decoder

## Overview

This project implements a Huffman encoder and decoder in TypeScript, providing a simple and efficient way to compress and decompress text data using Huffman coding. Huffman coding is a lossless, variable-length prefix compression algorithm that assigns variable-length codes to input characters based on their frequencies.

## Features

- **Encoding:** Compresses input text data into a binary format using Huffman coding.
- **Decoding:** Decompresses Huffman-encoded binary data back to the original text.

## Usage

### Prerequisites

Before you begin, ensure you have met the following requirements:

- [Node.js](https://nodejs.org/) installed
- A package manager such as [npm](https://www.npmjs.com/) (comes with Node.js installation)
- TypeScript installed:
   ```bash
   npm i -g typescript
   ```

### Installation

Before using the encoder/decoder, make sure you have [Node.js](https://nodejs.org/) installed on your machine.

1. Clone the repository:

   ```bash
   git clone https://github.com/tzvii/huffman-compression.git
   ```

2. Navigate to the project directory:

   ```bash
   cd huffman-compression
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Build project:

   ```bash
   npm run build
   ```

### Encoding

To compress a text file using Huffman encoding, run the following command:

```bash
npm run encode sample-input.txt
```

- `sample-input.txt`: The path to the input text file.
- After command is run, a new `.bin` file will appear in the `/bin` directory
- Note: a sample `.txt` file is included in the root directory -- `alice-in-wonderland.txt`

### Decoding

To decompress a Huffman-encoded binary file, run the following command:

```bash
npm run decode sample-output.bin
```

- `sample-output.bin`: The path to the Huffman-encoded binary file.
- After command is run, a new `.txt` file will appear in the `/txt` directory

## Examples

### Encoding

Suppose you have a text file named `sample.txt` with the following content:

```
Hello, Huffman!
```

Run the encoding command:

```bash
npm run encode sample.txt
```

This will generate a binary file (`encoded.bin`) containing the Huffman-encoded representation of the input text.

### Decoding

To decode the binary file back to text, use the decoding command:

```bash
npm run decode encoded.bin
```

This will create a text file (`decoded.txt`) with the original content.

## Acknowledgments

This project is inspired by the principles of Huffman coding. Special thanks to...

- David A. Huffman

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.