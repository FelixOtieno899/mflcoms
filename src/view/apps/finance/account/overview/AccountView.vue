<template>
    <Main>
        <a-row :gutter="15">
            <a-col :xs="24">
                <BorderLessHeading>
                    <sdCards title="Account History">
                        <DataTables
                            :filterOption="true"
                            :filterOnchange="true"
                            :tableData="tableDataSource"
                            :columns="dataTableColumn"
                            :rowSelection="false"
                            @search="fetchAccounts"
                        />
                    </sdCards>
                </BorderLessHeading>
            </a-col>
        </a-row>
    </Main>
</template>

<script>
import { DataService } from "@/config/dataService/dataService";
import { defineComponent, ref, onMounted } from "vue";
import DataTables from "@/components/table/DataTable.vue";
import { BorderLessHeading } from "../../../../styled";
import { Main } from "../../../../styled";

const AccountView = defineComponent({
    name: "AccountView",
    components: {
        Main,
        DataTables,
        BorderLessHeading,
    },
    props: ["id"], // Accept the id prop

    setup(props) {
        const tableDataSource = ref([]);
        const dataTableColumn = ref([]);
        const formatNumberWithCommas = (value) => {
            const number = Number(value);
            if (isNaN(number)) {
                return value;
            }
            return new Intl.NumberFormat().format(number);
        };

        const fetchAccountDetails = async (accountId) => {
            try {
                const response = await DataService.get(`/account/${accountId}`);
                console.log("Details fetched of account", response.data);
                const accountDetails = response.data.Account;

                // Determine account type
                const isAccountsReceivable =
                    accountDetails.name === "Accounts Receivable(A/R)";
                const isCashAndEquivalents =
                    accountDetails.name === "Cash and cash equivalents";
                const isAccountsPayable =
                    accountDetails.name === "Accounts Payable(A/P)";

                const isInventory = accountDetails.name === "Inventory";

                if (isAccountsReceivable) {
                    // Define columns for Accounts Receivable
                    dataTableColumn.value = [
                        { title: "Date", dataIndex: "date", key: "date" },
                        { title: "Ref No", dataIndex: "ref_no", key: "ref_no" },
                        {
                            title: "Payee Account",
                            dataIndex: "payee_account",
                            key: "payee_account",
                        },
                        {
                            title: "Charge/Credit",
                            dataIndex: "charge_credit",
                            key: "charge_credit",
                        },
                        {
                            title: "Payment",
                            dataIndex: "payment",
                            key: "payment",
                        },
                        {
                            title: "Open Balance",
                            dataIndex: "open_balance",
                            key: "open_balance",
                        },
                    ];

                    // Fetch invoices related to the Accounts Receivable (A/R) account
                    const invoicesResponse = await DataService.get(
                        `/invoices/account/${accountId}`,
                    );
                    console.log(
                        "Details fetched of invoices",
                        invoicesResponse.data.Invoices,
                    );

                    tableDataSource.value = invoicesResponse.data.Invoices.map(
                        (invoice) => {
                            let open_balance =
                                invoice.payment_status === "paid"
                                    ? invoice.client
                                        ? invoice.client.opening_balance
                                        : 0
                                    : invoice.total_amount;

                            return {
                                key: invoice.id,
                                date: invoice.invoice_date || "N/A",
                                ref_no: invoice.invoice_number,
                                payee_account:
                                    invoice.client && invoice.client.user
                                        ? `${invoice.client.user.first_name} ${invoice.client.user.last_name}`
                                        : "Unknown",
                                charge_credit: formatNumberWithCommas(invoice.total_amount),
                                payment:
                                    invoice.payment_status === "paid"
                                        ? formatNumberWithCommas(invoice.total_amount)
                                        : 0,
                                open_balance: (
                                    <span style="text-align: right">
                                        {formatNumberWithCommas(open_balance)}
                                    </span>
                                ),
                            };
                        },
                    );

                    console.log(
                        "Formatted table data for AR",
                        tableDataSource.value,
                    );
                } else if (isCashAndEquivalents) {
                    // Define columns for Cash and Cash Equivalents
                    dataTableColumn.value = [
                        { title: "Date", dataIndex: "date", key: "date" },
                        { title: "Ref No", dataIndex: "ref_no", key: "ref_no" },
                        {
                            title: "Payee Account",
                            dataIndex: "payee_account",
                            key: "payee_account",
                        },
                        {
                            title: "Payment",
                            dataIndex: "payment",
                            key: "payment",
                        },
                        {
                            title: "Deposit",
                            dataIndex: "deposit",
                            key: "deposit",
                        },
                        {
                            title: "Balance",
                            dataIndex: "balance",
                            key: "balance",
                        },
                    ];

                    // Fetch invoices related to the Cash and Cash Equivalents
                    const invoicesBillsResponse = await DataService.get(
                        `/bills/invoices/account/${accountId}`,
                    );

                    console.log(
                        "Details fetched of for Cash and Cash Equivalents",
                        invoicesBillsResponse.data,
                    );

                    const invoices = invoicesBillsResponse.data.Invoices;
                    const bills = invoicesBillsResponse.data.Bills;

                    // Merge and format the data for the table
                    tableDataSource.value = [
                        ...bills
                            .filter((bill) => bill.status === "paid")
                            .map((bill) => ({
                                key: `bill-${bill.id}`,
                                date: bill.bill_date || "N/A",
                                ref_no: bill.bill_no,
                                payee_account: bill.supplier
                                    ? `${bill.supplier.title} ${bill.supplier.first_name} ${bill.supplier.last_name}`
                                    : "Unknown",
                                payment: formatNumberWithCommas(bill.total_amount) || 0,
                                deposit: 0,
                                balance: (
                                    <span style="text-align: right">
                                        {formatNumberWithCommas(invoicesBillsResponse.data.Account
                                            .opening_balance) || 0}
                                    </span>
                                ),
                            })),
                        ...invoices
                            .filter(
                                (invoice) => invoice.payment_status === "paid",
                            )
                            .map((invoice) => ({
                                key: `invoice-${invoice.id}`,
                                date: invoice.invoice_date || "N/A",
                                ref_no: invoice.invoice_number,
                                payee_account:
                                    invoice.client && invoice.client.user
                                        ? `${invoice.client.user.first_name} ${invoice.client.user.last_name}`
                                        : "Unknown",
                                payment: 0,
                                deposit: formatNumberWithCommas(invoice.total_amount) || 0,
                                balance: (
                                    <span style="text-align: right">
                                        {formatNumberWithCommas(invoicesBillsResponse.data.Account
                                            .opening_balance) || 0}
                                    </span>
                                ),
                            })),
                    ];

                    console.log(
                        "Formatted table data for Cash and Cash Equivalents",
                        tableDataSource.value,
                    );
                } else if (isAccountsPayable) {
                    // Define columns for accounts payable
                    dataTableColumn.value = [
                        { title: "Date", dataIndex: "date", key: "date" },
                        { title: "Ref No", dataIndex: "ref_no", key: "ref_no" },
                        {
                            title: "Payee Account",
                            dataIndex: "payee_account",
                            key: "payee_account",
                        },
                        {
                            title: "Due Date",
                            dataIndex: "due_date",
                            key: "due_date",
                        },
                        { title: "Billed", dataIndex: "billed", key: "billed" },
                        { title: "Paid", dataIndex: "paid", key: "paid" },
                        {
                            title: "Open Balance",
                            dataIndex: "open_balance",
                            key: "open_balance",
                        },
                    ];

                    // Fetch bills related to the Accounts Payable (A/P) account
                    const billsResponse = await DataService.get(
                        `/bills/account/${accountId}`,
                    );
                    console.log(
                        "Details fetched of  bills of accounts payable",
                        billsResponse.data,
                    );

                    // Display  bills for accounts payable
                    tableDataSource.value = billsResponse.data.bills.map(
                        (bill) => ({
                            key: bill.id,
                            date: bill.bill_date,
                            ref_no: bill.bill_no,
                            payee_account: bill.supplier
                                ? `${bill.supplier.title} ${bill.supplier.first_name} ${bill.supplier.last_name}`
                                : "Unknown",
                            due_date: bill.due_date,
                            billed: formatNumberWithCommas(bill.total_amount),
                            paid:
                                bill.status === "paid" ? formatNumberWithCommas(bill.total_amount) : 0,
                            open_balance: (
                                <span style="text-align: right">
                                    {bill.status !== "paid"
                                        ? formatNumberWithCommas(bill.total_amount)
                                        : 0}
                                </span>
                            ),
                        }),
                    );

                    console.log(
                        "Formatted table data for accounts payable",
                        tableDataSource.value,
                    );
                }

                else if (isInventory) {
                // Define columns for inventory
                dataTableColumn.value = [
                    { title: "Date", dataIndex: "date", key: "date" },
                    { title: "Ref No", dataIndex: "ref_no", key: "ref_no" },
                    {
                        title: "Payee Account",
                        dataIndex: "payee_account",
                        key: "payee_account",
                    },
                    {
                        title: "Memo",
                        dataIndex: "memo",
                        key: "memo",
                    },
                    { title: "Decrease", dataIndex: "decrease", key: "decrease" },
                    { title: "Increase", dataIndex: "increase", key: "increase" },
                    {
                        title: "Balance",
                        dataIndex: "balance",
                        key: "balance",
                    },
                ];

                // Fetch bills related to the Inventory account
                const billsResponse = await DataService.get(`/bills/account_inventory/${accountId}`);
                console.log("Details fetched of bills for inventory", billsResponse.data);

                const fuelTransactions = billsResponse.data.fuel_transactions;
                const billsInventories = billsResponse.data.bills;
                const AccountDetail = billsResponse.data.Account;
                
                console.log("Inventory account detail",AccountDetail);

                // Group fuel transactions by truck_id and aggregate total_cost and reference_number
                const aggregatedFuelTransactions = fuelTransactions.reduce((acc, transaction) => {
                    const truckId = transaction.truck_id;
                    if (!acc[truckId]) {
                        acc[truckId] = {
                            ...transaction,
                            total_cost: parseFloat(transaction.total_cost),
                            reference_number: transaction.reference_number, // Use the first reference number encountered
                        };
                    } else {
                        acc[truckId].total_cost += parseFloat(transaction.total_cost);
                    }
                    return acc;
                }, {});

                // Convert the aggregated object back to an array
                const aggregatedFuelTransactionsArray = Object.values(aggregatedFuelTransactions);

                // Display data for inventory
                tableDataSource.value = [
                    ...billsInventories.map((bill) => ({
                        key: bill.id,
                        date: bill.bill_date,
                        ref_no: bill.bill_no,
                        payee_account: bill.supplier
                            ? `${bill.supplier.title} ${bill.supplier.first_name} ${bill.supplier.last_name}`
                            : "Unknown",
                        memo: <span>Fuel</span>,
                        decrease: <span></span>,
                        increase: <span>{formatNumberWithCommas(bill.total_amount)}</span>,
                        balance: (
                            <span style="text-align: right">
                                {formatNumberWithCommas(bill.inventory_opening_balance)}
                            </span>
                        ),
                    })),
                    ...aggregatedFuelTransactionsArray.map((transaction) => ({
                        key: transaction.id,
                        date: <span>{transaction.transaction_date}</span>,
                        ref_no: <span>{transaction.reference_number}</span>, // Use the representative reference number
                        payee_account: transaction.supplier
                            ? `${transaction.supplier.title} ${transaction.supplier.first_name} ${transaction.supplier.last_name}`
                            : "Unknown",
                        memo: <span>Fuel</span>,
                        decrease: <span>{formatNumberWithCommas(transaction.total_cost)}</span>,
                        increase: <span></span>,
                        balance: (
                            <span style="text-align: right">
                                {formatNumberWithCommas(transaction.inventory_opening_balance)}
                            </span>
                        ),
                    })),
                ];

                console.log("Formatted table data for other accounts", tableDataSource.value);
            }
                
                else {
                    // Define columns for other account types
                    dataTableColumn.value = [
                        { title: "Date", dataIndex: "date", key: "date" },
                        { title: "Ref No", dataIndex: "ref_no", key: "ref_no" },
                        {
                            title: "Payee Account",
                            dataIndex: "payee_account",
                            key: "payee_account",
                        },
                        { title: "Memo", dataIndex: "memo", key: "memo" },
                        {
                            title: "Due Date",
                            dataIndex: "due_date",
                            key: "due_date",
                        },
                        { title: "Billed", dataIndex: "billed", key: "billed" },
                        { title: "Paid", dataIndex: "paid", key: "paid" },
                        {
                            title: "Open Balance",
                            dataIndex: "open_balance",
                            key: "open_balance",
                        },
                    ];

                    console.log(
                        "accountDetails to be shown for other accounts",
                        accountDetails,
                    );
                    console.log("Bills:", accountDetails.bills);

                    // For other account types, display bills
                    tableDataSource.value = accountDetails.bills.map(
                        (bill) => ({
                            key: bill.id,
                            date: bill.bill_date,
                            ref_no: bill.bill_no,
                            payee_account: bill.supplier
                                ? `${bill.supplier.title} ${bill.supplier.first_name} ${bill.supplier.last_name}`
                                : "Unknown",
                            memo: bill.note,
                            due_date: bill.due_date,
                            billed: formatNumberWithCommas(bill.total_amount),
                            paid:
                                bill.status === "paid" ? formatNumberWithCommas(bill.total_amount) : 0,
                            open_balance:
                                bill.status !== "paid" ? formatNumberWithCommas(bill.total_amount) : 0,
                        }),
                    );

                    console.log(
                        "Formatted table data for other accounts",
                        tableDataSource.value,
                    );
                }
            } catch (error) {
                console.error("Error fetching account details:", error);
                if (error.response) {
                    console.error("Error response:", error.response);
                }
            }
        };

        onMounted(async () => {
            await fetchAccountDetails(props.id);
        });

        return {
            tableDataSource,
            dataTableColumn,
        };
    },
});

export default AccountView;
</script>
