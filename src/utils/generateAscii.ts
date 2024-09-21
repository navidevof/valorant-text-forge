import { IBoardData } from "@/interfaces/board";

export const generateAscii = ({
  board,
  selectedData,
  isInverted,
}: {
  board: IBoardData[][];
  selectedData: IBoardData[];
  isInverted?: boolean;
}) => {
  const pixelOff = !isInverted ? '░' : '█';
  const pixelOn = !isInverted ? '█' : '░';

  let output = '';

  board.forEach((row) => {
    row.forEach((data) => {
      const isSelected = selectedData.find(d => d.row === data.row && d.col === data.col);
      const char = isSelected ? pixelOn : pixelOff;
      output += char;
    });
  });

  return output;
}