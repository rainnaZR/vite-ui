import { PublicProps } from "../types";
import { FormPageData } from "../HtFormPage/types";

export interface LoginPwdData {
  formData: FormPageData; // 表单数据
}

export type Props = PublicProps<{
  data: LoginPwdData;
}>;
