<template>
    <Main>
        <a-row :gutter="15">
            <a-col :xs="24">
                <BorderLessHeading>
                    <sdCards title="Manage  Clients Locations">
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
                                    title="Create New Location"
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
                                            <!-- <a-row :gutter="16"> -->
                                            <!-- <a-col :span="8">
                                                    <a-form-item
                                                        label="Client"
                                                        name="client_id"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                                message:
                                                                    'Please select client!',
                                                            },
                                                        ]"
                                                    >
                                                        <select
                                                            v-model="
                                                                form.client_id
                                                            "
                                                            class="custom-select"
                                                        >
                                                            <option value="">
                                                                Select Client
                                                            </option>
                                                            <option
                                                                v-for="client in clients"
                                                                :key="client.id"
                                                                :value="
                                                                    client.id
                                                                "
                                                            >
                                                                {{
                                                                    client.user
                                                                        .first_name
                                                                }}
                                                            </option>
                                                        </select>
                                                    </a-form-item>
                                                </a-col> -->

                                            <!-- <a-col :span="8">
                                                    <a-form-item
                                                        label="Contact Person"
                                                        name="contact_person"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                                message:
                                                                    'Please enter contact person!',
                                                            },
                                                        ]"
                                                    >
                                                        <a-input
                                                            v-model:value="
                                                                form.contact_person
                                                            "
                                                            placeholder="Enter contact person"
                                                        />
                                                    </a-form-item>
                                                </a-col> -->

                                            <!-- <a-col :span="8">
                                                    <a-form-item
                                                        label="Contact Number"
                                                        name="contact_number"
                                                        :rules="[
                                                            {
                                                                required: false,
                                                                message:
                                                                    'Please enter contact number!',
                                                            },
                                                        ]"
                                                    >
                                                        <a-input
                                                            v-model:value="
                                                                form.contact_number
                                                            "
                                                            placeholder="Enter contact number"
                                                        />
                                                    </a-form-item>
                                                </a-col> -->
                                            <!-- </a-row> -->

                                            <a-row :gutter="16">
                                                <a-col :span="12">
                                                    <a-form-item
                                                        label="Location"
                                                        name="location"
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
                                                                form.location
                                                            "
                                                            placeholder=""
                                                        />
                                                    </a-form-item>
                                                </a-col>

                                                <a-col :span="12">
                                                    <a-form-item
                                                        label="Coordinates"
                                                        name="coordinates"
                                                        :rules="[
                                                            {
                                                                required: false,
                                                            },
                                                        ]"
                                                    >
                                                        <a-input
                                                            type="text"
                                                            v-model:value="
                                                                form.coordinates
                                                            "
                                                            placeholder=""
                                                        />
                                                    </a-form-item>
                                                </a-col>
                                            </a-row>
                                            <a-row :gutter="16">
                                                <a-col :span="24">
                                                    <a-form-item
                                                        label="Note"
                                                        name="note"
                                                        :rules="[
                                                            {
                                                                required: false,
                                                            },
                                                        ]"
                                                    >
                                                        <a-textarea
                                                            v-model:value="
                                                                form.note
                                                            "
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
                            @search="fetchClientDestinations"
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
    name: "ClientDestination",
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

        const clients = ref([]);

        const tableDataScource = ref([]);

        const fetchAllData = async () => {
            await Promise.all([fetchClientDestinations(), fetchClients()]);
        };

        const fetchClientDestinations = async (contactEmail = null) => {
            try {
                let response;
                if (contactEmail) {
                    // Call the searchClientDestination method if  contactEmail is provided
                    response = await searchClientDestination(contactEmail);
                } else {
                    // Existing logic to fetch all invoices
                    response = await DataService.get("/clients-destinations");
                    console.log("Client Destination fetched", response.data);
                    if (response.status === 200) {
                        if (Array.isArray(response.data.Client_destinations)) {
                            // Format the data to match the structure expected by DataTables
                            tableDataScource.value =
                                response.data.Client_destinations.map(
                                    (clientDestination) => ({
                                        // id: `#${supplier.id}`,
                                        key: clientDestination.id,

                                        location: (
                                            <span class="ninjadash-username">
                                                {clientDestination.location}
                                            </span>
                                        ),
                                        coordinates: (
                                            <span class="ninjadash-username">
                                                {clientDestination.coordinates}
                                            </span>
                                        ),
                                        status: (
                                            <span>
                                                {clientDestination.status}
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
                console.error("Error fetching client destinations:", error);
                toast.error("An error occurred. Please try again.");
            }
        };

        const searchClientDestination = async (contactEmail) => {
            try {
                const response = await DataService.get(
                    `/clients-destinations/search/${contactEmail}`,
                );

                console.log("Searched Client Destination", response.data);
                if (
                    response.status === 200 &&
                    Array.isArray(response.data.Client_destinations)
                ) {
                    tableDataScource.value =
                        response.data.Client_destinations.map(
                            (clientDestination) => ({
                                key: clientDestination.id,

                                location: (
                                    <span class="ninjadash-username">
                                        {clientDestination.location}
                                    </span>
                                ),
                                coordinates: (
                                    <span class="ninjadash-username">
                                        {clientDestination.coordinates}
                                    </span>
                                ),
                                status: (
                                    <span
                                        class={`ninjadash-status ninjadash-status-${clientDestination.status}`}
                                    >
                                        {clientDestination.status}
                                    </span>
                                ),
                            }),
                        );
                } else {
                    tableDataScource.value = [];
                }
            } catch (error) {
                console.error("Error searching client destination:", error);
                toast.error("An error occurred. Please try again.");
            }
        };

        const fetchClients = async () => {
            try {
                const response2 = await DataService.get(`/clients`);
                console.log("Clients fetched", response2.data.Clients);
                clients.value = response2.data.Clients;
            } catch (error) {
                console.error("Error fetching clients:", error);
                if (error.response2) {
                    console.error("Error response:", error.response2);
                }
            }
        };

        const viewClientDestination = (clientDestinationId) => {
            router.push(`/app/client-locations/${clientDestinationId}`);
        };

        const editClientDestination = (clientDestinationId) => {
            router.push(`/app/client-locations/edit/${clientDestinationId}`);
        };
        const deleteClientDestination = async (clientDestinationId) => {
            if (
                window.confirm(
                    "Are you sure you want to delete this destination? This action cannot be undone.",
                )
            ) {
                try {
                    await DataService.delete(
                        `/clients-destinations/${clientDestinationId}`,
                    );
                    toast.success("Client Destination deleted successfully.");
                    await fetchClientDestinations(); // Refresh the list
                } catch (error) {
                    toast.error(
                        "Failed to delete client destinations. Please try again.",
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
                title: "Location",
                dataIndex: "location",
                key: "location",
            },
            {
                title: "Coordinates",
                dataIndex: "coordinates",
                key: "coordinates",
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
                                    viewClientDestination(record.key)
                                }
                            >
                                <unicon name="eye"></unicon>
                            </button>
                            <button
                                class="edit"
                                onClick={() =>
                                    editClientDestination(record.key)
                                }
                            >
                                <unicon name="edit"></unicon>
                            </button>
                            <button
                                class="delete"
                                onClick={() =>
                                    deleteClientDestination(record.key)
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
            location: "",

            client_id: "",
            contact_person: "",
            contact_number: "",
            contact_email: "",
            note: "",
            coordinates: "",
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
            if (!form.location) {
                toast.error("Please fill in all required fields.");
                return; // Prevent form submission
            }

            // // Check if the selected country is valid
            // const selectedClient = clients.value.find(
            //     (client) => client.id === form.client_id,
            // );
            // if (!selectedClient) {
            //     toast.error("Please select client.");
            //     return; // Prevent form submission
            // }

            const formData = new FormData();

            // Append existing form fields
            formData.append("location", form.location);
            formData.append("client_id", form.client_id);
            formData.append("contact_person", form.contact_person);
            formData.append("contact_number", form.contact_number);
            formData.append("contact_email", form.contact_email);
            formData.append("note", form.note);
            formData.append("coordinates", form.coordinates);

            try {
                isLoading.value = true;
                const response = await DataService.post(
                    "/clients-destinations",
                    formData,
                );

                console.log(
                    "Client response after post:",
                    response.data.Client_destination,
                );

                if (response.status === 201) {
                    toast.success("Record Added Successfully");
                    // Reset the form data to its initial state
                    form.client_id = "";
                    form.contact_person = "";
                    form.contact_number = "";
                    form.contact_email = "";
                    form.location = "";
                    form.note = "";
                    form.coordinates = "";

                    // Close the drawer
                    open.value = false;

                    //Fetch Clients again to update the table data

                    await fetchClientDestinations();

                    router.push({ path: "/app/client-locations" });
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
            clients,
            fetchClientDestinations,

            // handleCancel,
            // handlePreview,
            // fileList,
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
