import {
  getTheDistanceFromPointToLine,
  getTheDistanceOfAPointLineSegment,
  determineIfAPointIsWithinAnotherPointArea,
  getTheDistanceBetweenTwoPoints,
  getTheClosestPoint,
  obtainTheAngleBetweenTwoPointsAndTheXAxis, gettingPointsOnACircle, judgeWhetherThePointIsOnline
} from "../core/graphic";
import { Point } from '../core/graphic/Point';

test('getTheDistanceOfAPointLineSegment', () => {
  expect(getTheDistanceOfAPointLineSegment(new Point(-5, 0), new Point(0, 0), new Point(2, 0))).toBe(5);
});

test('getTheDistanceFromPointToLine', () => {
  expect(getTheDistanceFromPointToLine(new Point(-6, 1), new Point(0, 0), new Point(2, 0))).toBe(1);
});

test('determineIfAPointIsWithinAnotherPointArea', () => {
  expect(determineIfAPointIsWithinAnotherPointArea(new Point(1, 1), new Point(0, 0))).toBe(true);
});

/**
 * 两点间距离
 */
test('getTheDistanceBetweenTwoPoints', () => {
  expect(getTheDistanceBetweenTwoPoints(new Point(-1, 0), new Point(2, 4))).toBe(5);
});

/**
 * 获取两点与x轴的夹角
 */
test('obtainTheAngleBetweenTwoPointsAndTheXAxis', () => {
  expect(obtainTheAngleBetweenTwoPointsAndTheXAxis(new Point(0, 0), new Point(1, 1))).toBe(45);
});

/**
 * 获取最近的点
 */
test('getTheClosestPoint', () => {
  expect(getTheClosestPoint(new Point(0, 0), [new Point(1, 1), new Point(2, 0), new Point(1, 0)])).toEqual({
    index: 2,
    data: new Point(1, 0),
  });
});

/**
 * 获取圆上的点
 */
test('gettingPointsOnACircle',()=>{
  expect(gettingPointsOnACircle(new Point(0,0), 0, 5)).toEqual(new Point(5, 0))
})


/**
 * 判断点是否在线节点上
 */
test('judgeWhetherThePointIsOnline',()=>{
  expect(judgeWhetherThePointIsOnline(new Point(1, 3), [new Point(1,1), new Point(203,205)], 1)).toEqual({
    index: -1,
    data: new Point(0,0)
  })
})
