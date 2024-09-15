<template>
    <sdCards>
        <template v-slot:title>
            <div class="setting-card-title">
                <sdHeading as="h4">Edit Trip</sdHeading>
                <span>Set Up trip's Information</span>
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
                                View Delivery Notes
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
                        <div
                            v-for="(note, noteIndex) in deliveryNotes"
                            :key="noteIndex"
                        >
                            <table>
                                <tr class="invoice-header">
                                    <td>Client</td>
                                    <td>{{ note.client.user.first_name }}</td>
                                    <td>Delivery Note #</td>
                                    <td>{{ note.delivery_note_number}}</td>
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
                                    v-for="(item, itemIndex) in note.lineItems"
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
                                            style="border-radius: 5px"
                                            type="number"
                                            v-model="item.received"
                                        />
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </a-col>
                </a-row>

                <div class="setting-form-actions">
                    <sdButton size="default" htmlType="submit" type="primary">
                        Update
                    </sdButton>
                    &nbsp; &nbsp;
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

const TripEdit = defineComponent({
    name: "TripEdit",
    components: { BasicFormWrapper },
    props: ["id"],

    setup(props) {
        const router = useRouter();
        const route = useRoute();
        const toast = useToast();
        const isLoading = ref(false);
        const showDeliveryDetails = ref(false);

        const deliveryNotes = ref([]);
        const lineItems = ref([]);
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
        });

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


        const fetchTripDetails = async (tripId, clientId) => {
            try {
                const response = await DataService.get(`/trips/${tripId}`, {
                    params: { client_id: clientId },
                });
                const tripDetails = response.data.Trip;
                console.log("Trip Details", tripDetails);

                deliveryNotes.value = tripDetails.delivery_notes;

                formState.name = tripDetails.name;
                formState.description = tripDetails.description;
                formState.odometer_reading = tripDetails.odometer_reading;
                formState.trip_weight = tripDetails.trip_weight;
                formState.review_points = tripDetails.review_points;
                formState.litres_consumed = tripDetails.litres_consumed;

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
                                id: item.id,
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

        onMounted(async () => {
            await fetchDriversAndTrucks();
            const clientId = route.query.client_id;
            await fetchTripDetails(props.id, clientId);
        });

        const updateTripDetails = async (tripId, updatedDetails) => {
            try {
                const response = await DataService.put(
                    `/trips/${tripId}`,
                    updatedDetails,
                );
                console.log("Trip updated successfully:", response.data);
            } catch (error) {
                console.error("Error updating trip details:", error);
                if (error.response) {
                    console.error("Error response:", error.response);
                }
            }
        };

       
        const handleFinish = async () => {
    try {
        isLoading.value = true;

        const updatedDetails = {
            ...formState,
            delivery_notes: deliveryNotes.value.map((note) => ({
                id: note.id,
                items: note.lineItems.map((item) => ({
                    id: item.id, // Include the item id
                    container: item.container,
                    containerNumber: item.containerNumber,
                    containerRefNo: item.containerRefNo,
                    quantity: item.quantity,
                    uom: item.uom,
                    received: item.received, // Ensure 'received' is sent
                })),
            })),
        };

        console.log("What is this udpated details", updatedDetails);

        await updateTripDetails(props.id, updatedDetails);

        toast.success("Trip updated successfully!");

        router.push("/app/trips");

        console.log("Trip details updated successfully");
    } catch (error) {
        toast.error("Error updating trip details");
        console.error("Error updating trip details:", error);
    } finally {
        isLoading.value = false;
    }
};


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

        const handleFinishFailed = (errors) => {
            console.log(errors);
        };

        const handleCancel = () => {
            router.push(`/app/trips`);
        };

        return {
            formState,
            handleFinish,
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
            drivers,
            trucks,
        };
    },
});

export default TripEdit;
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
