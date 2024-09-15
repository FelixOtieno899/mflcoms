<template>
    <Main>
        <a-row :gutter="15">
            <a-col :xs="24">
                <BorderLessHeading>
                    <sdCards title="Manage Invoices">
                        <a-row>
                            <a-col
                                style="display: flex; justify-content: flex-end"
                                :span="24"
                            >
                                <a-button
                                    style="margin-top: -30px"
                                    type="primary"
                                    @click="createInvoice"
                                >
                                    <template #icon>
                                        <PlusOutlined />
                                    </template>
                                    + Add New
                                </a-button>
                            </a-col>
                        </a-row>
                        <DataTables
                            :filterOption="true"
                            :filterOnchange="true"
                            :tableData="tableDataScource"
                            :columns="dataTableColumn"
                            :rowSelection="true"
                            @search="fetchInvoices"
                        />
                    </sdCards>
                </BorderLessHeading>
            </a-col>
        </a-row>
    </Main>
</template>

<script>
import { DataService } from "@/config/dataService/dataService";
import { defineComponent, ref, onMounted, computed } from "vue";
import { Main } from "../../../styled";
import DataTables from "./DataTable.vue";
import { BorderLessHeading } from "../../../styled";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { Modal } from "ant-design-vue";
import { useStore } from "vuex";
import axios from 'axios';
import { getItem } from "../../../../utility/localStorageControl";

