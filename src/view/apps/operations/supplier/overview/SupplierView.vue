<template>
    <sdCards>
        <template v-slot:title>
            <div class="setting-card-title">
                <sdHeading as="h4">Supplier Info</sdHeading>
            </div>
        </template>
        <BasicFormWrapper v-if="isLoading">
            <a-space>
                <a-spin size="large" />
            </a-space>
        </BasicFormWrapper>

        <BasicFormWrapper v-else>
            <a-form :model="formState" layout="vertical">
                <a-row :gutter="16">
                    <a-col :span="8">
                        <a-form-Item label="Name">
                            <a-input
                                v-model:value="formState.full_name"
                                readonly
                            />
                        </a-form-Item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-Item label="Email">
                            <a-input v-model:value="formState.email" readonly />
                        </a-form-Item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-Item label="Phone">
                            <a-input v-model:value="formState.phone" readonly />
                        </a-form-Item>
                    </a-col>
                </a-row>
                <a-row :gutter="16">
                    <a-col :span="8">
                        <a-form-Item label="Website">
                            <a-input
                                v-model:value="formState.website"
                                readonly
                            />
                        </a-form-Item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-Item label="Postal Code">
                            <a-input
                                v-model:value="formState.postal_code"
                                readonly
                            />
                        </a-form-Item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-Item label="Address">
                            <a-input
                                v-model:value="formState.address"
                                readonly
                            />
                        </a-form-Item>
                    </a-col>
                </a-row>

                <!-- <a-col :span="8">
                <a-form-item label="Country" name="country_id">
                    <a-select
                        v-model:value="form.country_id"
                        placeholder="Select country"
                    >
                        <a-select-option
                            value="country_id"
                             readonly
                            >{{
                        }}</a-select-option>
                    </a-select>
                </a-form-item>
            </a-col>
            <a-col :span="8">
                <a-form-item label="State" name="state_id">
                    <a-select
                        v-model:value="form.state_id"
                        placeholder="Select State"
                    >
                        <a-select-option
                            value="state_id"
                             readonly
                            >{{
                        }}</a-select-option>
                    </a-select>
                </a-form-item>
            </a-col>

            <a-col :span="8">
                <a-form-item label="City" name="city_id">
                    <a-select
                        v-model:value="form.city_id"
                        placeholder="Select City"
                    >
                        <a-select-option value="city_id"  readonly></a-select-option>
                    </a-select>
                </a-form-item>
            </a-col> -->

                <a-row :gutter="16">
                    <a-col :span="24">
                        <p><strong>Transaction List</strong></p>
                        <a-divider
                            style="
                                height: 2px;
                                background-color: #89cff0;
                                margin-top: -3px;
                            "
                        />
                    </a-col>
                </a-row>
            </a-form>
        </BasicFormWrapper>

        <a-row :gutter="15">
            <a-col :span="24">
                <DataTables
                    :filterOption="true"
                    :filterOnchange="true"
                    :tableData="tableDataScource"
                    :columns="dataTableColumn"
                    :rowSelection="false"
                    @search="fetchSuppliers"
                />
            </a-col>
        </a-row>

        <a-row :gutter="16">
            <div class="setting-form-actions">
                <sdButton size="default" @click="handleCancel" type="light">
                    Back
                </sdButton>
            </div>
        </a-row>
    </sdCards>
</template>

<script>
import { DataService } from "@/config/dataService/dataService";
import DataTables from "@/components/table/DataTable.vue";
import { BasicFormWrapper } from "../../../../styled";
import { defineComponent, reactive, ref, onMounted } from "vue";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";

