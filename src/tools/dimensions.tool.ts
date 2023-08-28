// eslint-disable-next-line prettier/prettier
import { Dispatch, SetStateAction } from 'react';

export default class Dimensions {
  public static setStatePerResolution(
    setPageState: Dispatch<SetStateAction<number>>,
    stateValues: [any, any, any, any, any, any, any],
  ) {
    const { innerWidth: width } = window

    if (width >= 2048) {
      setPageState(stateValues[0])
    } else if (width >= 1792) {
      setPageState(stateValues[1])
    } else if (width >= 1536) {
      setPageState(stateValues[2])
    } else if (width >= 1280) {
      setPageState(stateValues[3])
    } else if (width >= 1024) {
      setPageState(stateValues[4])
    } else if (width >= 768) {
      setPageState(stateValues[5])
    } else {
      setPageState(stateValues[6])
    }
  }
}
