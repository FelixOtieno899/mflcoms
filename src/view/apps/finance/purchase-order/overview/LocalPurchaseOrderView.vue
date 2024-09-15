<template>
    <sdCards>
        <template v-slot:title>
            <div class="setting-card-title">
                <sdHeading as="h4">Local Purchase Order Info</sdHeading>
            </div>
        </template>
        <BasicFormWrapper v-if="isLoading">
            <a-space class="loading">
                <a-spin size="large" />
            </a-space>
        </BasicFormWrapper>

        <BasicFormWrapper v-else>
            <form :model="formState" layout="vertical">
                <section class="wrapper-invoice">
                    <!-- switch mode rtl by adding class rtl on invoice class -->
                    <div class="invoice">
                        <div class="invoice-information">
                            <p>
                                <b>Order Date</b>:
                                {{ formState.order_date }}
                            </p>
                            <p>
                                <b>Delivery Date</b>
                                :
                                {{ formState.delivery_date }}
                            </p>

                            <p>
                                REF_NO:
                                <input
                                    readonly
                                    class="input-data"
                                    type="text"
                                    v-model="formState.reference_number"
                                />
                            </p>

                            <!-- <p>
                                                        Status:
                                                        <select
                                                            v-model="
                                                                formState.status
                                                            "
                                                            class="custom-select"
                                                        >
                                                            <option
                                                                value=""
                                                            >
                                                                Select
                                                                Status
                                                            </option>
                                                            <option
                                                                value="Approved"
                                                            >
                                                                Approved
                                                            </option>
                                                            <option
                                                                value="Cancelled"
                                                            >
                                                                Cancelled
                                                            </option>
                                                            <option
                                                                value="Draft"
                                                            >
                                                                Draft
                                                            </option>
                                                        </select>
                                                    </p> -->
                        </div>
                        <!-- logo brand invoice -->
                        <p>Purchase Order</p>
                        <div class="invoice-logo-brand">
                            Supplier:
                            <select
                                v-model="formState.supplier_id"
                                class="custom-select"
                            >
                                <option value="">Choose Supplier</option>
                                <template v-if="suppliers">
                                    <option
                                        v-for="supplier in suppliers"
                                        :key="supplier.id"
                                        :value="supplier.id"
                                    >
                                        {{ supplier.title }}
                                        {{ supplier.first_name }}
                                        {{ supplier.last_name }}
                                    </option>
                                </template>
                                <template v-else>
                                    <option disabled>
                                        No suppliers available
                                    </option>
                                </template>
                            </select>
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
                                v-model:value="formattedSupplierDetails"
                            />
                        </div>

                        <div class="invoice-body">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Product/Service</th>
                                        <th>Item Description</th>
                                        <th>Qty</th>
                                        <th>Price/Rate</th>

                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                        v-for="(item, index) in lineItems"
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
                                                    v-model="item.product_id"
                                                >
                                                    <option value="">
                                                        Select Product
                                                    </option>
                                                    <template v-if="Products">
                                                        <option
                                                            v-for="product in Products"
                                                            :key="product.id"
                                                            :value="product.id"
                                                        >
                                                            {{ product.name }}
                                                        </option>
                                                    </template>
                                                    <template v-else>
                                                        <option disabled>
                                                            No products
                                                            available
                                                        </option>
                                                    </template>
                                                </select>
                                            </div>
                                        </td>

                                        <td>
                                            <textarea
                                                readonly
                                                style="
                                                    width: 200px;
                                                    border-radius: 5px;
                                                "
                                                class=""
                                                type="text"
                                                v-model="item.itemDescription"
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
                                                    readonly
                                                    style="width: 40px"
                                                    class="input-data"
                                                    type="text"
                                                    v-model="item.quantity"
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
                                                    style="width: 80px"
                                                    class="input-data"
                                                    type="text"
                                                    v-model="item.unit_price"
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
                                                    style="width: 80px"
                                                    class="input-data"
                                                    type="text"
                                                    v-model="item.amount"
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <div class="invoice-total-amount">
                                <p>
                                    Subtotal :
                                    <input
                                        readonly
                                        class="input-data"
                                        type="text"
                                        v-model="formState.sub_total"
                                    />
                                </p>
                            </div>
                            <!-- invoice total  -->
                            <div class="invoice-total-amount">
                                <p>
                                    Total :
                                    <input
                                        readonly
                                        class="input-data"
                                        type="text"
                                        v-model="formState.total_amount"
                                    />
                                </p>
                            </div>

                            <div class="invoice-footer">
                                Your Message to Supplier
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
                                        v-model="formState.note"
                                    />
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <div
                    style="margin-left: 120px; margin-top: 40px"
                    class="setting-form-actions"
                >
                    <sdButton
                        size="small"
                        type="primary"
                        @click.prevent="handleSubmit"
                    >
                        Save
                    </sdButton>

                    &nbsp; &nbsp;
                    <sdButton
                        size="small"
                        @click.prevent="handleCancel"
                        type="light"
                    >
                        Cancel
                    </sdButton>
                </div>
            </form>
        </BasicFormWrapper>
    </sdCards>
