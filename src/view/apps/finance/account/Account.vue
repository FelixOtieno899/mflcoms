<template>
    <Main>
        <a-row :gutter="15">
            <a-col :xs="24">
                <BorderLessHeading>
                    <sdCards title="Manage Accounts">
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
                                    title="Create New Account"
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
                                            <a-row :gutter="16">
                                                <a-col :span="12">
                                                    <a-form-item
                                                        label="Account Type"
                                                        name="account_type_id"
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
                                                                form.account_type_id
                                                            "
                                                            class="custom-select"
                                                        >
                                                            <option value="">
                                                                Select Account
                                                                Type
                                                            </option>
                                                            <option
                                                                v-for="accountType in accountTypes"
                                                                :key="
                                                                    accountType.id
                                                                "
                                                                :value="
                                                                    accountType.id
                                                                "
                                                            >
                                                                {{
                                                                    accountType.name
                                                                }}
                                                            </option>
                                                        </select>
                                                    </a-form-item>
                                                </a-col>

                                                <a-col :span="12">
                                                    <a-form-item
                                                        label="Detail Type"
                                                        name="account_type_category_id"
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
                                                                form.account_type_category_id
                                                            "
                                                            class="custom-select"
                                                        >
                                                            <option value="">
                                                                Select Detail
                                                                Type
                                                            </option>
                                                            <option
                                                                v-for="accountTypeCategory in accountTypeCategories"
                                                                :key="
                                                                    accountTypeCategory.id
                                                                "
                                                                :value="
                                                                    accountTypeCategory.id
                                                                "
                                                            >
                                                                {{
                                                                    accountTypeCategory.name
                                                                }}
                                                            </option>
                                                        </select>
                                                    </a-form-item>
                                                </a-col>
                                            </a-row>
                                            <a-row :gutter="16">
                                                <a-col :span="24">
                                                    <a-form-item
                                                        label="Account Name"
                                                        name="name"
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
                                                                form.name
                                                            "
                                                            placeholder=""
                                                        />
                                                    </a-form-item>
                                                </a-col>
                                            </a-row>

                                            <a-row
                                                :gutter="16"
                                                v-if="form.account_type_id"
                                            >
                                                <a-col :span="12">
                                                    <a-form-item
                                                        label="Opening Balance"
                                                        name="opening_balance"
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
                                                                form.opening_balance
                                                            "
                                                            placeholder=""
                                                        />
                                                    </a-form-item>
                                                </a-col>

                                                <a-col :span="12">
                                                    <a-form-item
                                                        label="As of"
                                                        name="open_as_of"
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
                                                                form.open_as_of
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
                                                <a-col :span="24">
                                                    <a-form-item
                                                        label="Description"
                                                        name="description"
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
                            @search="fetchAccounts"
                        />
                    </sdCards>
                </BorderLessHeading>
            </a-col>
        </a-row>
    </Main>
</template>

<script>
import { DataService } from "@/config/dataService/dataService";
import { defineComponent, onMounted, computed, watch } from "vue";
import { Main } from "../../../styled";
import DataTables from "@/components/table/DataTable.vue";
import { BorderLessHeading } from "../../../styled";
import { reactive, ref } from "vue";
//import { useStore } from "vuex";

import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

