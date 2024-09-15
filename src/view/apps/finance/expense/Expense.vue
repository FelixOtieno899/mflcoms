<template>
    <Main>
        <a-row :gutter="15">
            <a-col :xs="24">
                <BorderLessHeading>
                    <sdCards title="Manage Expenses">
                        <a-row>
                            <a-col
                                style="display: flex; justify-content: flex-end"
                                :span="24"
                            >
                                <a-button
                                    style="margin-top: -30px"
                                    type="primary"
                                    @click="showDrawer"
                                >
                                    <template #icon><PlusOutlined /></template>
                                    + Add New
                                </a-button>

                                <a-drawer
                                    title="Expense"
                                    :width="drawerWidth"
                                    :height="700"
                                    :visible="openExpenseDrawer"
                                    :placement="placement1"
                                    :body-style="{ paddingBottom: '80px' }"
                                    :footer-style="{ textAlign: 'right' }"
                                    @close="() => (openExpenseDrawer = false)"
                                >
                                    <template v-if="isLoading">
                                        <a-space class="loading">
                                            <a-spin size="large" />
                                        </a-space>
                                    </template>

                                    <template v-else>
                                        <form
                                            :model="formState2"
                                            layout="vertical"
                                        >
                                            <section class="wrapper-invoice">
                                                <!-- switch mode rtl by adding class rtl on invoice class -->
                                                <div class="invoice">
                                                    <div
                                                        class="invoice-information"
                                                    >
                                                        <div
                                                            class="invoice-logo-brand"
                                                        >
                                                            Payment Account:
                                                            <select
                                                                v-model="
                                                                    formState2.account_id
                                                                "
                                                            >
                                                                <option
                                                                    value=""
                                                                >
                                                                    Select an
                                                                    account
                                                                </option>
                                                                <template
                                                                    v-if="
                                                                        Accounts
                                                                    "
                                                                >
                                                                    <option
                                                                        v-for="account in Accounts"
                                                                        :key="
                                                                            account.id
                                                                        "
                                                                        :value="
                                                                            account.id
                                                                        "
                                                                    >
                                                                        {{
                                                                            account.name
                                                                        }}
                                                                    </option>
                                                                </template>
                                                                <template
                                                                    v-else
                                                                >
                                                                    <option
                                                                        disabled
                                                                    >
                                                                        No
                                                                        accounts
                                                                        available
                                                                    </option>
                                                                </template>
                                                            </select>
                                                        </div>
                                                        <p
                                                            style="
                                                                margin-top: 15px;
                                                            "
                                                        >
                                                            Balance:Ksh
                                                            <input
                                                                style="
                                                                    width: 100px;
                                                                "
                                                                class="input-data"
                                                                type="text"
                                                                v-model="
                                                                    accountBalance.balance
                                                                "
                                                                readonly
                                                            />
                                                        </p>

                                                        <p>
                                                            Payment method:
                                                            <select
                                                                v-model="
                                                                    formState2.payment_method
                                                                "
                                                            >
                                                                <option
                                                                    value=""
                                                                >
                                                                    What did you
                                                                    pay with?
                                                                </option>
                                                                <option
                                                                    value="Cash"
                                                                >
                                                                    Cash
                                                                </option>
                                                                <option
                                                                    value="Cheque"
                                                                >
                                                                    Cheque
                                                                </option>
                                                                <option
                                                                    value="Credit Card"
                                                                >
                                                                    Credit Card
                                                                </option>
                                                                <option
                                                                    value="Direct Debit"
                                                                >
                                                                    Direct Debit
                                                                </option>
                                                            </select>
                                                        </p>

                                                        <p
                                                            style="
                                                                margin-top: 50px;
                                                            "
                                                        >
                                                            Amount: Ksh

                                                            <input
                                                                readonly
                                                                style="
                                                                    outline: none;
                                                                "
                                                                class="input-data"
                                                                type="text"
                                                                v-model="
                                                                    formState2.total_amount
                                                                "
                                                            />
                                                        </p>
                                                    </div>
                                                    <!-- logo brand invoice -->
                                                    <p>Expense</p>
                                                    <div
                                                        class="invoice-logo-brand"
                                                    >
                                                        Payee:
                                                        <select
                                                            v-model="
                                                                formState2.payee_id
                                                            "
                                                            @change="
                                                                setPayeeType
                                                            "
                                                        >
                                                            <option value="">
                                                                Who did you pay?
                                                            </option>
                                                            <option
                                                                v-for="item in combinedList"
                                                                :key="item.id"
                                                                :value="item.id"
                                                            >
                                                                {{
                                                                    item.fullName
                                                                }}
                                                                ({{
                                                                    item.type
                                                                }})
                                                            </option>
                                                        </select>
                                                    </div>

                                                    <div
                                                        style="margin-top: 20px"
                                                    >
                                                        <p>
                                                            Payment Date :
                                                            <a-date-picker
                                                                v-model:value="
                                                                    formState2.payment_date
                                                                "
                                                                style="
                                                                    width: 30px;
                                                                    padding: 3px;
                                                                "
                                                                :get-popup-container="
                                                                    (trigger) =>
                                                                        trigger.parentElement
                                                                "
                                                            />
                                                        </p>

                                                        <p>
                                                            Ref_No:
                                                            <input
                                                                class="input-data"
                                                                type="text"
                                                                v-model="
                                                                    formState2.payment_ref_no
                                                                "
                                                            />
                                                        </p>
                                                    </div>

                                                    <p></p>

                                                    <div class="invoice-body">
                                                        <h4>
                                                            <p>
                                                                Category Details
                                                            </p>
                                                        </h4>
                                                        <table class="table">
                                                            <thead>
                                                                <tr>
                                                                    <th>
                                                                        Category
                                                                    </th>
                                                                    <th>
                                                                        Description
                                                                    </th>
                                                                    <th>
                                                                        Amount
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr
                                                                    v-for="(
                                                                        item,
                                                                        index
                                                                    ) in lineItems"
                                                                    :key="index"
                                                                >
                                                                    <td>
                                                                        <div>
                                                                            <select
                                                                                style="
                                                                                    border-radius: 5px;

                                                                                    margin-left: 5px;
                                                                                "
                                                                                class=""
                                                                                v-model="
                                                                                    item.category_account_id
                                                                                "
                                                                            >
                                                                                <option
                                                                                    value=""
                                                                                >
                                                                                    What
                                                                                    tax
                                                                                    category
                                                                                    fits?
                                                                                </option>
                                                                                <template
                                                                                    v-if="
                                                                                        Accounts2
                                                                                    "
                                                                                >
                                                                                    <option
                                                                                        v-for="account in Accounts2"
                                                                                        :key="
                                                                                            account.id
                                                                                        "
                                                                                        :value="
                                                                                            account.id
                                                                                        "
                                                                                    >
                                                                                        {{
                                                                                            account.name
                                                                                        }}
                                                                                    </option>
                                                                                </template>
                                                                                <template
                                                                                    v-else
                                                                                >
                                                                                    <option
                                                                                        disabled
                                                                                    >
                                                                                        No
                                                                                        categories
                                                                                    </option>
                                                                                </template>
                                                                            </select>
                                                                        </div>
                                                                    </td>

                                                                    <td
                                                                        style="
                                                                            text-align: center;
                                                                        "
                                                                    >
                                                                        <input
                                                                            style="
                                                                                width: 250px;
                                                                                height: 30px;
                                                                            "
                                                                            class="input-data"
                                                                            type="text"
                                                                            v-model="
                                                                                item.description
                                                                            "
                                                                            placeholder="What did you pay for?"
                                                                        />
                                                                    </td>

                                                                    <td>
                                                                        <div
                                                                            style="
                                                                                display: flex;
                                                                                justify-content: space-between;
                                                                            "
                                                                        >
                                                                            <input
                                                                                style="
                                                                                    width: 100px;
                                                                                "
                                                                                class="input-data"
                                                                                type="text"
                                                                                v-model="
                                                                                    item.amount
                                                                                "
                                                                            />
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <div
                                                            style="
                                                                margin-top: 15px;
                                                                display: flex;
                                                                justify-content: space-between;
                                                            "
                                                        >
                                                            <sdButton
                                                                size="small"
                                                                type="primary"
                                                                @click.prevent="
                                                                    addLineItem
                                                                "
                                                            >
                                                                + add New Line
                                                                Item
                                                            </sdButton>

                                                            <sdButton
                                                                size="small"
                                                                type="danger"
                                                                @click.prevent="
                                                                    removeLastLineItem
                                                                "
                                                            >
                                                                - remove Line
                                                                Item
                                                            </sdButton>
                                                        </div>
                                                        <br />
                                                        <br />

                                                        <h4>
                                                            <p>Item Details</p>
                                                        </h4>
                                                        <table class="table">
                                                            <thead>
                                                                <tr>
                                                                    <th>
                                                                        Product/Service
                                                                    </th>
                                                                    <th>
                                                                        Description
                                                                    </th>
                                                                    <th>Qty</th>
                                                                    <th>
                                                                        Price/Rate
                                                                    </th>
                                                                    <th>
                                                                        Amount
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr
                                                                    v-for="(
                                                                        item,
                                                                        index
                                                                    ) in lineItems2"
                                                                    :key="index"
                                                                >
                                                                    <td>
                                                                        <div>
                                                                            <select
                                                                                style="
                                                                                    border-radius: 5px;

                                                                                    width: 100px;
                                                                                    margin-left: 5px;
                                                                                "
                                                                                class=""
                                                                                v-model="
                                                                                    item.product_id
                                                                                "
                                                                            >
                                                                                <option
                                                                                    value=""
                                                                                >
                                                                                    Select
                                                                                    Product
                                                                                </option>
                                                                                <template
                                                                                    v-if="
                                                                                        Products
                                                                                    "
                                                                                >
                                                                                    <option
                                                                                        v-for="product in Products"
                                                                                        :key="
                                                                                            product.id
                                                                                        "
                                                                                        :value="
                                                                                            product.id
                                                                                        "
                                                                                    >
                                                                                        {{
                                                                                            product.name
                                                                                        }}
                                                                                    </option>
                                                                                </template>
                                                                                <template
                                                                                    v-else
                                                                                >
                                                                                    <option
                                                                                        disabled
                                                                                    >
                                                                                        No
                                                                                        products
                                                                                        available
                                                                                    </option>
                                                                                </template>
                                                                            </select>
                                                                        </div>
                                                                    </td>
                                                                    <td
                                                                        style="
                                                                            text-align: center;
                                                                        "
                                                                    >
                                                                        <input
                                                                            style="
                                                                                width: 250px;
                                                                                height: 30px;
                                                                            "
                                                                            class="input-data"
                                                                            type="text"
                                                                            v-model="
                                                                                item.description
                                                                            "
                                                                            placeholder="What did you pay for?"
                                                                        />
                                                                    </td>

                                                                    <td>
                                                                        <div
                                                                            style="
                                                                                display: flex;
                                                                                justify-content: space-between;
                                                                            "
                                                                        >
                                                                            <input
                                                                                style="
                                                                                    width: 80px;
                                                                                "
                                                                                class="input-data"
                                                                                type="text"
                                                                                v-model="
                                                                                    item.quantity
                                                                                "
                                                                            />
                                                                            <br />
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div
                                                                            style="
                                                                                display: flex;
                                                                                justify-content: space-between;
                                                                            "
                                                                        >
                                                                            <input
                                                                                style="
                                                                                    width: 100px;
                                                                                "
                                                                                class="input-data"
                                                                                type="text"
                                                                                v-model="
                                                                                    item.unit_price
                                                                                "
                                                                            />
                                                                        </div>
                                                                    </td>

                                                                    <td>
                                                                        <div
                                                                            style="
                                                                                display: flex;
                                                                                justify-content: space-between;
                                                                            "
                                                                        >
                                                                            <input
                                                                                style="
                                                                                    width: 120px;
                                                                                "
                                                                                class="input-data"
                                                                                type="text"
                                                                                v-model="
                                                                                    item.amount
                                                                                "
                                                                            />
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>

                                                        <div
                                                            style="
                                                                margin-top: 15px;
                                                                display: flex;
                                                                justify-content: space-between;
                                                            "
                                                        >
                                                            <sdButton
                                                                size="small"
                                                                type="primary"
                                                                @click.prevent="
                                                                    addLineItem2
                                                                "
                                                            >
                                                                + add New Line
                                                                Item
                                                            </sdButton>

                                                            <sdButton
                                                                size="small"
                                                                type="danger"
                                                                @click.prevent="
                                                                    removeLastLineItem2
                                                                "
                                                            >
                                                                - remove Line
                                                                Item
                                                            </sdButton>
                                                        </div>

                                                        <div
                                                            class="invoice-total-amount"
                                                        >
                                                            <p>
                                                                Total: Ksh
                                                                <input
                                                                    readonly
                                                                    style="
                                                                        outline: none;
                                                                    "
                                                                    class="input-data"
                                                                    type="text"
                                                                    v-model="
                                                                        formState2.total_amount
                                                                    "
                                                                />
                                                            </p>
                                                        </div>

                                                        <div
                                                            class="invoice-footer"
                                                        >
                                                            Notes:
                                                            <p>
                                                                <textarea
                                                                    style="
                                                                        width: 250px;
                                                                        height: 60px;
                                                                        border-radius: 5px;
                                                                    "
                                                                    class=""
                                                                    type="text"
                                                                    v-model="
                                                                        formState2.description
                                                                    "
                                                                />
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </section>

                                            <div
                                                style="
                                                    margin-left: 200px;
                                                    margin-top: 40px;
                                                "
                                                class="setting-form-actions"
                                            >
                                                <sdButton
                                                    size="small"
                                                    type="primary"
                                                    @click.prevent="
                                                        handleSubmitExpense
                                                    "
                                                >
                                                    Save
                                                </sdButton>

                                                &nbsp; &nbsp;
                                                <sdButton
                                                    size="small"
                                                    @click.prevent="
                                                        () =>
                                                            (openExpenseDrawer = false)
                                                    "
                                                    type="light"
                                                >
                                                    Cancel
                                                </sdButton>
                                            </div>
                                        </form>
                                    </template>
                                </a-drawer>
                            </a-col>
                        </a-row>
                        <DataTables
                            :filterOption="true"
                            :filterOnchange="true"
                            :tableData="tableDataScource"
                            :columns="dataTableColumn"
                            :rowSelection="false"
                            @search="fetchSuppliers"
                        />
                    </sdCards>
                </BorderLessHeading>
            </a-col>
        </a-row>
    </Main>
