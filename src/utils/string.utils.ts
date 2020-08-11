/**
 * Converts a string into PascalCase.
 * 
 * @param {string} str String to convert to PascalCase
 * @returns {string} the input string in PascalCase
 */
export const toPascalCase = (str: string): string => {
  return str[0].toUpperCase() + str.substr(1);
};

/**
 * Converts a string into its pluralized version.
 * 
 * @param {string} str String to pluralize
 * @returns {string} the input string pluralized
 */
export const pluralize = (str: string): string => {
  return (str.endsWith('s'))? str : str + 's';
};