export default defineComponent({
    name: "Account",
    components: {
        Main,
        DataTables,
        BorderLessHeading,
    },
    setup() {
        const router = useRouter();
        const toast = useToast();

        const isLoading = ref(false);
        // const { state, dispatch } = useStore();

        const tableDataScource = ref([]);

        const accountTypes = ref([]);
        const accountTypeCategories = ref([]);
        const measurements = ref([]);

        const formatNumberWithCommas = (value) => {
            const number = Number(value);
            if (isNaN(number)) {
                return value;
            }
            return new Intl.NumberFormat().format(number);
        };


        const fetchAllData = async () => {
            await Promise.all([
                fetchAccounts(),
                fetchAccountTypes(),
                fetchAccountTypeCategories(),
                fetchUnitsOfMeasurements(),
            ]);
        };

        const fetchAccounts = async (name = null) => {
            try {
                let response;
                if (name) {
                    // Call the searchCreditNote method if  IssueDate is provided
                    response = await searchAccounts(name);
                } else {
                    // Existing logic to fetch all accounts
                    response = await DataService.get("/account");
                    console.log("Accounts fetched", response.data);
                    if (response.status === 200) {
                        if (Array.isArray(response.data.Accounts)) {
                            // Format the data to match the structure expected by DataTables
                            tableDataScource.value = response.data.Accounts.map(
                                (account) => ({
                                    // id: `#${vehicle.id}`,
                                    key: account.id,
                                    name: (
                                        <span class="ninjadash-username">
                                            {account.name}
                                        </span>
                                    ),
                                    account_type: (
                                        <span>
                                            {
                                                account.account_type_category
                                                    .account_type.name
                                            }
                                        </span>
                                    ),

                                    detail_type: (
                                        <span>
                                            {account.account_type_category.name}
                                        </span>
                                    ),

                                    quickbooks_balance: (
                                        <span>
                                            {" "}
                                            Ksh {formatNumberWithCommas(account.opening_balance)}
                                        </span>
                                    ),

                                    bank_balance: <span></span>,

                                    // status: (
                                    //     <span
                                    //         class={`ninjadash-status ninjadash-status-${vehicle.status}`}
                                    //     >
                                    //         {vehicle.status}
                                    //     </span>
                                    // ),
                                }),
                            );
                        } else {
                            // No accounts found, handle accordingly
                            tableDataScource.value = [];
                        }
                    } else {
                        return;
                        //toast.error("Failed to fetch drivers. Please try again.");
                    }
                }
            } catch (error) {
                console.error("Error fetching accounts:", error);
                toast.error("An error occurred. Please try again.");
            }
        };

        const searchAccounts = async (name) => {
            try {
                const response = await DataService.get(
                    `/account/search/${name}`,
                );

                console.log("Searched acount", response.data);
                if (
                    response.status === 200 &&
                    Array.isArray(response.data.Accounts)
                ) {
                    tableDataScource.value = response.data.Accounts.map(
                        (account) => ({
                            // id: `#${vehicle.id}`,
                            key: account.id,
                            name: (
                                <span class="ninjadash-username">
                                    {account.name}
                                </span>
                            ),
                            account_type: (
                                <span>{account.account_type.name}</span>
                            ),

                            detail_type: <span>{account.category}</span>,
                            quickbooks_balance: (
                                <span> Ksh {account.opening_balance}</span>
                            ),

                            bank_balance: <span></span>,

                            // status: (
                            //     <span
                            //         class={`ninjadash-status ninjadash-status-${vehicle.status}`}
                            //     >
                            //         {vehicle.status}
                            //     </span>
                            // ),
                        }),
                    );
                } else {
                    tableDataScource.value = [];
                }
            } catch (error) {
                console.error("Error searching account:", error);
                toast.error("An error occurred. Please try again.");
            }
        };

        const fetchAccountTypes = async () => {
            try {
                const response = await DataService.get(`/account_type`);
                console.log("Account types  fetched", response.data);
                accountTypes.value = response.data.Account_types;
            } catch (error) {
                console.error("Error fetching account types:", error);
                if (error.response) {
                    console.error("Error response:", error.response);
                }
            }
        };

        const fetchAccountTypeCategories = async () => {
            try {
                const response = await DataService.get(
                    `/account_type_category`,
                );
                console.log("Account type categories  fetched", response.data);
                accountTypeCategories.value =
                    response.data.Account_type_categories;
            } catch (error) {
                console.error("Error fetching account type categories:", error);
                if (error.response) {
                    console.error("Error response:", error.response);
                }
            }
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

        const viewAccount = (accountId) => {
            router.push(`/app/accounts/${accountId}`);
        };

        const editAccount = (accountId) => {
            router.push(`/app/accounts/edit/${accountId}`);
        };
        const deleteAccount = async (accountId) => {
            if (
                window.confirm(
                    "Are you sure you want to delete this account? This action cannot be undone.",
                )
            ) {
                try {
                    await DataService.delete(`/account/${accountId}`);
                    toast.success("Account deleted successfully.");
                    await fetchAccounts(); // Refresh the list
                } catch (error) {
                    toast.error("Failed to delete account. Please try again.");
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
                key: "name",
            },
            {
                title: "Account Type",
                dataIndex: "account_type",
                key: "account_type",
            },

            {
                title: "Detail Type",
                dataIndex: "detail_type",
                key: "detail_type",
            },

            {
                title: "QuickBooks Balance",
                dataIndex: "quickbooks_balance",
                key: "quickbooks_balance",
            },

            {
                title: "Bank Balance",
                dataIndex: "bank_balance",
                key: "bank_balance",
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
                                style="color:blue"
                                class="view"
                                onClick={() => viewAccount(record.key)}
                            >
                                Account History
                            </button>

                            <select
                                style=" appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    padding: 2px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f8f8f8;
    font-size: 12px;
    width: 80px;"
                                onChange={(event) =>
                                    handleActionChange(event, record.key)
                                }
                            >
                                <option value="">More Actions</option>
                                <option value="connectBank">
                                    Connect Bank
                                </option>

                                <option value="editAccount">Edit</option>

                                <option value="makeInactive">
                                    Make Inactive
                                </option>
                                <option value="runReport">Run report</option>
                            </select>
                            <button
                                class="delete"
                                onClick={() => deleteAccount(record.key)}
                            >
                                <unicon name="trash"></unicon>
                            </button>
                        </div>
                    );
                },
            },
        ];

        const connectBank = (accountId) => {
            console.log("Connect bank for:", accountId);
        };

        const makeInactive = (accountId) => {
            console.log("Make account inactive:", accountId);
        };

        const runReport = (accountId) => {
            console.log("Run report for:", accountId);
        };

        const handleActionChange = (event, key) => {
            const action = event.target.value;
            switch (action) {
                case "connectBank":
                    connectBank(key);
                    break;
                case "editAccount":
                    editAccount(key);
                    break;
                case "makeInactive":
                    makeInactive(key);
                    break;

                case "runReport":
                    runReport(key);
                    break;
                default:
                    console.log("No action selected");
            }
        };

        const form = reactive({
            name: "",
            account_type_id: "",
            account_type_category_id: "",
            description: "",
            opening_balance: "",
            open_as_of: "",
        });

        const handleFileUpload = (event, fieldName) => {
            const file = event.target.files[0];
            if (file) {
                form[fieldName] = file; // Update the form's state with the selected file
            }
        };

        console.log("Items to be submmited", form.value);

        const handleSubmit = async () => {
            if (
                !form.account_type_id ||
                !form.account_type_category_id ||
                !form.name ||
                !form.opening_balance
            ) {
                toast.error("Please fill in all required fields.");
                return; // Prevent form submission
            }

            // Check if the selected account  type is valid
            const selectedAccountType = accountTypes.value.find(
                (accountType) => accountType.id === form.account_type_id,
            );
            if (!selectedAccountType) {
                toast.error("Please select a valid account type.");
                return; // Prevent form submission
            }

            // Check if the selected account  type category is valid
            const selectedAccountTypeCategory =
                accountTypeCategories.value.find(
                    (accountTypeCategory) =>
                        accountTypeCategory.id ===
                        form.account_type_category_id,
                );
            if (!selectedAccountTypeCategory) {
                toast.error("Please select a valid account type category.");
                return; // Prevent form submission
            }

            const formattedAsOfDate = new Date(form.open_as_of)
                .toISOString()
                .split("T")[0];

            const formData = new FormData();

            // Append existing form fields
            formData.append("name", form.name);
            formData.append("account_type_id", form.account_type_id);
            formData.append(
                "account_type_category_id",
                form.account_type_category_id,
            );

            if (form.open_as_of) {
                formData.append("open_as_of", formattedAsOfDate);
            }

            formData.append("opening_balance", form.opening_balance);
            formData.append("description", form.description);

            try {
                isLoading.value = true;
                const response = await DataService.post("/account", formData);

                if (response.status === 201) {
                    toast.success("Record Added Successfully");

                    form.account_type_id = "";
                    form.account_type_category_id = "";
                    form.open_as_of = "";
                    form.name = "";
                    form.opening_balance = "";
                    form.description = "";

                    // Close the drawer
                    open.value = false;

                    await fetchAccounts();

                    router.push({
                        path: "/app/accounts",
                    });
                } else {
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

        const filteredAccountTypeCategories = computed(() => {
            return accountTypeCategories.value.filter(
                (category) => category.account_type_id === form.account_type_id,
            );
        });

        watch(
            () => form.account_type_category_id,
            () => {
                const selectedCategoryId = form.account_type_category_id;
                const selectedCategory =
                    filteredAccountTypeCategories.value.find(
                        (category) => category.id === selectedCategoryId,
                    );
                if (selectedCategory) {
                    form.name = selectedCategory.name;
                } else {
                    form.name = "";
                }
            },
        );

        onMounted(async () => {
            isLoading.value = true; 
            try {
                await fetchAllData();
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                isLoading.value = false; 
            }
        });

        return {
            tableDataScource,
            dataTableColumn,
            form,
            open,
            showDrawer,
            onClose,
            handleSubmit,
            isLoading,
            handleFileUpload,
            accountTypes,
            measurements,
            accountTypeCategories: filteredAccountTypeCategories,

            // vehicleBrands,
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
