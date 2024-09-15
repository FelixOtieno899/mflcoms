<template>
    <Main>
        <a-row :gutter="15">
            <a-col :xs="24">
                <BorderLessHeading>
                    <sdCards title="Manage Trips">
                        <a-row>
                            <a-col
                                style="display: flex; justify-content: flex-end"
                                :span="24"
                            >
                                <a-button
                                    style="margin-top: -30px"
                                    type="primary"
                                    @click="showCreateTrip"
                                >
                                    <template #icon><PlusOutlined /></template>
                                    + Add New
                                </a-button>
                            </a-col>

                            <a-drawer
                                title="Create New Invoice"
                                :width="1300"
                                v-model:visible="openCreateInvoiceDrawer"
                                :body-style="{ paddingBottom: '80px' }"
                                :footer-style="{ textAlign: 'right' }"
                                @close="() => (openCreateInvoiceDrawer = false)"
                            >
                                <template v-if="isLoading">
                                    <a-space class="loading">
                                        <a-spin size="large" />
                                    </a-space>
                                </template>

                                <template v-else>
                                    <form
                                        :model="formCreateInvoice"
                                        layout="vertical"
                                    >
                                        <table>
                                            <tr class="invoice-header">
                                                <td>Client</td>
                                                <td>
                                                    {{
                                                        formCreateInvoice.client_name
                                                    }}
                                                </td>
                                                <td>Invoice #</td>
                                                <td>
                                                    {{
                                                        formCreateInvoice.invoice_number
                                                    }}
                                                </td>
                                                <td>Tax</td>
                                                <td>0</td>
                                                <td>Date</td>
                                                <td>
                                                    <a-date-picker
                                                        v-model:value="
                                                            formCreateInvoice.invoice_date
                                                        "
                                                        format="YYYY-MM-DD"
                                                    />
                                                </td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td colspan="7">
                                                    <a-button
                                                        type="primary"
                                                        @click="
                                                            addItemsFromDeliveryNotes
                                                        "
                                                    >
                                                        Add Items from Delivery
                                                        Notes
                                                    </a-button>
                                                </td>
                                            </tr>
                                            <tr v-if="noItemsAvailable">
                                                <td
                                                    colspan="10"
                                                    style="
                                                        text-align: center;
                                                        color: red;
                                                    "
                                                >
                                                    No new items available to
                                                    add from the delivery notes.
                                                </td>
                                            </tr>
                                            <tr v-else>
                                                <th>Item</th>
                                                <th>Container Number</th>
                                                <th>Delivery Note #</th>
                                                <th>Delivery Note File Ref</th>
                                                <th>Loading Point</th>
                                                <th>Off Loading Point</th>
                                                <th>Qty</th>
                                                <th>Price</th>
                                                <th>Tax</th>
                                                <th>Line Total</th>
                                            </tr>
                                            <tr
                                                v-for="(
                                                    item, index
                                                ) in formCreateInvoice.items"
                                                :key="index"
                                            >
                                                <td>
                                                    {{ item.itemDescription }}
                                                </td>
                                                <td>
                                                    {{ item.containerNumber }}
                                                </td>
                                                <td>
                                                    {{
                                                        item.deliveryNoteNumber
                                                    }}
                                                </td>
                                                <td>
                                                    {{
                                                        item.deliveryNoteFileRef
                                                    }}
                                                </td>
                                                <td>
                                                    {{ item.loadingPoint }}
                                                </td>
                                                <td>
                                                    {{ item.offLoadingPoint }}
                                                </td>
                                                <td>{{ item.qty }}</td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        v-model="item.price"
                                                        @input="
                                                            updateLineTotal(
                                                                index,
                                                            )
                                                        "
                                                    />
                                                </td>
                                                <td>{{ item.tax }}</td>
                                                <td>
                                                    {{ item.lineTotal }}
                                                </td>
                                            </tr>
                                            <tr class="total-row">
                                                <td colspan="9" class="label">
                                                    Sub Total
                                                </td>
                                                <td>
                                                    {{
                                                        formCreateInvoice.subTotal
                                                    }}
                                                </td>
                                            </tr>
                                            <tr class="total-row">
                                                <td colspan="9" class="label">
                                                    Tax
                                                </td>
                                                <td>
                                                    {{
                                                        formCreateInvoice.taxTotal
                                                    }}
                                                </td>
                                            </tr>
                                            <tr class="total-row">
                                                <td colspan="9" class="label">
                                                    Total
                                                </td>
                                                <td>
                                                    {{
                                                        formCreateInvoice.total
                                                    }}
                                                </td>
                                            </tr>
                                        </table>
                                        <div
                                            style="
                                                margin-left: 90px;
                                                margin-top: 40px;
                                            "
                                            class="setting-form-actions"
                                        >
                                            <sdButton
                                                size="small"
                                                type="primary"
                                                @click.prevent="
                                                    handleSubmitCreateInvoice
                                                "
                                            >
                                                Save
                                            </sdButton>
                                            &nbsp; &nbsp;
                                            <sdButton
                                                size="small"
                                                @click.prevent="
                                                    onCloseCreateInvoiceDrawer
                                                "
                                                type="light"
                                            >
                                                Cancel
                                            </sdButton>
                                        </div>
                                    </form>
                                </template>
                            </a-drawer>

                            <a-drawer
                                title="Receive Payment"
                                :width="1000"
                                :height="600"
                                :visible="openReceivePaymentDrawer"
                                :placement="placement1"
                                :body-style="{ paddingBottom: '80px' }"
                                :footer-style="{ textAlign: 'right' }"
                                @close="
                                    () => (openReceivePaymentDrawer = false)
                                "
                            >
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
                                                <div
                                                    class="invoice-information"
                                                >
                                                    <div
                                                        class="invoice-logo-brand"
                                                    >
                                                        Deposit to:
                                                        <select
                                                            v-model="
                                                                formState2.account_id
                                                            "
                                                            class="custom-select"
                                                        >
                                                            <option value="">
                                                                Select an
                                                                account
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
                                                                <option
                                                                    disabled
                                                                >
                                                                    No accounts
                                                                    available
                                                                </option>
                                                            </template>
                                                        </select>
                                                    </div>

                                                    <p style="margin-top: 20px">
                                                        Amount Recieved: Ksh

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

                                                <div class="invoice-logo-brand">
                                                    Client:
                                                    <select
                                                        v-model="
                                                            formState2.client_id
                                                        "
                                                        class="custom-select"
                                                    >
                                                        <option value="">
                                                            Choose Client
                                                        </option>
                                                        <template
                                                            v-if="clients"
                                                        >
                                                            <option
                                                                v-for="client in clients"
                                                                :key="client.id"
                                                                :value="
                                                                    client.id
                                                                "
                                                            >
                                                                {{
                                                                    client.user
                                                                        .first_name
                                                                }}
                                                            </option>
                                                        </template>
                                                        <template v-else>
                                                            <option disabled>
                                                                No clients
                                                                available
                                                            </option>
                                                        </template>
                                                    </select>
                                                </div>

                                                <p></p>

                                                <div class="invoice-body">
                                                    <p>
                                                        Outstanding
                                                        Transactions:
                                                    </p>
                                                    <table class="table">
                                                        <thead>
                                                            <tr>
                                                                <th>
                                                                    Description
                                                                </th>
                                                                <th>
                                                                    Original
                                                                    Amount
                                                                </th>
                                                                <th>
                                                                    Open Balance
                                                                </th>
                                                                <th>Payment</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr
                                                                v-for="invoice in filteredInvoices"
                                                                :key="
                                                                    invoice.id
                                                                "
                                                            >
                                                                <td>
                                                                    Invoice #
                                                                    {{
                                                                        invoice.invoice_number
                                                                    }}
                                                                </td>

                                                                <td
                                                                    style="
                                                                        text-align: left;
                                                                    "
                                                                >
                                                                    {{
                                                                        invoice.total_amount
                                                                    }}
                                                                </td>
                                                                <td>
                                                                    {{
                                                                        invoice.total_amount
                                                                    }}
                                                                </td>

                                                                <td>
                                                                    {{
                                                                        invoice.total_amount
                                                                    }}
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>

                                                    <div
                                                        class="invoice-total-amount"
                                                    >
                                                        <p>
                                                            Amount to apply: Ksh
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
                                                    handleUpdateReceivePayment
                                                "
                                            >
                                                Save
                                            </sdButton>

                                            &nbsp; &nbsp;
                                            <sdButton
                                                size="small"
                                                @click.prevent="
                                                    () =>
                                                        (openReceivePaymentDrawer = false)
                                                "
                                                type="light"
                                            >
                                                Cancel
                                            </sdButton>
                                        </div>
                                    </form>
                                </template>
                            </a-drawer>
                        </a-row>

                        <sdModal
                            title="Provide Additional Information to end this trip"
                            class="ninjadash_addTask-modal"
                            :type="modalType"
                            :visible="visible"
                            :footer="null"
                            :onCancel="handleCancel"
                        >
                            <BasicFormWrapper>
                                <a-form
                                    :model="formState"
                                    name="end-trip"
                                    @finish="handleEndTrip"
                                >
                                    <a-row :gutter="16">
                                        <a-col :span="24">
                                            <a-form-item
                                                label="Odometer Reading"
                                                name="odometer_reading"
                                                :rules="[
                                                    {
                                                        required: true,
                                                        message: 'Required!',
                                                    },
                                                ]"
                                            >
                                                <a-input
                                                    type="text"
                                                    v-model:value="
                                                        formState.odometer_reading
                                                    "
                                                />
                                            </a-form-item>
                                        </a-col>
                                    </a-row>
                                    <br />

                                    <!-- <a-row :gutter="16">
                                        <a-col :span="24">
                                            <a-form-item
                                                label="Litres Consumed"
                                                name="litres_consumed"
                                                :rules="[
                                                    {
                                                        required: true,
                                                        message: 'Required!',
                                                    },
                                                ]"
                                            >
                                                <a-input
                                                    type="text"
                                                    v-model:value="
                                                        formState.litres_consumed
                                                    "
                                                />
                                            </a-form-item>
                                        </a-col>
                                    </a-row> -->
                                    <br />

                                    <!-- <a-row :gutter="16">
                                        <a-col :span="24">
                                            <a-form-item
                                                label="Trip Weight"
                                                name="trip_weight"
                                                :rules="[{ required: false }]"
                                            >
                                                <a-input
                                                    type="text"
                                                    v-model:value="
                                                        formState.trip_weight
                                                    "
                                                />
                                            </a-form-item>
                                        </a-col>
                                    </a-row>
                                    <br />

                                    <a-row :gutter="16">
                                        <a-col :span="24">
                                            <a-form-item
                                                label="KMS Done"
                                                name="kms_done"
                                                :rules="[{ required: false }]"
                                            >
                                                <a-input
                                                    type="text"
                                                    v-model:value="
                                                        formState.kms_done
                                                    "
                                                />
                                            </a-form-item>
                                        </a-col>
                                    </a-row>
                                    <br /> -->

                                    <br />
                                    <br />

                                    <a-row :gutter="16">
                                        <a-col :span="12">
                                            <div
                                                class="ninjadash-modal-actions"
                                            >
                                                <sdButton
                                                    size="sm"
                                                    type="light"
                                                    key="cancel"
                                                    outlined
                                                    @click.prevent="
                                                        handleCancel
                                                    "
                                                    >Cancel</sdButton
                                                >
                                                <sdButton
                                                    htmlType="submit"
                                                    size="sm"
                                                    type="primary"
                                                    key="submit"
                                                    >End Trip</sdButton
                                                >
                                            </div>
                                        </a-col>
                                    </a-row>
                                </a-form>
                            </BasicFormWrapper>
                        </sdModal>

                        <DataTables
                            :filterOption="true"
                            :filterOnchange="true"
                            :tableData="tableDataScource"
                            :columns="dataTableColumn"
                            :rowSelection="false"
                            @search="fetchVehicles"
                            @rowClick="handleRowClick"
                        />
                    </sdCards>
                </BorderLessHeading>
            </a-col>
        </a-row>
    </Main>
