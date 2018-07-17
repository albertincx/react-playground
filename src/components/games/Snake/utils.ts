/**
 * Get random cell point
 * @return number
 */
export function getRandomCellPoint(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
}

/**
 * Simple compare arrays by string value
 * @return boolean
 */
export function compareArrays(arr1: number[], arr2: number[]): boolean {
    return arr1.toString() === arr2.toString();
}