</template>

<script>
import { DataService } from "@/config/dataService/dataService";
import {
    defineComponent,
    reactive,
    ref,
    onMounted,
    computed,
    watch,
} from "vue";
import { Main } from "../../../styled";
import DataTables from "@/components/table/DataTable.vue";
import { BorderLessHeading } from "../../../styled";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

export default defineComponent({
    name: "Expense",
    components: {
        Main,
        DataTables,
        BorderLessHeading,
    },
    setup() {
        const { state } = useStore();
        const router = useRouter();
        const toast = useToast();
        const drawerWidth = ref("100vw");

        const isLoading = ref(false);
        const Accounts = ref([]);

        const Accounts2 = ref([]);

        const purchaseOrders = ref([]);

        const Products = ref([]);

        const Suppliers = ref([]);
        const clients = ref([]);

        const placement = ref("top");

        const placement1 = ref("bottom");

        const unitsOfMeasures = ref([]);

        const openExpenseDrawer = ref(false);

        const tableDataScource = ref([]);


        const canApprove = computed(() =>
            state.auth.permissions.includes("Expense.Approve"),
        );

        console.log("User Permissions:", state.auth.permissions);
        console.log("Can Approve:", canApprove.value);

        const fetchAllData = async () => {
            await Promise.all([fetchProducts(), fetchPaymentAccounts()]);
        };

        const fetchExpenses = async (name = null) => {
            try {
                isLoading.value = true;
                let response;

                if (name) {
                    // Call the searchExpenses method if name is provided
                    response = await searchExpenses(name);
                } else {
                    // Existing logic to fetch all expenses
                    response = await DataService.get("/expenses");
                    console.log("Expenses fetched", response.data);

                    if (response.status === 200) {
                        if (Array.isArray(response.data.Expenses)) {
                            // Format the data to match the structure expected by DataTables
                            tableDataScource.value = response.data.Expenses.map(
                                (expense) => {
                                    const categoryDetails =
                                        expense.category_details.map(
                                            (categoryDetail) => {
                                                // Find the matching account in Accounts2
                                                const account =
                                                    Accounts2.value.find(
                                                        (acc) =>
                                                            acc.id ===
                                                            categoryDetail.category_account_id,
                                                    );
                                                return account
                                                    ? account.name
                                                    : "Unknown Category";
                                            },
                                        );

                                    return {
                                        key: expense.id,
                                        date: (
                                            <span>{expense.payment_date}</span>
                                        ),
                                        type: <span>{}</span>,
                                        no: (
                                            <span>
                                                {expense.payment_ref_no}
                                            </span>
                                        ),
                                        payee: (
                                            <span>
                                                {expense.supplier
                                                    ? `${expense.supplier.title} ${expense.supplier.first_name} ${expense.supplier.last_name}`
                                                    : "Unknown Payee"}
                                            </span>
                                        ),
                                        category: (
                                            <span>
                                                {categoryDetails.join(", ")}
                                            </span>
                                        ),
                                        total_before_sales_tax:
                                            expense.total_amount,
                                        sales_tax: <span>{}</span>,
                                        total: expense.total_amount,
                                        approval_status: (
                                            <span
                                                class={`ninjadash-status ninjadash-status-${expense.status}`}
                                            >
                                                {expense.status}
                                            </span>
                                        ),
                                        user_has_approved:  expense.user_has_approved
                                    };
                                },
                            );

                            console.log(
                                "Whats inside this tabledatasource",
                                tableDataScource.value,
                            );
                        } else {
                            // No expenses found, handle accordingly
                            tableDataScource.value = [];
                        }
                    } else {
                        toast.error(
                            "Failed to fetch expenses. Please try again.",
                        );
                    }
                }
            } catch (error) {
                console.error("Error fetching expenses:", error);
                toast.error("An error occurred. Please try again.");
            } finally {
                isLoading.value = false;
            }
        };

        const searchExpenses = async (name) => {
            try {
                const response = await DataService.get(
                    `/expenses/search/${name}`,
                );
                if (
                    response.status === 200 &&
                    Array.isArray(response.data.Expenses)
                ) {
                    tableDataScource.value = response.data.Expenses.map(
                        (expense) => ({
                            key: expense.id,
                            date: <span>{expense.payment_date}</span>,
                            type: <span>{}</span>,
                            no: <span>{expense.payment_ref_no}</span>,
                            payee: (
                                <span>
                                    {expense.supplier.title}{" "}
                                    {expense.supplier.first_name}{" "}
                                    {expense.supplier.last_name}
                                </span>
                            ),
                            category: <span></span>,
                            total_before_sales_tax: expense.total_amount,
                            sales_tax: <span></span>,
                            total: expense.total_amount,
                            approval_status: (
                                <span
                                    class={`ninjadash-status ninjadash-status-${expense.status}`}
                                >
                                    {expense.status}
                                </span>
                            ),
                        }),
                    );
                } else {
                    tableDataScource.value = [];
                }
            } catch (error) {
                console.error("Error searching suppliers:", error);
                toast.error("An error occurred. Please try again.");
            }
        };

        const fetchProducts = async () => {
            try {
                const response = await DataService.get("/products");
                Products.value = response.data.Products;

                console.log("I am now receiving Products:", Products.value);
            } catch (error) {
                console.error("Error fetching products:", error);
                Products.value = []; // Ensure it's always an array, even on error
            }
        };

        const fetchClients = async () => {
            try {
                const response = await DataService.get(`/clients`);
                clients.value = response.data.Clients;

                console.log("Clients", clients.value);
            } catch (error) {
                console.error("Error fetching clients:", error);
            }
        };

        const fetchSuppliers = async () => {
            try {
                const response = await DataService.get(`/suppliers`);
                Suppliers.value = response.data.Suppliers;

                console.log("Suppliers", Suppliers.value);
            } catch (error) {
                console.error("Error fetching clients:", error);
            }
        };

        const fetchPaymentAccounts = async () => {
            try {
                const response = await DataService.get(`/accounts/payments`);
                console.log("Accounts fetched", response.data.Accounts);
                Accounts.value = response.data.Accounts;
            } catch (error) {
                console.error("Error fetching accounts:", error);
                if (error.response) {
                    console.error("Error response:", error.response);
                }
            }
        };

        const fetchCategoryAccountsForExpense = async () => {
            try {
                const response = await DataService.get(
                    `/accounts/categories/expenses`,
                );
                console.log(
                    "Accounts categories fetched",
                    response.data.Accounts,
                );
                Accounts2.value = response.data.Accounts;
            } catch (error) {
                console.error("Error fetching accounts:", error);
                if (error.response) {
                    console.error("Error response:", error.response);
                }
            }
        };

        const viewExpense = (expenseId) => {
            router.push(`/app/expense/${expenseId}`);
        };

        const editExpense = (expenseId) => {
            router.push(`/app/expense/edit/${expenseId}`);
        };

        const deleteExpense = async (expenseId) => {
            if (
                window.confirm(
                    "Are you sure you want to delete this expense? This action cannot be undone.",
                )
            ) {
                try {
                    await DataService.delete(`/expenses/${expenseId}`);
                    toast.success("Expense  deleted successfully.");
                    await fetchExpenses(); // Refresh the list
                } catch (error) {
                    toast.error("Failed to delete  expense. Please try again.");
                }
            }
        };

        const dataTableColumn = [
            // {
            //     title: "Id",
            //     dataIndex: "id",
            //     key: "id",
            // },
            {
                title: "Date",
                dataIndex: "date",
                key: "date",
            },

            {
                title: "Type",
                dataIndex: "type",
                key: "type",
            },

            {
                title: "No",
                dataIndex: "no",
                key: "no",
            },
            {
                title: "Payee",
                dataIndex: "payee",
                key: "payee",
            },
            {
                title: "Category",
                dataIndex: "category",
                key: "category",
            },
            {
                title: "Total Sales Before Tax",
                dataIndex: "total_before_sales_tax",
                key: "total_before_sales_tax",
            },
            {
                title: "Sales Tax",
                dataIndex: "sales_tax",
                key: "sales_tax",
            },
            {
                title: "Total",
                dataIndex: "total",
                key: "total",
            },

            {
                title: "Approval Status",
                dataIndex: "approval_status",
                key: "approval_status",
            },

            {
                title: "Actions",
                dataIndex: "action",
                key: "action",
                width: "90px",
                customRender: ({ record }) => {
                    const isApproved = record.user_has_approved;
                    return (
                        <div class="table-actions">
                            <button
                                style={`cursor: ${isApproved ? "not-allowed" : "pointer"}; background: ${isApproved ? "gray" : "green"}; border-radius: 10px; color: white; font-size: 12px`}
                                disabled={isApproved}
                                onclick={() => {
                                    if (!isApproved) {
                                        approveExpense(record.key);
                                    }
                                }}
                            >
                                {isApproved ? "Approved" : "Approve"}
                            </button>
                            <button
                                style="font-size: 12px; cursor: pointer"
                                class="delete"
                                onClick={() => viewExpense(record.key)}
                            >
                                <unicon name="eye"></unicon>
                            </button>

                            <select
                                style=" appearance: none;
                                    -webkit-appearance: none;
                                    -moz-appearance: none;
                                    padding: 2px;
                                    border: 1px solid #ccc;
                                    border-radius: 5px;
                                    background-color: #f8f8f8;
                                    font-size: 12px;
                                    width: 80px;
                                    margin-top: -20px
                                                     "
                                onChange={(event) =>
                                    handleActionChange(event, record.key)
                                }
                            >
                                <option value="">More Actions</option>
                                <option value="markAsPaid">
                                    Mark as paid
                                </option>

                                <option value="editExpense">Edit Expense</option>


                                <option value="delete">Make Inactive</option>
                            </select>
                           
                            <button
                                style="font-size: 12px; cursor: pointer"
                                class="delete"
                                onClick={() => deleteExpense(record.key)}
                            >
                                <unicon name="trash"></unicon>
                            </button>
                        </div>
                    );
                },
            },
        ];

        const handleActionChange = (event, key) => {
          console.log(key);
            const action = event.target.value;
            switch (action) {
                case "editExpense":
                   editExpense(key)
                    break;
                case "delete":
                    break;
                case "createBill":
                    break;
                default:
                    console.log("No action selected");
            }
        };

        const supplierDetails = reactive({
            title: "",
            first_name: "",
            last_name: "",
            company_name: "",
            address: "",
            city: "",
        });

        const supplierDetails2 = reactive({
            title: "",
            first_name: "",
            last_name: "",
            company_name: "",
            address: "",
            city: "",
        });

        const formState2 = reactive({
            account_id: "",
            supplier_id: "",
            client_id: "",
            payee_id: "",
            payee_type: "",
            total_amount: "",
            payment_method: "",
            payment_ref_no: "",
            description: "",
        });

        const accountBalance = reactive({
            balance: 0,
        });

        watch(
            () => formState2.account_id,
            (newVal) => {
                const selectedAccount = Accounts.value.find(
                    (account) => account.id === newVal,
                );
                if (selectedAccount) {
                    accountBalance.balance = selectedAccount.opening_balance;
                } else {
                    accountBalance.balance = "";
                }
            },
        );

        const open = ref(false);

        const showDrawer = () => {
            openExpenseDrawer.value = true;
        };
        const onClose = () => {
            open.value = false;
        };

        const onCloseExpenseDrawer = () => {
            openExpenseDrawer.value = false;
        };

        const lineItems = ref([
            {
                category_account_id: "",
                description: "",

                amount: 0,
            },
        ]);

        const lineItems2 = ref([
            {
                product_id: "",
                description: "",
                quantity: 0,
                unit_price: 0,
                amount: 0,
            },
        ]);

        const addLineItem = () => {
            lineItems.value.push({
                category_account_id: "",
                description: "",
                amount: 0,
            });

            console.log("New lineItems:", lineItems.value);
        };

        const addLineItem2 = () => {
            lineItems2.value.push({
                product_id: "",
                description: "",
                quantity: 0,
                unit_price: 0,
                amount: 0,
            });

            console.log("New lineItems:", lineItems.value);
        };

        const removeLastLineItem = () => {
            if (lineItems.value.length > 1) {
                lineItems.value.pop();
            } else {
                console.warn("Cannot remove the last line item.");
            }
        };

        const removeLastLineItem2 = () => {
            if (lineItems2.value.length > 1) {
                lineItems2.value.pop();
            } else {
                console.warn("Cannot remove the last line item.");
            }
        };

        // // Watch changes in product_id, quantity, and unit_price for each line item
        // watch(
        //     () =>
        //         lineItems.value.map((item) => ({
        //             product_id: item.product_id,
        //             quantity: item.quantity,
        //             unit_price: item.unit_price,
        //         })),
        //     (newValues, oldValues) => {
        //         // Handle cases where oldValues may not be defined yet
        //         if (!oldValues) return; // This will exit the watch callback if oldValues are undefined

        //         newValues.forEach((current, index) => {
        //             // Safely check if the oldValues at the current index are defined
        //             const old = oldValues[index];
        //             if (old && current.product_id !== old.product_id) {
        //                 updateProductDetails(index);
        //             }
        //             updateAmount(index); // Always update amount whenever there's a change in any of these fields
        //         });
        //     },
        //     { deep: true },
        // );

        watch(
            () =>
                lineItems2.value.map((item) => ({
                    product_id: item.product_id,
                    quantity: item.quantity,
                    unit_price: item.unit_price,
                })),
            (newValues, oldValues) => {
                newValues.forEach((current, index) => {
                    if (
                        !oldValues ||
                        current.product_id !== oldValues[index]?.product_id
                    ) {
                        updateProductDetails2(index);
                    }
                    updateAmount2(index);
                });
            },
            { deep: true },
        );

        // const updateProductDetails = (index) => {
        //     const item = lineItems.value[index];

        //     if (!item) return;
        //     const product = Products.value.find(
        //         (p) => p.id === item.product_id,
        //     );
        //     if (product) {
        //         item.product_id = product.id;
        //         item.itemDescription = product.description || "";
        //         item.unit_price = product.price || 0;
        //         item.quantity = product.stock_quantity || 0;
        //         updateAmount(index); // Ensure the amount is updated whenever product details are updated
        //     }
        // };

        const updateProductDetails2 = (index) => {
            const item = lineItems2.value[index];

            if (!item) return;
            const product = Products.value.find(
                (p) => p.id === item.product_id,
            );
            if (product) {
                item.product_id = product.id;
                item.itemDescription = product.description || "";
                item.unit_price = product.price || 0;
                item.quantity = product.stock_quantity || 0;
                updateAmount2(index); // Ensure the amount is updated whenever product details are updated
            }
        };

        // const updateAmount = (index) => {
        //     const item = lineItems.value[index];
        //     item.amount = (item.quantity * item.unit_price).toFixed(2);
        //     updateTotals();
        // };

        const updateAmount2 = (index) => {
            const item = lineItems2.value[index];
            item.amount = (item.quantity * item.unit_price).toFixed(2);
        };
        // const updateTotals = () => {
        //     let subtotal = 0;
        //     lineItems.value.forEach((item) => {
        //         subtotal += parseFloat(item.amount);
        //     });
        //     formState2.sub_total = subtotal.toFixed(2);

        //     formState2.total_amount = subtotal.toFixed(2);
        // };

        // Function to calculate total for lineItems
        const calculateLineItemsTotal = () => {
            return lineItems.value.reduce((sum, item) => {
                return sum + parseFloat(item.amount || 0);
            }, 0);
        };

        // Function to calculate total for lineItems2
        const calculateLineItems2Total = () => {
            return lineItems2.value.reduce((sum, item) => {
                return sum + parseFloat(item.amount || 0);
            }, 0);
        };

        // Computed property to calculate the total amount
        const totalAmount = computed(() => {
            const totalFromLineItems = calculateLineItemsTotal();
            const totalFromLineItems2 = calculateLineItems2Total();
            return (totalFromLineItems + totalFromLineItems2).toFixed(2);
        });

        // Watch the computed total and update the form state
        watch(totalAmount, (newTotal) => {
            formState2.total_amount = newTotal;
        });

        const handleSubmitExpense = async () => {
            let isValidPayeeSelected = false;

            if (formState2.payee_type === "Supplier") {
                isValidPayeeSelected = Suppliers.value.some(
                    (supplier) => supplier.id === formState2.payee_id,
                );
            } else if (formState2.payee_type === "Client") {
                isValidPayeeSelected = clients.value.some(
                    (client) => client.id === formState2.payee_id,
                );
            }

            if (!isValidPayeeSelected) {
                toast.error("Please select a valid payee.");
                return;
            }

            const formattedPaymentDate = new Date(formState2.payment_date)
                .toISOString()
                .split("T")[0];

            const payload = {
                supplier_id:
                    formState2.payee_type === "Supplier"
                        ? formState2.payee_id
                        : null,
                client_id:
                    formState2.payee_type === "Client"
                        ? formState2.payee_id
                        : null,
                account_id: formState2.account_id,
                payment_date: formattedPaymentDate,
                payment_method: formState2.payment_method,
                payment_ref_no: formState2.payment_ref_no,
                category_details: lineItems.value.map((item) => ({
                    category_account_id: item.category_account_id,
                    description: item.description,
                    amount: item.amount,
                })),
                items: lineItems2.value.map((item) => ({
                    product_id: item.product_id,
                    description: item.description,
                    quantity: item.quantity,
                    unit_price: item.unit_price,
                    amount: item.amount,
                })),
                description: formState2.description,
                total_amount: formState2.total_amount,
            };

            console.log("Payload to be submitted:", payload);

            try {
                isLoading.value = true;
                const response = await DataService.post("/expenses", payload);

                if (response.status === 201) {
                    toast.success("Expense created successfully.");
                    resetForm(); // Reset the form after successful submission
                } else {
                    toast.error("Failed to create expense. Please try again.");
                }
            } catch (error) {
                console.error("Error creating expense:", error);
                toast.error("An error occurred. Please try again.");
            } finally {
                isLoading.value = false;
            }
        };

        const resetForm = () => {
            formState2.account_id = "";
            formState2.payee_id = "";
            formState2.payee_type = "";
            formState2.payment_method = "";
            formState2.payment_ref_no = generateInvoiceNumber();
            formState2.payment_date = "";
            formState2.description = "";
            formState2.total_amount = "";

            lineItems.value = [
                {
                    category_account_id: "",
                    description: "",
                    amount: 0,
                },
            ];

            lineItems2.value = [
                {
                    product_id: "",
                    description: "",
                    quantity: 0,
                    unit_price: 0,
                    amount: 0,
                },
            ];

            openExpenseDrawer.value = false;
        };

        const generateInvoiceNumber = () => {
            return Math.floor(100000 + Math.random() * 900000).toString(); // Generates a random 6-digit number
        };

        const combinedList = computed(() => {
            console.log("Suppliers in combinedList:", Suppliers.value);
            console.log("Clients in combinedList:", clients.value);

            const suppliersList = Array.isArray(Suppliers.value)
                ? Suppliers.value.map((supplier) => ({
                      id: supplier.id,
                      fullName: `${supplier.title}  ${supplier.first_name}  ${supplier.last_name}`,
                      type: "Supplier",
                  }))
                : [];

            const clientsList = Array.isArray(clients.value)
                ? clients.value.map((client) => ({
                      id: client.id,
                      fullName: `${client.user.first_name} ${client.user.last_name}`,
                      type: "Client",
                  }))
                : [];

            console.log("Supplier list is", suppliersList);
            console.log("Client list is", clientsList);

            return [...suppliersList, ...clientsList];
        });

        const setPayeeType = () => {
            const selectedPayee = combinedList.value.find(
                (item) => item.id === formState2.payee_id,
            );
            if (selectedPayee) {
                formState2.payee_type = selectedPayee.type;
            }
        };


        const approveExpense = async (id) => {
            if (!canApprove.value) {
                toast.error("You are not allowed to approve this expense.");
                return;
            }

            try {
                const response = await DataService.post(
                    `/expenses/${id}/approve`,
                );
                console.log("I want to see response", response);

                if (response.status === 200) {
                    toast.success("Invoice approved successfully");
                    await fetchExpenses(); 
                } else {
                
                    toast.error("Failed to approve invoice");
                }
            } catch (error) {
                console.log("Error details:", error);

                let errorMessage =
                    "An unexpected error occurred. Please try again.";

                
                if (error.response) {
                    
                    errorMessage =
                        error.response.data.error || "Failed to approve expense";
                }

                
                toast.error(errorMessage);
            }
        };

        onMounted(async () => {
            await fetchCategoryAccountsForExpense(),
                await fetchExpenses(),
                await fetchSuppliers(),
                await fetchClients(),
                await fetchAllData();
            formState2.payment_ref_no = generateInvoiceNumber();
        });

        return {
            tableDataScource,
            dataTableColumn,

            open,
            showDrawer,
            onClose,
            combinedList,

            isLoading,

            fetchSuppliers,
            openExpenseDrawer,
            onCloseExpenseDrawer,
            removeLastLineItem,
            removeLastLineItem2,
            lineItems,
            lineItems2,
            addLineItem,
            addLineItem2,

            formState2,
            Suppliers,
            Products,
            unitsOfMeasures,

            supplierDetails,
            supplierDetails2,
            handleSubmitExpense,

            placement,
            placement1,

            Accounts,
            Accounts2,
            accountBalance,

            purchaseOrders,
            totalAmount,
            setPayeeType,
            drawerWidth,
        };
    },
});
</script>

