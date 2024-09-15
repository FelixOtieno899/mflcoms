<template>
    <Main>
        <a-row :gutter="15">
            <a-col :xs="24">
                <BorderLessHeading>
                    <sdCards title=" Manage Units Of Measurements">
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
                                    title="Create New Product"
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
                                                            placeholder="name"
                                                        />
                                                    </a-form-item>
                                                </a-col>

                                                <a-col :span="12">
                                                    <a-form-item
                                                        label="Abbreviation"
                                                        name="abbreviation"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                            },
                                                        ]"
                                                    >
                                                        <a-input
                                                            type="text"
                                                            v-model:value="
                                                                form.abbreviation
                                                            "
                                                            placeholder="abbreviation"
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

        const fetchUnitsOfMeasurements = async () => {
            try {
                const response = await DataService.get("/units_of_measure");
                if (response.status === 200) {
                    if (Array.isArray(response.data.Units)) {
                        // Format the data to match the structure expected by DataTables
                        tableDataScource.value = response.data.Units.map(
                            (unit) => ({
                                id: `#${unit.id}`,
                                key: unit.id,
                                name: (
                                    <span class="ninjadash-username">
                                        {unit.name}
                                    </span>
                                ),
                                abbreviation: <span>{unit.abbreviation}</span>,
                                // stock_quantity: product.stock_quantity,
                                // sku: product.sku,
                                // // status: (
                                // //     <span
                                // //         class={`ninjadash-status ninjadash-status-${insurer.status}`}
                                // //     >
                                // //         {insurer.status}
                                // //     </span>
                                // // ),
                            }),
                        );
                    } else {
                        tableDataScource.value = [];
                    }
                } else {
                    return;
                    //toast.error("Failed to fetch drivers. Please try again.");
                }
            } catch (error) {
                console.error("Error fetching units of measurements:", error);
                toast.error("An error occurred. Please try again.");
            }
        };
        const viewUnit = (unitId) => {
            router.push(`/app/units-of-measures/${unitId}`);
        };

        const editUnit = (unitId) => {
            router.push(`/app/units-of-measures/edit/${unitId}`);
        };
        const deleteUnit = async (unitId) => {
            if (
                window.confirm(
                    "Are you sure you want to delete this measurement? This action cannot be undone.",
                )
            ) {
                try {
                    await DataService.delete(`/units_of_measure/${unitId}`);
                    toast.success("Unit of Measure  deleted successfully.");
                    await fetchUnitsOfMeasurements(); // Refresh the list
                } catch (error) {
                    toast.error(
                        "Failed to delete unit of measure. Please try again.",
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
                title: "Abbreviation",
                dataIndex: "abbreviation",
                key: "coutry",
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
                                onClick={() => viewUnit(record.key)}
                            >
                                <unicon name="eye"></unicon>
                            </button>
                            <button
                                class="edit"
                                onClick={() => editUnit(record.key)}
                            >
                                <unicon name="edit"></unicon>
                            </button>
                            <button
                                class="delete"
                                onClick={() => deleteUnit(record.key)}
                            >
                                <unicon name="trash"></unicon>
                            </button>
                        </div>
                    );
                },
            },
        ];

        onMounted(async () => {
            await fetchUnitsOfMeasurements();
        });

        const form = reactive({
            name: "",
            abbreviation: "",
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
            if (!form.name || !form.abbreviation) {
                toast.error("Please fill in all required fields.");
                return; // Prevent form submission
            }

            const formData = new FormData();

            // Append existing form fields
            formData.append("name", form.name);
            formData.append("abbreviation", form.abbreviation);

            try {
                isLoading.value = true;
                const response = await DataService.post(
                    "/units_of_measure",
                    formData,
                );

                if (response.status === 201) {
                    tableDataScource.value.push({
                        // id: `#${response.data.Unit.id}`,
                        key: response.data.Unit.id,
                        name: (
                            <span class="ninjadash-username">
                                {response.data.Unit.name}
                            </span>
                        ),
                        abbreviation: (
                            <span>{response.data.Unit.abbreviation}</span>
                        ),

                        // status: (
                        //     <span
                        //         class={`ninjadash-status ninjadash-status-${response.data.status}`}
                        //     >
                        //         {response.data.status}
                        //     </span>
                        // ),
                    });
                    toast.success("Record Added Successfully");
                    // Reset the form data to its initial state
                    form.name = "";
                    form.abbreviation = "";

                    // Close the drawer
                    open.value = false;

                    await fetchUnitsOfMeasurements();

                    router.push({
                        path: "/app/units-of-measures",
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
