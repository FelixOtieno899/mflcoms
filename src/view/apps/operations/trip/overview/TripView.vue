<template>
    <sdCards>
        <template v-slot:title>
            <div class="setting-card-title">
                <sdHeading as="h4">Trip Info</sdHeading>
                <span>Set Up trip's Information</span>
            </div>
            <div v-if="formState.trip_status"
                style="
                    display: flex;
                    justify-content: center;
                    border-radius: 4px;
                    color: #0d79df;
                    background-color: #d1ecf1;
                    padding: 4px 8px;
                "
            >
                Trip Status:
                {{ formState.trip_status }}
            </div>
        </template>
        <BasicFormWrapper v-if="isLoading">
            <a-space class="loading">
                <a-spin size="large" />
            </a-space>
        </BasicFormWrapper>

        <BasicFormWrapper v-else>
            <a-form
                :model="formState"
                @finish="handleFinish"
                @finishFailed="handleFinishFailed"
                layout="vertical"
            >
                <a-row :gutter="16">
                    <a-col :span="24">
                        <p><strong>Basic Information</strong></p>
                        <a-divider
                            style="
                                height: 2px;
                                background-color: #89cff0;
                                margin-top: -3px;
                            "
                        />
                    </a-col>
                </a-row>
                <a-row :gutter="16">
                    <a-col :span="8">
                        <a-form-Item label="Trip Name">
                            <a-input v-model:value="formState.name" />
                        </a-form-Item>
                    </a-col>

                    <a-col :span="8">
                        <a-form-Item label="Litres Consumed">
                            <a-input
                                readonly
                                v-model:value="formState.litres_consumed"
                            />
                        </a-form-Item>
                    </a-col>

                    <a-col :span="8">
                        <a-form-Item label="Kms Done">
                            <a-input v-model:value="formState.kms_done" />
                        </a-form-Item>
                    </a-col>
                </a-row>

                <br />
                <a-row :gutter="16">
                    <a-col :span="24">
                        <p><strong>Other Details</strong></p>
                        <a-divider
                            style="
                                height: 2px;
                                background-color: #89cff0;
                                margin-top: -3px;
                            "
                        />
                    </a-col>
                </a-row>

                <a-row :gutter="16">
                    <a-col :span="8">
                        <a-form-Item label="Odometer Reading">
                            <a-input
                                v-model:value="formState.odometer_reading"
                                readonly
                            />
                        </a-form-Item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-Item label="Trip Weight">
                            <a-input v-model:value="formState.trip_weight" />
                        </a-form-Item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-Item label="Review Points">
                            <a-input v-model:value="formState.review_points" />
                        </a-form-Item>
                    </a-col>
                </a-row>
                <br />
                <a-row :gutter="16">
                    <a-col :span="8">
                        <a-form-Item label="">
                            <button
                                type="button"
                                class="styled-button"
                                @click="toggleDeliveryDetails"
                            >
                                Delivery Notes
                            </button>
                        </a-form-Item>
                    </a-col>
                </a-row>

                <a-row v-if="showDeliveryDetails" :gutter="16">
                    <a-col :span="24">
                        <p><strong>Delivery Details</strong></p>
                        <a-divider
                            style="
                                height: 2px;
                                background-color: #89cff0;
                                margin-top: -3px;
                            "
                        />
                    </a-col>
                </a-row>

                <a-row v-if="showDeliveryDetails" :gutter="16">
                    <a-col :span="24">
                        <div v-if="deliveryNotes.length > 0">
                            <div
                                v-for="(note, noteIndex) in deliveryNotes"
                                :key="noteIndex"
                            >
                                <table>
                                    <tr class="invoice-header">
                                        <td>Client</td>
                                        <td>
                                            {{ note.client.user.first_name }}
                                            {{ note.client.user.last_name }}
                                        </td>
                                        <td>Delivery Note #</td>
                                        <td>{{ note.delivery_note_number }}</td>
                                        <td>Date</td>
                                        <td>
                                            {{ formatDate(note.delivery_date) }}
                                        </td>
                                    </tr>
                                    <tr class="invoice-header">
                                        <td></td>
                                        <td>Loading Point</td>
                                        <td>{{ note.location_from }}</td>
                                        <td>Off Loading Point</td>
                                        <td>{{ note.location_to }}</td>
                                    </tr>
                                    <tr>
                                        <th>Item</th>
                                        <th>Container Number</th>
                                        <th>Driver</th>
                                        <th>Truck Number</th>
                                        <th>File Ref #</th>
                                        <th>Qty</th>
                                        <th>UOM</th>
                                        <th>Qty Received</th>
                                    </tr>
                                    <tr
                                        v-for="(
                                            item, itemIndex
                                        ) in note.lineItems"
                                        :key="itemIndex"
                                    >
                                        <td>{{ item.container }}</td>
                                        <td>{{ item.containerNumber }}</td>
                                        <td>{{ item.driver }}</td>
                                        <td>{{ item.truckNumber }}</td>
                                        <td>{{ item.containerRefNo }}</td>
                                        <td>{{ item.quantity }}</td>
                                        <td>{{ item.uom }}</td>
                                        <td>
                                            <input
                                                readonly
                                                style="border-radius: 5px"
                                                type="number"
                                                v-model="item.received"
                                            />
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                        <div v-else>No Delivery notes found</div>
                    </a-col>
                </a-row>

                <a-row :gutter="16">
                    <a-col :span="8">
                        <a-form-Item label="">
                            <button
                                type="button"
                                class="styled-button"
                                @click="toggleInvoiceDetails"
                            >
                                Invoices
                            </button>
                        </a-form-Item>
                    </a-col>
                </a-row>

                <a-row v-if="showInvoiceDetails" :gutter="16">
                    <a-col :span="24">
                        <p><strong>Invoice Details</strong></p>
                        <a-divider
                            style="
                                height: 2px;
                                background-color: #89cff0;
                                margin-top: -3px;
                            "
                        />
                    </a-col>
                </a-row>

                <a-row v-if="showInvoiceDetails" :gutter="16">
                    <a-col :span="24">
                        <div v-if="invoices.length > 0">
                            <div
                                v-for="(invoice, invoiceIndex) in invoices"
                                :key="invoiceIndex"
                            >
                                <table>
                                    <tr class="invoice-header">
                                        <td>Client</td>
                                        <td>
                                            {{
                                                invoice.client.user.first_name
                                            }}
                                            {{ invoice.client.user.last_name }}
                                        </td>
                                        <td>Invoice #</td>
                                        <td>{{ invoice.invoice_number }}</td>
                                        <td>Tax</td>
                                        <td>0</td>
                                        <td>Date</td>
                                        <td>
                                            {{ invoice.invoice_date }}
                                        </td>
                                        <td></td>
                                    </tr>

                                    <tr>
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
                                            item, itemIndex
                                        ) in invoice.lineItems2"
                                        :key="itemIndex"
                                    >
                                        <td>{{ item.itemDescription }}</td>
                                        <td>{{ item.containerNumber }}</td>
                                        <td>{{ item.deliveryNoteNumber }}</td>
                                        <td>{{ item.deliveryNoteFileRef }}</td>
                                        <td>{{ item.loadingPoint }}</td>
                                        <td>{{ item.offLoadingPoint }}</td>
                                        <td>
                                            {{ item.qty }}
                                        </td>
                                        <td>
                                            {{ item.price }}
                                        </td>
                                        <td>{{ item.tax }}</td>
                                        <td>{{ item.lineTotal }}</td>
                                    </tr>
                                    <tr class="total-row">
                                        <td colspan="9" class="label">
                                            Sub Total
                                        </td>
                                        <td>{{ invoice.subtotal }}</td>
                                    </tr>
                                    <tr class="total-row">
                                        <td colspan="9" class="label">Tax</td>
                                        <td>{{ invoice.vat_amount }}</td>
                                    </tr>
                                    <tr class="total-row">
                                        <td colspan="9" class="label">Total</td>
                                        <td>{{ invoice.total_amount }}</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                        <div v-else>No invoices found</div>
                    </a-col>
                    <br />
                    <br />
                </a-row>

                <!-- <a-row :gutter="16">
                    <a-col :span="8">
                        <a-form-Item label="">
                            <button
                                type="button"
                                class="styled-button"
                                @click="toggleSalesOrderDetails"
                            >
                                Sales Orders
                            </button>
                        </a-form-Item>
                    </a-col>
                </a-row>

                <a-row v-if="showSalesOrdeDetails" :gutter="16">
                    <a-col :span="24">
                        <p><strong>Sales Order Details</strong></p>
                        <a-divider
                            style="
                                height: 2px;
                                background-color: #89cff0;
                                margin-top: -3px;
                            "
                        />
                    </a-col>
                </a-row>
                <a-row v-if="showSalesOrdeDetails" :gutter="16">
                    <a-col :span="24">
                        <div v-if="salesOrders.length > 0">
                            <div
                                v-for="(
                                    salesOrder, salesOrderIndex
                                ) in salesOrders"
                                :key="salesOrderIndex"
                            >
                                <table>
                                    <tr class="invoice-header">
                                        <td>
                                            Client: {{ salesOrder.clientName }}
                                        </td>

                                        <td>
                                            Order Number #{{
                                                salesOrder.order_number
                                            }}
                                        </td>

                                        <td>
                                            Order Date:
                                            {{
                                                formatDate(
                                                    salesOrder.order_date,
                                                )
                                            }}
                                        </td>
                                    </tr>

                                    <tr>
                                        <th>Item Description</th>
                                        <th>Cargo Type</th>
                                        <th>Pickup Location</th>
                                        <th>Destination</th>

                                        <th>Qty</th>
                                    </tr>
                                    <tr
                                        v-for="(
                                            item, itemIndex
                                        ) in salesOrder.lineItems3"
                                        :key="itemIndex"
                                    >
                                        <td>{{ item.itemDescription }}</td>
                                        <td>{{ item.cargo_type }}</td>
                                        <td>{{ item.pick_up_location }}</td>
                                        <td>{{ item.destination }}</td>
                                        <td>{{ item.quantity }}</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                        <div v-else>No Sales Orders Found</div>
                    </a-col>
                </a-row> -->

                <div class="setting-form-actions">
                    <sdButton
                        size="default"
                        @click.prevent="handleCancel"
                        type="light"
                    >
                        Cancel
                    </sdButton>
                </div>
            </a-form>
        </BasicFormWrapper>
    </sdCards>
