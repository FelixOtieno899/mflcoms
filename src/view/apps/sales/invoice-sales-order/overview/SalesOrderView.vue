<template>
    <Main>
        <a-row :gutter="15">
            <a-col :xs="24">
                <BorderLessHeading>
                    <sdCards title="Sales Order Info">
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
                                            <label for="client-select"
                                                >Select Client</label
                                            >
                                            <select
                                                id="client-select"
                                                v-model="form.client_id"
                                                @change="handleClientChange"
                                            >
                                                <option
                                                    v-for="client in clients"
                                                    :key="client.id"
                                                    :value="client.id"
                                                >
                                                    {{ client.user.first_name }}
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
                                            {{form.order_date
                                            }}
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
                                                    Delivery Note #{{
                                                        note.delivery_note_number
                                                    }}
                                                </h4>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Delivery Date:
                                {{ note.delivery_date}}
                                            </td>
                                        </tr>
                                        <!-- Table Headers for Items -->
                                        <tr>
                                            <th>Item Description</th>
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
                                                            20ft container
                                                        </option>
                                                        <option
                                                            value="40ft container"
                                                        >
                                                            40ft container
                                                        </option>
                                                        <option
                                                            value="Loose Cargo Container"
                                                        >
                                                            Loose Cargo
                                                            Container
                                                        </option>
                                                        <option
                                                            value="Empty Container"
                                                        >
                                                            Empty Container
                                                        </option>
                                                    </select>
                                                </td>
                                                <td>
                                                    <select
                                                        class="custom-input"
                                                        v-model="
                                                            item.pick_up_location
                                                        "
                                                    >
                                                        <option
                                                            value=""
                                                        ></option>
                                                        <option value="NBO">
                                                            NBO
                                                        </option>
                                                        <option value="MBA">
                                                            MBA
                                                        </option>
                                                    </select>
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
                                                        v-model="item.qty"
                                                    />
                                                </td>
                                            </tr>
                                        </template>
                                    </table>

                                </template>

                                
                                <!-- Save/Cancel Buttons -->
                                <div
                                    style="margin-top: 40px"
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
                                        type="light"
                                        @click.prevent="onClose"
                                    >
                                        Cancel
                                    </sdButton>
                                </div>
                            </form>
                        </template>
                    </sdCards>
                </BorderLessHeading>
            </a-col>
        </a-row>
    </Main>
</template>

<script>
import { DataService } from "@/config/dataService/dataService";
import { defineComponent, ref, reactive, onMounted } from "vue";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import { Modal } from 'ant-design-vue';


const SalesOrderView = defineComponent({
    name: "SalesOrderView",
    props: ["id"],

    setup(props) {
        const router = useRouter();
        const toast = useToast();
        const isLoading = ref(false);
        const clients = ref([]);
        const form = reactive({
            client_id: null,
            order_date: "",
            order_number: "",
            deilvery_notes: [],
        });

        const fetchSalesOrderDetails = async (orderId) => {
    isLoading.value = true;
    try {
        const response = await DataService.get(`/sales_orders/${orderId}`);
        const salesOrderDetails = response.data.Sales_order;

        form.client_id = salesOrderDetails.client_id;
        form.order_number = salesOrderDetails.order_number;
        form.order_date = salesOrderDetails.order_date;

        form.delivery_notes = salesOrderDetails.delivery_notes.map(note => ({
            delivery_note_number: note.delivery_note_number,
            delivery_date: note.delivery_date,
            items: note.items.map(item => ({
                ...item,
                itemDescription: item.itemDescription,
                cargo_type: item.cargo_type,
                pick_up_location: item.pick_up_location,
                destination: item.destination,
                qty: item.quantity,
            }))
        }));

    } catch (error) {
        console.error("Error fetching sales order:", error);
        toast.error("Error fetching sales order details. Please try again.");
    } finally {
        isLoading.value = false;
    }
};

        const fetchClients = async () => {
            try {
                const response = await DataService.get("/clients");
                clients.value = response.data.Clients;
            } catch (error) {
                console.error("Error fetching clients:", error);
                toast.error("Error fetching clients. Please try again.");
            }
        };

        const updateSalesOrderDetails = async (orderId, updatedDetails) => {
            try {
                const response = await DataService.put(
                    `/sales_orders/${orderId}`,
                    updatedDetails,
                );
                toast.success("Sales Order updated successfully!");
                console.log("Sales Order updated successfully:", response.data);
                router.push(`/app/sales-orders`);
            } catch (error) {
                console.error("Error updating sales order:", error);
                if (error.response) {
                    console.error("Error response:", error.response);
                }
                toast.error("Error updating sales order. Please try again.");
            }
        };

        onMounted(async () => {
            await fetchSalesOrderDetails(props.id);
            await fetchClients();
        });

        const handleSubmit = async () => {
            if (
                !form.client_id ||
                !form.order_date ||
                !form.order_number ||
                form.delivery_notes.length === 0
            ) {
                toast.error(
                    "Please fill in all required fields and add at least one delivery note.",
                );
                return;
            }

            const updatedDetails = {
                client_id: form.client_id,
                order_date: form.order_date,
                order_number: form.order_number,
                delivery_notes: form.delivery_notes.map((note) => ({
                    delivery_note_number: note.delivery_note_number,
                    delivery_date: note.delivery_date,
                    items: note.items.map((item) => ({
                        itemDescription: item.itemDescription,
                        cargo_type: item.cargo_type,
                        pick_up_location: item.pick_up_location,
                        destination: item.destination,
                        quantity: item.qty,
                    })),
                })),
            };

            isLoading.value = true;
            try {
                await updateSalesOrderDetails(props.id, updatedDetails);
            } catch (error) {
                toast.error("Error updating sales order. Please try again.");
            } finally {
                isLoading.value = false;
            }
        };

        const onClose = () => {
            router.push(`/app/sales-orders`);
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

        const removeLastDeliveryNote = (noteIndex) => {
    if (form.delivery_notes.length > 1) {
        Modal.confirm({
            title: 'Are you sure you want to delete this delivery note?',
            content: 'This action cannot be undone.',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                form.delivery_notes.splice(noteIndex, 1); // Remove the selected delivery note
                toast.success("Delivery note removed successfully.");
            },
            onCancel() {
                console.log('Canceled');
            },
        });
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

        return {
            form,
            handleSubmit,
            clients,
            onClose,
            isLoading,
            addLineItem,
            removeLastLineItem,
            addDeliveryNote,
            removeLastDeliveryNote,
        };
    },
});

export default SalesOrderView;
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
    height: 500px;
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
