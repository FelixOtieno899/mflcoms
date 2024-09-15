<template>
    <Main>
        <a-row :gutter="15">
            <a-col :xs="24">
                <BorderLessHeading>
                    <sdCards title="Create New Job Card">
                        <br />
                        <a-row>
                            <a-col :span="24">
                                <template v-if="isLoading">
                                    <a-space class="loading">
                                        <a-spin size="large" />
                                    </a-space>
                                </template>

                                <template v-else>
                                    <form :model="form" layout="vertical">
                                        <!-- Truck and Driver Selection -->
                                        <a-row :gutter="16">
                                            <a-col :span="8">
                                                <h4>Job Card Id</h4>
                                                <a-input
                                                    v-model:value="
                                                        form.job_card_reference_number
                                                    "
                                                    placeholder="Job Card Id"
                                                    required
                                                    readonly
                                                />
                                            </a-col>

                                            <a-col :span="8">
                                                <h4>Workshop Reference</h4>
                                                <a-input
                                                    v-model:value="
                                                        form.workshop_reference_number
                                                    "
                                                    placeholder="Reference No"
                                                />
                                            </a-col>

                                            <a-col :span="8">
                                                <h4>Inspection date</h4>
                                                <a-date-picker
                                                    v-model:value="
                                                        form.inspection_date
                                                    "
                                                    style="width: 50%"
                                                />
                                            </a-col>
                                        </a-row>

                                        <br />

                                        <a-row :gutter="16">
                                            <a-col :span="8">
                                                <h4>Truck</h4>
                                                <a-form-item>
                                                    <select
                                                        class="custom-select"
                                                        v-model="form.truck_id"
                                                        style="width: 100%"
                                                    >
                                                        <option
                                                            value=""
                                                            disabled
                                                        >
                                                            Select Truck
                                                        </option>
                                                        <option
                                                            v-for="truck in truckOptions"
                                                            :key="truck.id"
                                                            :value="truck.id"
                                                        >
                                                            {{
                                                                truck.registration_no
                                                            }}
                                                        </option>
                                                    </select>
                                                </a-form-item>
                                            </a-col>
                                            <a-col :span="8">
                                                <h4>
                                                    <code style="color: red"
                                                        >*</code
                                                    >Driver
                                                </h4>

                                                <a-form-item>
                                                    <select
                                                        class="custom-select"
                                                        v-model="form.driver_id"
                                                        style="width: 100%"
                                                    >
                                                        <option
                                                            value=""
                                                            disabled
                                                        >
                                                            Select Driver
                                                        </option>
                                                        <option
                                                            v-for="driver in driverOptions"
                                                            :key="driver.id"
                                                            :value="driver.id"
                                                        >
                                                            {{
                                                                driver.first_name
                                                            }}
                                                            {{
                                                                driver.last_name
                                                            }}
                                                        </option>
                                                    </select>
                                                </a-form-item>
                                            </a-col>
                                        </a-row>
                                        <a-row>
                                            <a-col>
                                                <h4>Odommeter Reading</h4>
                                                <a-input
                                                    style="padding: 6px"
                                                    v-model:value="
                                                        form.fuel_reading
                                                    "
                                                    placeholder="Odometer Reading"
                                                    required
                                                />
                                            </a-col>
                                        </a-row>

                                        <br />

                                        <!-- Job Description Items -->
                                        <a-form-item
                                            label="Job Description Items"
                                            required
                                        >
                                            <div
                                                v-for="(
                                                    item, index
                                                ) in form.job_description_items"
                                                :key="index"
                                                class="job-item"
                                            >
                                                <a-row :gutter="15">
                                                    <a-col :span="8">
                                                        <a-input
                                                            v-model:value="
                                                                item.task
                                                            "
                                                            placeholder="Task"
                                                            required
                                                        />
                                                    </a-col>
                                                    <a-col :span="8">
                                                        <a-input
                                                            v-model:value="
                                                                item.department
                                                            "
                                                            placeholder="Department"
                                                            required
                                                        />
                                                    </a-col>
                                                    <a-col :span="8">
                                                        <a-input
                                                            v-model:value="
                                                                item.supervisor
                                                            "
                                                            placeholder="Supervisor"
                                                            required
                                                        />
                                                    </a-col>
                                                    <a-col
                                                        :span="8"
                                                        style="margin-top: 10px"
                                                    >
                                                        <a-input
                                                            v-model:value="
                                                                item.manager
                                                            "
                                                            placeholder="Manager"
                                                            required
                                                        />
                                                    </a-col>
                                                    <a-col
                                                        :span="8"
                                                        style="margin-top: 10px"
                                                    >
                                                        <a-input
                                                            v-model:value="
                                                                item.location
                                                            "
                                                            placeholder="Location"
                                                            required
                                                        />
                                                    </a-col>
                                                    <a-col
                                                        :span="8"
                                                        style="margin-top: 10px"
                                                    >
                                                        <select
                                                            class="custom-select"
                                                            v-model="
                                                                item.job_type
                                                            "
                                                            style="width: 100%"
                                                            required
                                                        >
                                                            <option
                                                                value=""
                                                                disabled
                                                            >
                                                                Select Job Type
                                                            </option>
                                                            <option
                                                                v-for="option in jobTypeOptions"
                                                                :key="
                                                                    option.value
                                                                "
                                                                :value="
                                                                    option.value
                                                                "
                                                            >
                                                                {{
                                                                    option.label
                                                                }}
                                                            </option>
                                                        </select>
                                                    </a-col>
                                                    <a-col
                                                        :span="24"
                                                        style="margin-top: 10px"
                                                    >
                                                        <a-textarea
                                                            v-model:value="
                                                                item.job_summary
                                                            "
                                                            placeholder="Job Summary"
                                                            rows="2"
                                                            required
                                                        />
                                                    </a-col>
                                                    <a-col
                                                        :span="24"
                                                        style="margin-top: 10px"
                                                    >
                                                        <a-button
                                                            type="danger"
                                                            @click.prevent="
                                                                removeJobItem(
                                                                    index,
                                                                )
                                                            "
                                                        >
                                                            Remove Job Item
                                                        </a-button>
                                                    </a-col>
                                                </a-row>
                                                <hr />
                                            </div>
                                            <a-button
                                                type="primary"
                                                @click.prevent="addJobItem"
                                            >
                                                Add Job Description Item
                                            </a-button>
                                        </a-form-item>

                                        <!-- Job Timing -->

                                        <a-form-item
                                            label="Start Date and Time"
                                            required
                                        >
                                            <a-date-picker
                                                v-model:value="
                                                    form.start_date_and_time
                                                "
                                                show-time
                                                style="width: 50%"
                                            />
                                        </a-form-item>

                                        <a-form-item label="End Date and Time">
                                            <a-date-picker
                                                v-model:value="
                                                    form.end_date_and_time
                                                "
                                                show-time
                                                style="width: 50%"
                                            />
                                        </a-form-item>

                                        <!-- Form Actions -->
                                        <div
                                            class="setting-form-actions"
                                            style="margin-top: 20px"
                                        >
                                            <sdButton
                                                size="small"
                                                type="primary"
                                                @click.prevent="handleSubmit"
                                            >
                                                Submit
                                            </sdButton>
                                            &nbsp; &nbsp;
                                            <sdButton
                                                size="small"
                                                @click.prevent="handleCancel"
                                                type="light"
                                            >
                                                Cancel
                                            </sdButton>
                                        </div>
                                    </form>
                                </template>
                            </a-col>
                        </a-row>
                    </sdCards>
                </BorderLessHeading>
            </a-col>
        </a-row>
    </Main>
