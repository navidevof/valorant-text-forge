export const addLineBreaks = (text: string, lineLength: number) => {
  const regex = new RegExp(`(.{1,${lineLength}})`, 'g');
  return text.replace(regex, '$1\n');
};