</template>

<script>
import { DataService } from "@/config/dataService/dataService";
import { BasicFormWrapper } from "../../../../styled";
import {
    defineComponent,
    ref,
    reactive,
    onMounted,
    computed,
    watch,
} from "vue";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";

const LocalPurchaseOrderView = defineComponent({
    name: "LocalPurchaseOrderView",
    components: { BasicFormWrapper },
    props: ["id"], // Accept the id prop

    setup(props) {
        const router = useRouter();
        const toast = useToast();
        const isLoading = ref(false);

        const suppliers = ref([]);
        const Products = ref([]);
        const unitsOfMeasures = ref([]);

        const lineItems = ref([
            {
                product_id: "",
                itemDescription: "",
                quantity: 0,
                unit_price: 0,
                amount: 0,
            },
        ]);
        const addLineItem = () => {
            lineItems.value.push({
                product_id: "",
                itemDescription: "",
                quantity: 0,
                unit_price: 0,
                amount: 0,
            });

            console.log("New lineItems:", lineItems.value);
        };

        const formState = reactive({
            quantity: "",
            supplier_id: "",
            unit_price: "",
            order_date: "",
            status: "",
            delivery_date: "",
            reference_number: "",
        });

        const fetchLocalPurchaseOrderDetails = async (localPurchaseOrderId) => {
            try {
                const response = await DataService.get(
                    `/lpo/${localPurchaseOrderId}`,
                );
                console.log(
                    "Details fetched of local purchase order",
                    response.data,
                );
                const localPurchaseOrderDetails = response.data.LPO;
                return localPurchaseOrderDetails;
            } catch (error) {
                console.error("Error fetching local purchase order :", error);
                if (error.response) {
                    console.error("Error response:", error.response);
                }
            }
        };

        const fetchSuppliers = async () => {
            try {
                const response = await DataService.get("/suppliers");
                suppliers.value = response.data.Suppliers;
            } catch (error) {
                console.error("Error fetching suppliers:", error);
                suppliers.value = []; // Ensure it's always an array, even on error
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

        const fetchUnitsOfMeasures = async () => {
            try {
                const response3 = await DataService.get(`/units_of_measure`);
                console.log("Units of Measures fetched", response3.data);
                unitsOfMeasures.value = response3.data.Units;
            } catch (error) {
                console.error("Error fetching units of measures:", error);
                if (error.response3) {
                    console.error("Error response:", error.response3);
                }
            }
        };

        const updateLocalPurchaseOrderDetails = async (
            localPurchaseOrderId,
            updatedDetails,
        ) => {
            try {
                const response = await DataService.put(
                    `/lpo/${localPurchaseOrderId}`,
                    updatedDetails,
                );
                console.log(
                    "Local Purchase Order   updated successfully:",
                    response.data,
                );
            } catch (error) {
                console.error("Error updating Local Purchase Order:", error);
                if (error.response) {
                    console.error("Error response:", error.response);
                }
            }
        };

        onMounted(async () => {
            await fetchSuppliers();
            await fetchProducts();
            await fetchUnitsOfMeasures();

            const details = await fetchLocalPurchaseOrderDetails(props.id);
            lineItems.value = details.items.map((item) => ({
                product_id: item.product_id,
                itemDescription: item.itemDescription,
                quantity: item.quantity,
                //  quantity_abbreviation_id: item.quantity_abbreviation_id,
                unit_price: item.unit_price,
                //  unit_price_abbreviation_id: item.unit_price_abbreviation_id,
            }));

            Object.assign(formState, details);

            formState.supplier_id = details.supplier.id;
            formState.reference_number = details.reference_number;
            formState.status = details.status;
            formState.delivery_date = details.delivery_date;

            formState.order_date = details.order_date;
        });
        const handleFinish = async () => {
            try {
                isLoading.value = true;
                const updatedDetails = {
                    ...formState,
                    items: lineItems.value,
                };
                await updateLocalPurchaseOrderDetails(props.id, updatedDetails);
                toast.success("Local Purchase order updated successfully!");
            } catch (error) {
                toast.error("Error updating Local Purchase order");
            } finally {
                isLoading.value = false;
            }
        };

        const handleFinishFailed = (errors) => {
            console.log(errors);
        };

        const handleCancel = () => {
            router.push(`/app/local-purchase-order`);
        };

        const removeLastLineItem = () => {
            if (lineItems.value.length > 1) {
                lineItems.value.pop();
            } else {
                toast.warning("Cannot remove the last line item.");
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

        watch(
            () =>
                lineItems.value.map((item) => ({
                    product_id: item.product_id,
                    quantity: item.quantity,
                    unit_price: item.unit_price,
                })),
            (newValues, oldValues) => {
                // Handle cases where oldValues may not be defined yet
                if (!oldValues) return; // This will exit the watch callback if oldValues are undefined

                newValues.forEach((current, index) => {
                    // Safely check if the oldValues at the current index are defined
                    const old = oldValues[index];
                    if (old && current.product_id !== old.product_id) {
                        updateProductDetails(index);
                    }
                    updateAmount(index); // Always update amount whenever there's a change in any of these fields
                });
            },
            { deep: true },
        );

        const updateAmount = (index) => {
            const item = lineItems.value[index];
            item.amount = (item.quantity * item.unit_price).toFixed(2); // Calculate new amount and fix to 2 decimal places
            updateTotals();
        };

        const updateProductDetails = (index) => {
            const item = lineItems.value[index];

            if (!item) return;
            const product = Products.value.find(
                (p) => p.id === item.product_id,
            );
            if (product) {
                item.product_id = product.id;
                item.itemDescription = product.description || "";
                item.unit_price = product.price || 0;
                item.quantity = product.stock_quantity || 0;
                updateAmount(index); // Ensure the amount is updated whenever product details are updated
            }
        };

        const updateTotals = () => {
            let subtotal = 0;
            lineItems.value.forEach((item) => {
                subtotal += parseFloat(item.amount);
            });
            formState.sub_total = subtotal.toFixed(2);

            formState.total_amount = subtotal.toFixed(2);
        };

        const formattedSupplierDetails = computed({
            get() {
                // Formats the supplier details into a single string.
                return `${supplierDetails.company_name}\n${supplierDetails.city}\n${supplierDetails.address}`;
            },
        });

        watch(
            () => formState.supplier_id,
            async (newSupplierId) => {
                if (newSupplierId) {
                    // Find the selected purchase order by ID
                    const selectedSupplier = suppliers.value.find(
                        (supplier) => supplier.id === newSupplierId,
                    );

                    if (selectedSupplier) {
                        supplierDetails.company_name =
                            selectedSupplier.company_name;
                        supplierDetails.city = selectedSupplier.city;
                        supplierDetails.address = selectedSupplier.address;
                    }
                }
            },
        );

        return {
            formState,
            handleFinish,
            handleFinishFailed,
            handleCancel,
            addLineItem,
            lineItems,
            unitsOfMeasures,
            removeLastLineItem,
            suppliers,
            formattedSupplierDetails,
            Products,
        };
    },
});

export default LocalPurchaseOrderView;
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

.borderless-input {
    border: none; /* Removes the border */
    outline: none; /* Removes the outline when focused */
    /* Add any additional styling as needed */
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
