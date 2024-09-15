<template>
    <Main>
        <a-row :gutter="15">
            <a-col :xs="24">
                <BorderLessHeading>
                    <sdCards title="Manage Dispensation Orders">
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
                                style="
                                    display: flex;
                                    justify-content: flex-end;
                                    margin-top: 30px;
                                "
                                :span="24"
                            >
                                <a-button
                                    style="margin-top: -30px"
                                    type="primary"
                                    @click="showDrawer"
                                >
                                    <template #icon><PlusOutlined /></template>
                                    + Add New Order
                                </a-button>
                                <a-drawer
                                    title="Create New Fuel Dispensation Order"
                                    :width="600"
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
                                                <a-col :span="24">
                                                    <a-form-item
                                                        label="Dispensation Order Reference Number"
                                                        name="dispense_reference_number"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                                message:
                                                                    'Required!',
                                                            },
                                                        ]"
                                                    >
                                                        <a-input
                                                            v-model:value="
                                                                form.dispense_reference_number
                                                            "
                                                            placeholder=""
                                                            readonly
                                                        />
                                                    </a-form-item>
                                                </a-col>
                                            </a-row>
                                            <a-row :gutter="16">
                                                <a-col :span="24">
                                                    <a-form-item
                                                        label="Quantity"
                                                        name="quantity"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                                message:
                                                                    'Required!',
                                                            },
                                                        ]"
                                                    >
                                                        <a-input
                                                            type="number"
                                                            v-model:value="
                                                                form.quantity
                                                            "
                                                            placeholder=""
                                                        />
                                                    </a-form-item>
                                                </a-col>

                                                <!-- <a-col :span="12">
                                                    <a-form-item
                                                        label="Quantity Measurement"
                                                        name="quantity_abbreviation_id"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                                message:
                                                                    'Required!',
                                                            },
                                                        ]"
                                                    >
                                                    <select
                                                    v-model="
                                                        form.quantity_abbreviation_id
                                                    "
                                                    class="custom-select"
                                                >
                                                    <option value="">
                                                        Select unit of
                                                        measurement
                                                    </option>
                                                    <option
                                                        v-for="unit in unitsOfMeasures"
                                                        :key="unit.id"
                                                        :value="unit.id"
                                                    >
                                                        {{ unit.name }}
                                                    </option>
                                                </select>
                                                    </a-form-item>
                                                </a-col> -->
                                            </a-row>
                                            <a-row :gutter="16"> </a-row>
                                            <a-row :gutter="16">
                                                <a-col :span="24">
                                                    <a-form-item
                                                        label="Date"
                                                        name="dispensation_order_date"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                                message:
                                                                    'Required',
                                                            },
                                                        ]"
                                                    >
                                                        <a-date-picker
                                                            v-model:value="
                                                                form.dispensation_order_date
                                                            "
                                                            style="width: 100%"
                                                            :get-popup-container="
                                                                (trigger) =>
                                                                    trigger.parentElement
                                                            "
                                                        />
                                                    </a-form-item>
                                                </a-col>
                                            </a-row>

                                            <a-row>
                                                <a-col :span="24">
                                                    <a-form-item
                                                        label="Note"
                                                        name="description"
                                                        :rules="[
                                                            {
                                                                required: false,
                                                            },
                                                        ]"
                                                    >
                                                        <a-textarea
                                                            v-model:value="
                                                                form.description
                                                            "
                                                            placeholder=""
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
import { defineComponent, reactive, ref, onMounted, computed } from "vue";
import { Main } from "../../../styled";
import DataTables from "@/components/table/DataTable.vue";
import { BorderLessHeading } from "../../../styled";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