</template>

<script>
import { DataService } from "@/config/dataService/dataService";
import { BasicFormWrapper } from "../../../../styled";
import { defineComponent, ref, reactive, onMounted } from "vue";
import { useToast } from "vue-toastification";
import { useRouter, useRoute } from "vue-router";

const TripView = defineComponent({
    name: "TripView",
    components: { BasicFormWrapper },
    props: ["id"],

    setup(props) {
        const router = useRouter();
        const route = useRoute();
        const toast = useToast();
        const isLoading = ref(false);
        const showDeliveryDetails = ref(false);
        const showInvoiceDetails = ref(false);
        const showSalesOrdeDetails = ref(false);
        const clients = ref([]);

        const deliveryNotes = ref([]);
        const invoices = ref([]);
        const salesOrders = ref([]);
        const lineItems = ref([]);
        const lineItems2 = ref([]);
        const lineItems3 = ref([]);
        const drivers = ref([]);
        const trucks = ref([]);

        const formState = reactive({
            client_name: "",
            delivery_date: "",
            delivery_number: "",
            status: "",
            location_from: "",
            location_to: "",
            name: "",
            description: "",
            odometer_reading: "",
            trip_weight: "",
            truck: "",
            kms_done: "",
            litres_consumed: "",
            review_points: "",
            trip_status: "",
        });

        // const form = reactive({
        //     client_id: null,
        //     client_name: "",
        //     invoice_date: "",
        //     invoice_number: "",
        //     subTotal: 0,
        //     taxTotal: 0,
        //     total: 0,
        // });

        const formatDate = (date) => {
            const d = new Date(date);
            const year = d.getFullYear();
            const month = String(d.getMonth() + 1).padStart(2, "0");
            const day = String(d.getDate()).padStart(2, "0");
            return `${year}-${month}-${day}`;
        };

        const fetchDriversAndTrucks = async () => {
            try {
                const [driversResponse, trucksResponse] = await Promise.all([
                    DataService.get("/drivers"),
                    DataService.get("/vehicle"),
                ]);

                drivers.value = driversResponse.data.Drivers || [];
                trucks.value = trucksResponse.data.Vehicles || [];

                console.log("Drivers:", drivers.value);
                console.log("Trucks:", trucks.value);
            } catch (error) {
                console.error("Error fetching drivers and trucks:", error);
                if (error.response) {
                    console.error("Error response:", error.response);
                }
            }
        };

        // const fetchTripDetails = async (tripId, clientId) => {
        //     try {
        //         const response = await DataService.get(`/trips/${tripId}`, {
        //             params: { client_id: clientId },
        //         });
        //         const tripDetails = response.data.Trip;
        //         console.log("Trip Details", tripDetails);

        //         deliveryNotes.value = tripDetails.delivery_notes;
        //         console.log("Delivery notes:", deliveryNotes.value);

        //         invoices.value = tripDetails.invoices;
        //         console.log("Invoices:", invoices.value);

        //         formState.name = tripDetails.name;
        //         formState.description = tripDetails.description;
        //         formState.odometer_reading = tripDetails.odometer_reading;
        //         formState.trip_weight = tripDetails.trip_weight;
        //         formState.review_points = tripDetails.review_points;
        //         formState.litres_consumed = tripDetails.litres_consumed;
        //         formState.kms_done = tripDetails.kms_done;

        //         if (
        //             Array.isArray(drivers.value) &&
        //             Array.isArray(trucks.value)
        //         ) {
        //             const driverNames = tripDetails.driver_ids.map(
        //                 (id) =>
        //                     drivers.value.find((driver) => driver.id === id)
        //                         ?.first_name || "",
        //             );

        //             // Convert all truck IDs to strings for comparison
        //             const truckId = String(tripDetails.truck_id);

        //             console.log("Trip Truck ID:", truckId);
        //             console.log("Trucks Array:", trucks.value);

        //             const truck = trucks.value.find(
        //                 (truck) => String(truck.id) === truckId,
        //             );

        //             if (truck) {
        //                 console.log("Found Truck:", truck);
        //                 const truckReg = truck.registration_no;
        //                 console.log("Truck Registration:", truckReg);
        //             } else {
        //                 console.warn(
        //                     "Truck not found for ID:",
        //                     tripDetails.truck_id,
        //                 );
        //             }

        //             deliveryNotes.value = tripDetails.delivery_notes.map(
        //                 (note) => {
        //                     const noteItems = note.items.map((item) => ({
        //                         container: item.container,
        //                         containerNumber: item.containerNumber,
        //                         driver: driverNames.join(", "),
        //                         truckNumber: truck?.registration_no || "",
        //                         containerRefNo: item.containerRefNo,
        //                         quantity: item.quantity,
        //                         uom: item.uom,
        //                         received: note.qty_received || 0,
        //                     }));
        //                     return { ...note, lineItems: noteItems };
        //                 },
        //             );

        //             invoices.value = tripDetails.invoices.map((invoice) => {
        //                 console.log("What is this invoice", invoice);
        //                 const invoiceItems = invoice.items.map((item) => ({
        //                     itemDescription: item.itemDescription,
        //                     containerNumber: item.containerNumber,
        //                     deliveryNoteNumber: item.deliveryNoteNumber,
        //                     deliveryNoteFileRef: item.deliveryNoteFileRef,
        //                     loadingPoint: item.loadingPoint,
        //                     offLoadingPoint: item.offLoadingPoint,
        //                     qty: item.qty,
        //                     price: item.price,
        //                     tax: item.tax,
        //                     lineTotal: item.lineTotal,
        //                 }));
        //                 return { ...invoice, lineItems2: invoiceItems };
        //             });

        //             console.log("Drivers:", drivers.value);
        //             console.log("Delivery Notes:", deliveryNotes.value);
        //         } else {
        //             console.error("Drivers or trucks data is not an array");
        //         }
        //     } catch (error) {
        //         console.error("Error fetching trip details:", error);
        //         if (error.response) {
        //             console.error("Error response:", error.response);
        //         }
        //     }
        // };

        const fetchTripDetails = async (tripId, clientId) => {
            try {
                const response = await DataService.get(`/trips/${tripId}`, {
                    params: { client_id: clientId },
                });
                const tripDetails = response.data.Trip;
                console.log("Trip Details", tripDetails);

                deliveryNotes.value = tripDetails.delivery_notes;
                console.log("Delivery notes:", deliveryNotes.value);

                invoices.value = tripDetails.invoices;
                console.log("Invoices:", invoices.value);

                salesOrders.value = tripDetails.client.sales_orders;
                console.log("Sales Orders:", salesOrders.value);

                formState.name = tripDetails.name;
                formState.description = tripDetails.description;
                formState.odometer_reading = tripDetails.odometer_reading;
                formState.trip_weight = tripDetails.trip_weight;
                formState.review_points = tripDetails.review_points;
                formState.litres_consumed = tripDetails.litres_consumed;
                formState.kms_done = tripDetails.kms_done;
                formState.trip_status = tripDetails.trip_status;

                if (
                    Array.isArray(drivers.value) &&
                    Array.isArray(trucks.value)
                ) {
                    const driverNames = tripDetails.driver_ids.map(
                        (id) =>
                            drivers.value.find((driver) => driver.id === id)
                                ?.first_name || "",
                    );

                    // Convert all truck IDs to strings for comparison
                    const truckId = String(tripDetails.truck_id);

                    console.log("Trip Truck ID:", truckId);
                    console.log("Trucks Array:", trucks.value);

                    const truck = trucks.value.find(
                        (truck) => String(truck.id) === truckId,
                    );

                    if (truck) {
                        console.log("Found Truck:", truck);
                        const truckReg = truck.registration_no;
                        console.log("Truck Registration:", truckReg);
                    } else {
                        console.warn(
                            "Truck not found for ID:",
                            tripDetails.truck_id,
                        );
                    }

                    deliveryNotes.value = tripDetails.delivery_notes.map(
                        (note) => {
                            const noteItems = note.items.map((item) => ({
                                container: item.cargo_type,
                                containerNumber: item.containerNumber,
                                driver: driverNames.join(", "),
                                truckNumber: truck?.registration_no || "",
                                containerRefNo: item.containerRefNo,
                                quantity: item.quantity,
                                uom: item.uom,
                                received: item.qty_received || 0,
                            }));
                            return { ...note, lineItems: noteItems };
                        },
                    );

                    invoices.value = tripDetails.invoices.map((invoice) => {
                        console.log("What is this invoice", invoice);

                        // Parse the JSON string into an array
                        let invoiceItems = [];
                        try {
                            invoiceItems = JSON.parse(invoice.items);
                        } catch (error) {
                            console.error(
                                "Failed to parse invoice items:",
                                error,
                            );
                        }

                        invoiceItems = invoiceItems.map((item) => ({
                            itemDescription: item.itemDescription,
                            containerNumber: item.containerNumber,
                            deliveryNoteNumber: item.deliveryNoteNumber,
                            deliveryNoteFileRef: item.deliveryNoteFileRef,
                            loadingPoint: item.loadingPoint,
                            offLoadingPoint: item.offLoadingPoint,
                            qty: item.qty,
                            price: item.price,
                            tax: item.tax,
                            lineTotal: item.lineTotal,
                        }));

                        return { ...invoice, lineItems2: invoiceItems };
                    });

                    // Fetch clients before processing sales orders to ensure client data is available
                    await fetchClients();

                    salesOrders.value = tripDetails.client.sales_orders.map(
                        (salesOrder) => {
                            const client = clients.value.find(
                                (client) => client.id === salesOrder.client_id,
                            );
                            const clientName = client
                                ? `${client.user.first_name} ${client.user.last_name}`
                                : "Unknown Client";

                            const salesOrderItems = salesOrder.items.map(
                                (item) => ({
                                    cargo_type: item.cargo_type,
                                    itemDescription: item.itemDescription,
                                    pick_up_location: item.pick_up_location,
                                    destination: item.destination,
                                    quantity: item.quantity,
                                }),
                            );

                            return {
                                ...salesOrder,
                                lineItems3: salesOrderItems,
                                clientName,
                            };
                        },
                    );

                    console.log("Sales Orders:", salesOrders.value);

                    console.log("Drivers:", drivers.value);
                    console.log("Delivery Notes:", deliveryNotes.value);
                } else {
                    console.error("Drivers or trucks data is not an array");
                }
            } catch (error) {
                console.error("Error fetching trip details:", error);
                if (error.response) {
                    console.error("Error response:", error.response);
                }
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

        onMounted(async () => {
            await fetchClients();
            await fetchDriversAndTrucks();
            const clientId = route.query.client_id;
            await fetchTripDetails(props.id, clientId);
        });

        const addLineItem = (noteIndex) => {
            deliveryNotes.value[noteIndex].items.push({
                container: "",
                containerNumber: "",
                driver: "",
                truckNumber: "",
                containerRefNo: "",
                quantity: "",
                uom: "",
                received: 0,
            });
        };

        const removeLastLineItem = (noteIndex) => {
            if (deliveryNotes.value[noteIndex].items.length > 1) {
                deliveryNotes.value[noteIndex].items.pop();
            } else {
                toast.warning("Cannot remove the last line item.");
            }
        };

        const toggleDeliveryDetails = () => {
            showDeliveryDetails.value = !showDeliveryDetails.value;
        };

        const toggleInvoiceDetails = () => {
            showInvoiceDetails.value = !showInvoiceDetails.value;
        };

        const toggleSalesOrderDetails = () => {
            showSalesOrdeDetails.value = !showSalesOrdeDetails.value;
        };

        const handleFinishFailed = (errors) => {
            console.log(errors);
        };

        const handleCancel = () => {
            router.push(`/app/trips`);
        };

        return {
            formState,
            handleFinishFailed,
            handleCancel,
            isLoading,
            deliveryNotes,
            lineItems,
            addLineItem,
            removeLastLineItem,
            formatDate,
            showDeliveryDetails,
            toggleDeliveryDetails,
            showInvoiceDetails,
            toggleInvoiceDetails,
            showSalesOrdeDetails,
            toggleSalesOrderDetails,
            drivers,
            trucks,
            invoices,
            lineItems2,
            lineItems3,
            salesOrders,
        };
    },
});

export default TripView;
</script>

<style scoped>
.loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 500px;
}

.styled-button {
    background-color: #3498db; /* Button background color */
    color: #fff; /* Button text color */
    border: none; /* Remove default border */
    border-radius: 5px; /* Rounded corners */
    padding: 10px 20px; /* Padding for button */
    font-size: 16px; /* Font size for button text */
    cursor: pointer; /* Pointer cursor on hover */
    display: inline-flex; /* Flexbox to align text and arrow */
    align-items: center; /* Center items vertically */
    justify-content: center; /* Center items horizontally */
    text-decoration: none; /* Remove underline */
    transition: background-color 0.3s; /* Smooth transition for hover effect */
}

.styled-button:hover {
    background-color: #2980b9; /* Darker background on hover */
}

.styled-button::after {
    content: "➔"; /* Unicode arrow character */
    margin-left: 10px; /* Space between text and arrow */
    font-size: 18px; /* Size of the arrow */
    transition: margin-left 0.3s; /* Smooth transition for arrow movement */
}

.styled-button:hover::after {
    margin-left: 15px; /* Move arrow further on hover */
}

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
</style>
