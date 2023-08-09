import { useEffect, useRef } from "react";
import { isEqual } from "lodash-es";

/**
 * 一个自定义 hook，模仿 useEffect 的行为，但在检查依赖项变化时使用深度比较
 * 而不是引用相等性。
 *
 * @param {Function} effect - 当依赖项发生变化时要运行的效果回调。
 * @param {Array} deps - 要监视变化的依赖项列表。
 */
const useDeepCompareEffect = (effect, deps) => {
  // 一个 ref 用于存储上一次的依赖项
  const ref = useRef();

  // 一个 ref 用于存储信号值。每当依赖项发生变化时，
  // 该值都会增加，从而触发 useEffect。
  const signalRef = useRef(0);

  // 使用深度比较检查依赖项是否为 undefined 或是否已更改
  if (deps === undefined || !isEqual(deps, ref.current)) {
    // 更新存储的依赖项
    ref.current = deps;
    // 递增信号值
    signalRef.current += 1;
  }

  // 使用标准的 useEffect hook，但依赖于信号值
  // 这确保效果只在信号值变化时运行，
  // 也就是在依赖项变化时。
  useEffect(effect, [signalRef.current]);
};

// 导出自定义 hook
export default useDeepCompareEffect;