export default defineComponent({
    name: "DispensationOrder",
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

        const fuelPurchaseOrders = ref([]);
        const totalFuelRemaining = ref(0);

        const deliveryNotes = ref([]);

        const vehicles = ref([]);
        const canApprove = computed(() =>
            state.auth.permissions.includes("DispensationOrder.Approve"),
        );

        const loggedUser = computed(() => state.auth.user);

        console.log("Currently logged user", loggedUser.value);

        console.log("User Permissions:", state.auth.permissions);
        console.log("Can Approve:", canApprove.value);

        // const states = ref([]);

        // const invoices = ref([]);

        const dataTableColumn = [
            {
                title: "Reference Number",
                dataIndex: "dispense_reference_number",
                key: "dispense_reference_number",
            },
            {
                title: "Fuel Type",
                dataIndex: "fuel_type",
                key: "fuel_type",
            },
            {
                title: "Quantity",
                dataIndex: "quantity",
                key: "quantity",
            },
            {
                title: "Order Date",
                dataIndex: "dispensation_order_date",
                key: "dispensation_order_date",
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
                    console.log("What is this record for approve", record);

                    const isApproved = record.user_has_approved;

                    return (
                        <div class="table-actions">
                            <button
                                style={`cursor: ${isApproved ? "not-allowed" : "pointer"}; background: ${isApproved ? "gray" : "green"}; border-radius: 10px; color: white; font-size: 12px`}
                                disabled={isApproved}
                                onclick={() => {
                                    if (!isApproved) {
                                        approveDispensationOrder(record.key);
                                    }
                                }}
                            >
                                {isApproved ? "Approved" : "Approve"}
                            </button>

                            <button
                                style="cursor: pointer"
                                class="view"
                                onClick={() => viewDispensationOrder(record.id)}
                            >
                                <unicon name="eye"></unicon>
                            </button>
                            <button
                                style="cursor: pointer"
                                class="edit"
                                onClick={() => editDispensationOrder(record.id)}
                            >
                                <unicon name="edit"></unicon>
                            </button>
                            <button
                                style="cursor: pointer"
                                class="delete"
                                onClick={() =>
                                    deleteDispensationOrder(record.id)
                                }
                            >
                                <unicon name="trash"></unicon>
                            </button>
                        </div>
                    );
                },
            },
        ];

        const tableDataScource = ref([]);

        const fetchAllData = async () => {
            await Promise.all([
                fetchDispensationOrders(),
                //fetchFuelPurchaseOrders(),
                fetchDeliveryNotes(),
                fetchVehicles(),
                fetchRemainingFuel(),
            ]);
        };

        const fetchDispensationOrders = async (dispenseDate = null) => {
            try {
                let response;
                if (dispenseDate) {
                    // Call the searchFueldispenseOrders method if  purchaseDate is provided
                    response = await searchDispensationOrders(dispenseDate);
                } else {
                    // Existing logic to fetch all invoices
                    response = await DataService.get("/dispensation_order");
                    console.log(
                        "Fuel Dispensation Orders fetched",
                        response.data,
                    );
                    if (response.status === 200) {
                        if (Array.isArray(response.data.Fuel_dispense_orders)) {
                            // Format the data to match the structure expected by DataTables
                            tableDataScource.value =
                                response.data.Fuel_dispense_orders.map(
                                    (dispensationorder) => ({
                                        // id: `#${fuelpurchaseorder.id}`,
                                        key: dispensationorder.id,
                                        dispense_reference_number: (
                                            <span class="ninjadash-username">
                                                {
                                                    dispensationorder.dispense_reference_number
                                                }
                                            </span>
                                        ),
                                        fuel_type: (
                                            <span>
                                                {dispensationorder.fuel_type}
                                            </span>
                                        ),

                                        quantity: (
                                            <span>
                                                {dispensationorder.quantity}
                                            </span>
                                        ),
                                        dispensation_order_date: (
                                            <span>
                                                {
                                                    dispensationorder.dispensation_order_date
                                                }
                                            </span>
                                        ),

                                        status: (
                                            <span
                                                class={`ninjadash-status ninjadash-status-${dispensationorder.status}`}
                                            >
                                                {dispensationorder.status}
                                            </span>
                                        ),

                                        user_has_approved:
                                            dispensationorder.user_has_approved,
                                    }),
                                );

                            console.log("Hello", tableDataScource.value);
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

        const searchDispensationOrders = async (dispenseDate) => {
            try {
                const response = await DataService.get(
                    `/dispensation_order/search/${dispenseDate}`,
                );

                console.log("Searched Fuel dispensation order", response.data);
                if (
                    response.status === 200 &&
                    Array.isArray(response.data.Fuel_dispensation_order)
                ) {
                    tableDataScource.value =
                        response.data.Fuel_dispense_orders.map(
                            (dispensationorder) => ({
                                // id: `#${fuelpurchaseorder.id}`,
                                key: dispensationorder.id,
                                dispense_reference_number: (
                                    <span class="ninjadash-username">
                                        {
                                            dispensationorder.dispense_reference_number
                                        }
                                    </span>
                                ),
                                fuel_type: (
                                    <span>{dispensationorder.fuel_type}</span>
                                ),

                                quantity: (
                                    <span>{dispensationorder.quantity}</span>
                                ),
                                order_date: (
                                    <span>
                                        {
                                            dispensationorder.dispensation_order_date
                                        }
                                    </span>
                                ),

                                status: (
                                    <span
                                        class={`ninjadash-status ninjadash-status-${dispensationorder.status}`}
                                    >
                                        {dispensationorder.status}
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

        const viewDispensationOrder = (fuelDispensationOrderId) => {
            router.push(`/app/dispensation-order/${fuelDispensationOrderId}`);
        };

        const editDispensationOrder = (fuelDispensationOrderId) => {
            router.push(
                `/app/dispensation-order/edit/${fuelDispensationOrderId}`,
            );
        };
        const deleteDispensationOrder = async (fuelDispensationOrderId) => {
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
                    await fetchDispensationOrders(); // Refresh the list
                } catch (error) {
                    toast.error(
                        "Failed to delete  fuel dispensation order. Please try again.",
                    );
                }
            }
        };

        onMounted(async () => {
            await fetchAllData();
        });

        const generateRandNumber = () => {
            return Math.floor(100000 + Math.random() * 900000).toString();
        };

        const form = reactive({
            dispense_reference_number: generateRandNumber(),

            fuel_type: "Diesel",
            quantity: "",

            quantity_abbreviation_id: 19,
            dispensation_order_date: "",
            description: "",
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
                !form.dispense_reference_number ||
                !form.fuel_type ||
                !form.quantity ||
                !form.quantity_abbreviation_id ||
                !form.dispensation_order_date
            ) {
                toast.error("Please fill in all required fields.");
                return; // Prevent form submission
            }

            const formattedDispensationOrderDate = new Date(
                form.dispensation_order_date,
            )
                .toISOString()
                .split("T")[0];

            const formData = new FormData();

            formData.append(
                "dispense_reference_number",
                form.dispense_reference_number,
            );

            formData.append("fuel_type", form.fuel_type);
            formData.append("quantity", form.quantity);
            formData.append(
                "quantity_abbreviation_id",
                form.quantity_abbreviation_id,
            );
            if (form.dispensation_order_date) {
                formData.append(
                    "dispensation_order_date",
                    formattedDispensationOrderDate,
                );
            }

            formData.append("description", form.description);

            try {
                isLoading.value = true;
                const response = await DataService.post(
                    "/dispensation_order",
                    formData,
                );

                if (response.status === 201) {
                    toast.success("Record Added Successfully");
                    // Reset the form data to its initial state

                    form.fuel_type = "";
                    form.quantity = "";
                    form.dispense_reference_number = generateRandNumber();
                    form.quantity_abbreviation_id = "";
                    form.dispensation_order_date = "";

                    form.description = "";

                    // Close the drawer
                    open.value = false;

                    await fetchDispensationOrders();

                    router.push({
                        path: "/app/dispensation-order",
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
        const approveDispensationOrder = async (id) => {
            if (!canApprove.value) {
                toast.error("You are not allowed to approve this order.");
                return;
            }

            try {
                const response = await DataService.post(
                    `/dispensation_order/${id}/approve`,
                );
                console.log("I want to see response", response);

                if (response.status === 200) {
                    toast.success("Order approved successfully");
                    await fetchDispensationOrders(); 
                } else {
                
                    toast.error("Failed to approve order");
                }
            } catch (error) {
                console.log("Error details:", error);

                let errorMessage =
                    "An unexpected error occurred. Please try again.";

                
                if (error.response) {
                    
                    errorMessage =
                        error.response.data.error || "Failed to approve order";
                }

                
                toast.error(errorMessage);
            }
        };
        const open = ref(false);
        const showDrawer = () => {
            open.value = true;
        };
        const onClose = () => {
            open.value = false;
        };

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
            fetchDispensationOrders,
            totalFuelRemaining,
            canApprove,
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
