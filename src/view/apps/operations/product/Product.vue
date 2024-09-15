<template>
    <Main>
        <a-row :gutter="15">
            <a-col :xs="24">
                <BorderLessHeading>
                    <sdCards title=" Manage Products">
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
                                            :rules="rules"
                                        >
                                            <a-row :gutter="16">
                                                <a-col :span="8">
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
                                                            placeholder="product name"
                                                        />
                                                    </a-form-item>
                                                </a-col>

                                                <a-col :span="8">
                                                    <a-form-item
                                                        label="Price/Rate"
                                                        name="price"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                            },
                                                        ]"
                                                    >
                                                        <a-input
                                                            type="text"
                                                            v-model:value="
                                                                form.price
                                                            "
                                                            placeholder=""
                                                        />
                                                    </a-form-item>
                                                </a-col>

                                                <a-col :span="8">
                                                    <a-form-item
                                                        label="Stock Quantity"
                                                        name="stock_quantity"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                            },
                                                        ]"
                                                    >
                                                        <a-input
                                                            type="text"
                                                            v-model:value="
                                                                form.stock_quantity
                                                            "
                                                            placeholder=""
                                                        />
                                                    </a-form-item>
                                                </a-col>
                                            </a-row>

                                            <a-row :gutter="16">
                                                <a-col :span="8">
                                                    <a-form-item
                                                        label="SKU"
                                                        name="sku"
                                                    >
                                                        <a-input
                                                            type="text"
                                                            v-model:value="
                                                                form.sku
                                                            "
                                                            placeholder="sku"
                                                        />
                                                    </a-form-item>
                                                </a-col>

                                                <a-col :span="8">
                                                    <a-form-item
                                                        label="Barcode"
                                                        name="barcode"
                                                    >
                                                        <a-input
                                                            type="text"
                                                            v-model:value="
                                                                form.barcode
                                                            "
                                                            placeholder="barcode"
                                                        />
                                                    </a-form-item>
                                                </a-col>

                                                <a-col :span="8">
                                                    <a-form-item
                                                        label="Unit Price of Measurement"
                                                        name="abbreviation_id"
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
                                                                form.abbreviation_id
                                                            "
                                                            class="custom-select"
                                                        >
                                                            <option value="">
                                                                Select Unit of
                                                                Measurement
                                                            </option>
                                                            <option
                                                                v-for="unit in measurements"
                                                                :key="unit.id"
                                                                :value="unit.id"
                                                            >
                                                                {{ unit.name }}
                                                            </option>
                                                        </select>
                                                    </a-form-item>
                                                </a-col>
                                            </a-row>

                                            <a-row>
                                                <a-col :span="12">
                                                    <a-form-item
                                                        label="Description"
                                                        name="description"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                            },
                                                        ]"
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
                            @search="fetchProducts"
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
    name: "Product",
    components: {
        Main,
        DataTables,
        BorderLessHeading,
    },
    setup() {
        //const { state } = useStore();
        const router = useRouter();
        const toast = useToast();
        const measurements = ref([]);
        const isLoading = ref(false);

        const tableDataScource = ref([]);

        const fetchAllData = async () => {
            await Promise.all([fetchProducts(), fetchUnitsOfMeasurements()]);
        };

        const fetchUnitsOfMeasurements = async () => {
            try {
                const response = await DataService.get(`/units_of_measure`);
                console.log(
                    "Units of Measurements fetched fetched",
                    response.data.Units,
                );
                measurements.value = response.data.Units;
            } catch (error) {
                console.error("Error fetching units of measurements:", error);
                if (error.response) {
                    console.error("Error response:", error.response);
                }
            }
        };

        const fetchProducts = async (name = null) => {
            try {
                let response;
                if (name) {
                    // Call the searchDrivers method if a nationalId is provided
                    response = await searchProducts(name);
                } else {
                    // Existing logic to fetch all drivers
                    response = await DataService.get("/products");
                    console.log("Products fetched", response.data);
                    if (response.status === 200) {
                        if (Array.isArray(response.data.Products)) {
                            // Format the data to match the structure expected by DataTables
                            tableDataScource.value = response.data.Products.map(
                                (product) => ({
                                    // id: `#${product.id}`,
                                    key: product.id,
                                    name: (
                                        <span class="ninjadash-username">
                                            {product.name}
                                        </span>
                                    ),
                                    price: <span>{product.price}</span>,
                                    stock_quantity: product.stock_quantity,
                                    sku: product.sku,
                                    // status: (
                                    //     <span
                                    //         class={`ninjadash-status ninjadash-status-${insurer.status}`}
                                    //     >
                                    //         {insurer.status}
                                    //     </span>
                                    // ),
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
                console.error("Error fetching products:", error);
                toast.error("An error occurred. Please try again.");
            }
        };

        const searchProducts = async (name) => {
            try {
                const response = await DataService.get(
                    `/products/search/${name}`,
                );
                if (
                    response.status === 200 &&
                    Array.isArray(response.data.Products)
                ) {
                    tableDataScource.value = response.data.Products.map(
                        (product) => ({
                            key: product.id,
                            name: (
                                <span class="ninjadash-username">
                                    {product.name}
                                </span>
                            ),
                            price: <span>{product.price}</span>,
                            stock_quantity: product.stock_quantity,
                            sku: product.sku,
                        }),
                    );
                } else {
                    tableDataScource.value = [];
                }
            } catch (error) {
                console.error("Error searching suppliers:", error);
                toast.error("An error occurred. Please try again.");
            }
        };
        const viewProduct = (productId) => {
            router.push(`/app/products/${productId}`);
        };

        const editProduct = (productId) => {
            router.push(`/app/products/edit/${productId}`);
        };
        const deleteProduct = async (productId) => {
            if (
                window.confirm(
                    "Are you sure you want to delete this product? This action cannot be undone.",
                )
            ) {
                try {
                    await DataService.delete(`/products/${productId}`);
                    toast.success("Driver deleted successfully.");
                    await fetchProducts(); // Refresh the list
                } catch (error) {
                    toast.error("Failed to delete product. Please try again.");
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
                title: "Price",
                dataIndex: "price",
                key: "coutry",
            },

            {
                title: "Stock Quantity",
                dataIndex: "stock_quantity",
                key: "position",
            },
            {
                title: "Sku",
                dataIndex: "sku",
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
                            <button
                                class="view"
                                onClick={() => viewProduct(record.key)}
                            >
                                <unicon name="eye"></unicon>
                            </button>
                            <button
                                class="edit"
                                onClick={() => editProduct(record.key)}
                            >
                                <unicon name="edit"></unicon>
                            </button>
                            <button
                                class="delete"
                                onClick={() => deleteProduct(record.key)}
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
            name: "",
            price: "",
            stock_quantity: "",
            sku: "",
            barcode: "",
            abbreviation_id: "",
            description: "",
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
                !form.price ||
                !form.stock_quantity ||
                !form.description ||
                !form.abbreviation_id
            ) {
                toast.error("Please fill in all required fields.");
                return; // Prevent form submission
            }

            // Check if the selected vehicle brand is valid
            const selectedUnitOfMeasure = measurements.value.find(
                (unit) => unit.id === form.abbreviation_id,
            );
            if (!selectedUnitOfMeasure) {
                toast.error("Please select a valid unit of measurement.");
                return; // Prevent form submission
            }

            const formData = new FormData();

            // Append existing form fields
            formData.append("name", form.name);
            formData.append("price", form.price);

            formData.append("stock_quantity", form.stock_quantity);

            formData.append("sku", form.sku);
            formData.append("barcode", form.barcode);
            formData.append("description", form.description);
            formData.append("abbreviation_id", form.abbreviation_id);

            try {
                isLoading.value = true;
                const response = await DataService.post("/products", formData);

                if (response.status === 201) {
                    toast.success("Record Added Successfully");
                    // Reset the form data to its initial state
                    form.name = "";
                    form.price = "";
                    form.stock_quantity = "";
                    form.sku = "";
                    form.description = "";
                    form.barcode = "";
                    form.abbreviation_id = "";

                    // Close the drawer
                    open.value = false;

                    await fetchProducts();

                    router.push({
                        path: "/app/products",
                    });
                } else {
                    toast.error("Failed to add record. Please try again.");
                }
            } catch (error) {
                console.error("Record Add error", error);
                console.log("Error Response:", error.response);

                if (error.response && error.response.status === 422) {
                    const errorMessages = error.response.data.errors || {};

                    Object.values(errorMessages).forEach((messages) => {
                        messages.forEach((message) => {
                            toast.error(message);
                        });
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
            measurements,
            fetchProducts,

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
