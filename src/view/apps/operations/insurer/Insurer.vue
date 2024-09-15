<template>
    <Main>
        <a-row :gutter="15">
            <a-col :xs="24">
                <BorderLessHeading>
                    <sdCards title=" Manage Insurers">
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
                                    title="Create New Insurer"
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
                                                        label="Name"
                                                        name="name"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                            },
                                                        ]"
                                                    >
                                                        <a-input
                                                            type="text"
                                                            v-model:value="
                                                                form.name
                                                            "
                                                            placeholder="Please enter the name of the Insurer"
                                                        />
                                                    </a-form-item>
                                                </a-col>

                                                <a-col :span="12">
                                                    <a-form-item
                                                        label=" Insurer Contact"
                                                        name="insurer_contact"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                            },
                                                        ]"
                                                    >
                                                        <a-input
                                                            type="text"
                                                            v-model:value="
                                                                form.insurer_contact
                                                            "
                                                            placeholder="Please enter the Insurer Contact"
                                                        />
                                                    </a-form-item>
                                                </a-col>
                                            </a-row>

                                            <a-row :gutter="16">
                                                <a-col :span="12">
                                                    <a-form-item
                                                        label="Broker"
                                                        name="broker"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                            },
                                                        ]"
                                                    >
                                                        <a-input
                                                            type="text"
                                                            v-model:value="
                                                                form.broker
                                                            "
                                                            placeholder="Please enter the Broker Name"
                                                        />
                                                    </a-form-item>
                                                </a-col>

                                                <a-col :span="12">
                                                    <a-form-item
                                                        label="Broker Contact"
                                                        name="broker_contact"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                            },
                                                        ]"
                                                    >
                                                        <a-input
                                                            type="text"
                                                            v-model:value="
                                                                form.broker_contact
                                                            "
                                                            placeholder="Please enter broker Contact"
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
                            </a-col>
                        </a-row>
                        <DataTables
                            :filterOption="true"
                            :filterOnchange="true"
                            :tableData="tableDataScource"
                            :columns="dataTableColumn"
                            :rowSelection="false"
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

        const tableDataScource = ref([]);

        const fetchInsurers = async () => {
            try {
                const response = await DataService.get("/insurer");

                console.log("Insurers fetched", response.data);
                if (response.status === 200) {
                    if (Array.isArray(response.data.Insurers)) {
                        // Format the data to match the structure expected by DataTables
                        tableDataScource.value = response.data.Insurers.map(
                            (insurer) => ({
                                // id: `#${insurer.id}`,
                                key: insurer.id,
                                name: (
                                    <span class="ninjadash-username">
                                        {insurer.name}
                                    </span>
                                ),
                                broker: <span>{insurer.broker}</span>,
                                insurer_contact: insurer.insurer_contact,
                                broker_contact: insurer.broker_contact,
                                status: (
                                    <span
                                        class={`ninjadash-status ninjadash-status-${insurer.status}`}
                                    >
                                        {insurer.status}
                                    </span>
                                ),
                            }),
                        );
                    } else {
                        // No vehicles found, handle accordingly
                        tableDataScource.value = [];
                    }
                } else {
                    return;
                    //toast.error("Failed to fetch drivers. Please try again.");
                }
            } catch (error) {
                console.error("Error fetching insurers:", error);
                toast.error("An error occurred. Please try again.");
            }
        };
        const viewInsurer = (insurerId) => {
            router.push(`/app/insurers/${insurerId}`);
        };

        const editInsurer = (insurerId) => {
            router.push(`/app/insurers/edit/${insurerId}`);
        };
        const deleteInsurer = async (insurerId) => {
            if (
                window.confirm(
                    "Are you sure you want to delete this insurer? This action cannot be undone.",
                )
            ) {
                try {
                    await DataService.delete(`/insurer/${insurerId}`);
                    toast.success("Insurer deleted successfully.");
                    await fetchInsurers(); // Refresh the list
                } catch (error) {
                    toast.error("Failed to delete insurer. Please try again.");
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
                title: "Name",
                dataIndex: "name",
                key: "user",
            },
            {
                title: "Broker",
                dataIndex: "broker",
                key: "coutry",
            },

            {
                title: "Insurer Contact",
                dataIndex: "insurer_contact",
                key: "position",
            },
            {
                title: "Broker Contact",
                dataIndex: "broker_contact",
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
                                onClick={() => viewInsurer(record.key)}
                            >
                                <unicon name="eye"></unicon>
                            </button>
                            <button
                                class="edit"
                                onClick={() => editInsurer(record.key)}
                            >
                                <unicon name="edit"></unicon>
                            </button>
                            <button
                                class="delete"
                                onClick={() => deleteInsurer(record.key)}
                            >
                                <unicon name="trash"></unicon>
                            </button>
                        </div>
                    );
                },
            },
        ];

        onMounted(async () => {
            await fetchInsurers(); // Fetch drivers when the component mounts
        });

        const form = reactive({
            name: "",
            insurer_contact: "",
            broker: "",
            broker_contact: "",
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
                !form.name ||
                !form.insurer_contact ||
                !form.broker ||
                !form.broker_contact
            ) {
                toast.error("Please fill in all required fields.");
                return; // Prevent form submission
            }

            const formData = new FormData();

            // Append existing form fields
            formData.append("name", form.name);
            formData.append("insurer_contact", form.insurer_contact);

            formData.append("broker", form.broker);

            formData.append("broker_contact", form.broker_contact);

            try {
                isLoading.value = true;
                const response = await DataService.post("/insurer", formData);

                if (response.status === 201) {
                    // tableDataScource.value.push({
                    //     //id: `#${response.data.id}`,
                    //     key: response.data.Insurer.id,
                    //     name: (
                    //         <span class="ninjadash-username">
                    //             {response.data.Insurer.name}
                    //         </span>
                    //     ),
                    //     broker: <span>{response.data.Insurer.broker}</span>,
                    //     insurer_contact: response.data.Insurer.insurer_contact,
                    //     broker_contact: response.data.Insurer.broker_contact,
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
                    form.name = "";
                    form.insurer_contact = "";
                    form.broker = "";
                    form.broker_contact = "";

                    // Close the drawer
                    open.value = false;

                    await fetchInsurers();
                    router.push({
                        path: "/app/insurers",
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
