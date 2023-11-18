import { CircularProgress } from "@mui/material";
import { useContext, useEffect } from "react";
import { useQuery } from "react-query";
import { ComparativePercentage } from "..";
import { token } from "../../config";
import { ListContext } from "../../contexts";
import styles from "./style.module.css";

export function RepresentativeSalesIndicator() {
  const { getSalesIndicator, currentRepresentative, daysToSubtract } = useContext(ListContext);
  const { data, isLoading, refetch } = useQuery(["salesIndicators", currentRepresentative?.agentCode], {
    queryFn: async () => await getSalesIndicator({ authorization: token, days_to_subtract: daysToSubtract }),
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 5
  });

  function formatCurrency(value: number) {
    return new Intl.NumberFormat("pt-br", { currency: "BRL" }).format(value);
  }

  useEffect(() => {
    refetch();
  }, [daysToSubtract, refetch]);

  return (
    <>
      {isLoading ? (
        <div className={styles.loaderWrapper}>
          <CircularProgress />
        </div>
      ) :
        <div className={styles.contentWrapper}>
          <div className={styles.content}>
            <h2>Período atual</h2>
            <div className={styles.cardsWrapper}>
              <div className={styles.card}>
                <h3>Quantidade de pedidos</h3>
                <div className={styles.numbersContainer}>
                  <p className={styles.orderValue}>{data?.current.quantityOfOrders}</p>
                  <ComparativePercentage currentValue={data?.current.quantityOfOrders as number} lastValue={data?.lastPeriod.quantityOfOrders as number} />
                </div>
              </div>
              <div className={styles.card}>
                <h3>Items vendidos</h3>
                <div className={styles.numbersContainer}>
                  <p className={styles.orderValue}>{data?.current.itemsSold}</p>
                  <ComparativePercentage currentValue={data?.current.itemsSold as number} lastValue={data?.lastPeriod.itemsSold as number} />
                </div>
              </div>
              <div className={styles.card}>
                <h3>Valor dos pedidos</h3>
                <div className={styles.numbersContainer}>
                  <p className={styles.orderValue}>R$ {formatCurrency(data?.current.ordersValue as number)}</p>
                  <ComparativePercentage currentValue={data?.current.ordersValue as number} lastValue={data?.lastPeriod.ordersValue as number} />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.content}>
            <h2>Último período</h2>
            <div className={styles.cardsWrapper}>
              <div className={styles.card}>
                <h3>Quantidade de pedidos</h3>
                <p className={styles.orderValue}>{data?.lastPeriod.quantityOfOrders}</p>
              </div>
              <div className={styles.card}>
                <h3>Items vendidos</h3>
                <p className={styles.orderValue}>{data?.lastPeriod.itemsSold}</p>
              </div>
              <div className={styles.card}>
                <h3>Valor dos pedidos</h3>
                <p className={styles.orderValue}>R$ {formatCurrency(data?.lastPeriod.ordersValue as number)}</p>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
}