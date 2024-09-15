<template>
    <Main>
        <a-row :gutter="15">
            <a-col :xs="24">
                <BorderLessHeading>
                    <sdCards title="Manage Sales Orders">
                        <a-row>
                            <a-col
                                style="display: flex; justify-content: flex-end"
                                :span="24"
                            >
                                <!-- <a-button
                                    style="margin-top: -30px"
                                    type="primary"
                                    @click="showDrawer"
                                >
                                    <template #icon>
                                        <PlusOutlined />
                                    </template>
                                    + Add New
                                </a-button> -->
                                <a-drawer
                                    title="Create Sales Order"
                                    :width="1200"
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
                                        <form :model="form" layout="vertical">
                                            <table>
                                                <!-- Sales Order Details -->
                                                <tr class="invoice-header">
                                                    <td>
                                                        <label
                                                            for="client-select"
                                                            >Select
                                                            Client</label
                                                        >
                                                        <select
                                                            id="client-select"
                                                            v-model="
                                                                form.client_id
                                                            "
                                                            @change="
                                                                handleClientChange
                                                            "
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
                                                        </select>
                                                    </td>
                                                    <td>
                                                        Order Number #{{
                                                            form.order_number
                                                        }}
                                                    </td>
                                                    <td>
                                                        Order Date
                                                        <a-date-picker
                                                            v-model:value="
                                                                form.order_date
                                                            "
                                                            format="YYYY-MM-DD"
                                                        />
                                                    </td>
                                                </tr>
                                            </table>

                                            <!-- Delivery Notes Section -->
                                            <template
                                                v-for="(
                                                    note, noteIndex
                                                ) in form.delivery_notes"
                                                :key="noteIndex"
                                            >
                                                <table>
                                                    <tr>
                                                        <td colspan="5">
                                                            <h4>
                                                                Delivery Note
                                                                #{{
                                                                    note.delivery_note_number
                                                                }}
                                                            </h4>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            Delivery Date:
                                                            <a-date-picker
                                                                v-model:value="
                                                                    note.delivery_date
                                                                "
                                                                format="YYYY-MM-DD"
                                                            />
                                                        </td>
                                                    </tr>
                                                    <!-- Table Headers for Items -->
                                                    <tr>
                                                        <th>
                                                            Item Description
                                                        </th>
                                                        <th>Cargo Type</th>
                                                        <th>Pickup Location</th>
                                                        <th>Destination</th>
                                                        <th>Qty</th>
                                                    </tr>
                                                    <!-- Loop through each item in the delivery note -->
                                                    <template
                                                        v-for="(
                                                            item, itemIndex
                                                        ) in note.items"
                                                        :key="itemIndex"
                                                    >
                                                        <tr>
                                                            <td>
                                                                <input
                                                                style="width: 200px;"
                                                                    class="custom-input"
                                                                    type="text"
                                                                    v-model="
                                                                        item.itemDescription
                                                                    "
                                                                />
                                                            </td>
                                                            <td>
                                                                <select
                                                                    class="custom-input"
                                                                    v-model="
                                                                        item.cargo_type
                                                                    "
                                                                >
                                                                    <option
                                                                        value=""
                                                                    ></option>
                                                                    <option
                                                                        value="20ft container"
                                                                    >
                                                                        20ft
                                                                        container
                                                                    </option>
                                                                    <option
                                                                        value="40ft container"
                                                                    >
                                                                        40ft
                                                                        container
                                                                    </option>
                                                                    <option
                                                                        value="Loose Cargo Container"
                                                                    >
                                                                        Loose
                                                                        Cargo
                                                                        Container
                                                                    </option>
                                                                    <option
                                                                        value="Empty Container"
                                                                    >
                                                                        Empty
                                                                        Container
                                                                    </option>
                                                                </select>
                                                            </td>
                                                            <td>
                                                                <input
                                                                class="custom-input"
                                                                type="text"
                                                                v-model="
                                                                    item.pick_up_location
                                                                "
                                                            />
                                                            </td>
                                                            <td>
                                                                <input
                                                                    class="custom-input"
                                                                    type="text"
                                                                    v-model="
                                                                        item.destination
                                                                    "
                                                                />
                                                            </td>
                                                            <td>
                                                                <input
                                                                    class="custom-input"
                                                                    type="text"
                                                                    v-model="
                                                                        item.qty
                                                                    "
                                                                />
                                                            </td>
                                                        </tr>
                                                    </template>
                                                </table>

                                                <!-- Add/Remove Line Item Buttons -->
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
                                                            addLineItem(
                                                                noteIndex,
                                                            )
                                                        "
                                                    >
                                                        + Add Line Item
                                                    </sdButton>
                                                    <sdButton
                                                        size="small"
                                                        type="danger"
                                                        @click.prevent="
                                                            removeLastLineItem(
                                                                noteIndex,
                                                            )
                                                        "
                                                    >
                                                        - Remove Line Item
                                                    </sdButton>
                                                </div>
                                            </template>

                                            <!-- Add/Remove Delivery Note Buttons -->
                                            <div
                                                style="
                                                    margin-top: 20px;
                                                    display: flex;
                                                    justify-content: space-between;
                                                "
                                            >
                                                <a-button
                                                    type="primary"
                                                    @click="addDeliveryNote"
                                                    >+ Add Delivery
                                                    Note</a-button
                                                >
                                                <a-button
                                                    type="danger"
                                                    @click="
                                                        removeLastDeliveryNote
                                                    "
                                                    >- Remove Delivery
                                                    Note</a-button
                                                >
                                            </div>

                                            <!-- Save/Cancel Buttons -->
                                            <div
                                                style="margin-top: 40px"
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
                                                    type="light"
                                                    @click.prevent="onClose"
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
                            @search="fetchSalesOrders"
                        />
                    </sdCards>
                </BorderLessHeading>
            </a-col>
        </a-row>
    </Main>