const SupplierView = defineComponent({
    name: "SupplierView",
    components: { BasicFormWrapper, DataTables },
    props: ["id"], // Accept the id prop

    setup(props) {
        const router = useRouter();
        const toast = useToast();
        //const isLoading = ref(false);
        const tableDataScource = ref([]);

        const formState = reactive({
            title: "",
            first_name: "",
            last_name: "",
            email: "",
            phone: "",
            website: "",
            postal_code: "",
            address: "",
            // country_id: "",
            // state_id: "",
            // city_id: "",
            description: "",
            full_name: "",
        });

        const fetchSupplierDetails = async (supplierId) => {
            try {
                const response = await DataService.get(
                    `/suppliers/${supplierId}`,
                );
                console.log("Details fetched of supplier", response.data);
                const supplierDetails = response.data.Supplier;

                formState.title = supplierDetails.title;
                formState.first_name = supplierDetails.first_name;
                formState.last_name = supplierDetails.last_name;
                formState.email = supplierDetails.email;
                formState.phone = supplierDetails.phone;
                formState.website = supplierDetails.website;
                formState.postal_code = supplierDetails.postal_code;
                formState.address = supplierDetails.address;

                formState.full_name = `${supplierDetails.title} ${supplierDetails.first_name} ${supplierDetails.last_name}`;

                console.log("Supplier table", supplierDetails.bills);

                if (response.status === 200) {
                    if (Array.isArray(supplierDetails.bills)) {
                        // Filter out bills where total amount is 0
                        const filteredBills = supplierDetails.bills.filter(
                            (bill) => bill.total_amount !== "0",
                        );

                        // Format the data to match the structure expected by DataTables
                        tableDataScource.value = filteredBills.map((bill) => ({
                            key: bill.id,
                            date: <span>{bill.bill_date}</span>,
                            type: bill.status === "paid" ? "Payment" : "Bill",
                            no: <span>{bill.bill_no}</span>,
                            payee: (
                                <span class="ninjadash-username">
                                    {supplierDetails.title}{" "}
                                    {supplierDetails.first_name}{" "}
                                    {supplierDetails.last_name}
                                </span>
                            ),
                            total_before: <span>{bill.sub_total}</span>,
                            // sales_tax: <span>{bill.vat_amount}</span>,
                            total: (
                                <span style="text-align: left">
                                    {bill.total_amount}
                                </span>
                            ),
                            balance: (
                                <span style="text-align: right">
                                    {bill.balance}
                                </span>
                            ),
                        }));

                        console.log(
                            "Whats inside this tabledatasource",
                            tableDataScource.value,
                        );
                    } else {
                        // No suppliers found, handle accordingly
                        tableDataScource.value = [];
                    }
                } else {
                    toast.error(
                        "Failed to fetch supplier details. Please try again.",
                    );
                }
            } catch (error) {
                console.error("Error fetching supplier:", error);
                if (error.response) {
                    console.error("Error response:", error.response);
                }
            }
        };

        const dataTableColumn = [
            {
                title: "Date",
                dataIndex: "date",
                key: "date",
            },
            {
                title: "Type",
                dataIndex: "type",
                key: "type",
            },

            {
                title: "No.",
                dataIndex: "no",
                key: "no",
            },
            {
                title: "Payee",
                dataIndex: "payee",
                key: "payee",
            },
            {
                title: "Total Before Sales Tax",
                dataIndex: "total_before",
                key: "total_before",
            },
            // {
            //     title: "Sales Tax",
            //     dataIndex: "sales_tax",
            //     key: "sales_tax",
            // },
            {
                title: "Total",
                dataIndex: "total",
                key: "total",
            },

            {
                title: "Balance",
                dataIndex: "balance",
                key: "balance",
            },
        ];

        onMounted(async () => {
            const supplierDetails = await fetchSupplierDetails(props.id);
            Object.assign(formState, supplierDetails);
        });

        // const handleFinishFailed = (errors) => {
        //     console.log(errors);
        // };

        const handleCancel = () => {
            router.push(`/app/suppliers`);
        };

        // const fullNames = computed(() => {
        //     return (formState.full_name = `${formState.title} ${formState.first_name}  ${formState.last_name}`);
        // });

        return {
            formState,
            // handleFinish,
            // handleFinishFailed,
            handleCancel,
            dataTableColumn,
            tableDataScource,
            // fullNames,
        };
    },
});

export default SupplierView;
</script>

<style scoped>
.setting-form-actions {
    margin-top: 20px;
}
</style>