</template>

<script>
import { DataService } from "@/config/dataService/dataService";
import { defineComponent, onMounted, watch, computed } from "vue";
import { Main } from "../../../styled";
import DataTables from "@/components/table/DataTable.vue";
import { BorderLessHeading, BasicFormWrapper } from "../../../styled";
import { reactive, ref } from "vue";

import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

export default defineComponent({
    name: "Trip",
    components: {
        Main,
        DataTables,
        BorderLessHeading,
        BasicFormWrapper,
    },
    setup() {
        const router = useRouter();
        const toast = useToast();
        const status = ref("process");
        const isFinished = ref(false);
        const current = ref(0);
        const isStepValid = ref(false);

        const open = ref(false);
        const visible = ref(false);
        const visibleForPickup = ref(false);
        const placement1 = ref("bottom");
        const visibleForDestination = ref(false);
        const isLoading = ref(false);
        const selectedTripId = ref(null);
        const drivers = ref([]);
        const clients = ref([]);
        const vehicles = ref([]);
        const Accounts = ref([]);
        const fuelPurchaseOrders = ref([]);
        const tableDataScource = ref([]);
        const openReceivePaymentDrawer = ref(false);
        const openCreateInvoiceDrawer = ref(false);
        const deliveryNotes = ref([]);
        // const alreadyAddedItems = ref(new Set());

        const formState2 = reactive({
            client_id: "",
            account_id: "",
            // supplier_id: "",
            total_amount: "",
            invoice_ids: [],
        });

        const invoiceDetails = reactive({
            invoices: [],
        });

        const fetchAllData = async () => {
            await Promise.all([
                fetchTrips(),
                fetchDrivers(),
                fetchFuelPurchaseOrders(),
                fetchClients(),
                fetchVehicles(),
                fetchAccounts(),
            ]);
        };

        const fetchTrips = async () => {
            try {
                const response = await DataService.get("/trips");
                console.log("Trips fetched", response.data.Trips);
                if (
                    response.status === 200 &&
                    Array.isArray(response.data.Trips)
                ) {
                    tableDataScource.value = response.data.Trips.map(
                        (trip) => ({
                            key: trip.id,
                            name: (
                                <span class="ninjadash-username">
                                    {trip.name}
                                </span>
                            ),
                            drivers: (
                                <ul>
                                    {trip.drivers.map((driver) => (
                                        <li key={driver.id}>
                                            {driver.first_name}
                                        </li>
                                    ))}
                                </ul>
                            ),
                            status: (
                                <span
                                    class={`ninjadash-status ninjadash-status-${trip.trip_status}`}
                                >
                                    {trip.trip_status}
                                </span>
                            ),
                            client_id: trip.client_id,
                            invoices: trip.invoices,
                        }),
                    );
                } else {
                    tableDataScource.value = [];
                }
            } catch (error) {
                console.error("Error fetching trips:", error);
                toast.error("An error occurred. Please try again.");
            }
        };

        const fetchDrivers = async () => {
            try {
                const response = await DataService.get(`/drivers`);
                drivers.value = response.data.Drivers;
            } catch (error) {
                console.error("Error fetching drivers:", error);
            }
        };

        const fetchVehicles = async () => {
            try {
                const response = await DataService.get(`/vehicle`);
                vehicles.value = response.data.Vehicles;
            } catch (error) {
                console.error("Error fetching vehicles:", error);
            }
        };

        const fetchFuelPurchaseOrders = async () => {
            try {
                const response = await DataService.get(`/fuel_purchase_order`);
                fuelPurchaseOrders.value = response.data.Fuel_purchase_orders;
            } catch (error) {
                console.error("Error fetching fuel purchase orders:", error);
            }
        };

        const fetchClients = async () => {
            try {
                const response = await DataService.get(`/clients`);
                clients.value = response.data.Clients;
            } catch (error) {
                console.error("Error fetching clients:", error);
            }
        };

        const fetchAccounts = async () => {
            try {
                const response = await DataService.get(`/account`);
                console.log("Accounts fetched", response.data.Accounts);
                Accounts.value = response.data.Accounts;
            } catch (error) {
                console.error("Error fetching accounts:", error);
                if (error.response) {
                    console.error("Error response:", error.response);
                }
            }
        };

        const dataTableColumn = [
            {
                title: "Trip Name",
                dataIndex: "name",
                key: "name",
            },
            {
                title: "Drivers",
                dataIndex: "drivers",
                key: "drivers",
            },
            {
                title: "Status",
                dataIndex: "status",
                key: "status",
            },
            {
                title: "Actions",
                dataIndex: "action",
                key: "action",
                width: "90px",
                customRender: ({ record }) => {
                    const statusText = record.status.children[0].children;
                    const isCompleted =
                        !statusText.includes("pending") &&
                        !statusText.includes("ongoing");
                    const isOngoing = statusText.includes("ongoing");

                    const hasUnpaidInvoices = record.invoices.some(
                        (invoice) => invoice.payment_status === "pending",
                    );

                    const hasUnpaidInvoices2 = isCompleted && hasUnpaidInvoices;
                    return (
                        <div class="table-actions">
                            {isCompleted && (
                                <button
                                    style="cursor: pointer"
                                    class="edit"
                                    onClick={() =>
                                        createInvoice(
                                            record.key,
                                            record.client_id,
                                        )
                                    }
                                >
                                    <span style="color: blue; ">
                                        Create Invoice
                                    </span>
                                </button>
                            )}
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
                                    handleActionChange(
                                        event,
                                        record.key,
                                        record.client_id,
                                    )
                                }
                            >
                                <option value="">More Actions</option>
                                {hasUnpaidInvoices2 && (
                                    <option value="receivePayment">
                                        Receive Payment
                                    </option>
                                )}
                                {!isCompleted && (
                                    <option value="editTrip">Edit</option>
                                )}
                                (
                                <option value="viewTrip">
                                    View Trip's Info
                                </option>
                                )
                                {isOngoing && (
                                    <option value="endTrip">End Trip</option>
                                )}
                            </select>

                            <button
                                class="delete"
                                onClick={() => deleteTrip(record.key)}
                            >
                                <unicon name="trash"></unicon>
                            </button>
                        </div>
                    );
                },
            },
        ];

        //Start of Receive Payment

        const handleActionChange = (event, key, clientId) => {
            const action = event.target.value;
            switch (action) {
                case "receivePayment":
                    receivePayment(clientId);
                    break;
                case "createInvoice":
                    createInvoice(key, clientId);
                    break;

                case "editTrip":
                    editTrip(key, clientId);
                    break;

                case "viewTrip":
                    viewTrip(key);
                    break;

                case "endTrip":
                    showModal(key, clientId);
                    break;

                default:
                    console.log("No action selected");
            }
        };

        const filteredInvoices = computed(() => {
            return invoiceDetails.invoices.filter(
                (invoice) =>
                    invoice.total_amount !== "0" &&
                    invoice.payment_status !== "paid",
            );
        });

        const receivePayment = async (clientId) => {
            isLoading.value = true;
            console.log("Which is this  id on  receive payment:", clientId);

            try {
                const response = await DataService.get(`/clients/${clientId}`);
                console.log(
                    "Details fetched of client for receving  payment",
                    response.data.Client,
                );

                Object.assign(invoiceDetails, response.data.Client);
                formState2.client_id = response.data.Client.id;
                invoiceDetails.invoices = response.data.Client.invoices || [];

                // Collect invoice ids
                formState2.invoice_ids = invoiceDetails.invoices
                    .filter((invoice) => invoice.total_amount !== "0")
                    .map((invoice) => invoice.id);
            } catch (error) {
                console.error("Error fetching Invoice:", error);
                if (error.response) {
                    console.error("Error response:", error.response);
                }
            } finally {
                isLoading.value = false;
                openReceivePaymentDrawer.value = true;
            }

            // formState2.supplier_id = supplierId;

            // openBilPaymentDrawer.value = true;
        };

        const handleUpdateReceivePayment = async () => {
            if (!formState2.client_id || !formState2.account_id) {
                toast.error("Please fill in all required fields.");
                return; // Prevent form submission
            }

            // const selectedClient = Clients.value.find(
            //     (client) => client.id === formState.client_id,
            // );
            // if (!selectedClient) {
            //     toast.error("Please select client.");
            //     return; // Prevent form submission
            // }

            // const selectedAccount = Accounts.value.find(
            //     (account) => account.id === formState.account_id,
            // );
            // if (!selectedAccount) {
            //     toast.error("Please select account.");
            //     return; // Prevent form submission
            // }

            const formData3 = new FormData();

            formData3.append("client_id", formState2.client_id);
            formData3.append("account_id", formState2.account_id);
            formData3.append("total_amount", formState2.total_amount);
            formState2.invoice_ids.forEach((id, index) => {
                formData3.append(`invoice_ids[${index}]`, id);
            });

            try {
                isLoading.value = true;
                const response = await DataService.post(
                    "/update_invoice_payment",
                    formData3,
                );

                if (response.status === 201) {
                    toast.success("Record Saved Successfully");
                    formState2.client_id = "";
                    formState2.account_id = "";
                    formState2.total_amount = "";
                    formState2.invoice_ids = [];

                    onCloseReceivePaymentDrawer();

                    await fetchClients();

                    router.push({
                        path: "/app/trips",
                    });
                } else {
                    toast.error("Failed to add record. Please try again.");
                }
            } catch (error) {
                console.error("Record Add error", error);
                toast.error("An error occurred. Please try again.");
            } finally {
                isLoading.value = false;
            }
        };

        const onCloseReceivePaymentDrawer = () => {
            openReceivePaymentDrawer.value = false;
        };

        // Computed property to calculate the total amount
        const totalAmount = computed(() => {
            return invoiceDetails.invoices.reduce(
                (acc, invoice) => acc + parseFloat(invoice.total_amount || 0),
                0,
            );
        });

        // Watcher or method to update formState2.total_amount when totalAmount changes
        watch(totalAmount, (newTotal) => {
            formState2.total_amount = newTotal.toFixed(2);
        });

        //End of Receive Payment

        const handleRowClick = (record) => {
            console.log("Row clicked:", record);

            viewTrip(record.key);
        };

        const viewTrip = (tripId) => {
            router.push(`/app/trips/${tripId}`);
        };

        const formState = reactive({
            client_id: "",
            truck_id: "",
            trip_weight: "",
            trip_status: "",
            odometer_reading: "",
            kms_done: "",
            litres_consumed: "",
            description: "",
        });

        const formState1 = reactive({
            location: "",
        });

        const destinationFormState = reactive({
            location: "",
            delivery_date: "",
        });

        const showModal = async (tripId, clientId) => {
            selectedTripId.value = tripId;
            formState.client_id = clientId;

            const tripDetailsResponse = await DataService.get(
                `/trips/${tripId}`,
                { params: { client_id: clientId } },
            );
            console.log(
                "I want to see details of truck when showing this modal",
                tripDetailsResponse.data,
            );
            if (tripDetailsResponse.status === 200) {
                const tripDetails = tripDetailsResponse.data.Trip;
                formState.truck_id = tripDetails.truck_id;
                formState.litres_consumed = tripDetails.litres_consumed || "";
                formState.kms_done = tripDetails.kms_done || "";
                formState.trip_weight = tripDetails.trip_weight || "";
                formState.description = tripDetails.description || "";
                visible.value = true;
            } else {
                console.error("Failed to fetch trip details");
            }
        };

        const editTrip = (tripId, clientId) => {
            router.push({
                path: `/app/trips/edit/${tripId}`,
                query: { client_id: clientId },
            });
        };

        const deleteTrip = async (tripId) => {
            if (
                window.confirm(
                    "Are you sure you want to delete this trip? This action cannot be undone.",
                )
            ) {
                try {
                    await DataService.delete(`/trips/${tripId}`);
                    toast.success("Trip deleted successfully.");
                    await fetchTrips();
                } catch (error) {
                    toast.error("Failed to delete trip. Please try again.");
                }
            }
        };

        // Start of Create Invoice Drawe //
        const onCloseCreateInvoiceDrawer = () => {
            openCreateInvoiceDrawer.value = false;
        };

        const createInvoice = async (tripId, clientId) => {
            isLoading.value = true;
            console.log(
                "Which is this  id on  receive payment:",
                tripId,
                clientId,
            );

            try {
                const response = await DataService.get(
                    `/delivery-notes/trip/${tripId}/client/${clientId}`,
                );

                deliveryNotes.value = response.data.Delivery_notes;
                console.log(
                    "I want to see delivery notes",
                    deliveryNotes.value,
                );
                formCreateInvoice.client_id = clientId;
                formCreateInvoice.trip_id = tripId;
                formCreateInvoice.client_name =
                    deliveryNotes.value.client.user.first_name +
                    " " +
                    deliveryNotes.value.client.user.last_name;
            } catch (error) {
                console.error("Error fetching Invoice:", error);
                if (error.response) {
                    console.error("Error response:", error.response);
                }
            } finally {
                isLoading.value = false;
                openCreateInvoiceDrawer.value = true;
            }
        };

        const formCreateInvoice = reactive({
            client_id: "",
            trip_id: "",
            client_name: "",
            invoice_number: "",
            invoice_date: "",
            total_amount: "",
            status: "",
            due_payment: "",
            payment_status: "",
            item_description: "",
            quantity: "",
            vat: false,
            vat_amount: 0,
            subtotal: 0,
            notes: "",
            due_date: "",
            tax_date: "",
            payment_terms: "",
            lpo_no: "",
            items: [],
            subTotal: 0,
            taxTotal: 0,
            total: 0,
            date: "",
        });

        const addItem = () => {
            formCreateInvoice.items.push({
                itemDescription: "",
                containerNumber: "",
                deliveryNoteNumber: "",
                deliveryNoteFileRef: "",
                loadingPoint: "",
                offLoadingPoint: "",
                qty: 0,
                price: 0,
                tax: "16%",
                lineTotal: 0,
            });
        };

        const updateLineTotal = (index) => {
            const item = formCreateInvoice.items[index];
            item.lineTotal = (item.price * 1.16).toFixed(2); // Assuming tax is included in line total
            updateSubtotalAndTotal();
        };

        const noItemsAvailable = ref(false);

        const addItemsFromDeliveryNotes = () => {
            noItemsAvailable.value = false; // Reset the flag initially

            if (
                !Array.isArray(deliveryNotes.value) ||
                deliveryNotes.value.length === 0
            ) {
                formCreateInvoice.items = [];
                noItemsAvailable.value = true; // Set flag to true if no delivery notes are available
                return;
            }

            const alreadyAddedItems = new Set(
                formCreateInvoice.items.map(
                    (item) => `${item.deliveryNoteId}-${item.itemId}`,
                ),
            );

            const newItems = deliveryNotes.value.reduce((acc, note) => {
                if (!note.is_associated_with_invoice) {
                    // Check if the note is not associated with an invoice
                    const noteItems = note.items
                        .map((item) => {
                            const uniqueKey = `${note.id}-${item.id}`;
                            if (!alreadyAddedItems.has(uniqueKey)) {
                                return {
                                    itemDescription:
                                        item.itemDescription || "N/A",
                                    containerNumber:
                                        item.containerNumber || "N/A",
                                    deliveryNoteId: note.id,
                                    deliveryNoteFileRef:
                                        item.containerRefNo || "N/A",
                                    loadingPoint:
                                        item.pick_up_location || "N/A",
                                    offLoadingPoint: item.destination || "N/A",
                                    qty: item.quantity || 0,
                                    price: item.price || 0,
                                    tax: "16%",
                                    lineTotal: (
                                        (item.price || 0) * 1.16
                                    ).toFixed(2),
                                    itemId: item.id,
                                };
                            }
                        })
                        .filter((item) => item !== undefined);

                    return acc.concat(noteItems);
                }
            }, []);

            if (newItems.length === 0) {
                noItemsAvailable.value = true; // Set flag to true if no new items were added
            } else {
                formCreateInvoice.items =
                    formCreateInvoice.items.concat(newItems);
            }

            updateSubtotalAndTotal();
        };

        const updateSubtotalAndTotal = () => {
            formCreateInvoice.subTotal = formCreateInvoice.items.reduce(
                (total, item) => {
                    return total + parseFloat(item.lineTotal || 0);
                },
                0,
            );
            formCreateInvoice.taxTotal = (
                formCreateInvoice.subTotal * 0.16
            ).toFixed(2);
            formCreateInvoice.total = (
                formCreateInvoice.subTotal +
                parseFloat(formCreateInvoice.taxTotal)
            ).toFixed(2);
        };

        const clientName2 = computed(() => {
            const client = clients.value.find(
                (client) => client.id === formCreateInvoice.client_id,
            );
            return client
                ? `${client.user.first_name} ${client.user.last_name}`
                : "";
        });

        watch(
            () => formCreateInvoice.client_id,
            () => {
                formCreateInvoice.client_name = clientName2.value;
            },
        );

        const generateInvoiceNumber = () => {
            return Math.floor(100000 + Math.random() * 900000).toString(); // Generates a random 6-digit number
        };

        const handleSubmitCreateInvoice = async () => {
            if (
                !formCreateInvoice.client_id ||
                !formCreateInvoice.invoice_date
            ) {
                toast.error("Please fill in all required fields.");
                return;
            }

            // Prepare form data
            const formData = {
                lpo_no: formCreateInvoice.lpo_no
                    ? String(formCreateInvoice.lpo_no)
                    : "",
                invoice_number: formCreateInvoice.invoice_number
                    ? String(formCreateInvoice.invoice_number)
                    : "",
                client_id: String(formCreateInvoice.client_id),
                trip_id: String(formCreateInvoice.trip_id),
                invoice_date: new Date(formCreateInvoice.invoice_date)
                    .toISOString()
                    .split("T")[0],
                total_amount: String(formCreateInvoice.total),
                subtotal: String(formCreateInvoice.subTotal),
                vat: formCreateInvoice.vat ? "Yes" : "No",
                vat_amount: formCreateInvoice.taxTotal
                    ? String(formCreateInvoice.taxTotal)
                    : "",
                notes: formCreateInvoice.notes
                    ? String(formCreateInvoice.notes)
                    : "",
                due_date: formCreateInvoice.due_date
                    ? new Date(formCreateInvoice.due_date)
                          .toISOString()
                          .split("T")[0]
                    : null,
                tax_date: formCreateInvoice.tax_date
                    ? new Date(formCreateInvoice.tax_date)
                          .toISOString()
                          .split("T")[0]
                    : null,
                payment_terms: formCreateInvoice.payment_terms
                    ? String(formCreateInvoice.payment_terms)
                    : "",
                status: formCreateInvoice.status
                    ? String(formCreateInvoice.status)
                    : "",
                due_payment: formCreateInvoice.due_payment
                    ? String(formCreateInvoice.due_payment)
                    : "",
                payment_status: formCreateInvoice.payment_status
                    ? String(formCreateInvoice.payment_status)
                    : "",
                items: formCreateInvoice.items.map((item) => ({
                    itemDescription: String(item.itemDescription),
                    containerNumber: item.containerNumber
                        ? String(item.containerNumber)
                        : "",
                    deliveryNoteId: item.deliveryNoteId, // Ensure this is included
                    deliveryNoteFileRef: item.deliveryNoteFileRef
                        ? String(item.deliveryNoteFileRef)
                        : "",
                    loadingPoint: String(item.loadingPoint),
                    offLoadingPoint: String(item.offLoadingPoint),
                    qty: String(item.qty),
                    price: String(item.price),
                    tax: String(item.tax),
                    lineTotal: String(item.lineTotal),
                })),
            };

            console.log("Form data to be submitted:", formData);

            try {
                isLoading.value = true;
                const response = await DataService.post("/invoices", formData);

                if (response.status === 201) {
                    toast.success("Invoice created successfully");
                    resetForm2();
                    onCloseCreateInvoiceDrawer();
                    await fetchTrips();
                    router.push({ path: "/app/trips" });
                } else {
                    toast.error("Failed to create invoice. Please try again.");
                }
            } catch (error) {
                console.error("Error creating invoice:", error);
                toast.error("An error occurred. Please try again.");
            } finally {
                isLoading.value = false;
            }
        };

        const resetForm2 = () => {
            formCreateInvoice.client_id = "";
            formCreateInvoice.invoice_number = generateInvoiceNumber(); // Reset to a new random invoice number
            formCreateInvoice.total_amount = "";
            formCreateInvoice.subtotal = "";
            formCreateInvoice.trip_id = "";
            formCreateInvoice.vat_amount = "";
            formCreateInvoice.due_payment = "";
            formCreateInvoice.due_date = "";
            formCreateInvoice.tax_date = "";
            formCreateInvoice.item_description = "";
            formCreateInvoice.quantity = "";
            formCreateInvoice.payment_terms = "";
            formCreateInvoice.notes = "";
            formCreateInvoice.lpo_no = "";
            formCreateInvoice.items = [];
            formCreateInvoice.subTotal = 0;
            formCreateInvoice.taxTotal = 0;
            formCreateInvoice.total = 0;
        };

        //End of Create Invoice Drawer //
        const form = reactive({
            client_id: "",
            trip_weight: "",
            trip_status: "",
            description: "",
            name: "",
            origin: "",
            driver_ids: [],
            remarks: "",
            review_points: "",
            fuel_dispensation_id: "",
            value: "",
            previous_kms: "",
            previous_litres: "",
            litres_given: "",
            kms_done: "",
            fuel_purchase_id: "",
            fuel_type: "",
            quantity: "",
            quantity_abbreviation_name: "",
            quantity_abbreviation_id: "",
            dispense_date: "",
            odometer_reading: "",
            dispense_location: "",
            selectedTruckRegistration: "",
            truck_id: "",
        });

        const handleFileUpload = (event, fieldName) => {
            const file = event.target.files[0];
            if (file) {
                form[fieldName] = file;
            }
        };

        const handleSubmit = async () => {
            if (
                !form.name ||
                !formState.client_id ||
                !form.driver_ids.length ||
                !pickupLocation.value.location
            ) {
                toast.error("Please fill in all required fields.");
                return;
            }

            const tripDetails = {
                name: form.name,
                client_id: formState.client_id, // Ensure client_id is part of the trip details
                description: form.description,
                driver_ids: form.driver_ids,
                remarks: form.remarks,
                review_points: form.review_points,
                fuel_dispensation_id: form.fuel_dispensation_id,
                value: form.value,
                previous_kms: form.previous_kms,
                previous_litres: form.previous_litres,
                litres_given: form.litres_given,
                litres_consumed: form.litres_consumed,
                kms_done: form.kms_done,
                trip_weight: form.trip_weight,
                pickup_location: {
                    location: pickupLocation.value.location,
                    items: pickupLocation.value.items.map((item) => ({
                        container: item.container,
                        description: item.itemDescription,
                        quantity: item.quantity,
                    })),
                },
                destinations: destinations.value.map((dest) => ({
                    location: dest.location,
                    delivery_date: dest.delivery_date,
                    items: dest.items.map((item) => ({
                        container: item.container,
                        description: item.description,
                        quantity: item.quantity,
                    })),
                })),
            };

            console.log("What am i submitting", tripDetails);

            try {
                isLoading.value = true;
                const response = await DataService.post("/trips", tripDetails);

                if (response.status === 201) {
                    toast.success("Trip started successfully");
                    resetForm();
                    await fetchTrips();
                    router.push("/app/trips");
                } else {
                    toast.error("Failed to start trip. Please try again.");
                }
            } catch (error) {
                console.error("API call failed: ", error);
                if (error.response) {
                    // Handle HTTP-specific errors
                    toast.error(`Error: ${error.response.data.message}`);
                } else {
                    // Handle generic errors like network issues
                    toast.error("Network error, please try again later.");
                }
            } finally {
                isLoading.value = false;
            }
        };

        const resetForm = () => {
            form.name = "";
            form.client_id = ""; // Ensure client_id is reset
            form.description = "";
            form.driver_ids = [];
            form.remarks = "";
            form.review_points = "";
            form.fuel_dispensation_id = "";
            form.value = "";
            form.previous_kms = "";
            form.previous_litres = "";
            form.litres_given = "";
            form.litres_consumed = "";
            form.kms_done = "";
            form.trip_weight = "";
            pickupLocation.value = { location: "", items: [] };
            destinations.value = [];
        };
        const showCreateTrip = () => {
            router.push("/app/trips/create").then(() => {
                window.location.reload();
            });

            //open.value = true;
        };

        const onClose = () => {
            open.value = false;
        };

        onMounted(async () => {
            await fetchAllData();
            formCreateInvoice.invoice_number = generateInvoiceNumber();
        });

        const handleCancel = () => {
            visible.value = false;
        };

        const showModalForPickup = () => {
            visibleForPickup.value = true;
        };

        const onCancelModalForPickup = () => {
            visibleForPickup.value = false;
        };

        const handleCancelModalForPickup = () => {
            onCancelModalForPickup();
        };

        const showModalForDest = () => {
            visibleForDestination.value = true;
        };

        const onCancelModalForDest = () => {
            visibleForDestination.value = false;
        };

        const handleCancelModalForDest = () => {
            onCancelModalForDest();
        };

        const handleEndTrip = async () => {
            const updatedTripInfo = { ...formState };
            try {
                const response = await DataService.put(
                    `/trips_end/${selectedTripId.value}`,
                    updatedTripInfo,
                );
                if (response.status === 200) {
                    toast.success("Trip completed successfully.");
                    await fetchTrips();
                    visible.value = false;
                } else {
                    toast.error("Failed to end trip. Please try again.");
                }
            } catch (error) {
                console.error("Error updating trip:", error);
                toast.error("An error occurred. Please try again.");
            }
        };

        watch(
            () => form.fuel_purchase_id,
            (newVal) => {
                const selectedOrder = fuelPurchaseOrders.value.find(
                    (order) => order.id === newVal,
                );
                if (selectedOrder) {
                    form.fuel_type = selectedOrder.fuel_type;
                    form.quantity = selectedOrder.quantity;
                    form.quantity_abbreviation_name =
                        selectedOrder.quantityabbreviationid.name;
                    form.quantity_abbreviation_id =
                        selectedOrder.quantityabbreviationid.id;
                } else {
                    form.fuel_type = "";
                    form.quantity = "";
                    form.quantity_abbreviation_name = "";
                    form.quantity_abbreviation_id = "";
                }
            },
        );

        watch(
            () => form.selectedTruckRegistration,
            (newVal) => {
                const selectedTruck = vehicles.value.find(
                    (vehicle) => vehicle.registration_no === newVal,
                );
                if (selectedTruck) {
                    form.truck_id = selectedTruck.id;
                } else {
                    form.truck_id = "";
                }
            },
        );

        const lineItems = ref([
            { container: "", itemDescription: "", quantity: "", amount: "" },
        ]);
        const pickupLocation = ref(null);
        const destinations = ref([]);
        const selectedPickupItem = ref("");
        const allPickupItems = computed(() => {
            return pickupLocation.value ? pickupLocation.value.items : [];
        });

        const addLineItem = () => {
            lineItems.value.push({
                container: "",
                itemDescription: "",
                quantity: "",
                amount: "",
            });
        };

        const removeLastLineItem = () => {
            if (lineItems.value.length > 1) {
                lineItems.value.pop();
            } else {
                toast.warning("Cannot remove the last line item.");
            }
        };

        const savePickupLocation = () => {
            if (!formState1.location) {
                toast.error("Please complete the required fields.");
                return;
            }

            pickupLocation.value = {
                location: formState1.location,
                items: [...lineItems.value],
            };

            visibleForPickup.value = false;
            lineItems.value = [
                {
                    container: "",
                    itemDescription: "",
                    quantity: "",
                    amount: "",
                },
            ];
            formState1.location = "";
        };

        const isItemSelected = (container) => {
            return destinations.value.some((dest) =>
                dest.items.includes(container),
            );
        };

        const saveDestination = () => {
            if (!destinationFormState.location) {
                toast.error("Please enter a destination.");
                return;
            }

            if (!selectedPickupItem.value) {
                toast.error(
                    "Please select at least one item from the pickup list.",
                );
                return;
            }

            const selectedPickupItemDetails = allPickupItems.value.find(
                (item) => item.container === selectedPickupItem.value,
            );

            destinations.value.push({
                location: destinationFormState.location,
                delivery_date: destinationFormState.delivery_date,
                items: [
                    {
                        container: selectedPickupItemDetails.container,
                        description: selectedPickupItemDetails.itemDescription,
                        quantity: selectedPickupItemDetails.quantity,
                    },
                ],
            });

            visibleForDestination.value = false;
            selectedPickupItem.value = "";
            destinationFormState.location = "";
            destinationFormState.delivery_date = "";
        };

        const clientName = computed(() => {
            const client = clients.value.find(
                (c) => c.id === formState.client_id,
            );
            return client ? client.user.first_name : "";
        });

        const driverNames = computed(() => {
            return form.driver_ids
                .map((id) => {
                    const driver = drivers.value.find((d) => d.id === id);
                    return driver ? driver.first_name : "";
                })
                .join(", ");
        });

        return {
            tableDataScource,
            dataTableColumn,
            form,
            //  done,
            open,
            // showDrawer,
            addLineItem,
            removeLastLineItem,
            lineItems,
            pickupLocation,
            destinations,
            selectedPickupItem,
            allPickupItems,
            onClose,
            handleSubmit,
            isLoading,
            handleFileUpload,
            fuelPurchaseOrders,
            drivers,
            visible,
            visibleForPickup,
            showModalForDest,
            onCancelModalForDest,
            handleCancelModalForDest,
            visibleForDestination,
            showModal,
            handleCancel,
            formState,
            formState1,
            destinationFormState,
            handleEndTrip,
            clients,
            Accounts,
            vehicles,
            status,
            isFinished,
            current,
            handleCancelModalForPickup,
            showModalForPickup,
            steps: [
                { title: "Basic Information", content: "step_one" },
                { title: "Pickup & Destination", content: "step_two" },
                { title: "Driver & Fuel Details", content: "step_three" },
                { title: "Summary", content: "summary" },
            ],
            savePickupLocation,
            saveDestination,
            isItemSelected,
            clientName,
            driverNames,
            isStepValid,
            showCreateTrip,
            handleRowClick,
            onCloseCreateInvoiceDrawer,
            handleSubmitCreateInvoice,
            openCreateInvoiceDrawer,
            openReceivePaymentDrawer,
            addItem,
            updateLineTotal,
            addItemsFromDeliveryNotes,
            clientName2,
            formCreateInvoice,
            placement1,
            handleUpdateReceivePayment,
            formState2,
            filteredInvoices,
            noItemsAvailable,
        };
    },
});
</script>

<style scoped>
table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
}
th,
td {
    border: 1px solid #000;
    padding: 8px;
    text-align: center;
}
th {
    background-color: #f2f2f2;
}
.invoice-header td {
    border: none;
    text-align: left;
}
.total-row td {
    border: none;
}
.total-row .label {
    text-align: right;
    padding-right: 20px;
}
.custom-select {
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

.custom-select:focus {
    outline: none;
    border-color: #007bff; /* Change border color on focus */
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); /* Add a subtle shadow on focus */
}

.input-data {
    width: 150px;
    height: 10px;
    padding: 10px;
    border-radius: 5px;
    border: 0.5px solid gray;
}

.loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}
.list-item {
    color: #333;
}

.invoice-header td {
    border: none;
    text-align: left;
}
.total-row td {
    border: none;
}
.total-row .label {
    text-align: right;
    padding-right: 20px;
}
.loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}
.custom-select {
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

.custom-select:focus {
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

.input-data {
    width: 150px;
    height: 10px;
    padding: 10px;
    border-radius: 5px;
    border: 0.5px solid gray;
}

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

.rtl .invoice-body .invoice-total-amount p {
    text-align: left !important;
}
</style>
