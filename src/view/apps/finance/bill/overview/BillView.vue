<template>
    <Main>
        <a-row :gutter="15">
            <a-col :xs="24">
                <BorderLessHeading>
                    <sdCards title="Manage Bills">
                        <form :model="formState1" layout="vertical">
                            <section class="wrapper-invoice">
                                <!-- switch mode rtl by adding class rtl on invoice class -->
                                <div class="invoice">
                                    <div class="invoice-information">
                                        <p>
                                            <b>Bill Date</b>:
                                            {{ formState1.bill_date }}
                                        </p>
                                        <p>
                                            <b>Due Date</b>
                                            :
                                            {{ formState1.due_date }}
                                        </p>

                                        <p>
                                            Bill No:
                                            {{ formState1.bill_no }}
                                        </p>

                                        <p>
                                            Terms:
                                            {{ formState1.payment_terms }}
                                        </p>
                                    </div>
                                    <!-- logo brand invoice -->
                                    <p>Bill</p>
                                    <div class="invoice-logo-brand">
                                        Supplier:

                                        {{ supplierDetails.title }}
                                        {{ supplierDetails.first_name }}
                                        {{ supplierDetails.last_name }}
                                    </div>
                                    <br />

                                    <div
                                        style="margin-top: 20px"
                                        class="invoice-logo-brand"
                                    >
                                        Purchase Order Ref No:
                                        {{
                                            formState1.purchase_order_reference_number
                                        }}
                                    </div>

                                    <div class="invoice-footer">
                                        <p>Mailing address</p>
                                        <a-textarea
                                            style="
                                                width: 200px;
                                                border-radius: 5px;
                                                align-items: left;
                                            "
                                            readonly
                                            v-model:value="
                                                formattedSupplierDetails
                                            "
                                        />
                                    </div>

                                    <div class="invoice-body">
                                        <table class="table">
                                            <thead>
                                                <tr>
                                                    <th>Item Description</th>
                                                    <th>Qty</th>
                                                    <th>Price/Rate</th>
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
                                                            {{
                                                                item.itemDescription
                                                            }}
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
                                                            readonly
                                                                style="
                                                                    width: 80px;
                                                                    border: none
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
                                                            readonly
                                                                style="
                                                                    width: 100px;
                                                                    border: none
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
                                                            readonly
                                                                style="
                                                                    width: 120px;
                                                                    border: none
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

                                        <div class="invoice-total-amount">
                                            <p>
                                                Subtotal :Ksh
                                                <input
                                                style="border: none"
                                                readonly
                                                    class="input-data"
                                                    type="text"
                                                    v-model="
                                                        formState1.sub_total
                                                    "
                                                />
                                            </p>
                                        </div>

                                        <div class="invoice-total-amount">
                                            <p>
                                                Total :Ksh
                                                <input
                                                style="border: none"
                                                readonly
                                                    class="input-data"
                                                    type="text"
                                                    v-model="
                                                        formState1.total_amount
                                                    "
                                                />
                                            </p>
                                        </div>

                                        <div class="invoice-footer">
                                            Notes:
                                            <p>
                                                <textarea
                                                readonly
                                                    style="
                                                        width: 250px;
                                                        height: 60px;
                                                        border-radius: 5px;
                                                    "
                                                    class=""
                                                    type="text"
                                                    v-model="formState1.note"
                                                />
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <div
                                style="margin-left: 200px; margin-top: 40px"
                                class="setting-form-actions"
                            >
                                &nbsp; &nbsp;
                                <sdButton
                                    size="small"
                                    @click.prevent="handleCancel"
                                    type="light"
                                >
                                    Back
                                </sdButton>
                            </div>
                        </form>
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
    watch,
    computed,
} from "vue";
import { Main } from "../../../../styled";

import { BorderLessHeading } from "../../../../styled";

import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

