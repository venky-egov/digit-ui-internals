import { useQuery, useQueryClient } from "react-query";

export const useFetchPayment = ({ tenantId, consumerCode, businessService }) => {
  const queryClient = useQueryClient();
  const { isLoading, error, isError, data } = useQuery(["paymentFetchDetails", tenantId, consumerCode, businessService], () =>
    Digit.PaymentService.fetchBill(tenantId, { consumerCode, businessService })
  );

  return {
    isLoading,
    error,
    isError,
    data,
    revalidate: () => queryClient.invalidateQueries(["paymentFetchDetails", tenantId, consumerCode, businessService]),
  };
};

export const usePaymentUpdate = ({ egId }) => {
  return useQuery(["paymentUpdate", egId], () => Digit.PaymentService.updateCitizenReciept(egId));
};