<style scoped>
.custom-select {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    padding: 2px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f8f8f8;
    font-size: 12px;
    width: 120px;
    max-width: 300px; /* Adjust the width as needed */
}
.custom-select1 {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    padding: 6px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f8f8f8;
    font-size: 16px;
    width: 100%;
    max-width: 300px; /* Adjust the width as needed */
}

.custom-select1:focus {
    outline: none;
    border-color: #007bff; /* Change border color on focus */
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); /* Add a subtle shadow on focus */
}

.loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}

.custom-select:focus {
    outline: none;
    border-color: #007bff; /* Change border color on focus */
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); /* Add a subtle shadow on focus */
}

.wrapper-invoice {
    display: flex;
    justify-content: center;
}
.wrapper-invoice .invoice {
    height: auto;
    background: #fff;
    padding: 5vh;
    margin-top: 5vh;
    max-width: 400vh;
    width: 900px;
    box-sizing: border-box;
    border: 1px solid #dcdcdc;
}
.wrapper-invoice .invoice .invoice-information {
    float: right;
    text-align: right;
}
.wrapper-invoice .invoice .invoice-information b {
    color: "#0F172A";
}
.wrapper-invoice .invoice .invoice-information p {
    font-size: 2vh;
    color: gray;
}
.wrapper-invoice .invoice .invoice-logo-brand h2 {
    text-transform: uppercase;
    font-family:
        "Inter",
        -apple-system,
        BlinkMacSystemFont,
        "Segoe UI",
        Roboto,
        Oxygen,
        Ubuntu,
        Cantarell,
        "Open Sans",
        "Helvetica Neue",
        sans-serif;
    font-size: 2.9vh;
    color: "#0F172A";
}
.switch {
    position: relative;
    display: inline-block;
    margin-top: 20px;
    width: 28px;
    height: 12px;
}

