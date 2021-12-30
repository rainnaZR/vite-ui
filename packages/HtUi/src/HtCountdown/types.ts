import { PublicProps } from "../types";

export interface Result {
  timestamp: number;
  day: number | string;
  hour: number | string;
  minute: number | string;
  second: number | string;
}

export type Props = PublicProps<{
  time: number;
}>;
