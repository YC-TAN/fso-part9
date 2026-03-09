export const isNotNumber = (argument: any): boolean =>
  typeof argument !== 'number' || isNaN(argument);