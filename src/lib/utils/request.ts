/**
 * Performs an HTTP request and returns the response data.
 *
 * @template T - The expected type of the response data.
 * @param {RequestInfo | URL} input - The input URL or Request object for the fetch request.
 * @param {RequestInit} [init] - Optional configuration object for the fetch request.
 * @returns {Promise<T | string>} - A promise that resolves to the response data of type `T` or a string containing an error message.
 *
 * @throws {Error} - If an unexpected error occurs during the request.
 *
 * @example
 * // Example usage:
 * const response = await httpRequest<MyDataType>('https://api.example.com/data');
 * if (typeof response === 'string') {
 *     console.error(response);
 * } else {
 *     console.log(response);
 * }
 */
export async function httpRequest<T>(input: RequestInfo | URL, init?: RequestInit): Promise<T | string> {
    try {
        const response = await fetch(input, init);
        
        if (!response.ok) 
            return `Failed to fetch with status ${response.status} and message ${response.statusText}`;

        const data = await response.json();

        if (typeof data !== 'object' || data === null) 
            return `Failed to parse response to the expected type`;

        return data as T;
    } catch (e) {
        const error = e as Error;

        return error.message;
    }
}