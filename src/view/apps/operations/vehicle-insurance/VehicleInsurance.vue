<template>
    <Main>
        <a-row :gutter="15">
            <a-col :xs="24">
                <BorderLessHeading>
                    <sdCards title=" Manage Vehicle Insurances">
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
                                    title="Create New Vehicle Insurance"
                                    :width="750"
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
                                            layout="vertical"
                                        >
                                            <a-row :gutter="16">
                                                <a-col :span="12">
                                                    <a-form-item
                                                        label="Insurer"
                                                        name="insurer_id"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                                message:
                                                                    'Please select an insurer',
                                                            },
                                                        ]"
                                                    >
                                                        <select
                                                            v-model="
                                                                form.insurer_id
                                                            "
                                                            class="custom-select"
                                                        >
                                                            <option value="">
                                                                Please Select
                                                                Insurer
                                                            </option>
                                                            <option
                                                                v-for="insurer in insurers"
                                                                :key="
                                                                    insurer.id
                                                                "
                                                                :value="
                                                                    insurer.id
                                                                "
                                                            >
                                                                {{
                                                                    insurer.name
                                                                }}
                                                            </option>
                                                        </select>
                                                    </a-form-item>
                                                </a-col>

                                                <a-col :span="12">
                                                    <a-form-item
                                                        label="Vehicle Registration Number"
                                                        name="registration_no"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                                message:
                                                                    'Please select registration number',
                                                            },
                                                        ]"
                                                    >
                                                        <select
                                                            v-model="
                                                                form.registration_no
                                                            "
                                                            class="custom-select"
                                                        >
                                                            <option value="">
                                                                Select
                                                                Registration
                                                                Number
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
                                            </a-row>

                                            <a-row :gutter="16">
                                                <a-col :span="10">
                                                    <a-form-item
                                                        label="Policy Number"
                                                        name="policy_number"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                                message:
                                                                    'Please enter policy number',
                                                            },
                                                        ]"
                                                    >
                                                        <a-input
                                                            type="text"
                                                            v-model:value="
                                                                form.policy_number
                                                            "
                                                            placeholder="Please enter the Policy Number"
                                                        />
                                                    </a-form-item>
                                                </a-col>
                                            </a-row>
                                            <a-row :gutter="16">
                                                <a-col :span="12">
                                                    <a-form-item
                                                        label="Policy Start Date"
                                                        name="policy_start_date"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                                message:
                                                                    'Please select policy start date',
                                                            },
                                                        ]"
                                                    >
                                                        <a-date-picker
                                                            v-model:value="
                                                                form.policy_start_date
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
                                                        label="Policy Expiry Date"
                                                        name="policy_expiry_date"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                                message:
                                                                    'Please select policy expiry date',
                                                            },
                                                        ]"
                                                    >
                                                        <a-date-picker
                                                            v-model:value="
                                                                form.policy_expiry_date
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

                                            <a-row :gutter="16">
                                                <a-col :span="12">
                                                    <a-form-item
                                                        label="Premium Amount"
                                                        name="premium_amount"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                                message:
                                                                    'Please  enter premium amount',
                                                            },
                                                        ]"
                                                    >
                                                        <a-input
                                                            type="text"
                                                            v-model:value="
                                                                form.premium_amount
                                                            "
                                                            placeholder="Please enter the premium amount"
                                                        />
                                                    </a-form-item>
                                                </a-col>

                                                <a-col :span="12">
                                                    <a-form-item
                                                        label="Deductible Amount"
                                                        name="deductible_amount"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                                message:
                                                                    'Please enter deductible amount',
                                                            },
                                                        ]"
                                                    >
                                                        <a-input
                                                            type="text"
                                                            v-model:value="
                                                                form.deductible_amount
                                                            "
                                                            placeholder="Please enter the deductible amount"
                                                        />
                                                    </a-form-item>
                                                </a-col>

                                                <a-col :span="8">
                                                    <h4>Please Upload:</h4>
                                                    <a-form-item
                                                        label="Policy Document "
                                                        name="policy_document"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                                message:
                                                                    'Please upload this file',
                                                            },
                                                        ]"
                                                    >
                                                        <input
                                                            type="file"
                                                            accept=".jpg, .jpeg, .png, .pdf"
                                                            @change="
                                                                (event) =>
                                                                    handleFileUpload(
                                                                        event,
                                                                        'policy_document',
                                                                    )
                                                            "
                                                        />
                                                        <!-- Add your file upload component here -->
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
                            </a-col>
                        </a-row>
                        <DataTables
                            :filterOption="true"
                            :filterOnchange="true"
                            :tableData="tableDataScource"
                            :columns="dataTableColumn"
                            :rowSelection="false"
                            @search="fetchVehicleInsurers"
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
//import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

