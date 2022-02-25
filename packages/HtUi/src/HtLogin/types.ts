import { PublicProps } from "../types";
import { TabData } from "../HtTab/types";
import { FormPageData } from "../HtFormPage/types";

export interface LoginData {
  tabData?: TabData; // 登录tab切换数据
  currentType: string; // 当前登录类型
  passwordFormData?: FormPageData; // 密码类型表单数据
  verifyImgUrl?: string; // 图形验证码地址
}

export type Props = PublicProps<{
  data: LoginData;
}>;
