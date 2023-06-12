import dayjs from "dayjs";

import { Task } from "../types/public-types";

/**
 * 定义原始数据结构
 * dates: [],
 *
 * data: [
 *  {
 *    name: '',
 *    hours: [],
 *    tasks: [[], [], [], []]
 *  },
 *  {
 *    name: '',
 *    hours: [],
 *    tasks: [[], [], [], []]
 *  }
 * ]
 *
 */
interface InitDataProp {
  start: string;
  end: string;
}

export function getGroupRows(
  data: InitDataProp[] & { [key in string]: any }[]
) {
  const groupArr: Task[][] = [];
  const widthArr: string[] = [];
  data.forEach((el, idx) => {
    const startPoint = el.start;
    const endPoint = el.end;
    const item = {
      ...el,
      start: new Date(startPoint),
      end: new Date(endPoint),
    } as unknown as Task;

    if (idx === 0) {
      // 第一个，直接添加
      groupArr[0] = [item];
      widthArr.push(endPoint);
    } else {
      let isNewLine = true;
      // 循环已存在行数，寻找最小坐标，若没有，另起一行
      for (let wIndex = 0; wIndex < widthArr.length; wIndex++) {
        const offsetDate = widthArr[wIndex];
        const isAfter = dayjs(startPoint).isAfter(dayjs(offsetDate));
        if (isAfter) {
          groupArr[wIndex].push(item);
          widthArr[wIndex] = endPoint;
          isNewLine = false;
          break;
        }
      }
      if (isNewLine) {
        const groupIdx = groupArr.length;
        groupArr[groupIdx] = [item];
        widthArr.push(endPoint);
      }
    }
  });
  return groupArr;
}