.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
}

.slider:before {
    position: absolute;
    content: "";
    height: 8px;
    width: 8px;
    left: 4px;
    bottom: 2.5px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
}

input:checked + .slider {
    background-color: #2196f3;
}

input:focus + .slider {
    box-shadow: 0 0 1px #2196f3;
}
input:checked + .slider:before {
    -webkit-transform: translateX(15px);
    -ms-transform: translateX(15px);
    transform: translateX(15px);
}

/* Rounded sliders */
.slider.round {
    border-radius: 34px;
}

.slider.round:before {
    border-radius: 50%;
}

.input-data {
    width: 150px;
    height: 10px;
    padding: 10px;
    border-radius: 5px;
    border: 0.5px solid gray;
}
.wrapper-invoice .invoice .invoice-logo-brand img {
    max-width: 100px;
    width: 100%;
    object-fit: fill;
}
.wrapper-invoice .invoice .invoice-head {
    display: flex;
    margin-top: 8vh;
}
.wrapper-invoice .invoice .invoice-head .head {
    width: 100%;
    box-sizing: border-box;
}
.wrapper-invoice .invoice .invoice-head .client-info {
    text-align: left;
}
.wrapper-invoice .invoice .invoice-head .client-info h2 {
    font-weight: 500;
    letter-spacing: 0.3px;
    font-size: 2vh;
    color: "#0F172A";
}
.wrapper-invoice .invoice .invoice-head .client-info p {
    font-size: 2vh;
    color: gray;
}
.wrapper-invoice .invoice .invoice-head .client-data {
    text-align: right;
}
.wrapper-invoice .invoice .invoice-head .client-data h2 {
    font-weight: 500;
    letter-spacing: 0.3px;
    font-size: 2vh;
    color: "#0F172A";
}
.wrapper-invoice .invoice .invoice-head .client-data p {
    font-size: 2vh;
    color: gray;
}
.wrapper-invoice .invoice .invoice-body {
    margin-top: 8vh;
}
.wrapper-invoice .invoice .invoice-body .table {
    border-collapse: collapse;
    width: 100%;
}
.wrapper-invoice .invoice .invoice-body .table thead tr th {
    font-size: 2vh;
    border: 1px solid #dcdcdc;
    text-align: left;
    padding: 1vh;
    background-color: #eeeeee;
}
.wrapper-invoice .invoice .invoice-body .table tbody tr td {
    font-size: 2vh;
    border: 1px solid #dcdcdc;
    text-align: left;
    padding: 1vh;
    background-color: #fff;
}
.wrapper-invoice .invoice .invoice-body .table tbody tr td:nth-child(2) {
    text-align: right;
}
.wrapper-invoice .invoice .invoice-body .flex-table {
    display: flex;
}
.wrapper-invoice .invoice .invoice-body .flex-table .flex-column {
    width: 100%;
    box-sizing: border-box;
}
.wrapper-invoice
    .invoice
    .invoice-body
    .flex-table
    .flex-column
    .table-subtotal {
    border-collapse: collapse;
    box-sizing: border-box;
    width: 100%;
    margin-top: 2vh;
}
.wrapper-invoice
    .invoice
    .invoice-body
    .flex-table
    .flex-column
    .table-subtotal
    tbody
    tr
    td {
    font-size: 2vh;
    border-bottom: 1px solid #dcdcdc;
    text-align: left;
    padding: 1vh;
    background-color: #fff;
}
.wrapper-invoice
    .invoice
    .invoice-body
    .flex-table
    .flex-column
    .table-subtotal
    tbody
    tr
    td:nth-child(2) {
    text-align: right;
}
.wrapper-invoice .invoice .invoice-body .invoice-total-amount {
    margin-top: 1rem;
}
.wrapper-invoice .invoice .invoice-body .invoice-total-amount p {
    font-weight: bold;
    color: "#0F172A";
    text-align: right;
    font-size: 2vh;
}
.wrapper-invoice .invoice .invoice-footer {
    margin-top: 4vh;
}
.wrapper-invoice .invoice .invoice-footer p {
    font-size: 1.7vh;
    color: gray;
}

