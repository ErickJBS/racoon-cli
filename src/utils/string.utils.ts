export const toPascalCase = (str: string) => {
  return str[0].toUpperCase() + str.substr(1);
};

export const pluralize = (str: string) => {
  return (str.endsWith('s'))? str : str + 's';
};