<template>
    <Main>
        <a-row :gutter="15">
            <a-col :xs="24">
                <BorderLessHeading>
                    <sdCards title="Manage Fuel Dispensations">
                        <a-row>
                            <a-col :span="24">
                                <div style="text-align: right">
                                    <h2>
                                        Fuel Stock Available:
                                        <span style="color: blue"
                                            >{{
                                                totalFuelRemaining
                                            }}
                                            Litres</span
                                        >
                                    </h2>
                                </div>
                            </a-col>
                        </a-row>
                        <a-row>
                            <a-col

                                style="display: flex; justify-content: flex-end;
                                margin-top: 30px"
                                :span="24"
                            >
                                <!-- <a-button
                                    style="margin-top: -30px"
                                    type="primary"
                                    @click="showDrawer"
                                >
                                    <template #icon><PlusOutlined /></template>
                                    + Add New Order
                                </a-button> -->
                                <a-drawer
                                    title="Create New Fuel Dispensation Order"
                                    :width="720"
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
                                        <a-form
                                            :model="form"
                                            @finish="handleSubmit"
                                            :rules="rules"
                                            layout="vertical"
                                        >
                                            <a-row :gutter="16">
                                                <a-col :span="12">
                                                    <a-form-item
                                                        label="Fuel Purchase Reference Number"
                                                        name="fuel_purchase_id"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                                message:
                                                                    'Please select reference number!',
                                                            },
                                                        ]"
                                                    >
                                                        <select
                                                            v-model="
                                                                form.fuel_purchase_id
                                                            "
                                                            class="custom-select"
                                                        >
                                                            <option value="">
                                                                Select fuel
                                                                purchase
                                                                reference no
                                                            </option>
                                                            <option
                                                                v-for="purchase in fuelPurchaseOrders"
                                                                :key="
                                                                    purchase.id
                                                                "
                                                                :value="
                                                                    purchase.id
                                                                "
                                                            >
                                                                {{
                                                                    purchase.id
                                                                }}
                                                            </option>
                                                        </select>
                                                    </a-form-item>
                                                </a-col>

                                                <a-col :span="12">
                                                    <a-form-item
                                                        label="Delivery Note Reference Number"
                                                        name="delivery_note_id"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                                message:
                                                                    'Please select reference number!',
                                                            },
                                                        ]"
                                                    >
                                                        <select
                                                            v-model="
                                                                form.delivery_note_id
                                                            "
                                                            class="custom-select"
                                                        >
                                                            <option value="">
                                                                Select delivery
                                                                note reference
                                                                no
                                                            </option>
                                                            <option
                                                                v-for="deliveryNote in deliveryNotes"
                                                                :key="
                                                                    deliveryNote.id
                                                                "
                                                                :value="
                                                                    deliveryNote.id
                                                                "
                                                            >
                                                                {{
                                                                    deliveryNote.id
                                                                }}
                                                            </option>
                                                        </select>
                                                    </a-form-item>
                                                </a-col>
                                            </a-row>
                                            <a-row :gutter="16">
                                                <a-col :span="12">
                                                    <a-form-item
                                                        label="Quantity"
                                                        name="quantity"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                                message:
                                                                    'Enter quantity!',
                                                            },
                                                        ]"
                                                    >
                                                        <a-input
                                                            v-model:value="
                                                                form.quantity
                                                            "
                                                            placeholder=""
                                                            readonly
                                                        />
                                                    </a-form-item>
                                                </a-col>

                                                <a-col :span="12">
                                                    <a-form-item
                                                        label="Quantity Measurement"
                                                        name="quantity_abbreviation_id"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                                message:
                                                                    'Field Required!',
                                                            },
                                                        ]"
                                                    >
                                                        <a-input
                                                            v-model:value="
                                                                form.quantity_abbreviation_name
                                                            "
                                                            placeholder=""
                                                            readonly
                                                        />
                                                    </a-form-item>
                                                </a-col>
                                            </a-row>
                                            <a-row :gutter="16">
                                                <a-col :span="8">
                                                    <a-form-item
                                                        label="Fuel Type"
                                                        name="fuel_type"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                                message:
                                                                    'Fuel type is needed!',
                                                            },
                                                        ]"
                                                    >
                                                        <a-input
                                                            type="text"
                                                            v-model:value="
                                                                form.fuel_type
                                                            "
                                                            placeholder=""
                                                            readonly
                                                        />
                                                    </a-form-item>
                                                </a-col>

                                                <a-col :span="8">
                                                    <a-form-item
                                                        label="Truck"
                                                        name="truck_id"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                                message:
                                                                    'truck is needed!',
                                                            },
                                                        ]"
                                                    >
                                                        <!-- Dropdown for selecting trucks by registration number -->
                                                        <select
                                                            v-model="
                                                                form.selectedTruckRegistration
                                                            "
                                                            class="custom-select"
                                                        >
                                                            <option value="">
                                                                Select Truck
                                                            </option>
                                                            <option
                                                                v-for="vehicle in vehicles"
                                                                :key="
                                                                    vehicle.id
                                                                "
                                                                :value="
                                                                    vehicle.registration_no
                                                                "
                                                            >
                                                                {{
                                                                    vehicle.registration_no
                                                                }}
                                                            </option>
                                                        </select>
                                                    </a-form-item>
                                                </a-col>

                                                <a-col :span="8">
                                                    <a-form-item
                                                        label="Odometer Reading"
                                                        name="odometer_reading"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                                message:
                                                                    'Please enter odometer reading',
                                                            },
                                                        ]"
                                                    >
                                                        <a-input
                                                            type="text"
                                                            v-model:value="
                                                                form.odometer_reading
                                                            "
                                                            placeholder="Enter Odometer reading"
                                                        />
                                                    </a-form-item>
                                                </a-col>
                                            </a-row>
                                            <a-row :gutter="16">
                                                <a-col :span="12">
                                                    <a-form-item
                                                        label="Dispensation Date"
                                                        name="dispense_date"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                                message:
                                                                    'Please select date!',
                                                            },
                                                        ]"
                                                    >
                                                        <a-date-picker
                                                            v-model:value="
                                                                form.dispense_date
                                                            "
                                                            style="width: 100%"
                                                            :get-popup-container="
                                                                (trigger) =>
                                                                    trigger.parentElement
                                                            "
                                                        />
                                                    </a-form-item>
                                                </a-col>

                                                <a-col :span="12">
                                                    <a-form-item
                                                        label="Dispense Location"
                                                        name="dispense_location"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                                message:
                                                                    'Please select item!',
                                                            },
                                                        ]"
                                                    >
                                                        <a-input
                                                            type="text"
                                                            v-model:value="
                                                                form.dispense_location
                                                            "
                                                            placeholder="Enter Dispense Location"
                                                        />
                                                    </a-form-item>
                                                </a-col>
                                            </a-row>

                                            <a-row :gutter="16">
                                                <a-col :span="24">
                                                    <a-space align="end">
                                                        <a-button
                                                            @click="onClose"
                                                            >Cancel</a-button
                                                        >
                                                        <a-button
                                                            type="primary"
                                                            html-type="submit"
                                                            >Submit</a-button
                                                        >
                                                    </a-space>
                                                </a-col>
                                            </a-row>
                                        </a-form>
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
                            @search="fetchFuelDispensationOrders"
                        />
                    </sdCards>
                </BorderLessHeading>
            </a-col>
        </a-row>
    </Main>
