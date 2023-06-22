import React from "react";

import style from "./bar.module.css";

type BarDisplayProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  // isSelected: boolean;
  /* progress start point */
  progressX: number;
  progressWidth: number;
  barCornerRadius: number;
  styles: {
    backgroundColor: string;
    backgroundSelectedColor: string;
    progressColor: string;
    progressSelectedColor: string;
  };
  bizState?: number;
  bizType?: number;
  onMouseDown: (event: React.MouseEvent<SVGPolygonElement, MouseEvent>) => void;
};
export const BarDisplay: React.FC<BarDisplayProps> = ({
  x,
  y,
  width,
  height,
  // isSelected,
  progressX,
  progressWidth,
  barCornerRadius,
  styles,
  onMouseDown,
  bizState,
  bizType,
}) => {
  y = y + 8;
  const getProcessColor = () => {
    // 1灰色(未开始) 2蓝色(进行中) 3绿色(已完成) 4橙色(到期未完成)
    switch (bizState) {
      case 1:
        return "#AFAFAF";
      case 2:
        return "#3A5FFF";
      case 3:
        return "#31AE00";
      case 4:
        return "#FF9200";
      default:
        return "#AFAFAF";
    }
    // return isSelected ? styles.progressSelectedColor : styles.progressColor;
  };

  const getBarColor = () => {
    // return isSelected ? styles.backgroundSelectedColor : styles.backgroundColor;
    return styles.backgroundColor;
  };

  return (
    <g onMouseDown={onMouseDown}>
      <rect
        x={x}
        width={width}
        y={y}
        height={height}
        ry={barCornerRadius}
        rx={barCornerRadius}
        fill={getBarColor()}
        className={style.barBackground}
      />
      <rect
        x={progressX}
        width={progressWidth}
        y={y}
        height={height}
        ry={barCornerRadius}
        rx={barCornerRadius}
        fill={getProcessColor()}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 12 12"
        className="icon_need"
        x={x + 4}
        y={y + 4}
        width="12"
        height="12"
      >
        {bizType === 1 ? (
          <g stroke="#FFF" strokeWidth="1.2" fill="none" fillRule="evenodd">
            <path
              d="M3.5005092,0.599999931 C4.17544088,0.599676083 4.80630685,0.826276288 5.30680208,1.21434786 C5.80341267,1.59940739 6.17162581,2.14369658 6.32458785,2.7821495 C6.47696657,3.41822293 6.39532339,4.06372581 6.12628809,4.62274802 C5.80685962,5.28648103 5.22375768,5.82799735 4.45569233,6.0911143 L4.45569233,6.0911143 L4.45535935,6.70639007 L2.73878899,6.94638757 L2.4259709,6.04751375 C1.71672019,5.77096855 1.1772401,5.25176385 0.874527838,4.62280398 C0.605491041,4.06381324 0.523824173,3.41834341 0.676170028,2.78228422 C0.829076272,2.14385195 1.19722829,1.59957347 1.69378483,1.21449675 C2.19423811,0.826398134 2.82507528,0.59975017 3.5005092,0.599999931 Z"
              transform="translate(2.999213 1)"
            />
            <path
              d="M1.95962489 8.75012275L5.08407392 8.75012275"
              transform="translate(2.999213 1)"
            />
          </g>
        ) : (
          <g fill="#FFF" fillRule="evenodd">
            <path
              d="M0.999990845 2.13335937L2.00004028 2.13335937 2.00004028 0 0.999990845 0z"
              transform="translate(2 2)"
            />
            <path
              d="M6.00003296 2.13335937L7.0000238 2.13335937 7.0000238 0 6.00003296 0z"
              transform="translate(2 2)"
            />
            <path
              d="M0,8 L8,8 L8,1.06665625 L0,1.06665625 L0,8 Z M5.75351425,2.6666875 L3.64248269,4.91784375 L2.45751127,3.6533125 L1.74997665,4.40746875 L2.93551937,5.672 L2.92500179,5.68371875 L3.63200905,6.43785938 L6.46047758,3.42078125 L5.75351425,2.6666875 Z"
              transform="translate(2 2)"
            />
          </g>
        )}
      </svg>
    </g>
  );
};
