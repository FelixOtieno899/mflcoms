<template>
    <Main>
        <a-row :gutter="15">
            <a-col :xs="24">
                <BorderLessHeading>
                    <sdCards title="Manage Vehicles">
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
                                    title="Create New Vehicle"
                                    :width="800"
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
                                                <a-col :span="8">
                                                    <a-form-item
                                                        label="Vehicle Name"
                                                        name="vehicle_name"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                                message: 'Required!'
                                                            },
                                                        ]"
                                                    >
                                                        <a-input
                                                            type="text"
                                                            v-model:value="
                                                                form.vehicle_name
                                                            "
                                                            placeholder=""
                                                        />
                                                    </a-form-item>
                                                </a-col>
                                                <a-col :span="8">
                                                    <a-form-item
                                                        label="Vehicle Brand"
                                                        name="vehicle_brand_id"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                                message: 'Required!'
                                                            },
                                                        ]"
                                                    >
                                                        <select
                                                            v-model="
                                                                form.vehicle_brand_id
                                                            "
                                                            class="custom-select"
                                                        >
                                                            <option value="">
                                                                Select
                                                                Brand
                                                            </option>
                                                            <option
                                                                v-for="brand in vehicleBrands"
                                                                :key="brand.id"
                                                                :value="
                                                                    brand.id
                                                                "
                                                            >
                                                                {{
                                                                    brand.model
                                                                }}
                                                            </option>
                                                        </select>
                                                    </a-form-item>
                                                </a-col>

                                                <a-col :span="8">
                                                    <a-form-item
                                                        label="Registration Number"
                                                        name="registration_no"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                                message:
                                                                    'Required!',
                                                            },
                                                        ]"
                                                    >
                                                        <a-input
                                                            type="text"
                                                            v-model:value="
                                                                form.registration_no
                                                            "
                                                            placeholder=""
                                                        />
                                                    </a-form-item>
                                                </a-col>
                                            </a-row>

                                            <a-row :gutter="16">
                                                <a-col :span="8">
                                                    <a-form-item
                                                        label="Color"
                                                        name="vehicle_color"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                                message: 'Required!'
                                                            },
                                                        ]"
                                                    >
                                                        <select
                                                            v-model="
                                                                form.vehicle_color
                                                            "
                                                            class="custom-select"
                                                        >
                                                            <option value="">
                                                                Please select
                                                                Color
                                                            </option>
                                                            <option
                                                                value="blue"
                                                            >
                                                                Blue
                                                            </option>
                                                            <option
                                                                value="silver"
                                                            >
                                                                Silver
                                                            </option>
                                                            <option
                                                                value="black"
                                                            >
                                                                Black
                                                            </option>
                                                            <option
                                                                value="white"
                                                            >
                                                                White
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
                                                                message: 'Required!'
                                                            },
                                                        ]"
                                                    >
                                                        <a-input
                                                            type="Number"
                                                            v-model:value="
                                                                form.odometer_reading
                                                            "
                                                            placeholder=""
                                                        />
                                                    </a-form-item>
                                                </a-col>

                                                <a-col :span="8">
                                                    <a-form-item
                                                        label="Fuel Tank Level"
                                                        name="current_fuel_tank_level"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                                message: 'Required!'
                                                            },
                                                        ]"
                                                    >
                                                        <a-input
                                                            type="Number"
                                                            v-model:value="
                                                                form.current_fuel_tank_level
                                                            "
                                                            placeholder=""
                                                        />
                                                    </a-form-item>
                                                </a-col>
                                            </a-row>

                                            <a-row :gutter="16">
                                                <a-col :span="12">
                                                    <a-form-item
                                                        label="Engine Number"
                                                        name="engine_no"
                                                        
                                                    >
                                                        <a-input
                                                            type="text"
                                                            v-model:value="
                                                                form.engine_no
                                                            "
                                                            placeholder=""
                                                        />
                                                    </a-form-item>
                                                </a-col>

                                                <a-col :span="12">
                                                    <a-form-item
                                                        label="Chasis Number"
                                                        name="chassis_no"
                                                       
                                                    >
                                                        <a-input
                                                            type="text"
                                                            v-model:value="
                                                                form.chassis_no
                                                            "
                                                            placeholder=""
                                                        />
                                                    </a-form-item>
                                                </a-col>
                                            </a-row>
                                            <a-row :gutter="16">
                                                <a-col :span="24">
                                                    <a-form-item
                                                        label="Description"
                                                        name="description"
                                                        
                                                    >
                                                        <a-textarea
                                                            type="text"
                                                            v-model:value="
                                                                form.description
                                                            "
                                                        />
                                                    </a-form-item>
                                                </a-col>
                                            </a-row>

                                            <a-row :gutter="16">
                                                <a-col>
                                                    <h4>Please Upload:</h4>

                                                    <a-form-item
                                                        label="Vehicle Image"
                                                        name="vehicle_image"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                                message: 'Required!'
                                                            },
                                                        ]"
                                                    >
                                                        <input
                                                            type="file"
                                                            accept=".jpg, .jpeg, .png"
                                                            @change="
                                                                (event) =>
                                                                    handleFileUpload(
                                                                        event,
                                                                        'vehicle_image',
                                                                    )
                                                            "
                                                        />
                                                        <!-- Add your file upload component here -->
                                                    </a-form-item>
                                                </a-col>
                                            </a-row>

                                            
                                            <a-row
                                                style="margin-top: 20px"
                                                :gutter="16"
                                             >
                                                <a-col :span="12">
                                                    <p>
                                                        <unicorn
                                                            name="location-point"
                                                        ></unicorn
                                                        >Additional info
                                                    </p>
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
                                                

                                               
                                            </a-row>
                                            <a-row :gutter="16">

                                                <a-col :span="8">
                                                    <a-form-item
                                                        label="Select Account"
                                                        name="account_id"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                                message: 'Required!'
                                                            },
                                                        ]"
                                                    >
                                                        <select
                                                            v-model="
                                                                form.account_id
                                                            "
                                                            class="custom-select"
                                                        >
                                                            <option disabled value="">
                                                                Select
                                                                Account
                                                            </option>
                                                            <option
                                                                v-for="account in accounts"
                                                                :key="account.id"
                                                                :value="
                                                                    account.id
                                                                "
                                                            >
                                                                {{
                                                                   account.name
                                                                }}
                                                            </option>
                                                        </select>
                                                    </a-form-item>
                                                </a-col>

                                            </a-row>

                                            <a-row :gutter="16">
                                                <a-col :span="12">
                                                    <a-form-item
                                                        label="Opening balance"
                                                        name="opening_balance"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                                message:
                                                                    'Required!',
                                                            },
                                                        ]"
                                                    >
                                                        <a-input
                                                            type="text"
                                                            v-model:value="
                                                                form.opening_balance
                                                            "
                                                        />
                                                    </a-form-item>
                                                </a-col>

                                                <a-col :span="12">
                                                    <a-form-item
                                                        label="As of"
                                                        name="open_as_of"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                                message:
                                                                    'Required!',
                                                            },
                                                        ]"
                                                    >
                                                        <a-date-picker
                                                            v-model:value="
                                                                form.open_as_of
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

                                            <a-row
                                                style="margin-top: 30px"
                                                :gutter="16"
                                            >
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


                                
                                <a-drawer
                                    title="Dispense Fuel to Truck"
                                    :width="720"
                                    :placement="placement"
                                    v-model:visible="openFuelDispensationDrawer"
                                    :body-style="{ paddingBottom: '80px' }"
                                    :footer-style="{ textAlign: 'right' }"
                                    @close="onCloseFuelDispensationDrawer"
                                >
                                    <template v-if="isLoading">
                                        <a-space class="loading">
                                            <a-spin size="large" />
                                        </a-space>
                                    </template>

                                    <template v-else>
                                        <a-form
                                            :model="formState"
                                            @finish="handleSubmitFuelDispense"
                                            :rules="rules"
                                            layout="vertical"
                                        >
                                       
                                            <a-row>
                                                
                                                 <a-col :span="12">
                                                    <a-form-item
                                                        label="Dispensation Order Reference Number"
                                                        name="fuel_dispense_order_id"
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
                                                                formState.fuel_dispense_order_id
                                                            "
                                                            class="custom-select"
                                                        >
                                                            <option value="">
                                                                Select reference  number
                                                            </option>
                                                            <option
                                                                v-for="dispenseOrder in fueldispenseOrders"
                                                                :key="dispenseOrder.id"
                                                                :value="dispenseOrder.id"
                                                            >
                                                           
                                                                {{ dispenseOrder.dispense_reference_number }}
                                                            </option>
                                                        </select>
                                                    </a-form-item>
                                                </a-col> 


                                            </a-row>
                                            <a-row :gutter="16">
                                               

                                                <a-col :span="8">
                                                    <a-form-item
                                                        label="Current Fuel Tank Level"
                                                        name="current_fuel_tank_level"
                                                        :rules="[
                                                            {
                                                                required: false,
                                                                
                                                            },
                                                        ]"
                                                    >
                                                        <a-input
                                                            type="Number"
                                                            min="0"
                                                            v-model:value="
                                                            formState.previous_fuel_tank_level

                                                            "
                                                           readonly
                                                            placeholder=""
                                                        />
                                                    </a-form-item>
                                                </a-col>

                                                <a-col :span="8">
                                                    <a-form-item
                                                        label="New Fuel Tank Level"
                                                        name="new_fuel_tank_level"
                                                        :rules="[
                                                            {
                                                                required: false,
                                                          
                                                            },
                                                        ]"
                                                    >
                                                        <a-input
                                                            type="Number"
                                                            min="0"
                                                            v-model:value="
                                                            formState.new_fuel_tank_level

                                                            "
                                                           readonly
                                                            placeholder=""
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
                                                                    'Required!',
                                                            },
                                                        ]"
                                                    >
                                                        <a-date-picker
                                                            v-model:value="
                                                                formState.dispense_date
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
                                                                    'Required!',
                                                            },
                                                        ]"
                                                    >
                                                        <a-input
                                                            type="text"
                                                            v-model:value="
                                                                formState.dispense_location
                                                            "
                                                            placeholder=""
                                                        />
                                                    </a-form-item>
                                                </a-col>
                                            </a-row>

                                            <a-row :gutter="16">
                                                <a-col :span="24">
                                                    <a-space
                                                        style="margin-top: 40px"
                                                        align="end"
                                                    >
                                                        <a-button
                                                            @click="
                                                                onCloseFuelDispensationDrawer
                                                            "
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
                            @search="fetchVehicles"
                        />
                    </sdCards>
                </BorderLessHeading>
            </a-col>
        </a-row>
    </Main>