</template>

<script>
import { DataService } from "@/config/dataService/dataService";
import { defineComponent, reactive, ref, onMounted, watch } from "vue";
import { Main } from "../../../styled";
import DataTables from "@/components/table/DataTable.vue";
import { BorderLessHeading } from "../../../styled";
//import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

export default defineComponent({
    name: "FuelDispensationOrder",
    components: {
        Main,
        DataTables,
        BorderLessHeading,
    },
    setup() {
        //const { state } = useStore();
        const router = useRouter();
        const toast = useToast();

        const isLoading = ref(false);

        const unitsOfMeasures = ref([]);

        const fuelPurchaseOrders = ref([]);
        const totalFuelRemaining = ref(0);

        const deliveryNotes = ref([]);

        const vehicles = ref([]);
        const fueldispenseOrders = ref([]);

        // const states = ref([]);

        // const invoices = ref([]);

        const tableDataScource = ref([]);

        const fetchAllData = async () => {
            await Promise.all([
                fetchFuelDispensationOrders(),
               // fetchDispenseOrders(),
                fetchDeliveryNotes(),
                fetchVehicles(),
                fetchRemainingFuel(),
            ]);
        };

        const fetchFuelDispensationOrders = async (dispenseDate = null) => {
            try {
                let response;
                if (dispenseDate) {
                    // Call the searchFueldispenseOrders method if  purchaseDate is provided
                    response = await searchFuelDispensationOrders(dispenseDate);
                } else {
                    // Existing logic to fetch all invoices
                    response = await DataService.get(
                        "/fuel_dispensation_order",
                    );
                    console.log(
                        "Fuel Dispensation Orders fetched",
                        response.data,
                    );
                    if (response.status === 200) {
                        if (
                            Array.isArray(
                                response.data.Fuel_dispensation_orders,
                            )
                        ) {


                             // Group fuel dispensations by truck_id and aggregate quantity  and truck registration number
                const aggregatedDispensations= response.data.Fuel_dispensation_orders.reduce((acc, dispensation) => {
                    const truckId = dispensation.truck_id;
                    if (!acc[truckId]) {
                        acc[truckId] = {
                            ...dispensation,
                            quantity: dispensation.quantity,
                            registration_no: dispensation.vehicle.registration_no, 
                        };
                    } else {
                        acc[truckId].quantity += dispensation.quantity;
                    }
                    return acc;
                }, {});


                 // Convert the aggregated object back to an array
                 const aggregatedDispensationssArray = Object.values(aggregatedDispensations);


                            

                            // Format the data to match the structure expected by DataTables
                            tableDataScource.value =
                            aggregatedDispensationssArray.map(
                                    (fueldispensationorder) => ({
                                        // id: `#${fuelpurchaseorder.id}`,
                                        key: fueldispensationorder.id,
                                        truck: (
                                            <span class="ninjadash-username">
                                                {
                                                    fueldispensationorder
                                                        .vehicle.registration_no
                                                }
                                            </span>
                                        ),
                                        fuel_type: (
                                            <span>
                                                {
                                                    fueldispensationorder
                                                        .purchase_order
                                                        .fuel_type
                                                }
                                            </span>
                                        ),

                                        quantity: (
                                            <span>
                                                {fueldispensationorder.quantity}
                                            </span>
                                        ),
                                        dispense_date: (
                                            <span>
                                                {
                                                    fueldispensationorder.dispense_date
                                                }
                                            </span>
                                        ),
                                        dispense_location: (
                                            <span>
                                                {
                                                    fueldispensationorder.dispense_location
                                                }
                                            </span>
                                        ),

                                        status: (
                                            <span
                                                class={`ninjadash-status ninjadash-status-${fueldispensationorder.status}`}
                                            >
                                                {fueldispensationorder.status ===
                                                "completed"
                                                    ? "Dispensed"
                                                    : "Not Dispensed"}
                                            </span>
                                        ),
                                    }),
                                );
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
                console.error(
                    "Error fetching fuel dispensation orders:",
                    error,
                );
                toast.error("An error occurred. Please try again.");
            }
        };

        const searchFuelDispensationOrders = async (dispenseDate) => {
            try {
                const response = await DataService.get(
                    `/fuel_dispensation_order/search/${dispenseDate}`,
                );

                console.log("Searched Fuel dispensation order", response.data);
                if (
                    response.status === 200 &&
                    Array.isArray(response.data.Fuel_dispensation_order)
                ) {
                    tableDataScource.value =
                        response.data.Fuel_dispensation_order.map(
                            (fueldispensationorder) => ({
                                // id: `#${fuelpurchaseorder.id}`,
                                key: fueldispensationorder.id,
                                truck: (
                                    <span class="ninjadash-username">
                                        {
                                            fueldispensationorder.vehicle
                                                .registration_no
                                        }
                                    </span>
                                ),
                                fuel_type: (
                                    <span>
                                        {
                                            fueldispensationorder
                                                .fuel_purchase_order.fuel_type
                                        }
                                    </span>
                                ),

                                quantity: (
                                    <span>
                                        {fueldispensationorder.quantity}
                                    </span>
                                ),
                                dispense_date: (
                                    <span>
                                        {fueldispensationorder.dispense_date}
                                    </span>
                                ),
                                dispense_location: (
                                    <span>
                                        {
                                            fueldispensationorder.dispense_location
                                        }
                                    </span>
                                ),
                            }),
                        );
                } else {
                    tableDataScource.value = [];
                }
            } catch (error) {
                console.error(
                    "Error searching fuel dispensation order:",
                    error,
                );
                toast.error("An error occurred. Please try again.");
            }
        };

        // const fetchDispenseOrders = async () => {
        //     try {
        //         const response5 = await DataService.get(`/dispensation_order`);
        //         console.log(
        //             "Dispensation fetched",
        //             response5.data.Fuel_dispense_orders,
        //         );
        //         fueldispenseOrders.value = response5.data.Fuel_dispense_orders;
        //     } catch (error) {
        //         console.error("Error fetching fuel dispense orders :", error);
        //         if (error.response5) {
        //             console.error("Error response:", error.response5);
        //         }
        //     }
        // };

        const fetchDeliveryNotes = async () => {
            try {
                const response2 = await DataService.get(`/delivery_note`);
                console.log(
                    "Delivery Notes fetched",
                    response2.data.Delivery_notes,
                );
                deliveryNotes.value = response2.data.Delivery_notes;
            } catch (error) {
                console.error("Error fetching delivery notes:", error);
                if (error.response2) {
                    console.error("Error response:", error.response2);
                }
            }
        };

        const fetchVehicles = async () => {
            try {
                const response2 = await DataService.get(`/vehicle`);
                console.log("Vehicles fetched", response2.data.Vehicles);
                vehicles.value = response2.data.Vehicles;
            } catch (error) {
                console.error("Error fetching vehicles:", error);
                if (error.response2) {
                    console.error("Error response:", error.response2);
                }
            }
        };

        const fetchRemainingFuel = async () => {
            try {
                const response = await DataService.get(`/fuel/total-remaining`);
                totalFuelRemaining.value = response.data.total;
            } catch (error) {
                console.error("Error fetching total fuel remaining:", error);
            }
        };

        const viewFuelDispensationOrder = (fuelDispensationOrderId) => {
            router.push(
                `/app/fuel-dispensation/${fuelDispensationOrderId}`,
            );
        };

        const editFuelDispensationOrder = (fuelDispensationOrderId) => {
            router.push(
                `/app/fuel-dispensation/edit/${fuelDispensationOrderId}`,
            );
        };
        const deleteFuelDispensationOrder = async (fuelDispensationOrderId) => {
            if (
                window.confirm(
                    "Are you sure you want to delete this fuel dispensation order? This action cannot be undone.",
                )
            ) {
                try {
                    await DataService.delete(
                        `/fuel_dispensation_order/${fuelDispensationOrderId}`,
                    );
                    toast.success(
                        "Fuel Dispensation order  deleted successfully.",
                    );
                    await fetchFuelDispensationOrders(); // Refresh the list
                } catch (error) {
                    toast.error(
                        "Failed to delete  fuel dispensation order. Please try again.",
                    );
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
                title: "Truck",
                dataIndex: "truck",
                key: "user",
            },
            {
                title: "Fuel Type",
                dataIndex: "fuel_type",
                key: "user",
            },
            {
                title: "Quantity",
                dataIndex: "quantity",
                key: "coutry",
            },
            {
                title: "Dispensation Date",
                dataIndex: "dispense_date",
                key: "dispense_date",
            },

            {
                title: "Dispensation Location",
                dataIndex: "dispense_location",
                key: "dispense_location",
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
                    return (
                        <div class="table-actions">
                            <button
                                class="view"
                                onClick={() =>
                                    viewFuelDispensationOrder(record.key)
                                }
                            >
                                <unicon name="eye"></unicon>
                            </button>
                            <button
                                class="edit"
                                onClick={() =>
                                    editFuelDispensationOrder(record.key)
                                }
                            >
                                <unicon name="edit"></unicon>
                            </button>
                            <button
                                class="delete"
                                onClick={() =>
                                    deleteFuelDispensationOrder(record.key)
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
        });

        const form = reactive({
            fuel_purchase_id: "",
            delivery_note_id: "",
            fuel_type: "",
            quantity: "",
            quantity_abbreviation_name: "",
            quantity_abbreviation_id: "",
            dispense_date: "",
            odometer_reading: "",
            dispense_location: "",
            status: "",
            selectedTruckRegistration: "",
            truck_id: "",
        });

        const handleFileUpload = (event, fieldName) => {
            const file = event.target.files[0];
            if (file) {
                form[fieldName] = file; // Update the form's state with the selected file
            }
        };

        console.log("Items to be submmited", form);

        const handleSubmit = async () => {
            // Check if all required fields are filled
            if (
                !form.fuel_purchase_id ||
                !form.fuel_type ||
                !form.quantity ||
                !form.quantity_abbreviation_id ||
                !form.dispense_date ||
                !form.truck_id ||
                !form.odometer_reading ||
                !form.dispense_location ||
                !form.delivery_note_id
            ) {
                toast.error("Please fill in all required fields.");
                return; // Prevent form submission
            }

            // Check if the selected fuel purchase  is valid
            const selectedFuelPurchaseId = fuelPurchaseOrders.value.find(
                (fuelPurchase) => fuelPurchase.id === form.fuel_purchase_id,
            );
            if (!selectedFuelPurchaseId) {
                toast.error("Please select item.");
                return; // Prevent form submission
            }

            // Check if the selected country is valid
            const selectedDeliveryNote = deliveryNotes.value.find(
                (deliveryNote) => deliveryNote.id === form.delivery_note_id,
            );
            if (!selectedDeliveryNote) {
                toast.error("Please select item.");
                return; // Prevent form submission
            }

            // const selectedVehicle = vehicles.value.find(
            //     (vehicle) => vehicle.id === form.truck_id,
            // );
            // if (!selectedVehicle) {
            //     toast.error("Please select an item!");
            //     return;
            // }

            // // Check if the selected state is valid
            // const selectedInvoice = invoices.value.find(
            //     (invoice) => invoice.id === form.invoice_id,
            // );

            // console.log
            // if (!selectedInvoice) {
            //     toast.error("Please select invoice.");
            //     return; // Prevent form submission
            // }

            const formattedDispenseDate = new Date(form.dispense_date)
                .toISOString()
                .split("T")[0];

            const formData = new FormData();

            formData.append("fuel_purchase_id", form.fuel_purchase_id);
            formData.append("delivery_note_id", form.delivery_note_id);
            formData.append("fuel_type", form.fuel_type);
            formData.append("quantity", form.quantity);
            formData.append(
                "quantity_abbreviation_id",
                form.quantity_abbreviation_id,
            );
            if (form.dispense_date) {
                formData.append("dispense_date", formattedDispenseDate);
            }

            formData.append("dispense_location", form.dispense_location);
            formData.append("truck_id", form.truck_id);
            formData.append("odometer_reading", form.odometer_reading);
            formData.append("status", form.status);

            try {
                isLoading.value = true;
                const response = await DataService.post(
                    "/fuel_dispensation_order",
                    formData,
                );

                if (response.status === 201) {
                    toast.success("Record Added Successfully");
                    // Reset the form data to its initial state
                    form.fuel_purchase_id = "";
                    form.fuel_type = "";
                    form.quantity = "";
                    form.delivery_note_id = "";
                    form.quantity_abbreviation_id = "";

                    form.odometer_reading = "";
                    form.dispense_location = "";

                    // Close the drawer
                    open.value = false;

                    await fetchFuelDispensationOrders();

                    router.push({
                        path: "/app/fuel-dispensation",
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
                        selectedOrder.quantityabbreviationid.name; // Display name
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
                    form.truck_id = selectedTruck.id; // Update the truck_id with the ID of the selected truck
                } else {
                    form.truck_id = ""; // Reset truck_id if no valid truck is selected
                }
            },
        );
        return {
            // data,
            // columns,
            // columnsPagination,
            tableDataScource,
            dataTableColumn,
            form,
            open,
            showDrawer,
            onClose,
            handleSubmit,
            isLoading,
            handleFileUpload,
            unitsOfMeasures,
            vehicles,
            fuelPurchaseOrders,
            deliveryNotes,
            fetchFuelDispensationOrders,
            totalFuelRemaining,
            fueldispenseOrders
        };
    },
});
</script>

<style scoped>
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
</style>
