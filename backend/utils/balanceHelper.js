export const getBalanceField = (payment) => {
  if (payment === "cash") {
    return "cashBalance";
  }

  if (payment === "gpay" || payment === "phonepe") {
    return "onlineBalance";
  }

  return null;
};
