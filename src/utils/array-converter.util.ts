import { Buffer } from 'buffer';

/**
 * Converts an array of numbers to a Buffer.
 * @param {number[] | string[]} array - The array of numbers or strings to convert.
 * @returns {Promise<Buffer>} A promise that resolves to a Buffer containing the numbers.
 */

export const arrayToFileBuffer = async (
  array: number[] | string[],
): Promise<Buffer> => {
  const textFileContent = array.map((item) => String(item)).join(',');
  // Create buffer from the TXT string
  return Buffer.from(textFileContent, 'utf8');
};

/**
 * Converts a Buffer to an array of items.
 * @param {Buffer} buffer - The Buffer to convert.
 * @returns {Promise<(number | string)[]>} A promise that resolves to an array of items.
 */
export const fileBufferToArray = async (
  buffer: Buffer,
): Promise<(number | string)[]> => {
  // Convert buffer to string and split by commas
  const content = buffer.toString('utf8');
  return content
    .split(',')
    .map((item) => (isNaN(Number(item)) ? item : Number(item)));
};
