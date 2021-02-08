import { useQuery, useQueryClient } from "react-query";

export const useFetchCitizenBillsForBuissnessService = ({ businessService }) => {
  const queryClient = useQueryClient();
  console.log(Digit.UserService.getUser().info);
  const { mobileNumber, tenantId } = Digit.UserService.getUser().info;
  const { isLoading, error, isError, data } = useQuery(["citizenBillsForBuisnessService", businessService], () =>
    Digit.PaymentService.fetchBill(tenantId, { mobileNumber, businessService })
  );
  return { isLoading, error, isError, data, revalidate: () => queryClient.invalidateQueries(["citizenBillsForBuisnessService", businessService]) };
};

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
      consumerCodes: transaction.Transaction[0].consumerCode,
    });
    return payments;
  };

  return useQuery(["paymentUpdate", egId], () => getPaymentData(egId));
};
