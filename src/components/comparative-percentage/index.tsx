import { Tooltip } from "@mui/material";
import { percentageDifference } from "../../utils";
import styles from "./styles.module.css";

type ComparativePercentageProps = {
  currentValue: number;
  lastValue: number;
};

export function ComparativePercentage({ currentValue, lastValue }: ComparativePercentageProps) {

  if (currentValue < lastValue) {
    const value = percentageDifference(currentValue, lastValue);
    return (
      <Tooltip title="Comparado ao último período">
        <span className={styles.negative}>
          -{value}%
        </span>
      </Tooltip>
    );
  }

  if (currentValue > lastValue) {
    const value = percentageDifference(currentValue, lastValue);
    return (
      <Tooltip title="Comparado ao último período">
        <span className={styles.positive}>
          +{value}%
        </span >
      </Tooltip>
    );
  }
}