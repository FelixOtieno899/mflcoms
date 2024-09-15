<template>
    <Main>
        <a-row :gutter="15">
            <a-col :xs="24">
                <BorderLessHeading>
                    <sdCards title="Manage Bills">
                        <DataTables
                            :filterOption="true"
                            :filterOnchange="true"
                            :tableData="tableDataScource"
                            :columns="dataTableColumn"
                            :rowSelection="false"
                            @search="fetchLocalPurchaseOrders"
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
import DataTables from "@/components/table/DataTable.vue";
import { BorderLessHeading } from "../../../styled";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

export default defineComponent({
    name: "Bill",
    components: {
        Main,
        DataTables,
        BorderLessHeading,
    },
    setup() {
        const { state } = useStore();
        const router = useRouter();
        const toast = useToast();

        const isLoading = ref(false);

        const tableDataScource = ref([]);

        const canApprove = computed(() =>
            state.auth.permissions.includes("Bill.Approve"),
        );

        const formatNumberWithCommas = (value) => {
            const number = Number(value);
            if (isNaN(number)) {
                return value;
            }
            return new Intl.NumberFormat().format(number);
        };


        const loggedUser = computed(() => state.auth.user);

        console.log("Currently logged user", loggedUser.value);

        console.log("User Permissions:", state.auth.permissions);
        console.log("Can Approve:", canApprove.value);

        const fetchBills = async () => {
            try {
                const response = await DataService.get("/bills");
                console.log("Bills fetched", response.data);
                if (response.status === 200) {
                    if (Array.isArray(response.data.Bills)) {
                        
                        tableDataScource.value =
                            response.data.Bills.map((bill) => ({
                                id: `#${bill.id}`,
                                key: bill.id,
                                bill_number: (
                                    <span class="ninjadash-username">
                                    {bill.bill_no}
                                    </span>
                                ),
                                bill_date: <span>{bill.bill_date}</span>,
                                  total_amount: formatNumberWithCommas(bill.total_amount),
                                //  gearbox: brand.gearbox,
                                status: (
                                    <span
                                        class={`ninjadash-status ninjadash-status-${bill.status}`}
                                    >
                                        {bill.status}
                                    </span>
                                ),
                                user_has_approved:
                                        bill.user_has_approved,
                            }));
                    } else {
                        
                        tableDataScource.value = [];
                    }
                } else {
                    return;
                    
                }
            } catch (error) {
                console.error("Error fetching bills:", error);
                toast.error("An error occurred. Please try again.");
            }
        };

        const viewBill = (billId) => {
            router.push(`/app/bills/${billId}`);
        };

        const deleteBill = async (billId) => {
            if (
                window.confirm(
                    "Are you sure you want to delete this bill? This action cannot be undone.",
                )
            ) {
                try {
                    await DataService.delete(`/bills/${billId}`);
                    toast.success(
                        "Bill  deleted successfully.",
                    );
                    await fetchBills(); 
                } catch (error) {
                    toast.error(
                        "Failed to delete  bill. Please try again.",
                    );
                }
            }
        };

        const approveBill = async (id) => {
            if (!canApprove.value) {
                toast.error(
                    "You are not allowed to approve this bill.",
                );
                return;
            }

            try {
                const response = await DataService.post(`/bills/${id}/approve`);
                console.log("I want to see response", response);

                if (response.status === 200) {
                    toast.success("Bill approved successfully");
                    await fetchBills();
                } else {
                    toast.error("Failed to approve  bill");
                }
            } catch (error) {
                console.log("Error details:", error);

                let errorMessage =
                    "An unexpected error occurred. Please try again.";

                if (error.response) {
                    errorMessage =
                        error.response.data.error ||
                        "Failed to approve bill";
                }

                toast.error(errorMessage);
            }
        };

        const dataTableColumn = [
            // {
            //     title: "Id",
            //     dataIndex: "id",
            //     key: "id",
            // },
            {
                title: "Bill Number",
                dataIndex: "bill_number",
                key: "bill_number",
            },
            {
                title: "Bill Date",
                dataIndex: "bill_date",
                key: "bill_date",
            },
            {
                title: "Total Amount",
                dataIndex: "total_amount",
                key: "total_amount",
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
                    const isApproved = record.user_has_approved;
                    return (
                        <div class="table-actions">
                            <button
                                style={`cursor: ${isApproved ? "not-allowed" : "pointer"}; background: ${isApproved ? "gray" : "green"}; border-radius: 10px; color: white; font-size: 12px`}
                                disabled={isApproved}
                                onclick={() => {
                                    if (!isApproved) {
                                        approveBill(record.key);
                                    }
                                }}
                            >
                                {isApproved ? "Approved" : "Approve"}
                            </button>
                            <button
                                class="view"
                                onClick={() =>
                                    viewBill(record.key)
                                }
                            >
                                <unicon name="eye"></unicon>
                            </button>
                           
                            <button
                                class="delete"
                                onClick={() =>
                                    deleteBill(record.key)
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
            await fetchBills();
        });

        return {
            tableDataScource,
            dataTableColumn,

            isLoading,
        };
    },
});
</script>
