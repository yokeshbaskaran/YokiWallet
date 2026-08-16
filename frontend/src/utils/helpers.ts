//Types
export type TransactionType = {
    _id: string;
    type: "income" | "expense";
    amount: number;
    category: string;
    payment: string;
    date: string;
    notes?: string;
};


//datas for Categories
// Expense Categories
export const expenseCategories = [
    { label: "Dress & Accessories 👕", value: "dress_accessories" },
    { label: "Petrol / Diesel ⛽", value: "petrol_diesel" },
    { label: "Food & Snacks 🍔", value: "food_snacks" },
    { label: "Entertainment - Movie 🎬", value: "entertainment_movie" },
    { label: "Withdraw Money 💳", value: "withdraw_money" },
    { label: "Bought Accessories 🛍️", value: "bought_accessories" },
    { label: "Grocery shopping 🧺", value: "groceries" },
    { label: "Online Web Shopping 🛒", value: "online_web_shopping" },
    { label: "Amount lent 🚨", value: "amount_lent" },
    { label: "Maintenance & Repair 🧰", value: "maintenance_repair" },
    { label: "Recharge 📱", value: "recharge" },
    { label: "Bills 💡🧾", value: "bills" },
    { label: "Travel 🚕", value: "travel" },
    { label: "Medical 💊", value: "medical" },
    { label: "Others 🛒", value: "others" },
];

// Income Categories
export const incomeCategories = [
    { label: "Salary 💼", value: "salary" },
    { label: "Service charge 🛠️", value: "service_charge" },
    { label: "Lent Amount 💵", value: "lent_amount" },
    { label: "Cashback 💰", value: "cashback" },
    { label: "Interest 🏦", value: "interest" },
    { label: "Freelancing 🧑‍💻", value: "freelancing" },
    { label: "Others 🪙", value: "others" },
];


// Get category label from value
export const getCategoryLabel = (category: string, type: "income" | "expense") => {
    const categories = type === "expense" ? expenseCategories : incomeCategories;

    return categories.find((item) => item.value === category)?.label || category;
};

//for expense page
export const payments = [
    { label: "Cash in hand 💵", value: "cash" },
    { label: "Google Pay (GPay) 🔵📱", value: "gpay" },
    { label: "PhonePe 🟣📱", value: "phonepe" },
    { label: "Debit card 💳", value: "debit_card" },
];

// Get payment type for Single transaction
export const getPaymentLabel = (payment: string) => {
    const paymentLabels: Record<string, string> = {
        debit_card: "Debit Card 💳",
        phonepe: "PhonePe 🟣📱",
        gpay: "GPay 🔵📱",
        cash: "Cash 💵",
    };
    // console.log("payment-type:", payment);
    return paymentLabels[payment] || payment;
};




























