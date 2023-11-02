interface SquareColors {
  background?: string;
  border?: string;
}

interface OwnProps {
  children: JSX.Element;
  colors?: SquareColors;
}