</template>

<script>
import { DataService } from "@/config/dataService/dataService";
import { defineComponent, reactive, ref, onMounted, watch } from "vue";
import { Main, BorderLessHeading } from "../../../../styled";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";

export default defineComponent({
    name: "JobCardCreate",
    components: {
        Main,
        BorderLessHeading,
    },
    setup() {
        const toast = useToast();
        const isLoading = ref(false);
        const router = useRouter();
        const generateJobCardReferenceNumber = () => {
            const randomString = Math.random()
                .toString(36)
                .substring(2, 9)
                .toUpperCase();
            return `MFL-${randomString}`;
        };

        const form = reactive({
            truck_id: "",
            driver_id: "",
            job_card_reference_number: generateJobCardReferenceNumber(),
            workshop_reference_number: "",
            fuel_reading: "",
            inspection_date: "",

            job_description_items: [
                {
                    task: "",
                    department: "",
                    supervisor: "",
                    manager: "",
                    location: "",
                    job_type: "",
                    job_summary: "",
                },
            ],
            start_date_and_time: "",
            end_date_and_time: "",
        });

        const truckOptions = ref([]);
        const driverOptions = ref([]);
        const jobTypeOptions = [
            { label: "Maintenance", value: "maintenance" },
            { label: "Repair", value: "repair" },
        ];

        const fetchTrucks = async () => {
            try {
                const response = await DataService.get("/vehicle");
                console.log("Response from Trucks", response);

                if (response.data && Array.isArray(response.data.Vehicles)) {
                    truckOptions.value = response.data.Vehicles;
                } else {
                    console.warn("No trucks data available.");
                }
            } catch (error) {
                toast.error("Failed to fetch trucks. Please try again.");
            }
        };

        const fetchDrivers = async () => {
            try {
                const response = await DataService.get("/drivers");
                console.log("Response from Drivers", response);

                if (response.data && Array.isArray(response.data.Drivers)) {
                    driverOptions.value = response.data.Drivers;
                } else {
                    console.warn("No drivers data available.");
                }
            } catch (error) {
                toast.error("Failed to fetch drivers. Please try again.");
            }
        };

        const addJobItem = () => {
            form.job_description_items.push({
                task: "",
                department: "",
                supervisor: "",
                manager: "",
                location: "",
                job_type: "",
                job_summary: "",
            });
        };

        const removeJobItem = (index) => {
            if (form.job_description_items.length > 1) {
                form.job_description_items.splice(index, 1);
            } else {
                toast.warning("Cannot remove the last job item.");
            }
        };

        const handleSubmit = async () => {
            if (
                !form.truck_id ||
                !form.driver_id ||
                form.job_description_items.length === 0 ||
                !form.start_date_and_time
            ) {
                toast.error("Please fill in all required fields.");
                return;
            }

            try {
                isLoading.value = true;
                const formData = new FormData();

                const formatDateToMySQL = (date) => {
                    const d = new Date(date);
                    const year = d.getFullYear();
                    const month = String(d.getMonth() + 1).padStart(2, "0");
                    const day = String(d.getDate()).padStart(2, "0");
                    const hours = String(d.getHours()).padStart(2, "0");
                    const minutes = String(d.getMinutes()).padStart(2, "0");
                    const seconds = String(d.getSeconds()).padStart(2, "0");
                    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
                };

                formData.append("truck_id", form.truck_id);
                formData.append("driver_id", form.driver_id);
                formData.append(
                    "job_card_reference_number",
                    form.job_card_reference_number,
                );
                formData.append(
                    "workshop_reference_number",
                    form.workshop_reference_number,
                );
                formData.append("fuel_reading", form.fuel_reading);
                formData.append(
                    "inspection_date",
                    form.inspection_date
                        ? formatDateToMySQL(form.inspection_date)
                        : "",
                );
                formData.append(
                    "start_date_and_time",
                    formatDateToMySQL(form.start_date_and_time),
                );
                formData.append(
                    "end_date_and_time",
                    form.end_date_and_time
                        ? formatDateToMySQL(form.end_date_and_time)
                        : "",
                );

                form.job_description_items.forEach((item, index) => {
                    formData.append(
                        `job_description_items[${index}][task]`,
                        item.task,
                    );
                    formData.append(
                        `job_description_items[${index}][department]`,
                        item.department,
                    );
                    formData.append(
                        `job_description_items[${index}][supervisor]`,
                        item.supervisor,
                    );
                    formData.append(
                        `job_description_items[${index}][manager]`,
                        item.manager,
                    );
                    formData.append(
                        `job_description_items[${index}][location]`,
                        item.location,
                    );
                    formData.append(
                        `job_description_items[${index}][job_type]`,
                        item.job_type,
                    );
                    formData.append(
                        `job_description_items[${index}][job_summary]`,
                        item.job_summary,
                    );
                });

                // Submit the form data to the backend
                const response = await DataService.post(
                    "/job_card",
                    formData,
                    {},
                );

                if (response.status === 201) {
                    toast.success("Job card created successfully");
                    resetForm();
                    
                    router.push(`/app/job-card`);

                } else {
                    toast.error("Failed to create job card.");
                }
            } catch (error) {
                if (error.response && error.response.status === 422) {
                    const errorMessages = error.response.data.errors || [];
                    errorMessages.forEach((message) => {
                        toast.error(message);
                    });
                } else {
                    toast.error("An error occurred. Please try again.");
                }
            }finally {
                isLoading.value = false;
            }
        };

        const resetForm = () => {
            form.truck_id = "";
            form.driver_id = "";
            form.job_card_reference_number = generateJobCardReferenceNumber();
            form.workshop_reference_number = "";
            form.fuel_reading = "";
            form.inspection_date = "";
            form.job_description_items = [
                {
                    task: "",
                    department: "",
                    supervisor: "",
                    manager: "",
                    location: "",
                    job_type: "",
                    job_summary: "",
                },
            ];
            form.start_date_and_time = "";
            form.end_date_and_time = "";
        };

        const handleCancel = () => {
            resetForm();
            router.push(`/app/job-card`);
        };

        onMounted(async () => {
            console.log("Before generation:", form.job_card_reference_number);
            form.job_card_reference_number = generateJobCardReferenceNumber();
            console.log("After generation:", form.job_card_reference_number);
            isLoading.value = true;
            try {
                await Promise.all([fetchTrucks(), fetchDrivers()]);
            } catch (error) {
                console.error("Error fetching initial data:", error);
            } finally {
                isLoading.value = false;
            }
        });

        watch(
            () => form.truck_id,
            (newVal) => {
                const selectedTruck = truckOptions.value.find(
                    (vehicle) => vehicle.id === newVal,
                );
                if (selectedTruck) {
                    form.fuel_reading = selectedTruck.odometer_reading;
                } else {
                    form.fuel_reading = "";
                }
            },
        );

        return {
            form,
            isLoading,
            truckOptions,
            driverOptions,
            jobTypeOptions,
            addJobItem,
            removeJobItem,
            handleSubmit,
            handleCancel,
        };
    },
});
</script>

<style scoped>
.job-item {
    background-color: #f9f9f9;
    padding: 15px;
    margin-bottom: 15px;
    border-radius: 5px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.setting-form-actions {
    text-align: right;
}

.loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 500px;
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
</style>
