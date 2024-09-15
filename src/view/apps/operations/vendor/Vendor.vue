<template>
    <Main>
        <a-row :gutter="15">
            <a-col :xs="24">
                <BorderLessHeading>
                    <sdCards title=" Manage Vendors">
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
                                    title="Create New Vendor"
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
                                                                form.name
                                                            "
                                                            placeholder="Please enter the name of the Insurer"
                                                        />
                                                    </a-form-item>
                                                </a-col>

                                                <a-col :span="12">
                                                    <a-form-item
                                                        label="Status"
                                                        name="status"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                                message:
                                                                    'Please select status!',
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
                                                                value="inactive"
                                                            >
                                                                Inactive
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
    name: "Vendor",
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

        const fetchVendors = async () => {
            try {
                const response = await DataService.get("/vendor_type");

                console.log("Vendors fetched", response.data);
                if (response.status === 200) {
                    if (Array.isArray(response.data.Vendor_types)) {
                        // Format the data to match the structure expected by DataTables
                        tableDataScource.value = response.data.Vendor_types.map(
                            (vendor) => ({
                                // id: `#${insurer.id}`,
                                key: vendor.id,
                                name: (
                                    <span class="ninjadash-username">
                                        {vendor.type}
                                    </span>
                                ),

                                status: (
                                    <span
                                        class={`ninjadash-status ninjadash-status-${vendor.status}`}
                                    >
                                        {vendor.status}
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
                console.error("Error fetching vendors:", error);
                toast.error("An error occurred. Please try again.");
            }
        };

        const handleRowClick = (record) => {
            console.log("Row clicked:", record);
            // Assuming you want to navigate to a details page for the vendor
            router.push(`/app/vendors/${record.key}`);
        };

        const viewVendor = (vendorId) => {
            router.push(`/app/vendors/${vendorId}`);
        };

        const editVendor = (vendorId) => {
            router.push(`/app/vendors/edit/${vendorId}`);
        };
        const deleteVendor = async (vendorId) => {
            if (
                window.confirm(
                    "Are you sure you want to delete this vendor? This action cannot be undone.",
                )
            ) {
                try {
                    await DataService.delete(`/vendor_type/${vendorId}`);
                    toast.success("Vendor deleted successfully.");
                    await fetchVendors(); // Refresh the list
                } catch (error) {
                    toast.error("Failed to delete vendor. Please try again.");
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
                                onClick={() => viewVendor(record.key)}
                            >
                                <unicon name="eye"></unicon>
                            </button>
                            <button
                                class="edit"
                                onClick={() => editVendor(record.key)}
                            >
                                <unicon name="edit"></unicon>
                            </button>
                            <button
                                class="delete"
                                onClick={() => deleteVendor(record.key)}
                            >
                                <unicon name="trash"></unicon>
                            </button>
                        </div>
                    );
                },
            },
        ];

        onMounted(async () => {
            await fetchVendors(); // Fetch drivers when the component mounts
        });

        const form = reactive({
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
            if (!form.type || !form.status) {
                toast.error("Please fill in all required fields.");
                return; // Prevent form submission
            }

            const formData = new FormData();

            // Append existing form fields
            formData.append("type", form.type);
            formData.append("status", form.status);

            try {
                isLoading.value = true;
                const response = await DataService.post(
                    "/vendor_type",
                    formData,
                );

                if (response.status === 201) {
                    toast.success("Record Added Successfully");
                    // Reset the form data to its initial state
                    form.type = "";
                    form.status = "";

                    // Close the drawer
                    open.value = false;

                    await fetchVendors();
                    router.push({
                        path: "/app/vendors",
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
            handleRowClick,

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
