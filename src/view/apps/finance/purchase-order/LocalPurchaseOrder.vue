<template>
    <Main>
        <a-row :gutter="15">
            <a-col :xs="24">
                <BorderLessHeading>
                    <sdCards title="Manage Local Purchase Orders">
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
                                    title="Create New Local Purchase Order"
                                    :width="1000"
                                    v-model:visible="open"
                                    :body-style="{ paddingBottom: '80px' }"
                                    :footer-style="{ textAlign: 'right' }"
                                    @close="onClose"
                                >
                                    <template v-if="isLoading">
                                        <a-space class="loading">
                                            <a-spin size="large" />
                                        </a-space>
                                    </template>

                                    <template v-else>
                                        <form
                                            :model="formState"
                                            layout="vertical"
                                        >
                                            <section class="wrapper-invoice">
                                                <!-- switch mode rtl by adding class rtl on invoice class -->
                                                <div class="invoice">
                                                    <div
                                                        class="invoice-information"
                                                    >
                                                        <p>
                                                            <b>Order Date</b>:
                                                            <a-date-picker
                                                                v-model:value="
                                                                    formState.order_date
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
                                                            <b>Delivery Date</b>
                                                            :
                                                            <a-date-picker
                                                                v-model:value="
                                                                    formState.delivery_date
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
                                                            REF_NO:
                                                            <input
                                                                class="input-data"
                                                                type="text"
                                                                v-model="
                                                                    formState.reference_number
                                                                "
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
                                                    <div
                                                        class="invoice-logo-brand"
                                                    >
                                                        Supplier:
                                                        <select
                                                            v-model="
                                                                formState.supplier_id
                                                            "
                                                            class="custom-select"
                                                        >
                                                            <option value="">
                                                                Choose Supplier
                                                            </option>
                                                            <template
                                                                v-if="suppliers"
                                                            >
                                                                <option
                                                                    v-for="supplier in suppliers"
                                                                    :key="
                                                                        supplier.id
                                                                    "
                                                                    :value="
                                                                        supplier.id
                                                                    "
                                                                >
                                                                    {{
                                                                        supplier.title
                                                                    }}
                                                                    {{
                                                                        supplier.first_name
                                                                    }}
                                                                    {{
                                                                        supplier.last_name
                                                                    }}
                                                                </option>
                                                            </template>
                                                            <template v-else>
                                                                <option
                                                                    disabled
                                                                >
                                                                    No suppliers
                                                                    available
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
                                                            v-model:value="
                                                                formattedSupplierDetails
                                                            "
                                                        />
                                                    </div>

                                                    <div class="invoice-body">
                                                        <table class="table">
                                                            <thead>
                                                                <tr>
                                                                    <th>
                                                                        Product/Service
                                                                    </th>
                                                                    <th>
                                                                        Item
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
                                                                    ) in lineItems"
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

                                                                    <td>
                                                                        <textarea
                                                                            style="
                                                                                width: 200px;
                                                                                border-radius: 5px;
                                                                            "
                                                                            class=""
                                                                            type="text"
                                                                            v-model="
                                                                                item.itemDescription
                                                                            "
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
                                                                                    width: 40px;
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
                                                                                    width: 80px;
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
                                                                                    width: 80px;
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

                                                        <div
                                                            class="invoice-total-amount"
                                                        >
                                                            <p>
                                                                Subtotal :
                                                                <input
                                                                    class="input-data"
                                                                    type="text"
                                                                    v-model="
                                                                        formState.sub_total
                                                                    "
                                                                />
                                                            </p>
                                                        </div>
                                                        <!-- invoice total  -->
                                                        <div
                                                            class="invoice-total-amount"
                                                        >
                                                            <p>
                                                                Total :
                                                                <input
                                                                    class="input-data"
                                                                    type="text"
                                                                    v-model="
                                                                        formState.total_amount
                                                                    "
                                                                />
                                                            </p>
                                                        </div>

                                                        <div
                                                            class="invoice-footer"
                                                        >
                                                            Your Message to
                                                            Supplier
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
                                                                        formState.note
                                                                    "
                                                                />
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </section>

                                            <div
                                                style="
                                                    margin-left: 120px;
                                                    margin-top: 40px;
                                                "
                                                class="setting-form-actions"
                                            >
                                                <sdButton
                                                    size="small"
                                                    type="primary"
                                                    @click.prevent="
                                                        handleSubmit
                                                    "
                                                >
                                                    Save
                                                </sdButton>

                                                &nbsp; &nbsp;
                                                <sdButton
                                                    size="small"
                                                    @click.prevent="onClose"
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
                            @search="fetchLocalPurchaseOrders"
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
    name: "LocalPurchaseOrder",
    components: {
        Main,
        DataTables,
        BorderLessHeading,
    },
    setup() {
        const { state } = useStore();
        const router = useRouter();
        const toast = useToast();

        const isLoading = ref(false);

        const unitsOfMeasures = ref([]);

        const suppliers = ref([]);
        const Products = ref([]);

        // const states = ref([]);

        const invoices = ref([]);

        const lineItems = ref([
            {
                product_id: "",
                itemDescription: "",
                quantity: 0,
                unit_price: 0,
                amount: 0,
            },
        ]);

        const tableDataScource = ref([]);

        const canApprove = computed(() =>
            state.auth.permissions.includes("PurchaseOrder.Approve"),
        );

        const loggedUser = computed(() => state.auth.user);

        console.log("Currently logged user", loggedUser.value);

        console.log("User Permissions:", state.auth.permissions);
        console.log("Can Approve:", canApprove.value);

        const fetchAllData = async () => {
            await Promise.all([
                fetchLocalPurchaseOrders(),
                fetchSuppliers(),
                fetchInvoices(),
                fetchProducts(),
                fetchUnitsOfMeasures(),
            ]);
        };

        const fetchLocalPurchaseOrders = async (orderDate = null) => {
            try {
                let response;
                if (orderDate) {
                    response = await searchLpos(orderDate);
                } else {
                    response = await DataService.get("/lpo");
                    console.log("lpos fetched", response.data);

                    if (response.status === 200) {
                        if (
                            Array.isArray(response.data.LPOs) &&
                            response.data.LPOs.length > 0
                        ) {
                            tableDataScource.value = response.data.LPOs.map(
                                (localpurchaseorder) => ({
                                    key: localpurchaseorder.id,
                                    supplier: (
                                        <span class="ninjadash-username">
                                            {
                                                localpurchaseorder.supplier
                                                    .first_name
                                            }
                                        </span>
                                    ),
                                    delivery_date: (
                                        <span>
                                            {localpurchaseorder.delivery_date}
                                        </span>
                                    ),
                                    order_date: (
                                        <span>
                                            {localpurchaseorder.order_date}
                                        </span>
                                    ),
                                    status: (
                                        <span
                                            class={`ninjadash-status ninjadash-status-${localpurchaseorder.status}`}
                                        >
                                            {localpurchaseorder.status}
                                        </span>
                                    ),
                                    user_has_approved:
                                        localpurchaseorder.user_has_approved,
                                }),
                            );
                        } else {
                            tableDataScource.value = [];
                            toast.info(
                                response.data.message || "No LPOs found.",
                            );
                        }
                    }
                }
            } catch (error) {
                console.error("Error fetching lpos:", error);
                toast.error("An error occurred. Please try again.");
            }
        };

        const searchLpos = async (orderDate) => {
            try {
                const response = await DataService.get(
                    `/lpo/search/${orderDate}`,
                );
                console.log("Searched lpo", response.data);

                if (
                    response.status === 200 &&
                    Array.isArray(response.data.LPOs) &&
                    response.data.LPOs.length > 0
                ) {
                    tableDataScource.value = response.data.LPOs.map(
                        (localpurchaseorder) => ({
                            key: localpurchaseorder.id,
                            supplier: (
                                <span class="ninjadash-username">
                                    {localpurchaseorder.supplier.name}
                                </span>
                            ),
                            delivery_date: (
                                <span>{localpurchaseorder.delivery_date}</span>
                            ),
                            order_date: (
                                <span>{localpurchaseorder.order_date}</span>
                            ),
                            status: (
                                <span
                                    class={`ninjadash-status ninjadash-status-${localpurchaseorder.status}`}
                                >
                                    {localpurchaseorder.status}
                                </span>
                            ),
                        }),
                    );
                } else {
                    tableDataScource.value = [];
                    toast.info(response.data.message || "No LPOs found.");
                }
            } catch (error) {
                console.error("Error searching lpo:", error);
                toast.error("An error occurred. Please try again.");
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

        const fetchInvoices = async () => {
            try {
                const response = await DataService.get("/invoices");
                invoices.value = response.data.Invoices;
            } catch (error) {
                console.error("Error fetching invoices:", error);
                invoices.value = []; // Ensure it's always an array, even on error
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

        const viewLocalPurchaseOrder = (localPurchaseOrderId) => {
            router.push(`/app/local-purchase-order/${localPurchaseOrderId}`);
        };

        const editLocalPurchaseOrder = (localPurchaseOrderId) => {
            router.push(
                `/app/local-purchase-order/edit/${localPurchaseOrderId}`,
            );
        };
        const deleteLocalPurchaseOrder = async (localPurchaseOrderId) => {
            if (
                window.confirm(
                    "Are you sure you want to delete this local purchase order? This action cannot be undone.",
                )
            ) {
                try {
                    await DataService.delete(`/lpo/${localPurchaseOrderId}`);
                    toast.success(
                        "Local Purchase order  deleted successfully.",
                    );
                    await fetchLocalPurchaseOrders(); // Refresh the list
                } catch (error) {
                    toast.error(
                        "Failed to delete  local purchase order. Please try again.",
                    );
                }
            }
        };

        const approvePurchaseOrder = async (id) => {
            if (!canApprove.value) {
                toast.error(
                    "You are not allowed to approve this purchase order.",
                );
                return;
            }

            try {
                const response = await DataService.post(`/lpo/${id}/approve`);
                console.log("I want to see response", response);

                if (response.status === 200) {
                    toast.success("Purchse Order approved successfully");
                    await fetchLocalPurchaseOrders();
                } else {
                    toast.error("Failed to approve  purchase order");
                }
            } catch (error) {
                console.log("Error details:", error);

                let errorMessage =
                    "An unexpected error occurred. Please try again.";

                if (error.response) {
                    errorMessage =
                        error.response.data.error ||
                        "Failed to approve purchase order";
                }

                toast.error(errorMessage);
            }
        };

        const dataTableColumn = [
            // {
            //     title: "Id",
            //     dataIndex: "id",
            //     key: "id",
            // },
            {
                title: "Supplier",
                dataIndex: "supplier",
                key: "user",
            },
            {
                title: "Delivery Date",
                dataIndex: "delivery_date",
                key: "coutry",
            },
            {
                title: "Order Date",
                dataIndex: "order_date",
                key: "order-date",
            },
            // {
            //     title: "Status",
            //     dataIndex: "status",
            //     key: "status",
            // },

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
                                        approvePurchaseOrder(record.key);
                                    }
                                }}
                            >
                                {isApproved ? "Approved" : "Approve"}
                            </button>
                            <button
                                class="view"
                                onClick={() =>
                                    viewLocalPurchaseOrder(record.key)
                                }
                            >
                                <unicon name="eye"></unicon>
                            </button>
                            <button
                                class="edit"
                                onClick={() =>
                                    editLocalPurchaseOrder(record.key)
                                }
                            >
                                <unicon name="edit"></unicon>
                            </button>
                            <button
                                class="delete"
                                onClick={() =>
                                    deleteLocalPurchaseOrder(record.key)
                                }
                            >
                                <unicon name="trash"></unicon>
                            </button>
                        </div>
                    );
                },
            },
        ];

        onMounted(async () => {
            await fetchAllData();
            formState.reference_number = generateInvoiceNumber();
        });

        const formState = reactive({
            reference_number: "",
            quantity: "",
            order_date: "",
            quantity_abbreviation_id: "",
            item: "",
            purchase_date: "",
            unit_price: "",
            unit_price_abbreviation_id: "",
            supplier_id: "",
            invoice_id: "",
            total_amount: "",
            sub_total: "",
            status: "",
        });

        const handleFileUpload = (event, fieldName) => {
            const file = event.target.files[0];
            if (file) {
                formState[fieldName] = file; // Update the form's state with the selected file
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

        console.log("Items to be submmited", formState.value);

        const handleSubmit = async () => {
            // Check if all required fields are filled
            if (
                !formState.order_date ||
                !formState.delivery_date ||
                !formState.supplier_id
            ) {
                toast.error("Please fill in all required fields.");
                return; // Prevent form submission
            }

            for (let item of lineItems.value) {
                if (
                    !Products.value.some(
                        (product) => product.id === item.product_id,
                    )
                ) {
                    toast.error("Please select product");
                    return; // Prevent form submission
                }
            }

            const isValidSupplierSelected = suppliers.value.some(
                (supplier) => supplier.id === formState.supplier_id,
            );
            if (!isValidSupplierSelected) {
                toast.error("Please select a valid supplier.");
                return; // Prevent form submission
            }

            const formattedOrderDate = new Date(formState.order_date)
                .toISOString()
                .split("T")[0];

            const formattedDeliveryDate = new Date(formState.delivery_date)
                .toISOString()
                .split("T")[0];

            const formData1 = new FormData();

            formData1.append("reference_number", formState.reference_number);
            formData1.append("supplier_id", formState.supplier_id);
            if (formState.order_date) {
                formData1.append("order_date", formattedOrderDate);
            }

            if (formState.delivery_date) {
                formData1.append("delivery_date", formattedDeliveryDate);
            }

            formData1.append("sub_total", formState.sub_total);
            formData1.append("total_amount", formState.total_amount);

            formData1.append("status", formState.status);
            formData1.append("note", formState.note);

            lineItems.value.forEach((item, index) => {
                formData1.append(
                    `items[${index}][product_id]`,
                    item.product_id,
                );
                formData1.append(
                    `items[${index}][itemDescription]`,
                    item.itemDescription,
                );
                formData1.append(`items[${index}][quantity]`, item.quantity);
                formData1.append(
                    `items[${index}][unit_price]`,
                    item.unit_price,
                );
                formData1.append(`items[${index}][amount]`, item.amount);

                formData1.append(
                    `items[${index}][product_id]`,
                    item.product_id,
                );
            });

            console.log("Various items to be submitted", formData1);

            try {
                isLoading.value = true;
                const response = await DataService.post("/lpo", formData1);

                if (response.status === 201) {
                    toast.success("Purchase Order saved Successfully");
                    // Reset the form data to its initial state
                    formState.reference_number = generateInvoiceNumber();
                    formState.quantity = "";
                    formState.status = "";
                    formState.order_date = "";
                    formState.delivery_date = "";

                    formState.purchase_date = "";
                    formState.unit_price = "";
                    formState.supplier_id = "";
                    formState.invoice_id = "";
                    lineItems.value = [
                        {
                            product_id: "",
                            itemDescription: "",
                            quantity: "",
                            unit_price: "",
                            amount: "",
                        },
                    ];

                    formState.note = "";

                    // Close the drawer
                    console.log("Attempting to close the drawer");
                    open.value = false;
                    await fetchLocalPurchaseOrders();

                    router.push({
                        path: "/app/local-purchase-order",
                    });
                } else {
                    //console.error("Record Add Failed");
                    toast.error("Failed to add record. Please try again.");
                }
            } catch (error) {
                console.error("Record Add error", error);
                toast.error("An error occurred. Please try again.");
            } finally {
                isLoading.value = false;
            }
        };

        const open = ref(false);
        const showDrawer = () => {
            open.value = true;
        };
        const onClose = () => {
            open.value = false;
        };

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

        const removeLastLineItem = () => {
            if (lineItems.value.length > 1) {
                lineItems.value.pop();
            } else {
                toast.warning("Cannot remove the last line item.");
            }
        };

        const generateInvoiceNumber = () => {
            return Math.floor(100000 + Math.random() * 900000).toString(); // Generates a random 6-digit number
        };

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
            // data,
            // columns,
            // columnsPagination,
            tableDataScource,
            dataTableColumn,
            formState,
            open,
            showDrawer,
            onClose,
            handleSubmit,
            isLoading,
            handleFileUpload,
            unitsOfMeasures,
            suppliers,
            invoices,
            addLineItem,
            lineItems,
            removeLastLineItem,
            fetchLocalPurchaseOrders,
            Products,
            formattedSupplierDetails,

            // handleCancel,
            // handlePreview,
            // fileList,
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
