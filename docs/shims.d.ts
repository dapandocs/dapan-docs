import { AttributifyAttributes } from "windicss/types/jsx";
declare module "react" {
  interface HTMLAttributes<T> extends AttributifyAttributes {}
}
declare module '@vue/runtime-dom' {
  interface HTMLAttributes extends AttributifyAttributes {}
}