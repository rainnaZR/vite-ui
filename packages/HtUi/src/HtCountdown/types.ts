import { PublicProps } from "../types";

export interface Detail {
  timestamp?: number;
  day?: number | string;
  hour?: number | string;
  minute?: number | string;
  second?: number | string;
}

export interface CountDownData {
  time: number | string; // 倒计时时间差值
  unit?: string; // 倒计时事件差值单位，可选值s(秒)，ms(毫秒)
}

export type Props = PublicProps<{
  data: CountDownData;
}>;
