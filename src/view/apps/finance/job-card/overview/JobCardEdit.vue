<template>
    <Main>
        <a-row :gutter="15">
            <a-col :xs="24">
                <BorderLessHeading>
                    <sdCards title="Edit Job Card">
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
                                                    readonly
                                                />
                                            </a-col>

                                            <a-col :span="8">
                                                <h4>Workshop Reference</h4>
                                                <a-input
                                                    readonly
                                                    v-model:value="
                                                        form.workshop_reference_number
                                                    "
                                                    placeholder="Reference No"
                                                />
                                            </a-col>

                                            <a-col :span="8">
                                                <h4>Inspection date</h4>
                                                <a-input
                                                    readonly
                                                    v-model:value="
                                                        form.inspection_date
                                                    "
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
                                                    >
                                                    Driver
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
                                                <h4>Odometer Reading</h4>
                                                <a-input
                                                    style="padding: 6px"
                                                    v-model:value="
                                                        form.fuel_reading
                                                    "
                                                    placeholder="Odometer Reading"
                                                />
                                            </a-col>
                                        </a-row>

                                        <br />

                                        <!-- Job Description Items -->
                                        <a-form-item
                                            label="Job Description Items"
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
                                            <a-input
                                                readonly
                                                style="width: 50%"
                                                v-model:value="
                                                    form.start_date_and_time
                                                "
                                            />
                                        </a-form-item>

                                        <a-form-item label="End Date and Time">
                                            <a-input
                                                readonly
                                                style="width: 50%"
                                                v-model:value="
                                                    form.end_date_and_time
                                                "
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
import { defineComponent, reactive, ref, onMounted } from "vue";
import { Main, BorderLessHeading } from "../../../../styled";
import { useToast } from "vue-toastification";
import { useRouter, useRoute } from "vue-router";

export default defineComponent({
    name: "JobCardEdit",
    components: {
        Main,
        BorderLessHeading,
    },
    props: ["id"],
    setup(props) {
        const toast = useToast();
        const isLoading = ref(false);
        const router = useRouter();
        const route = useRoute();
        const jobCardId = route.params.id;

        const form = reactive({
            truck_id: "",
            driver_id: "",
            job_card_reference_number: "",
            workshop_reference_number: "",
            fuel_reading: "",
            inspection_date: "",
            job_description_items: [],
            start_date_and_time: "",
            end_date_and_time: "",
        });

        const truckOptions = ref([]);
        const driverOptions = ref([]);
        const jobTypeOptions = [
            { label: "Maintenance", value: "maintenance" },
            { label: "Repair", value: "repair" },
        ];

        const fetchJobCard = async (id) => {
            try {
                const response = await DataService.get(`/job_card/${id}`);
                if (response.status === 200) {
                    const jobCard = response.data.Job_card;
                    console.log("Resposne here", jobCard);

                    // Populate the form fields
                    form.truck_id = jobCard.truck_id;
                    form.driver_id = jobCard.driver_id;
                    form.job_card_reference_number =
                        jobCard.job_card_reference_number;
                    form.workshop_reference_number =
                        jobCard.workshop_reference_number;
                    form.fuel_reading = jobCard.fuel_reading;
                    form.inspection_date = jobCard.inspection_date;

                    form.start_date_and_time = jobCard.start_date_and_time;

                    form.end_date_and_time = jobCard.end_date_and_time;

                    // Directly assign the decoded job_description_items
                    form.job_description_items =
                        jobCard.job_description_items.map((item) => ({
                            task: item.task,
                            department: item.department,
                            supervisor: item.supervisor,
                            manager: item.manager,
                            location: item.location,
                            job_type: item.job_type,
                            job_summary: item.job_summary,
                        }));
                } else {
                    toast.error("Failed to fetch job card data.");
                }
            } catch (error) {
                toast.error("Error fetching job card.");
            }
        };

        const fetchTrucks = async () => {
            try {
                const response = await DataService.get("/vehicle");
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

                // Prepare the form data as a plain JavaScript object
                const formData = {
                    truck_id: form.truck_id,
                    driver_id: form.driver_id,
                    job_card_reference_number: form.job_card_reference_number,
                    workshop_reference_number: form.workshop_reference_number,
                    fuel_reading: form.fuel_reading,
                    inspection_date: form.inspection_date,
                    start_date_and_time: form.start_date_and_time,
                    end_date_and_time: form.end_date_and_time,
                    job_description_items: form.job_description_items.map(
                        (item) => ({
                            task: item.task,
                            department: item.department,
                            supervisor: item.supervisor,
                            manager: item.manager,
                            location: item.location,
                            job_type: item.job_type,
                            job_summary: item.job_summary,
                        }),
                    ),
                };

                console.log("Form Data before submission:", formData);

                // Submit the form data as a plain object
                const response = await DataService.put(
                    `/job_card/${jobCardId}`,
                    formData,
                );

                if (response.status === 200) {
                    toast.success("Job card updated successfully");
                    router.push(`/app/job-card`);
                } else {
                    toast.error("Failed to update job card.");
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
            } finally {
                isLoading.value = false;
            }
        };

        const handleCancel = () => {
            router.push(`/app/job-card`);
        };

        onMounted(async () => {
            isLoading.value = true;
            try {
                await Promise.all([fetchTrucks(), fetchDrivers()]);
                await fetchJobCard(props.id);
            } catch (error) {
                console.error("Error fetching initial data:", error);
            } finally {
                isLoading.value = false;
            }
        });

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
