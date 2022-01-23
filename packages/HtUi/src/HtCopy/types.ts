import { PublicProps } from "../types";

export interface CopyData {
  buttonPosition?: string; // 复制按钮的位置：left, right, top, bottom
}

export type Props = PublicProps<{
  data: CopyData;
}>;
