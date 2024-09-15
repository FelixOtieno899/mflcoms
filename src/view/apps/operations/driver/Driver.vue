<template>
    <Main>
        <a-row :gutter="15">
            <a-col :xs="24">
                <BorderLessHeading>
                    <sdCards title=" Manage  Drivers">
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
                                    title="Create New Driver"
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
                                                <a-col :span="8">
                                                    <a-form-item
                                                        label="First Name"
                                                        name="first_name"
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
                                                                form.first_name
                                                            "
                                                            placeholder=""
                                                        />
                                                    </a-form-item>
                                                </a-col>

                                                <a-col :span="8">
                                                    <a-form-item
                                                        label="Last Name"
                                                        name="last_name"
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
                                                                form.last_name
                                                            "
                                                            placeholder=""
                                                        />
                                                    </a-form-item>
                                                </a-col>

                                                <a-col :span="8">
                                                    <a-form-item
                                                        label="Date of Birth"
                                                        name="date_of_birth"
                                                    >
                                                        <a-date-picker
                                                            v-model:value="
                                                                form.date_of_birth
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
                                                        label="Phone Number"
                                                        name="phone"
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
                                                                form.phone
                                                            "
                                                            placeholder=""
                                                        />
                                                    </a-form-item>
                                                </a-col>

                                                <a-col :span="12">
                                                    <a-form-item
                                                        label="Date Joined"
                                                        name="date_of_joining"
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
                                                                form.date_of_joining
                                                            "
                                                            style="width: 100%"
                                                            :get-popup-container="
                                                                (trigger) =>
                                                                    trigger.parentElement
                                                            "
                                                            :disabledDate="disableFutureDates"
                                                        />
                                                    </a-form-item>
                                                </a-col>
                                            </a-row>

                                            <a-row :gutter="16">
                                                <a-col :span="8">
                                                    <a-form-item
                                                        label="Id Number"
                                                        name="national_id"
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
                                                                form.national_id
                                                            "
                                                            placeholder=""
                                                        />
                                                    </a-form-item>
                                                </a-col>
                                                <a-col :span="8">
                                                    <a-form-item
                                                        label="NHIF Number"
                                                        name="nhif_number"
                                                    >
                                                        <a-input
                                                            type="text"
                                                            v-model:value="
                                                                form.nhif_number
                                                            "
                                                            placeholder=""
                                                        />
                                                    </a-form-item>
                                                </a-col>

                                                <a-col :span="8">
                                                    <a-form-item
                                                        label="NSSF Number"
                                                        name="nssf_number"
                                                    >
                                                        <a-input
                                                            type="text"
                                                            v-model:value="
                                                                form.nssf_number
                                                            "
                                                            placeholder=""
                                                        />
                                                    </a-form-item>
                                                </a-col>
                                            </a-row>

                                            <a-row :gutter="16">
                                                <a-col :span="8">
                                                    <a-form-item
                                                        label="KRA Pin"
                                                        name="kra_pin"
                                                    >
                                                        <a-input
                                                            type="text"
                                                            v-model:value="
                                                                form.kra_pin
                                                            "
                                                            placeholder=""
                                                        />
                                                    </a-form-item>
                                                </a-col>
                                                <a-col :span="8">
                                                    <a-form-item
                                                        label="Bank Account Name"
                                                        name="bank_name"
                                                    >
                                                        <a-input
                                                            type="text"
                                                            v-model:value="
                                                                form.bank_name
                                                            "
                                                            placeholder=""
                                                        />
                                                    </a-form-item>
                                                </a-col>

                                                <a-col :span="8">
                                                    <a-form-item
                                                        label="Bank Account Number"
                                                        name="bank_account_number"
                                                    >
                                                        <a-input
                                                            type="text"
                                                            v-model:value="
                                                                form.bank_account_number
                                                            "
                                                            placeholder=""
                                                        />
                                                    </a-form-item>
                                                </a-col>
                                            </a-row>
                                            <a-row :gutter="16">
                                                <a-col :span="12">
                                                    <a-form-item
                                                        label="Driver License Number"
                                                        name="license_no"
                                                    >
                                                        <a-input
                                                            type="text"
                                                            v-model:value="
                                                                form.license_no
                                                            "
                                                            placeholder=""
                                                        />
                                                    </a-form-item>
                                                </a-col>

                                                <a-col :span="12">
                                                    <a-form-item
                                                        label="License Expiry Date"
                                                        name="license_expiry_date"
                                                    >
                                                        <a-date-picker
                                                            v-model:value="
                                                                form.license_expiry_date
                                                            "
                                                            style="width: 100%"
                                                            :get-popup-container="
                                                                (trigger) =>
                                                                    trigger.parentElement
                                                            "
                                                            :disabledDate="
                                                                disabledPastDates
                                                            "
                                                        />
                                                    </a-form-item>
                                                </a-col>
                                            </a-row>

                                            <a-row :gutter="16">
                                                <a-col :span="12">
                                                    <a-form-item
                                                        label="Address"
                                                        name="address"
                                                        required
                                                    >
                                                        <a-input
                                                            type="text"
                                                            v-model:value="
                                                                form.address
                                                            "
                                                            placeholder=""
                                                        />
                                                    </a-form-item>
                                                </a-col>
                                            </a-row>

                                            <a-row :gutter="16">
                                                <a-col :span="8">
                                                    <h4>
                                                        Please Upload the
                                                        following:
                                                    </h4>
                                                </a-col>
                                                <a-divider
                                                    style="
                                                        height: 2px;
                                                        background-color: #89cff0;
                                                        margin-top: -3px;
                                                    "
                                                />
                                            </a-row>

                                            <a-row :gutter="16">
                                                <a-col :span="8">
                                                    <a-form-item
                                                        label="National ID "
                                                        name="national_id_image"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                                message:
                                                                    'Required!',
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
                                                                        'national_id_image',
                                                                    )
                                                            "
                                                        />
                                                        <!-- Add your file upload component here -->
                                                    </a-form-item>
                                                </a-col>

                                                <a-col :span="8">
                                                    <a-form-item
                                                        label=" Driver's License "
                                                        name="license_image"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                                message:
                                                                    'Required!',
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
                                                                        'license_image',
                                                                    )
                                                            "
                                                        />
                                                        <!-- Add your file upload component here -->
                                                    </a-form-item>
                                                </a-col>

                                                <a-col :span="8">
                                                    <a-form-item
                                                        label="KRA PIN "
                                                        name="kra_pin_image"
                                                    >
                                                        <input
                                                            type="file"
                                                            accept=".jpg, .jpeg, .png"
                                                            @change="
                                                                (event) =>
                                                                    handleFileUpload(
                                                                        event,
                                                                        'kra_pin_image',
                                                                    )
                                                            "
                                                        />
                                                        <!-- Add your file upload component here -->
                                                    </a-form-item>
                                                </a-col>
                                            </a-row>

                                            <a-row :gutter="16">
                                                <a-col :span="8">
                                                    <a-form-item
                                                        label="Passport "
                                                        name="passport_image"
                                                    >
                                                        <input
                                                            type="file"
                                                            accept=".jpg, .jpeg, .png"
                                                            @change="
                                                                (event) =>
                                                                    handleFileUpload(
                                                                        event,
                                                                        'passport_image',
                                                                    )
                                                            "
                                                        />
                                                        <!-- Add your file upload component here -->
                                                    </a-form-item>
                                                </a-col>

                                                <a-col :span="8">
                                                    <a-form-item
                                                        label="NHIF Number "
                                                        name="nhif_number_image"
                                                    >
                                                        <input
                                                            type="file"
                                                            accept=".jpg, .jpeg, .png"
                                                            @change="
                                                                (event) =>
                                                                    handleFileUpload(
                                                                        event,
                                                                        'nhif_number_image',
                                                                    )
                                                            "
                                                        />
                                                        <!-- Add your file upload component here -->
                                                    </a-form-item>
                                                </a-col>

                                                <a-col :span="8">
                                                    <a-form-item
                                                        label="NSSF Number "
                                                        name="nssf_number_image"
                                                    >
                                                        <input
                                                            type="file"
                                                            accept=".jpg, .jpeg, .png"
                                                            @change="
                                                                (event) =>
                                                                    handleFileUpload(
                                                                        event,
                                                                        'nssf_number_image',
                                                                    )
                                                            "
                                                        />
                                                        <!-- Add your file upload component here -->
                                                    </a-form-item>
                                                </a-col>
                                            </a-row>
                                            <a-row :gutte="16">
                                                <a-col>
                                                    <a-form-item
                                                        label="Driver's Contract "
                                                        name="employee_contract_pdf"
                                                    >
                                                        <input
                                                            type="file"
                                                            accept=".pdf"
                                                            @change="
                                                                (event) =>
                                                                    handleFileUpload(
                                                                        event,
                                                                        'employee_contract_pdf',
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
                            @search="fetchDrivers"
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
    name: "Driver",
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

        const tableDataScource = ref([]);

        const fetchDrivers = async (nationalId = null) => {
            try {
                let response;
                if (nationalId) {
                    // Call the searchDrivers method if a nationalId is provided
                    response = await searchDrivers(nationalId);
                } else {
                    // Existing logic to fetch all drivers
                    response = await DataService.get("/drivers");
                    console.log("Drivers fetched", response.data);
                    if (response.status === 200) {
                        if (Array.isArray(response.data.Drivers)) {
                            // Format the data to match the structure expected by DataTables
                            tableDataScource.value = response.data.Drivers.map(
                                (driver) => ({
                                    key: driver.id,
                                    first_name: (
                                        <span class="ninjadash-username">
                                            {driver.first_name}
                                        </span>
                                    ),
                                    last_name: <span>{driver.last_name}</span>,
                                    id_number: driver.national_id,
                                    phone: driver.phone,
                                    status: (
                                        <span
                                            class={`ninjadash-status ninjadash-status-${driver.status}`}
                                        >
                                            {driver.status}
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
                console.error("Error fetching drivers:", error);
                toast.error("An error occurred. Please try again.");
            }
        };

        const searchDrivers = async (nationalId) => {
            try {
                const response = await DataService.get(
                    `/driver/search/${nationalId}`,
                );
                if (
                    response.status === 200 &&
                    Array.isArray(response.data.Driver)
                ) {
                    tableDataScource.value = response.data.Driver.map(
                        (driver) => ({
                            key: driver.id,
                            first_name: (
                                <span class="ninjadash-username">
                                    {driver.first_name}
                                </span>
                            ),
                            last_name: <span>{driver.last_name}</span>,
                            id_number: driver.national_id,
                            phone: driver.phone,
                            status: (
                                <span
                                    class={`ninjadash-status ninjadash-status-${driver.status}`}
                                >
                                    {driver.status}
                                </span>
                            ),
                        }),
                    );
                } else {
                    tableDataScource.value = [];
                }
            } catch (error) {
                //  toast.error("Login error: " + error.message);
                console.error("Error searching drivers:", error);
                toast.error("An error occurred. Please try again.");
            }
        };

        const viewDriver = (driverId) => {
            router.push(`/app/drivers/${driverId}`);
        };

        const editDriver = (driverId) => {
            router.push(`/app/drivers/edit/${driverId}`);
        };
        const deleteDriver = async (driverId) => {
            if (
                window.confirm(
                    "Are you sure you want to delete this driver? This action cannot be undone.",
                )
            ) {
                try {
                    await DataService.delete(`/driver/${driverId}`);
                    toast.success("Driver deleted successfully.");
                    await fetchDrivers(); // Refresh the list
                } catch (error) {
                    toast.error("Failed to delete driver. Please try again.");
                }
            }
        };

        const dataTableColumn = [
            {
                title: "First Name",
                dataIndex: "first_name",
                key: "user",
            },
            {
                title: "Last Name",
                dataIndex: "last_name",
                key: "coutry",
            },

            {
                title: "Id Number",
                dataIndex: "id_number",
                key: "position",
            },
            {
                title: "Phone",
                dataIndex: "phone",
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
                                onClick={() => viewDriver(record.key)}
                            >
                                <unicon name="eye"></unicon>
                            </button>
                            <button
                                class="edit"
                                onClick={() => editDriver(record.key)}
                            >
                                <unicon name="edit"></unicon>
                            </button>
                            <button
                                class="delete"
                                onClick={() => deleteDriver(record.key)}
                            >
                                <unicon name="trash"></unicon>
                            </button>
                        </div>
                    );
                },
            },
        ];

        onMounted(async () => {
            await fetchDrivers(); // Fetch drivers when the component mounts
        });

        const form = reactive({
            first_name: "",
            last_name: "",
            date_of_birth: "",
            email: "",
            phone: "",
            date_of_joining: "",
            national_id: "",
            nhif_number: "",
            nssf_number: "",
            kra_pin: "",
            bank_name: "",
            bank_account_number: "",
            license_no: "",
            license_expiry_date: "",
            address: "",

            // New file upload fields
            national_id_image: null,
            license_image: null,
            kra_pin_image: null,
            passport_image: null,
            nhif_number_image: null,
            nssf_number_image: null,
            employee_contract_pdf: null,
        });

        const disabledPastDates = (current) => {
            return current && current < new Date().setHours(0, 0, 0, 0);
        };

        const disableFutureDates = (current) => {
            return current && current > new Date().setHours(23, 59, 59, 999);
        };

        const handleFileUpload = (event, fieldName) => {
            const file = event.target.files[0];
            if (file) {
                form[fieldName] = file; 
            }
        };

        console.log("Items to be submmited", form.value);

        // const handleSubmit = async () => {
        //     // Check if all required fields are filled
        //     if (
        //         !form.first_name ||
        //         !form.last_name ||
        //         !form.phone ||
        //         !form.date_of_joining ||
        //         !form.national_id_image ||
        //         !form.license_image
        //     ) {
        //         toast.error("Please fill in all required fields.");
        //         return; // Prevent form submission
        //     }

        //     const formattedDateOfBirth = new Date(form.date_of_birth)
        //         .toISOString()
        //         .split("T")[0];
        //     const formattedDateOfJoining = new Date(form.date_of_joining)
        //         .toISOString()
        //         .split("T")[0];
        //     const formattedLicenceExpirydate = new Date(
        //         form.license_expiry_date,
        //     )
        //         .toISOString()
        //         .split("T")[0];

        //     // const updatedForm = {
        //     //     ...form,
        //     //     date_of_birth: formattedDateOfBirth,
        //     //     date_of_joining: formattedDateOfJoining,
        //     //     license_expiry_date: formattedLicenceExpirydate,
        //     // };

        //     const formData = new FormData();

        //     // Append existing form fields
        //     formData.append("first_name", form.first_name);
        //     formData.append("last_name", form.last_name);
        //     // Check if date_of_birth is not null before appending
        //     if (form.date_of_birth) {
        //         formData.append("date_of_birth", formattedDateOfBirth);
        //     }
        //     //formData.append("email", form.email);
        //     formData.append("phone", form.phone);
        //     // Check if date_of_joining is not null before appending
        //     if (form.date_of_joining) {
        //         formData.append("date_of_joining", formattedDateOfJoining);
        //     }
        //     formData.append("national_id", form.national_id);
        //     formData.append("nhif_number", form.nhif_number);
        //     formData.append("nssf_number", form.nssf_number);
        //     formData.append("kra_pin", form.kra_pin);
        //     formData.append("bank_name", form.bank_name);
        //     formData.append("bank_account_number", form.bank_account_number);
        //     formData.append("license_no", form.license_no);
        //     // Check if license_expiry_date is not null before appending
        //     if (form.license_expiry_date) {
        //         formData.append(
        //             "license_expiry_date",
        //             formattedLicenceExpirydate,
        //         );
        //     }
        //     formData.append("address", form.address);

        //     // Append file upload fields
        //     formData.append("national_id_image", form.national_id_image);
        //     formData.append("license_image", form.license_image);
        //     formData.append("kra_pin_image", form.kra_pin_image);
        //     formData.append("passport_image", form.passport_image);
        //     formData.append("nhif_number_image", form.nhif_number_image);
        //     formData.append("nssf_number_image", form.nssf_number_image);
        //     formData.append(
        //         "employee_contract_pdf",
        //         form.employee_contract_pdf,
        //     );

        //     try {
        //         isLoading.value = true;
        //         const response = await DataService.post("/driver", formData);

        //         console.log("Driver response after post", response.data);

        //         if (response.status === 201) {
        //             // tableDataScource.value.push({
        //             //     // id: `#${response.data.Driver.id}`,
        //             //     key: response.data.Driver.id,
        //             //     first_name: (
        //             //         <span class="ninjadash-username">
        //             //             {form.first_name}
        //             //         </span>
        //             //     ),
        //             //     last_name: <span>{form.last_name}</span>,
        //             //     id_number: form.national_id,
        //             //     phone: form.phone,
        //             //     status: (
        //             //         <span
        //             //             class={`ninjadash-status ninjadash-status-${response.data.status}`}
        //             //         >
        //             //             {response.data.status}
        //             //         </span>
        //             //     ),
        //             // });

        //             toast.success("Record Added Successfully");
        //             // Reset the form data to its initial state
        //             form.first_name = "";
        //             form.last_name = "";
        //             form.date_of_birth = "";
        //             // form.email = "";
        //             form.phone = "";
        //             form.date_of_joining = "";
        //             form.national_id = "";
        //             form.nhif_number = "";
        //             form.nssf_number = "";
        //             form.kra_pin = "";
        //             form.bank_name = "";
        //             form.bank_account_number = "";
        //             form.license_no = "";
        //             form.license_expiry_date = "";
        //             form.address = "";

        //             form.national_id_image = null;
        //             form.license_image = null;
        //             form.kra_pin_image = null;
        //             form.passport_image = null;
        //             form.nhif_number_image = null;
        //             form.nssf_number_image = null;
        //             form.employee_contract_pdf = null;

        //             // Close the drawer
        //             open.value = false;

        //             await fetchDrivers();

        //             router.push({
        //                 path: "/app/drivers",
        //             });
        //         } else {
        //             //console.error("Record Add Failed");
        //             toast.error("Failed to add record. Please try again.");
        //         }
        //     } catch (error) {
        //         console.error("Record Add error", error);
        //         toast.error("An error occurred. Please try again.");
        //     } finally {
        //         isLoading.value = false;
        //     }
        // };

        const handleSubmit = async () => {
            const today = new Date();
            const birthDate = new Date(form.date_of_birth);
            const age = today.getFullYear() - birthDate.getFullYear();
            const monthDifference = today.getMonth() - birthDate.getMonth();

            if (age < 18 || (age === 18 && monthDifference < 0)) {
                toast.error("Driver must be at least 18 years old.");
                return;
            }

            // Format dates
            const formattedDateOfBirth = form.date_of_birth
                ? new Date(form.date_of_birth).toISOString().split("T")[0]
                : null;
            const formattedDateOfJoining = new Date(form.date_of_joining)
                .toISOString()
                .split("T")[0];
            const formattedLicenseExpiryDate = form.license_expiry_date
                ? new Date(form.license_expiry_date).toISOString().split("T")[0]
                : null;

            const formData = new FormData();

            // Append form fields
            formData.append("first_name", form.first_name);
            formData.append("last_name", form.last_name);
            if (formattedDateOfBirth) {
                formData.append("date_of_birth", formattedDateOfBirth);
            }
            formData.append("phone", form.phone);
            formData.append("date_of_joining", formattedDateOfJoining);
            formData.append("national_id", form.national_id);
            formData.append("nhif_number", form.nhif_number);
            formData.append("nssf_number", form.nssf_number);
            formData.append("kra_pin", form.kra_pin);
            formData.append("bank_name", form.bank_name);
            formData.append("bank_account_number", form.bank_account_number);
            formData.append("license_no", form.license_no);
            if (formattedLicenseExpiryDate) {
                formData.append(
                    "license_expiry_date",
                    formattedLicenseExpiryDate,
                );
            }
            formData.append("address", form.address);

            // Append file upload fields
            formData.append("national_id_image", form.national_id_image);
            formData.append("license_image", form.license_image);
            formData.append("kra_pin_image", form.kra_pin_image);
            formData.append("passport_image", form.passport_image);
            formData.append("nhif_number_image", form.nhif_number_image);
            formData.append("nssf_number_image", form.nssf_number_image);
            formData.append(
                "employee_contract_pdf",
                form.employee_contract_pdf,
            );

            try {
                isLoading.value = true;
                const response = await DataService.post("/driver", formData);

                if (response.status === 201) {
                    toast.success("Record Added Successfully");

                    // Reset form fields
                    form.first_name = "";
                    form.last_name = "";
                    form.date_of_birth = "";
                    form.phone = "";
                    form.date_of_joining = "";
                    form.national_id = "";
                    form.nhif_number = "";
                    form.nssf_number = "";
                    form.kra_pin = "";
                    form.bank_name = "";
                    form.bank_account_number = "";
                    form.license_no = "";
                    form.license_expiry_date = "";
                    form.address = "";

                    form.national_id_image = null;
                    form.license_image = null;
                    form.kra_pin_image = null;
                    form.passport_image = null;
                    form.nhif_number_image = null;
                    form.nssf_number_image = null;
                    form.employee_contract_pdf = null;

                    // Close the drawer or modal
                    open.value = false;

                    // Refresh driver list or navigate
                    await fetchDrivers();
                    router.push({ path: "/app/drivers" });
                } else {
                    toast.error("Failed to add record. Please try again.");
                }
            } catch (error) {
                console.error("Record Add error", error);
                console.log("Error Response:", error.response);

                if (error.response && error.response.status === 422) {
                    // Extract the errors from the correct key
                    const errorMessages = error.response.data.Error || [];

                    // Display each error message in its own toast
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
            fetchDrivers,
            viewDriver,
            editDriver,
            deleteDriver,
            disabledPastDates,
            disableFutureDates

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

.loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}
</style>
