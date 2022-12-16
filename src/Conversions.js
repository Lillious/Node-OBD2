// Convert hex to binary
export const Hex2Binary = (hex) => {
    // Remove any non-hex characters
    hex = hex.replace(/[^0-9A-F]/gi, "");
    // Split hex into 2 digit chunks
    const hexChunks = hex.match(/.{1,2}/g);
    // Convert each chunk to binary
    const binaryChunks = hexChunks.map((chunk) => {
        return parseInt(chunk, 16).toString(2).padStart(8, "0");
    });
    // Join binary chunks into a single string
    return binaryChunks.join("");
}

// Binary to hex
export const Binary2Hex = (binary) => {
    // Split binary into 8 digit chunks
    const binaryChunks = binary.match(/.{1,8}/g);
    // Convert each chunk to hex
    const hexChunks = binaryChunks.map((chunk) => {
        return parseInt(chunk, 2).toString(16).padStart(2, "0");
    });
    // Join hex chunks into a single string
    return hexChunks.join("").toUpperCase();
}