/**
 * Build full file path with proper normalization
 */
export const buildFilePath = (fileName: string, basePath: string = '/data/tables'): string => {
  return `${basePath}/${fileName}`.replace(/\/+/g, '/');
};

/**
 * Validate file response
 */
export const validateFileResponse = async (response: Response): Promise<void> => {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HTTP ${response.status}: ${response.statusText}. Response: ${errorText}`);
  }

  const contentType = response.headers.get('content-type');
  if (!contentType?.includes('application/json')) {
    throw new Error(`Expected JSON, received: ${contentType || 'unknown type'}`);
  }
};

/**
 * Safe JSON parsing with error handling
 */
export const safeJsonParse = async (response: Response): Promise<any> => {
  try {
    return await response.json();
  } catch (error) {
    throw new Error(
      `Invalid JSON response: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
};