export default defineComponent({
    name: "BillView",
    components: {
        Main,

        BorderLessHeading,
    },
    props: ["id"],

    setup(props) {
        const router = useRouter();

        const isLoading = ref(false);
        const toast = useToast();

        const purchaseOrders = ref([]);

        const lineItems = ref([
            {
                itemDescription: "",
                quantity: 0,
                unit_price: 0,
                amount: 0,
            },
        ]);

        const formState1 = reactive({
            purchase_order_reference_number: "",
            purchase_order_id: "",
            payment_terms: "",
            bill_date: "",
            bill_no: "",
            due_date: "",
            total_amount: "",
            sub_total: "",
            note: "",
        });

        const supplierDetails = reactive({
            title: "",
            first_name: "",
            last_name: "",
            company_name: "",
            address: "",
            city: "",
        });

        const fetchBill = async (id) => {
            try {
                const response = await DataService.get(`/bills/${id}`);
                if (response.status === 200) {
                    const bill = response.data.Bill;
                    console.log("Response here", bill);

                    // Populate the form fields
                    formState1.purchase_order_id = bill.purchase_order_id;
                    formState1.payment_terms = bill.payment_terms;
                    formState1.bill_date = bill.bill_date;
                    formState1.due_date = bill.due_date;
                    formState1.bill_no = bill.bill_no;
                    formState1.sub_total = bill.sub_total;
                    formState1.total_amount = bill.total_amount;
                    formState1.note = bill.note;

                    // Populate supplier details
                    supplierDetails.title = bill.supplier.title;
                    supplierDetails.first_name = bill.supplier.first_name;
                    supplierDetails.last_name = bill.supplier.last_name;
                    supplierDetails.company_name = bill.supplier.company_name;
                    supplierDetails.address = bill.supplier.address;
                    supplierDetails.city = bill.supplier.city;

                    // Populate line items
                    lineItems.value = bill.items.map((item) => ({
                        itemDescription: item.itemDescription,
                        amount: item.amount,
                        quantity: item.quantity,
                        unit_price: item.unit_price,
                    }));

                    // Fetch LPOs and set purchase order reference number
                    await fetchLpos();
                    const selectedPurchaseOrder = purchaseOrders.value.find(
                        (purchaseOrder) =>
                            purchaseOrder.id === bill.purchase_order_id,
                    );

                    if (selectedPurchaseOrder) {
                        formState1.purchase_order_reference_number =
                            selectedPurchaseOrder.reference_number;
                    }
                } else {
                    toast.error("Failed to fetch bill data.");
                }
            } catch (error) {
                toast.error("Error fetching bill.");
            }
        };

        const fetchLpos = async () => {
            try {
                const response = await DataService.get("/lpo");
                purchaseOrders.value = response.data.LPOs;
            } catch (error) {
                console.error("Error fetching lpos:", error);
                purchaseOrders.value = [];
            }
        };

        const handleCancel = () => {
            router.push(`/app/bills`);
        };

        const formattedSupplierDetails = computed(() => {
            return `${supplierDetails.title} ${supplierDetails.first_name} ${supplierDetails.last_name}
${supplierDetails.company_name}
${supplierDetails.city}, ${supplierDetails.address}`;
        });

        watch(
            () => formState1.purchase_order_id,
            async (newPurchaseOrderId) => {
                if (newPurchaseOrderId) {
                    const selectedPurchaseOrder = purchaseOrders.value.find(
                        (purchaseOrder) =>
                            purchaseOrder.id === newPurchaseOrderId,
                    );

                    if (selectedPurchaseOrder) {
                        formState1.purchase_order_reference_number =
                            selectedPurchaseOrder.reference_number;
                    }
                }
            },
        );

        onMounted(async () => {
            isLoading.value = true;
            try {
                await fetchBill(props.id);
                await fetchLpos();
            } catch (error) {
                console.error("Error fetching initial data:", error);
            } finally {
                isLoading.value = false;
            }
        });

        return {
            formState1,
            handleCancel,
            isLoading,
            lineItems,
            formattedSupplierDetails,
            supplierDetails,
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
    max-width: 110vh;
    width: 100%;
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
</style>
