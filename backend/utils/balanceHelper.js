export const getBalanceField = (payment) => {
  if (payment === "cash") {
    return "cashBalance";
  }

  if (payment === "gpay" || payment === "phonepe" || payment === "debit_card") {
    return "onlineBalance";
  }

  return null;
};
