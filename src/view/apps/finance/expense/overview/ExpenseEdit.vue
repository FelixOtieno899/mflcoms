<template>
    <Main>
        <a-row :gutter="15">
            <a-col :xs="24">
                <BorderLessHeading>
                    <a-row>
                        <a-col :span="24">
                            <template v-if="isLoading">
                                <a-space class="loading">
                                    <a-spin size="large" />
                                </a-space>
                            </template>

                            <template v-else>
                                <form :model="formState2" layout="vertical">
                                    <section class="wrapper-invoice">
                                        <!-- switch mode rtl by adding class rtl on invoice class -->
                                        <div class="invoice">
                                            <div class="invoice-information">
                                                <div class="invoice-logo-brand">
                                                    Payment Account:
                                                    <select
                                                        v-model="
                                                            formState2.account_id
                                                        "
                                                    >
                                                        <option value="">
                                                            Select an account
                                                        </option>
                                                        <template
                                                            v-if="Accounts"
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
                                                        <template v-else>
                                                            <option disabled>
                                                                No accounts
                                                                available
                                                            </option>
                                                        </template>
                                                    </select>
                                                </div>
                                                <p style="margin-top: 15px">
                                                    Balance:Ksh
                                                    <input
                                                        style="width: 100px"
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
                                                        <option value="">
                                                            What did you pay
                                                            with?
                                                        </option>
                                                        <option value="Cash">
                                                            Cash
                                                        </option>
                                                        <option value="Cheque">
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

                                                <p style="margin-top: 50px">
                                                    Amount: Ksh

                                                    <input
                                                        readonly
                                                        style="outline: none"
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
                                            <div class="invoice-logo-brand">
                                                Payee:
                                                <select
                                                    v-model="
                                                        formState2.payee_id
                                                    "
                                                    @change="setPayeeType"
                                                >
                                                    <option value="">
                                                        Who did you pay?
                                                    </option>
                                                    <option
                                                        v-for="item in combinedList"
                                                        :key="item.id"
                                                        :value="item.id"
                                                    >
                                                        {{ item.fullName }}
                                                        ({{ item.type }})
                                                    </option>
                                                </select>
                                            </div>

                                            <div style="margin-top: 20px">
                                                <p>
                                                    Payment Date :
                                                    {{
                                                        formState2.payment_date
                                                    }}
                                                </p>

                                                <p>
                                                    Ref_No:
                                                    <input
                                                    style="border:none"
                                                    readonly
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
                                                    <p>Category Details</p>
                                                </h4>
                                                <table class="table">
                                                    <thead>
                                                        <tr>
                                                            <th>Category</th>
                                                            <th>Description</th>
                                                            <th>Amount</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr
                                                            v-for="(
                                                                item, index
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
                                                        + add New Line Item
                                                    </sdButton>

                                                    <sdButton
                                                        size="small"
                                                        type="danger"
                                                        @click.prevent="
                                                            removeLastLineItem
                                                        "
                                                    >
                                                        - remove Line Item
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
                                                            <th>Description</th>
                                                            <th>Qty</th>
                                                            <th>Price/Rate</th>
                                                            <th>Amount</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr
                                                            v-for="(
                                                                item, index
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
                                                        + add New Line Item
                                                    </sdButton>

                                                    <sdButton
                                                        size="small"
                                                        type="danger"
                                                        @click.prevent="
                                                            removeLastLineItem2
                                                        "
                                                    >
                                                        - remove Line Item
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

                                                <div class="invoice-footer">
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
                                            margin-top: 20px;
                                        "
                                        class="setting-form-actions"
                                    >
                                        <sdButton
                                            size="small"
                                            type="primary"
                                            @click.prevent="handleFinish"
                                        >
                                            Save
                                        </sdButton>

                                        &nbsp; &nbsp;
                                        <sdButton
                                            size="small"
                                            @click.prevent="
                                                handleCancel
                                            "
                                            type="light"
                                        >
                                            Cancel
                                        </sdButton>
                                    </div>
                                </form>
                            </template>
                        </a-col>
                    </a-row>
                </BorderLessHeading>
            </a-col>
        </a-row>
    </Main>