export default defineComponent({
    name: "Invoice",
    components: {
        Main,
        DataTables,
        BorderLessHeading,
    },
    setup() {
        const { state } = useStore();
        const router = useRouter();
        const toast = useToast();
        
        const tableDataScource = ref([]);

        const API_ENDPOINT = process.env.VUE_APP_API_ENDPOINT;

        const canApprove = computed(() =>
            state.auth.permissions.includes("Invoice.Approve"),
        );

        console.log("User Permissions:", state.auth.permissions);
        console.log("Can Approve:", canApprove.value);
        const formatNumberWithCommas = (value) => {
            const number = Number(value);
            if (isNaN(number)) {
                return value;
            }
            return new Intl.NumberFormat().format(number);
        };


        const dataTableColumn = [
            {
                title: "Invoice Number",
                dataIndex: "invoice_number",
                key: "invoice_number",
            },
            {
                title: "Client",
                dataIndex: "client",
                key: "user",
            },
            {
                title: "Invoice Date",
                dataIndex: "invoice_date",
                key: "invoice",
            },
            {
                title: "Total Amount",
                dataIndex: "total_amount",
                key: "total",
            },
            {
                title: "Payment Status",
                dataIndex: "payment_status",
                key: "payment_status",
            },
            {
                title: "Actions",
                dataIndex: "action",
                key: "action",
                width: "90px",
                customRender: ({ record }) => {
                    console.log("Am seeing a response", record);
                    const isApproved = record.user_has_approved;
                    return (
                        <div class="table-actions">
                            <button
                                style={`cursor: ${isApproved ? "not-allowed" : "pointer"}; background: ${isApproved ? "gray" : "green"}; border-radius: 10px; color: white; font-size: 12px`}
                                disabled={isApproved}
                                onclick={() => {
                                    if (!isApproved) {
                                        approveInvoice(record.key);
                                    }
                                }}
                            >
                                {isApproved ? "Approved" : "Approve"}
                            </button>
                            <button
                                style="cursor: pointer"
                                class="view"
                                onClick={() => viewInvoice(record.key)}
                            >
                                <unicon name="eye"></unicon>
                            </button>
                            <button
                                style="cursor: pointer"
                                class="edit"
                                onClick={() => editInvoice(record.key)}
                            >
                                <unicon name="edit"></unicon>
                            </button>
                            <button
                                style="cursor: pointer"
                                class="delete"
                                onClick={() => deleteInvoice(record.key)}
                            >
                                <unicon name="trash"></unicon>
                            </button>
                        </div>
                    );
                },
            },
        ];

        const fetchInvoices = async ({
            search = "",
            status = "all",
            dateRange = [],
        } = {}) => {
            console.log("Search Params Received:", {
                search,
                status,
                dateRange,
            });

            try {
                const params = {
                    search,
                    status,
                    start_date: dateRange[0]
                        ? dateRange[0].format("YYYY-MM-DD")
                        : null,
                    end_date: dateRange[1]
                        ? dateRange[1].format("YYYY-MM-DD")
                        : null,
                };

                console.log("Params sent to backend:", params); 

                const response = await axios.get(`${API_ENDPOINT}/invoices`, { params, headers: {
                Authorization: `Bearer ${getItem("access_token")}`,  
                "Content-Type": "application/json",
            }, });
                console.log("API Response:", response.data);

                if (
                    response.status === 200 &&
                    Array.isArray(response.data.Invoices)
                ) {
                    tableDataScource.value = response.data.Invoices.filter(
                        (invoice) => invoice.total_amount !== "0",
                    ).map((invoice) => ({
                        key: invoice.id,
                        invoice_number: invoice.invoice_number,
                        client: invoice.client.user.first_name,
                        invoice_date: invoice.invoice_date,
                        total_amount: formatNumberWithCommas(invoice.total_amount),
                        payment_status: (
                            <span
                                class={`ninjadash-status ninjadash-status-${invoice.payment_status}`}
                            >
                                {invoice.payment_status}
                            </span>
                        ),
                        user_has_approved: invoice.user_has_approved,
                        clientInfo: invoice.client,
                        items: invoice.items,
                        vat_amount: invoice.vat_amount,
                        subtotal:invoice.subtotal,
                        invoice_payment_status: invoice.payment_status

                    }));
                }
            } catch (error) {
                console.error("What is this error", error);
                //toast.error("Error fetching invoices.");
            }
        };

        // const handleSearch = (searchParams) => {
        //     fetchInvoices(
        //         searchParams.search,
        //         searchParams.status,
        //         searchParams.dateRange,
        //     );
        // };

        const createInvoice = () => {
            router.push(`/app/invoices/create`);
        };

        const viewInvoice = (invoiceId) => {
            router.push(`/app/invoices/${invoiceId}`);
        };

        const editInvoice = (invoiceId) => {
            router.push(`/app/invoices/edit/${invoiceId}`);
        };

        const deleteInvoice = async (invoiceId) => {
            try {
                Modal.confirm({
                    title: "Are you sure you want to delete this invoice?",
                    content: "This action cannot be undone.",
                    okText: "Yes",
                    okType: "danger",
                    cancelText: "No",
                    onOk: async () => {
                        try {
                            await DataService.delete(`/invoices/${invoiceId}`);
                            toast.success("Invoice removed successfully.");
                            await fetchInvoices();
                        } catch (error) {
                            toast.error(
                                "Failed to delete invoice. Please try again.",
                            );
                        }
                    },
                    onCancel() {
                        console.log("Canceled");
                    },
                });
            } catch (error) {
                toast.error(
                    "An error occurred while trying to delete the invoice.",
                );
            }
        };

        onMounted(async () => {
            await fetchInvoices();
        });

        const approveInvoice = async (id) => {
            if (!canApprove.value) {
                toast.error("You are not allowed to approve this invoice.");
                return;
            }

            try {
                const response = await DataService.post(
                    `/invoices/${id}/approve`,
                );
                console.log("I want to see response", response);

                if (response.status === 200) {
                    toast.success("Invoice approved successfully");
                    await fetchInvoices();
                } else {
                    toast.error("Failed to approve invoice");
                }
            } catch (error) {
                console.log("Error details:", error);

                let errorMessage =
                    "An unexpected error occurred. Please try again.";

                if (error.response) {
                    errorMessage =
                        error.response.data.error ||
                        "Failed to approve invoice";
                }

                toast.error(errorMessage);
            }
        };

        return {
            tableDataScource,
            dataTableColumn,
            fetchInvoices,
            createInvoice,
            //handleSearch
        };
    },
});
</script>
