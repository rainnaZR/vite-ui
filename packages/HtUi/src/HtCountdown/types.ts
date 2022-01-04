import { PublicProps } from "../types";

export interface Detail {
  timestamp?: number;
  day?: number | string;
  hour?: number | string;
  minute?: number | string;
  second?: number | string;
}

export interface CountDownData {
  time: number | string;
  unit?: string;
}

export type Props = PublicProps<{
  data: CountDownData;
}>;