export default defineComponent({
    name: "Insurer",
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
        const vehicles = ref([]);
        const insurers = ref([]);

        const tableDataScource = ref([]);

        const fetchAllData = async () => {
            await Promise.all([
                fetchVehicleInsurers(),
                fetchInsurers(),
                fetchAllVehicles(),
            ]);
        };

        const fetchVehicleInsurers = async (policyNo = null) => {
            try {
                let response;
                if (policyNo) {
                    // Call the searchVehicleInsurers method if a registrationNo is provided
                    response = await searchVehicleInsurers(policyNo);
                } else {
                    // Existing logic to fetch all vehicles
                    response = await DataService.get("/insurance");
                    console.log("Vehicles Insurers fetched", response.data);
                    if (response.status === 200) {
                        if (Array.isArray(response.data.VehicleInsurances)) {
                            // Format the data to match the structure expected by DataTables
                            tableDataScource.value =
                                response.data.VehicleInsurances.map(
                                    (vehicleInsurer) => ({
                                        // id: `#${vehicleInsurer.id}`,
                                        key: vehicleInsurer.id,
                                        policy_number: (
                                            <span class="ninjadash-username">
                                                {vehicleInsurer.policy_number}
                                            </span>
                                        ),
                                        policy_start_date: (
                                            <span>
                                                {
                                                    vehicleInsurer.policy_start_date
                                                }
                                            </span>
                                        ),
                                        policy_expiry_date:
                                            vehicleInsurer.policy_expiry_date,
                                        registration_no:
                                            vehicleInsurer.registration_no,
                                        status: (
                                            <span
                                                class={`ninjadash-status ninjadash-status-${vehicleInsurer.status}`}
                                            >
                                                {vehicleInsurer.status}
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
                console.error("Error fetching vehicle insurers :", error);
                toast.error("An error occurred. Please try again.");
            }
        };

        const searchVehicleInsurers = async (policyNo) => {
            try {
                const response = await DataService.get(
                    `/insurance/search/${policyNo}`,
                );

                console.log("Vehicle insurer searched", response);
                if (
                    response.status === 200 &&
                    Array.isArray(response.data.Vehicle_insurances)
                ) {
                    tableDataScource.value =
                        response.data.Vehicle_insurances.map(
                            (vehicleInsurer) => ({
                                // id: `#${vehicleInsurer.id}`,
                                key: vehicleInsurer.id,
                                policy_number: (
                                    <span class="ninjadash-username">
                                        {vehicleInsurer.policy_number}
                                    </span>
                                ),
                                policy_start_date: (
                                    <span>
                                        {vehicleInsurer.policy_start_date}
                                    </span>
                                ),
                                policy_expiry_date:
                                    vehicleInsurer.policy_expiry_date,
                                registration_no: vehicleInsurer.registration_no,
                                status: (
                                    <span
                                        class={`ninjadash-status ninjadash-status-${vehicleInsurer.status}`}
                                    >
                                        {vehicleInsurer.status}
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

        const fetchAllVehicles = async () => {
            try {
                const response = await DataService.get(`/vehicle`);
                console.log("Vehicles fetched", response.data.Vehicles);
                vehicles.value = response.data.Vehicles;
            } catch (error) {
                console.error("Error fetching vehicles:", error);
                if (error.response) {
                    console.error("Error response:", error.response);
                }
            }
        };

        const fetchInsurers = async () => {
            try {
                const response = await DataService.get(`/insurer`);
                console.log("Insurers fetched", response.data.Insurers);
                insurers.value = response.data.Insurers;
            } catch (error) {
                console.error("Error fetching insurers:", error);
                if (error.response) {
                    console.error("Error response:", error.response);
                }
            }
        };

        const viewVehicleInsurance = (vehicleInsuranceId) => {
            router.push(`/app/vehicle-insurances/${vehicleInsuranceId}`);
        };

        const editVehicleInsurance = (vehicleInsuranceId) => {
            router.push(`/app/vehicle-insurances/edit/${vehicleInsuranceId}`);
        };
        const deleteVehicleInsurance = async (vehicleInsuranceId) => {
            if (
                window.confirm(
                    "Are you sure you want to delete this Vehicle Insurance? This action cannot be undone.",
                )
            ) {
                try {
                    await DataService.delete(
                        `/vehicle/insurance/${vehicleInsuranceId}`,
                    );
                    toast.success("Vehicle Insurance deleted successfully.");
                    await fetchVehicleInsurers(); // Refresh the list
                    // await fetchDrivers(); // Refresh the list
                } catch (error) {
                    toast.error("Failed to delete driver. Please try again.");
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
                title: "Policy Number",
                dataIndex: "policy_number",
                key: "user",
            },
            {
                title: "Policy Start Date",
                dataIndex: "policy_start_date",
                key: "coutry",
            },

            {
                title: "Policy Expiry Date",
                dataIndex: "policy_expiry_date",
                key: "position",
            },
            {
                title: "Registration Number",
                dataIndex: "registration_no",
                key: "date",
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
                                onClick={() => viewVehicleInsurance(record.key)}
                            >
                                <unicon name="eye"></unicon>
                            </button>
                            <button
                                class="edit"
                                onClick={() => editVehicleInsurance(record.key)}
                            >
                                <unicon name="edit"></unicon>
                            </button>
                            <button
                                class="delete"
                                onClick={() =>
                                    deleteVehicleInsurance(record.key)
                                }
                            >
                                <unicon name="trash"></unicon>
                            </button>
                        </div>
                    );
                },
            },
        ];

        // onMounted(async () => {
        //     await fetchDrivers(); // Fetch drivers when the component mounts
        // });

        onMounted(async () => {
            await fetchAllData();
        });

        const form = reactive({
            insurer_id: "",
            registration_no: "",
            policy_number: "",
            policy_start_date: "",
            policy_expiry_date: "",
            premium_amount: "",
            deductible_amount: "",

            policy_document: null,
        });

        const handleFileUpload = (event, fieldName) => {
            const file = event.target.files[0];
            if (file) {
                form[fieldName] = file; // Update the form's state with the selected file
            }
        };

        console.log("Items to be submmited", form.value);

        const handleSubmit = async () => {
            // Check if all required fields are filled
            if (
                !form.insurer_id ||
                !form.registration_no ||
                !form.policy_number ||
                !form.policy_start_date ||
                !form.policy_expiry_date ||
                !form.premium_amount ||
                !form.deductible_amount
            ) {
                toast.error("Please fill in all required fields.");
                return; // Prevent form submission
            }

            const formattedPolicyStartDate = new Date(form.policy_start_date)
                .toISOString()
                .split("T")[0];
            const formattedPolicyExpiryDate = new Date(form.policy_expiry_date)
                .toISOString()
                .split("T")[0];

            // Check if the selected insurer is valid
            const selectedInsurer = insurers.value.find(
                (insurer) => insurer.id === form.insurer_id,
            );
            if (!selectedInsurer) {
                toast.error("Please select a valid Insurer.");
                return; // Prevent form submission
            }

            // Check if the selected registration number is valid
            const selectedRegistrationNo = vehicles.value.find(
                (vehicle) => vehicle.registration_no === form.registration_no,
            );
            if (!selectedRegistrationNo) {
                toast.error("Please select a valid Registration number.");
                return; // Prevent form submission
            }

            const formData = new FormData();

            // Append existing form fields
            formData.append("insurer_id", form.insurer_id);
            formData.append("registration_no", form.registration_no);
            formData.append("policy_number", form.policy_number);
            // Check if policy_start_date is not null before appending
            if (form.policy_start_date) {
                formData.append("policy_start_date", formattedPolicyStartDate);
            }

            if (form.policy_expiry_date) {
                formData.append(
                    "policy_expiry_date",
                    formattedPolicyExpiryDate,
                );
            }
            formData.append("premium_amount", form.premium_amount);
            formData.append("deductible_amount", form.deductible_amount);

            formData.append("policy_document", form.policy_document);

            try {
                isLoading.value = true;
                const response = await DataService.post("/insurance", formData);

                if (response.status === 201) {
                    // tableDataScource.value.push({
                    //     //  id: `#${response.data.id}`,
                    //     key: response.data.Vehicle_insurance.id,
                    //     policy_number: (
                    //         <span class="ninjadash-username">
                    //             {response.data.Vehicle_insurance.policy_number}
                    //         </span>
                    //     ),
                    //     policy_start_date: (
                    //         <span>
                    //             {
                    //                 response.data.Vehicle_insurance
                    //                     .policy_start_date
                    //             }
                    //         </span>
                    //     ),
                    //     policy_expiry_date:
                    //         response.data.Vehicle_insurance.policy_expiry_date,
                    //     registration_no:
                    //         response.data.Vehicle_insurance.registration_no,
                    //     status: (
                    //         <span
                    //             class={`ninjadash-status ninjadash-status-${response.data.status}`}
                    //         >
                    //             {response.data.status}
                    //         </span>
                    //     ),
                    // });

                    toast.success("Record Added Successfully");
                    // Reset the form data to its initial state
                    form.insurer_id = "";
                    form.registration_no = "";
                    form.policy_number = "";
                    form.policy_start_date = "";
                    form.policy_expiry_date = "";
                    form.premium_amount = "";
                    form.deductible_amount = "";

                    form.policy_document = null;

                    // Close the drawer
                    open.value = false;

                    await fetchVehicleInsurers();

                    router.push({
                        path: "/app/vehicle-insurances",
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
            insurers,
            vehicles,
            fetchVehicleInsurers,
            //  fetchDrivers,
            // deleteDriver,

            // handleCancel,
            // handlePreview,
            // fileList,
        };
    },
});
</script>

<style scoped>
.btn-submit {
    background-color: #0d79df;
    color: white;
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
</style>
