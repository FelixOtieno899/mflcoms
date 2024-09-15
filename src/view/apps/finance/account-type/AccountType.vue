<template>
    <Main>
        <a-row :gutter="15">
            <a-col :xs="24">
                <BorderLessHeading>
                    <sdCards title=" Manage Account Types">
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
                                    title="Create New Account Type"
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
                                                        label="Account Type"
                                                        name="type"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                            },
                                                        ]"
                                                    >
                                                        <a-input
                                                            type="text"
                                                            v-model:value="
                                                                form.type
                                                            "
                                                            placeholder="Please enter account type"
                                                        />
                                                    </a-form-item>
                                                </a-col>
                                            </a-row>

                                            <a-row :gutter="16">
                                                <a-col :span="12">
                                                    <a-form-item
                                                        label="Status"
                                                        name="status"
                                                        :rules="[
                                                            {
                                                                required: false,
                                                            },
                                                        ]"
                                                    >
                                                        <select
                                                            v-model="
                                                                form.status
                                                            "
                                                            class="custom-select"
                                                        >
                                                            <option value="">
                                                                Select Status
                                                            </option>
                                                            <option
                                                                value="active"
                                                            >
                                                                Active
                                                            </option>
                                                            <option
                                                                value="inActive"
                                                            >
                                                                InActive
                                                            </option>
                                                        </select>
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
    name: "AccountType",
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

        const fetchAccountTypes = async () => {
            try {
                const response = await DataService.get("/account_type");

                console.log("Account types fetched", response.data);
                if (response.status === 200) {
                    if (Array.isArray(response.data.Account_types)) {
                        // Format the data to match the structure expected by DataTables
                        tableDataScource.value =
                            response.data.Account_types.map((accountType) => ({
                                // id: `#${insurer.id}`,
                                key: accountType.id,
                                name: (
                                    <span class="ninjadash-username">
                                        {accountType.name}
                                    </span>
                                ),
                                type: <span>{accountType.type}</span>,
                                status: (
                                    <span
                                        class={`ninjadash-status ninjadash-status-${accountType.status}`}
                                    >
                                        {accountType.status}
                                    </span>
                                ),
                            }));
                    } else {
                        // No account types found found, handle accordingly
                        tableDataScource.value = [];
                    }
                } else {
                    return;
                    //toast.error("Failed to fetch account types. Please try again.");
                }
            } catch (error) {
                console.error("Error fetching account types:", error);
                toast.error("An error occurred. Please try again.");
            }
        };
        const viewAccountType = (accountTypeId) => {
            router.push(`/app/account-types/${accountTypeId}`);
        };

        const editAccountType = (accountTypeId) => {
            router.push(`/app/account-types/edit/${accountTypeId}`);
        };
        const deleteAccountType = async (accountTypeId) => {
            if (
                window.confirm(
                    "Are you sure you want to delete this accounty type? This action cannot be undone.",
                )
            ) {
                try {
                    await DataService.delete(`/account_type/${accountTypeId}`);
                    toast.success("Account type deleted successfully.");
                    await fetchAccountTypes(); // Refresh the list
                } catch (error) {
                    toast.error(
                        "Failed to delete account type. Please try again.",
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
                title: "Name",
                dataIndex: "name",
                key: "user",
            },
            {
                title: "Type",
                dataIndex: "type",
                key: "coutry",
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
                                onClick={() => viewAccountType(record.key)}
                            >
                                <unicon name="eye"></unicon>
                            </button>
                            <button
                                class="edit"
                                onClick={() => editAccountType(record.key)}
                            >
                                <unicon name="edit"></unicon>
                            </button>
                            <button
                                class="delete"
                                onClick={() => deleteAccountType(record.key)}
                            >
                                <unicon name="trash"></unicon>
                            </button>
                        </div>
                    );
                },
            },
        ];

        onMounted(async () => {
            await fetchAccountTypes(); // Fetch drivers when the component mounts
        });

        const form = reactive({
            name: "",
            type: "",
            status: "",
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
            if (!form.name || !form.type) {
                toast.error("Please fill in all required fields.");
                return; // Prevent form submission
            }

            const formData = new FormData();

            // Append existing form fields
            formData.append("name", form.name);
            formData.append("type", form.type);

            formData.append("status", form.status);

            try {
                isLoading.value = true;
                const response = await DataService.post(
                    "/account_type",
                    formData,
                );

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
                    form.type = "";
                    form.status = "";

                    // Close the drawer
                    open.value = false;

                    await fetchAccountTypes();
                    router.push({
                        path: "/app/account-types",
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
    margin: auto;
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