</template>

<script>
import { DataService } from "@/config/dataService/dataService";
import { defineComponent, onMounted, watch } from "vue";
import { Main } from "../../../styled";
import DataTables from "@/components/table/DataTable.vue";
import { BorderLessHeading } from "../../../styled";
import { reactive, ref } from "vue";
//import { useStore } from "vuex";

import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

export default defineComponent({
    name: "Vehicle",
    components: {
        Main,
        DataTables,
        BorderLessHeading,
    },
    setup() {
        const router = useRouter();
        const toast = useToast();

        const isLoading = ref(false);
        

        const placement = ref("left");
        const accounts = ref([]);

        const totalFuelRemaining = ref(0);
        const openFuelDispensationDrawer = ref(false);
        // const { state, dispatch } = useStore();
        const unitsOfMeasures = ref([]);
        const tableDataScource = ref([]);
        const fueldispenseOrders = ref([]);

        const fetchAllData = async () => {
            await fetchRemainingFuel();
            await fetchAccounts();
            await Promise.all([fetchVehicles(), fetchDispenseOrders(), fetchAllVehicleBrands(), fetchUnitsOfMeasurements()]);
        };

        const fetchVehicles = async (registrationNo = null) => {
            try {
                let response;
                if (registrationNo) {
                    // Call the searchVehicles method if a registrationNo is provided
                    response = await searchVehicles(registrationNo);
                } else {
                    // Existing logic to fetch all vehicles
                    response = await DataService.get("/vehicle");
                    console.log("Vehicles fetched", response.data);
                    if (response.status === 200) {
                        if (Array.isArray(response.data.Vehicles)) {
                            // Format the data to match the structure expected by DataTables
                            tableDataScource.value = response.data.Vehicles.map(
                                (vehicle) => ({
                                    key: vehicle.id,
                                    vehicle_name: (
                                        <span class="ninjadash-username">
                                            {vehicle.vehicle_name}
                                        </span>
                                    ),
                                    registration_no: (
                                        <span>{vehicle.registration_no}</span>
                                    ),
                                    color: vehicle.vehicle_color,
                                    brand: vehicle.brand.model,
                                    odometer_reading: vehicle.odometer_reading,
                                    previous_fuel_tank_level: vehicle.current_fuel_tank_level,
                                //    dispense_status: (
                                //         <span
                                //             class={`ninjadash-status ninjadash-status-${vehicle.dispense_status}`}
                                //         >
                                //             {vehicle.dispense_status}
                                //         </span>
                                //     ),
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
                console.error("Error fetching vehicles:", error);
                toast.error("An error occurred. Please try again.");
            }
        };

        const searchVehicles = async (registrationNo) => {
            try {
                const response = await DataService.get(
                    `/vehicle/search/${registrationNo}`,
                );

                console.log("Vehicle searched", response);
                if (
                    response.status === 200 &&
                    Array.isArray(response.data.Vehicles)
                ) {
                    tableDataScource.value = response.data.Vehicles.map(
                        (vehicle) => ({
                            key: vehicle.id,
                            vehicle_name: (
                                <span class="ninjadash-username">
                                    {vehicle.vehicle_name}
                                </span>
                            ),
                            registration_no: (
                                <span>{vehicle.registration_no}</span>
                            ),
                            color: vehicle.vehicle_color,
                            odometer_reading: vehicle.odometer_reading,
                            
                            status: (
                                <span
                                    class={`ninjadash-status ninjadash-status-${vehicle.status}`}
                                >
                                    {vehicle.status}
                                </span>
                            ),
                        }),
                    );
                } else {
                    tableDataScource.value = [];
                }
            } catch (error) {
                console.error("Error searching drivers:", error);
                toast.error("An error occurred. Please try again.");
            }
        };

        const fetchUnitsOfMeasurements = async () => {
            try {
                const response = await DataService.get(`/units_of_measure`);
                console.log(
                    "Units of Measurements fetched fetched",
                    response.data.Units,
                );
                unitsOfMeasures.value = response.data.Units;
            } catch (error) {
                console.error("Error fetching units of measurements:", error);
                if (error.response) {
                    console.error("Error response:", error.response);
                }
            }
        };

        const fetchDispenseOrders = async () => {
            try {
                const response5 = await DataService.get(`/dispensation_order`);
                console.log(
                    "Dispensation fetched",
                    response5.data.Fuel_dispense_orders,
                );
                fueldispenseOrders.value = response5.data.Fuel_dispense_orders;
            } catch (error) {
                console.error("Error fetching fuel dispense orders :", error);
                if (error.response5) {
                    console.error("Error response:", error.response5);
                }
            }
        };


        const fetchAccounts = async () => {
            try {
                const response = await DataService.get(`/accounts/expenses`);
                console.log("Accounts fetched for expenses", response.data.Accounts);
                accounts.value = response.data.Accounts;
            } catch (error) {
                console.error("Error fetching accounts:", error);
                if (error.response) {
                    console.error("Error response:", error.response);
                }
            }
        };




        const viewVehicle = (vehicleId) => {
            router.push(`/app/vehicles/${vehicleId}`);
        };

        const editVehicle = (vehicleId) => {
            router.push(`/app/vehicles/edit/${vehicleId}`);
        };
        const deleteVehicle = async (vehicleId) => {
            if (
                window.confirm(
                    "Are you sure you want to delete this vehicle? This action cannot be undone.",
                )
            ) {
                try {
                    await DataService.delete(`/vehicle/${vehicleId}`);
                    toast.success("Vehicle deleted successfully.");
                    await fetchVehicles(); // Refresh the list
                } catch (error) {
                    toast.error("Failed to delete vehicle. Please try again.");
                }
            }
        };

        const dataTableColumn = [
    {
        title: "Name",
        dataIndex: "vehicle_name",
        key: "user",
    },
    {
        title: "Registration Number",
        dataIndex: "registration_no",
        key: "country",
    },
    {
        title: "Color",
        dataIndex: "color",
        key: "position",
    },
    {
        title: "Brand",
        dataIndex: "brand",
        key: "brand",
    },
    {
        title: "Odometer Reading",
        dataIndex: "odometer_reading",
        key: "date",
    },
    {
        title: "Actions",
        dataIndex: "action",
        key: "action",
        width: "90px",
        customRender: ({ record }) => {
            return (
                <div class="table-actions">
                   
                    {totalFuelRemaining.value > 0 && (
                        <button
                            style="cursor: pointer; color: blue;"
                            class="view"
                            onClick={() =>
                                dispenseFuel(
                                    record.key,
                                    record.odometer_reading,
                                    record.previous_fuel_tank_level
                                )
                            }
                        >
                            Dispense Fuel
                        </button>
                    )}

                    <button
                        style="cursor: pointer"
                        class="view"
                        onClick={() => viewVehicle(record.key)}
                    >
                        <unicon name="eye"></unicon>
                    </button>
                    <button
                        style="cursor: pointer"
                        class="edit"
                        onClick={() => editVehicle(record.key)}
                    >
                        <unicon name="edit"></unicon>
                    </button>
                    <button
                        style="cursor: pointer"
                        class="delete"
                        onClick={() => deleteVehicle(record.key)}
                    >
                        <unicon name="trash"></unicon>
                    </button>
                </div>
            );
        },
    },
];




        const form = reactive({
            account_id: "",
            open_as_of: "",
            opening_balance: "",
            vehicle_name: "",
            vehicle_brand_id: "",
            registration_no: "",
            vehicle_color: "",
            odometer_reading: "",
            engine_no: "",
            chassis_no: "",
            description: "",
            vehicle_image: null,
            current_fuel_tank_level: "",
        });



        const handleFileUpload = (event, fieldName) => {
            const file = event.target.files[0];
            if (file) {
                form[fieldName] = file; // Update the form's state with the selected file
            }
        };

        console.log("Items to be submmited", form.value);

        const handleSubmit = async () => {
            // // Check if any vehicle brands are available
            // if (vehicleBrands.value.length === 0) {
            //     toast.error(
            //         "No vehicle brands available. Please create a brand first.",
            //     );
            //     return; // Prevent form submission
            // }
            // Check if all required fields are filled
            if (
                !form.vehicle_name ||
                !form.vehicle_brand_id ||
                !form.registration_no ||
                !form.vehicle_color ||
                !form.odometer_reading ||              
                !form.vehicle_image ||
                !form.opening_balance ||
                !form.open_as_of
            ) {
                toast.error("Please fill in all required fields.");
                return; // Prevent form submission
            }

            // Check if the selected vehicle brand is valid
            const selectedBrand = vehicleBrands.value.find(
                (brand) => brand.id === form.vehicle_brand_id,
            );
            if (!selectedBrand) {
                toast.error("Please select a valid vehicle brand.");
                return; // Prevent form submission
            }

            const formattedAsof = new Date(form.open_as_of)
                .toISOString()
                .split("T")[0];

            const formData = new FormData();

            // Append existing form fields
            formData.append("account_id", form.account_id);
            formData.append("opening_balance", form.opening_balance);
            formData.append("vehicle_name", form.vehicle_name);
            formData.append("vehicle_brand_id", form.vehicle_brand_id);
            formData.append("registration_no", form.registration_no);
            formData.append("vehicle_color", form.vehicle_color);
            formData.append("odometer_reading", form.odometer_reading);
            formData.append("current_fuel_tank_level", form.current_fuel_tank_level);
            formData.append("engine_no", form.engine_no);
            formData.append("chassis_no", form.chassis_no); // Corrected typo in field name
            formData.append("description", form.description);
            if (form.open_as_of) {
                formData.append("open_as_of", formattedAsof);
            }


            // Append file upload fields
            formData.append("vehicle_image", form.vehicle_image);

            try {
                isLoading.value = true;
                const response = await DataService.post("/vehicle", formData);

                if (response.status === 201) {
                   
                    toast.success("Record Added Successfully");
                    // Reset the form data to its initial state
                    // for (const key in form) {
                    //     if (Object.hasOwnProperty.call(form, key)) {
                    //         form[key] = ""; // Clear all form fields
                    //     }
                    // }
                    form.vehicle_name = "";
                    form.account_id = "";
                    form.open_as_of = "";
                    form.opening_balance = "";
                    form.vehicle_brand_id = "";
                    form.registration_no = "";
                    form.vehicle_color = "";
                    form.odometer_reading = "";
                    form.engine_no = "";
                    form.chassis_no = "";
                    form.description = "";
                    form.current_fuel_tank_level = "";

                    form.vehicle_image = null;

                    // Close the drawer
                    open.value = false;

                    await fetchVehicles();

                    router.push({
                        path: "/app/vehicles",
                    });
                } else {
                    toast.error("Failed to add record. Please try again.");
                }
            } catch (error) {
                console.error("Record Add error", error);
                console.log("Error Response:", error.response);

                if (error.response && error.response.status === 422) {
                    
                    const errorMessages = error.response.data.Error || [];

                    
                    errorMessages.forEach((message) => {
                        toast.error(message);
                    });
                } else if (error.response && error.response.status === 500) {
                    toast.error(
                        "A server error occurred. Please try again later.",
                    );
                } else {
                    toast.error("An error occurred. Please try again.");
                }
            }  finally {
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

        const vehicleBrands = ref([]);

        const fetchAllVehicleBrands = async () => {
            try {
                const response = await DataService.get(`/vehicle/brand`);
                console.log("Vehicle  Brands fetched", response.data);
                vehicleBrands.value = response.data.Vehicle_brands;
            } catch (error) {
                console.error("Error fetching vehicle brands:", error);
                if (error.response) {
                    console.error("Error response:", error.response);
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



        //Start of Fuel Dispensation //

        const formState = reactive({
            truck_id: "",
            fuel_dispense_order_id: "",
            quantity: "",
            quantity_abbreviation_id: "19",
            dispense_date: "",
            odometer_reading: "",
            dispense_location: "",
            new_fuel_tank_level: "",
            previous_fuel_tank_level: ""
           
        })
        
        const dispenseFuel = async (truckId, ordometerRd, previousFuelTankLevel) => {
            formState.truck_id = truckId;
            formState.odometer_reading = ordometerRd;
            formState.previous_fuel_tank_level = previousFuelTankLevel;

            openFuelDispensationDrawer.value = true;
        };


        // const newFuelLevel = computed(() => {

        //    const previusLevel = parseFloat(formState.previous_fuel_tank_level) || 0;
        //    const quantity = parseFloat(formState.quantity) || 0;

        //    return previusLevel + quantity;
        // })

       

        const onCloseFuelDispensationDrawer = () => {
            openFuelDispensationDrawer.value = false;
        };


        const handleSubmitFuelDispense = async () => {
    if (
        !formState.quantity ||
        
        !formState.dispense_date ||
        !formState.dispense_location
    ) {
        toast.error("Please fill in all required fields.");
        return;
    }

    const formattedDispenseDate = new Date(formState.dispense_date)
        .toISOString()
        .split("T")[0];

    const formData = new FormData();
    formData.append("fuel_dispense_order_id", formState.fuel_dispense_order_id)
    formData.append("quantity", formState.quantity);
    formData.append("quantity_abbreviation_id", formState.quantity_abbreviation_id);
    formData.append("dispense_date", formattedDispenseDate);
    formData.append("dispense_location", formState.dispense_location);
    formData.append("truck_id", formState.truck_id);
    formData.append("odometer_reading", formState.odometer_reading);
    formData.append("status", formState.status);

  //  console.log("What am i submitting", formData);

    try {
        isLoading.value = true;
        const response = await DataService.post("/fuel_dispensation_order", formData);

        console.log("What has been submiited", response);

        if (response.status === 201) {
            toast.success("Fuel dispensed Successfully");
            formState.quantity = "";
            formState.quantity_abbreviation_id = "";
            formState.odometer_reading = "";
            formState.dispense_location = "";
            formState.fuel_dispense_order_id = "";

            onCloseFuelDispensationDrawer();
            await fetchVehicles();
            router.push({ path: "/app/fuel-dispensation" });
        } else {
            toast.error(response.data.error || "Failed to add record. Please try again.");
        }
    }catch (error) {
                console.error("Record Add error", error);

                if (error.response) {
                    
                    if (error.response.status === 422) {
                        const errorMessages = error.response.data.Error || [];

                       
                        Object.values(errorMessages).forEach((messageArray) => {
                            messageArray.forEach((message) => {
                                toast.error(message);
                            });
                        });
                    }
                    
                    else if (error.response.status === 500) {
                        toast.error(
                            "A server error occurred. Please try again later.",
                        );
                    } else {
                        toast.error("An error occurred. Please try again.");
                    }
                } else {
                    toast.error(
                        "Network error. Please check your internet connection.",
                    );
                }
            } finally {
        isLoading.value = false;
    }
};



//End of Fuel dispensation

onMounted(async () => {
    isLoading.value = true;  // Set loading state
    try {
        await fetchAllData();
    } catch (error) {
        console.error("Error fetching data:", error);
    } finally {
        isLoading.value = false;  // Unset loading state
    }
});


        watch(
    () => formState.fuel_dispense_order_id,
    (newVal) => {
        const selectedOrder = fueldispenseOrders.value.find(
            (order) => order.id === newVal,
        );
        if (selectedOrder) {
            
            formState.fuel_type = selectedOrder.fuel_type;
            formState.quantity = selectedOrder.quantity;

            formState.new_fuel_tank_level = 
                (parseFloat(selectedOrder.quantity) || 0) + 
                (parseFloat(formState.previous_fuel_tank_level) || 0);
        } else {
            formState.fuel_type = "";
            formState.quantity = "";
        }
    },
);

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
            vehicleBrands,
            fetchVehicles,
            formState,
            onCloseFuelDispensationDrawer,
            handleSubmitFuelDispense,
            openFuelDispensationDrawer,
            placement,
            unitsOfMeasures,
            fueldispenseOrders,
            accounts
          
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