</template>
<script>
import { DataService } from "@/config/dataService/dataService";
import { defineComponent, ref, reactive, onMounted, watch, computed } from "vue";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";

export default defineComponent({
    name: "ExpenseEdit",
    props: ["id"], // Accept the id prop for the expense to be edited

    setup(props) {
        const router = useRouter();
        const toast = useToast();
        const isLoading = ref(false);
        const Accounts = ref([]);
        const Accounts2 = ref([]);
        const Products = ref([]);
        const Suppliers = ref([]);
        const clients = ref([]);

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
            payment_date: "",
        });

        const lineItems = ref([
            { category_account_id: "", description: "", amount: 0 },
        ]);

        const lineItems2 = ref([
            { product_id: "", description: "", quantity: 0, unit_price: 0, amount: 0 },
        ]);

        const accountBalance = reactive({ balance: 0 });

        onMounted(async () => {
            try {
                isLoading.value = true;
                await fetchAllData();
                const expenseDetails = await fetchExpenseDetails(props.id);
                populateFormState(expenseDetails);
            } catch (error) {
                console.error("Error during setup:", error);
            } finally {
                isLoading.value = false;
            }
        });

        const fetchAllData = async () => {
            await Promise.all([
                fetchCategoryAccountsForExpense(),
                fetchPaymentAccounts(),
                fetchClients(),
                fetchSuppliers(),
                fetchProducts(),
            ]);
        };

        const fetchExpenseDetails = async (expenseId) => {
            try {
                const response = await DataService.get(`/expenses/${expenseId}`);
                console.log("Details fetched of an Expense", response.data);
                return response.data.Expense;
            } catch (error) {
                console.error("Error fetching expense:", error);
                if (error.response) {
                    console.error("Error response:", error.response);
                }
            }
        };

        const updateExpenseDetails = async (expenseId, updatedDetails) => {
            try {
                const response = await DataService.put(`/expenses/${expenseId}`, updatedDetails);
                console.log("Expense updated successfully:", response.data);
            } catch (error) {
                console.error("Error updating expense:", error);
                if (error.response) {
                    console.error("Error response:", error.response);
                }
            }
        };

        const fetchProducts = async () => {
            try {
                const response = await DataService.get("/products");
                Products.value = response.data.Products;
                console.log("Products fetched:", Products.value);
            } catch (error) {
                console.error("Error fetching products:", error);
                Products.value = [];
            }
        };

        const fetchClients = async () => {
            try {
                const response = await DataService.get("/clients");
                clients.value = response.data.Clients;
                console.log("Clients fetched:", clients.value);
            } catch (error) {
                console.error("Error fetching clients:", error);
            }
        };

        const fetchSuppliers = async () => {
            try {
                const response = await DataService.get("/suppliers");
                Suppliers.value = response.data.Suppliers;
                console.log("Suppliers fetched:", Suppliers.value);
            } catch (error) {
                console.error("Error fetching suppliers:", error);
            }
        };

        const fetchPaymentAccounts = async () => {
            try {
                const response = await DataService.get("/accounts/payments");
                Accounts.value = response.data.Accounts;
                console.log("Payment Accounts fetched:", Accounts.value);
            } catch (error) {
                console.error("Error fetching accounts:", error);
            }
        };

        const fetchCategoryAccountsForExpense = async () => {
            try {
                const response = await DataService.get("/accounts/categories/expenses");
                Accounts2.value = response.data.Accounts;
                console.log("Category Accounts fetched:", Accounts2.value);
            } catch (error) {
                console.error("Error fetching category accounts:", error);
            }
        };

        const populateFormState = (expenseDetails) => {
            formState2.account_id = expenseDetails.account_id || "";
            formState2.supplier_id = expenseDetails.supplier_id || "";
            formState2.client_id = expenseDetails.client_id || "";
            formState2.payee_id = expenseDetails.supplier_id || expenseDetails.client_id || "";
            formState2.total_amount = expenseDetails.total_amount || "";
            formState2.payment_method = expenseDetails.payment_method || "";
            formState2.payment_ref_no = expenseDetails.payment_ref_no || "";
            formState2.description = expenseDetails.description || "";
            formState2.payment_date = expenseDetails.payment_date || "";

            lineItems.value = expenseDetails.category_details.map(detail => ({
                category_account_id: detail.category_account_id,
                description: detail.description,
                amount: detail.amount,
            }));

            lineItems2.value = expenseDetails.items.map(item => ({
                product_id: item.product_id,
                description: item.description,
                quantity: item.quantity,
                unit_price: item.unit_price,
                amount: item.amount,
            }));
        };


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

        const handleFinish = async () => {
            try {
                isLoading.value = true;
                const payload = {
                    ...formState2,
                    category_details: lineItems.value,
                    items: lineItems2.value,
                };
                await updateExpenseDetails(props.id, payload);
                toast.success("Expense updated successfully!");
                router.push(`/app/expense`);
            } catch (error) {
                toast.error("Error updating Expense");
                console.error("Error updating Expense:", error);
            } finally {
                isLoading.value = false;
            }
        };

        const handleCancel = () => {
            router.push(`/app/expense`);
        };

        const calculateLineItemsTotal = () => {
            return lineItems.value.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);
        };

        const calculateLineItems2Total = () => {
            return lineItems2.value.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);
        };

        const totalAmount = computed(() => {
            return (calculateLineItemsTotal() + calculateLineItems2Total()).toFixed(2);
        });

        watch(totalAmount, (newTotal) => {
            formState2.total_amount = newTotal;
        });

        watch(
            () => lineItems2.value.map(item => ({
                product_id: item.product_id,
                quantity: item.quantity,
                unit_price: item.unit_price,
            })),
            (newValues, oldValues) => {
                newValues.forEach((current, index) => {
                    if (!oldValues || current.product_id !== oldValues[index]?.product_id) {
                        updateProductDetails2(index);
                    }
                    updateAmount2(index);
                });
            },
            { deep: true },
        );

        const updateProductDetails2 = (index) => {
            const item = lineItems2.value[index];
            if (!item) return;
            const product = Products.value.find(p => p.id === item.product_id);
            if (product) {
                item.product_id = product.id;
                item.itemDescription = product.description || "";
                item.unit_price = product.price || 0;
                item.quantity = product.stock_quantity || 0;
                updateAmount2(index);
            }
        };

        const updateAmount2 = (index) => {
            const item = lineItems2.value[index];
            item.amount = (item.quantity * item.unit_price).toFixed(2);
        };

        watch(
            () => formState2.account_id,
            (newVal) => {
                const selectedAccount = Accounts.value.find(account => account.id === newVal);
                if (selectedAccount) {
                    accountBalance.balance = selectedAccount.opening_balance;
                } else {
                    accountBalance.balance = "";
                }
            },
        );

        const combinedList = computed(() => {
            const suppliersList = Array.isArray(Suppliers.value)
                ? Suppliers.value.map(supplier => ({
                      id: supplier.id,
                      fullName: `${supplier.title} ${supplier.first_name} ${supplier.last_name}`,
                      type: "Supplier",
                  }))
                : [];

            const clientsList = Array.isArray(clients.value)
                ? clients.value.map(client => ({
                      id: client.id,
                      fullName: `${client.user.first_name} ${client.user.last_name}`,
                      type: "Client",
                  }))
                : [];

            return [...suppliersList, ...clientsList];
        });

        const setPayeeType = () => {
            const selectedPayee = combinedList.value.find(item => item.id === formState2.payee_id);
            if (selectedPayee) {
                formState2.payee_type = selectedPayee.type;
            }
        };

        return {
            formState2,
            handleFinish,
            handleCancel,
            addLineItem,
            addLineItem2,
            setPayeeType,
            removeLastLineItem,
            removeLastLineItem2,
            Accounts,
            Accounts2,
            accountBalance,
            Suppliers,
             combinedList,

             lineItems,
             lineItems2, 
             Products
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
