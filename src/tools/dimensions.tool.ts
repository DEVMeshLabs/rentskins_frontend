// eslint-disable-next-line prettier/prettier
import { Dispatch, SetStateAction } from 'react';

export default class Dimensions {
  public static setStatePerResolution(
    setPageState: Dispatch<SetStateAction<number>>,
    stateValues: [any, any, any, any, any],
  ) {
    const { innerHeight: height, innerWidth: width } = window

    if (width >= 2725 && height >= 1468) {
      setPageState(stateValues[0])
    } else if (
      width < 2725 &&
      width >= 2271 &&
      height < 1468 &&
      height >= 1223
    ) {
      setPageState(stateValues[1])
    } else if (
      width < 2271 &&
      width >= 1817 &&
      height < 1223 &&
      height >= 979
    ) {
      setPageState(stateValues[2])
    } else if (width < 1817 && width >= 1454 && height < 979 && height >= 783) {
      setPageState(stateValues[3])
    } else {
      setPageState(stateValues[4])
    }
  }
}