.copyright {
    margin-top: 2rem;
    text-align: center;
}
.copyright p {
    color: gray;
    font-size: 1.8vh;
}

@media print {
    .table thead tr th {
        -webkit-print-color-adjust: exact;
        background-color: #eeeeee !important;
    }

    .copyright {
        display: none;
    }
}
.rtl {
    direction: rtl;
    font-family:
        "Inter",
        -apple-system,
        BlinkMacSystemFont,
        "Segoe UI",
        Roboto,
        Oxygen,
        Ubuntu,
        Cantarell,
        "Open Sans",
        "Helvetica Neue",
        sans-serif;
}
.rtl .invoice-information {
    float: left !important;
    text-align: left !important;
}
.rtl .invoice-head .client-info {
    text-align: right !important;
}
.rtl .invoice-head .client-data {
    text-align: left !important;
}
.rtl .invoice-body .table thead tr th {
    text-align: right !important;
}
.rtl .invoice-body .table tbody tr td {
    text-align: right !important;
}
.rtl .invoice-body .table tbody tr td:nth-child(2) {
    text-align: left !important;
}
.rtl .invoice-body .flex-table .flex-column .table-subtotal tbody tr td {
    text-align: right !important;
}
.rtl
    .invoice-body
    .flex-table
    .flex-column
    .table-subtotal
    tbody
    tr
    td:nth-child(2) {
    text-align: left !important;
}
.rtl .invoice-body .invoice-total-amount p {
    text-align: left !important;
}

@media (max-width: 768px) {
    .ant-drawer-content-wrapper {
        width: 100% !important;
    }
}

@media (min-width: 768px) and (max-width: 1200px) {
    .ant-drawer-content-wrapper {
        width: 80% !important;
    }
}

@media (min-width: 1200px) {
    .ant-drawer-content-wrapper {
        width: 70% !important;
    }
}
</style>
