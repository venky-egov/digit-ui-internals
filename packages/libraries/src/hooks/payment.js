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
  const getPaymentData = async (egId) => {
    const transaction = await Digit.PaymentService.updateCitizenReciept(egId);
    const payments = await Digit.PaymentService.getReciept(transaction.Transaction[0].tenantId, "", {
      consumerCode: transaction.Transaction[0].consumerCode,
    });
    return payments;
  };

  return useQuery(["paymentUpdate", egId], () => getPaymentData(egId));
};