</template>

<script>
import { DataService } from "@/config/dataService/dataService";
import { defineComponent, reactive, ref, onMounted } from "vue";
import { Main } from "../../../styled";
import DataTables from "@/components/table/DataTable.vue";
import { BorderLessHeading } from "../../../styled";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

export default defineComponent({
    name: "SalesOrder",
    components: {
        Main,
        DataTables,
        BorderLessHeading,
    },
    setup() {
        const router = useRouter();
        const toast = useToast();

        const isLoading = ref(false);
        const clients = ref([]);
        const tableDataScource = ref([]);
        const open = ref(false);
        const showDeliveryNoteForm = ref(false);

        const dataTableColumn = [
            {
                title: "Client",
                dataIndex: "client",
                key: "user",
            },
            {
                title: "Order Date",
                dataIndex: "order_date",
                key: "order_date",
            },
            {
                title: "Order Number",
                dataIndex: "order_number",
                key: "order_number",
            },

            {
                title: "Actions",
                dataIndex: "action",
                key: "action",
                width: "90px",
                customRender: ({ record }) => {
                    return (
                        <div class="table-actions">
                            <button
                                class="view"
                                onClick={() => viewOrder(record.key)}
                            >
                                <unicon name="eye"></unicon>
                            </button>
                            <button
                                class="edit"
                                onClick={() => editOrder(record.key)}
                            >
                                <unicon name="edit"></unicon>
                            </button>
                            <button
                                class="delete"
                                onClick={() => deleteOrder(record.key)}
                            >
                                <unicon name="trash"></unicon>
                            </button>
                        </div>
                    );
                },
            },
        ];

        const fetchAllData = async () => {
            await Promise.all([fetchSalesOrders(), fetchClients()]);
        };

        const fetchSalesOrders = async (orderDate = null) => {
            try {
                let response;
                if (orderDate) {
                    // Call the searchDrivers method if  orderDate is provided
                    response = await searchInvoices(orderDate);
                } else {
                    // Existing logic to fetch all sales orders
                    response = await DataService.get("/sales_orders");
                    console.log("Sales fetched", response.data);
                    if (response.status === 200) {
                        if (Array.isArray(response.data.Sales_orders)) {
                            // Format the data to match the structure expected by DataTables
                            tableDataScource.value =
                                response.data.Sales_orders.map((order) => ({
                                    key: order.id,
                                    client: order.client.user.first_name,
                                    order_date: order.order_date,
                                    order_number: (
                                        <span>{order.order_number}</span>
                                    ),
                                }));
                        } else {
                            // No drivers found, handle accordingly
                            tableDataScource.value = [];
                        }
                    } else {
                        return;
                        //toast.error("Failed to fetch drivers. Please try again.");
                    }
                }
            } catch (error) {
                console.error("Error fetching sales orders:", error);
                toast.error("An error occurred. Please try again.");
            }
        };

        const searchInvoices = async (orderDate) => {
            try {
                const response = await DataService.get(
                    `/sales_orders/search/${orderDate}`,
                );
                if (
                    response.status === 200 &&
                    Array.isArray(response.data.Sales_orders)
                ) {
                    tableDataScource.value = response.data.Sales_orders.map(
                        (order) => ({
                            key: order.id,
                            client: order.client.user.first_name,
                            order_date: order.order_date,
                            order_number: <span>{order.order_number}</span>,
                        }),
                    );
                } else {
                    tableDataScource.value = [];
                }
            } catch (error) {
                console.error("Error searching sales order:", error);
                toast.error("An error occurred. Please try again.");
            }
        };

        const fetchClients = async () => {
            try {
                const response = await DataService.get("/clients");
                clients.value = response.data.Clients;
            } catch (error) {
                toast.error("Error fetching clients. Please try again.");
            }
        };

        const handleClientChange = () => {
            console.log("Client selected:", form.client_id);
        };

        const handleFileUpload = (event, fieldName) => {
            const file = event.target.files[0];
            if (file) {
                form[fieldName] = file;
            }
        };

        const handleSubmit = async () => {
            if (!form.client_id || !form.order_number || !form.order_date) {
                toast.error("Please fill in all required fields.");
                return;
            }

            const formattedDate = new Date(form.order_date)
                .toISOString()
                .split("T")[0];

            const formData = {
                client_id: form.client_id,
                order_number: form.order_number,
                order_date: formattedDate,
                delivery_notes: form.delivery_notes.map((note) => ({
                    delivery_note_number: note.delivery_note_number,
                    delivery_date: new Date(note.delivery_date)
                        .toISOString()
                        .split("T")[0],
                    items: note.items.map((item) => ({
                        itemDescription: item.itemDescription,
                        cargo_type: item.cargo_type,
                        pick_up_location: item.pick_up_location,
                        destination: item.destination,
                        quantity: item.qty,
                    })),
                })),
            };

            console.log("What am I submitting for sales order", formData);

            try {
                isLoading.value = true;
                const response = await DataService.post(
                    "/sales_orders",
                    formData,
                );
                if (response.status === 201) {
                    toast.success("Order created successfully");
                    resetForm();
                    open.value = false;
                    await fetchSalesOrders();
                    router.push("/app/sales-orders");
                } else {
                    toast.error("Failed to create order. Please try again.");
                }
            } catch (error) {
                toast.error("An error occurred. Please try again.");
            } finally {
                isLoading.value = false;
            }
        };

        const resetForm = () => {
            form.client_id = "";
            form.order_number = generateRandNumber();
            form.order_date = "";

            // Clear the delivery notes and reset to a default state
            form.delivery_notes = [
                {
                    delivery_note_number: generateRandNumber(),
                    delivery_date: "",
                    items: [
                        {
                            itemDescription: "",
                            cargo_type: "",
                            pick_up_location: "",
                            destination: "",
                            qty: "",
                        },
                    ],
                },
            ];
        };

        const generateRandNumber = () => {
            return Math.floor(100000 + Math.random() * 900000).toString();
        };

        const addDeliveryNote = () => {
            form.delivery_notes.push({
                delivery_note_number: generateRandNumber(),
                delivery_date: "",
                items: [
                    {
                        itemDescription: "",
                        cargo_type: "",
                        pick_up_location: "",
                        destination: "",
                        qty: "",
                    },
                ],
            });
        };

        const removeLastDeliveryNote = () => {
            if (form.delivery_notes.length > 1) {
                form.delivery_notes.pop();
            } else {
                toast.warning("Cannot remove the last delivery note.");
            }
        };

        const addLineItem = (noteIndex) => {
            form.delivery_notes[noteIndex].items.push({
                itemDescription: "",
                cargo_type: "",
                pick_up_location: "",
                destination: "",
                qty: "",
            });
        };

        const removeLastLineItem = (noteIndex) => {
            const items = form.delivery_notes[noteIndex].items;
            if (items.length > 1) {
                items.pop();
            } else {
                toast.warning("Cannot remove the last item.");
            }
        };

        const showDrawer = () => {
            open.value = true;
        };

        const onClose = () => {
            open.value = false;
        };

        const viewOrder = (orderId) => {
            router.push(`/app/sales-orders/${orderId}`);
        };

        const editOrder = (orderId) => {
            router.push(`/app/sales-orders/edit/${orderId}`);
        };

        const deleteOrder = async (orderId) => {
            if (confirm("Are you sure you want to delete this order?")) {
                try {
                    await DataService.delete(`/sales_orders/${orderId}`);
                    toast.success("Order deleted successfully.");
                    await fetchSalesOrders();
                } catch (error) {
                    toast.error("Failed to delete order. Please try again.");
                }
            }
        };

        onMounted(async () => {
            await fetchAllData();
            form.order_number = generateRandNumber();
            form.delivery_notes.forEach(
                (note) => (note.delivery_note_number = generateRandNumber()),
            );
        });

        const form = reactive({
            client_id: "",
            order_number: "",
            order_date: "",
            delivery_notes: [
                {
                    delivery_note_number: generateRandNumber(),
                    delivery_date: "",
                    items: [
                        {
                            itemDescription: "",
                            cargo_type: "",
                            pick_up_location: "",
                            destination: "",
                            qty: "",
                        },
                    ],
                },
            ],
        });

        return {
            tableDataScource,
            dataTableColumn,
            form,
            open,
            showDrawer,
            onClose,
            handleSubmit,
            isLoading,
            handleFileUpload,
            clients,
            handleClientChange,
            addLineItem,
            removeLastLineItem,
            showDeliveryNoteForm,
            addDeliveryNote,
            removeLastDeliveryNote,
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
.loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}

.invoice-header td {
    padding: 10px;
}
.table-actions button {
    margin: 0 5px;
}

.custom-input {
    border-width: 0.5px; /* Adjust the thickness here */
    border-style: solid; /* Make sure the border is solid */
    border-color: #000;
    border-radius: 5px;
}
</style>
