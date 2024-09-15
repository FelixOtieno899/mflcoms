<template>
    <Main>
        <a-row :gutter="15">
            <a-col :xs="24">
                <BorderLessHeading>
                    <sdCards title="Manage Credit Notes">
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
                                    title="Create New Credit Note"
                                    :width="drawerWidth"
                                    v-model:visible="open"
                                    :body-style="{ paddingBottom: '80px' }"
                                    @close="onClose"
                                >
                                    <template v-if="isLoading">
                                        <a-space class="loading">
                                            <a-spin size="large" />
                                        </a-space>
                                    </template>

                                    <template v-else>
                                        <form @submit.prevent="handleSubmit">
                                            <!-- Header Section -->
                                            <div class="credit-note-header">
                                                <h2>
                                                    Credit Note #{{
                                                        form.credit_note_number
                                                    }}
                                                </h2>
                                                <h3>
                                                    <code style="color: red"
                                                        >*</code
                                                    >
                                                    Client: {{ clientName }}
                                                </h3>
                                                <a-row>
                                                    <a-col :span="12">
                                                        <label
                                                            for="invoiceSelect"
                                                            ><code
                                                                style="
                                                                    color: red;
                                                                "
                                                                >*</code
                                                            >Select
                                                            Invoice:</label
                                                        >
                                                        <select
                                                            v-model="
                                                                form.invoice_id
                                                            "
                                                            id="invoiceSelect"
                                                            @change="
                                                                fetchInvoiceData(
                                                                    form.invoice_id,
                                                                )
                                                            "
                                                        >
                                                            <option
                                                                value=""
                                                                disabled
                                                            >
                                                                Select Invoice
                                                            </option>
                                                            <option
                                                                v-for="invoice in invoices"
                                                                :key="
                                                                    invoice.id
                                                                "
                                                                :value="
                                                                    invoice.id
                                                                "
                                                            >
                                                                {{
                                                                    invoice.invoice_number
                                                                }}
                                                            </option>
                                                        </select>
                                                    </a-col>
                                                    <a-col :span="12">
                                                        <label for="issueDate"
                                                            ><code
                                                                style="
                                                                    color: red;
                                                                "
                                                                >*</code
                                                            >Date:</label
                                                        >
                                                        <a-date-picker
                                                            id="issueDate"
                                                            v-model:value="
                                                                form.issue_date
                                                            "
                                                            placeholder="Select date"
                                                            style="width: 100%"
                                                        />
                                                    </a-col>
                                                </a-row>
                                            </div>

                                            <!-- Table Section -->
                                            <table class="styled-table">
                                                <thead>
                                                    <tr>
                                                        <th>Item</th>
                                                        <th>
                                                            Container Number
                                                        </th>
                                                        <th>Delivery Note #</th>
                                                        <th>
                                                            Container Ref No
                                                        </th>
                                                        <th>Loading Point</th>
                                                        <th>
                                                            Off Loading Point
                                                        </th>
                                                        <th>Qty</th>
                                                        <th>Price</th>
                                                        <th>Tax</th>
                                                        <th>Line Total</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr
                                                        v-for="(
                                                            item, index
                                                        ) in form.items"
                                                        :key="index"
                                                    >
                                                        <td>
                                                            {{
                                                                item.itemDescription
                                                            }}
                                                        </td>
                                                        <td>
                                                            {{
                                                                item.containerNumber
                                                            }}
                                                        </td>
                                                        <td>
                                                            {{
                                                                item.deliveryNoteNumber
                                                            }}
                                                        </td>
                                                        <td>
                                                            {{
                                                                item.deliveryNoteFileRef
                                                            }}
                                                        </td>
                                                        <td>
                                                            {{
                                                                item.loadingPoint
                                                            }}
                                                        </td>
                                                        <td>
                                                            {{
                                                                item.offLoadingPoint
                                                            }}
                                                        </td>
                                                        <td>{{ item.qty }}</td>
                                                        <td>
                                                            {{
                                                                formatNumberWithCommas(
                                                                    item.price,
                                                                )
                                                            }}
                                                        </td>
                                                        <td>{{ item.tax }}</td>
                                                        <td>
                                                            {{
                                                                formatNumberWithCommas(
                                                                    item.lineTotal,
                                                                )
                                                            }}
                                                        </td>
                                                        <td>
                                                            <button
                                                                @click.prevent="
                                                                    removeItem(
                                                                        index,
                                                                    )
                                                                "
                                                                style="
                                                                    cursor: pointer;
                                                                    background: none;
                                                                    border: none;
                                                                "
                                                            >
                                                                <unicon
                                                                    style="
                                                                        color: red;
                                                                    "
                                                                    name="trash"
                                                                ></unicon>
                                                            </button>
                                                        </td>
                                                    </tr>

                                                    <!-- Subtotal, Tax, and Total Rows -->
                                                    <tr>
                                                        <td colspan="9">
                                                            Sub Total
                                                        </td>
                                                        <td>
                                                            {{
                                                                formatNumberWithCommas(
                                                                    form.sub_total,
                                                                )
                                                            }}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colspan="9">Tax</td>
                                                        <td>
                                                            {{
                                                                formatNumberWithCommas(
                                                                    form.vat_amount,
                                                                )
                                                            }}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colspan="9">
                                                            Total
                                                        </td>
                                                        <td>
                                                            {{
                                                                formatNumberWithCommas(
                                                                    form.total_amount,
                                                                )
                                                            }}
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <td colspan="9">
                                                            Credit note Amount
                                                        </td>
                                                        <td>
                                                            {{
                                                                formatNumberWithCommas(
                                                                    form.credit_amount,
                                                                )
                                                            }}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <!-- Additional Form Fields -->
                                            <div class="form-group">
                                                <label for="reason"
                                                    >Note:</label
                                                >
                                                <textarea
                                                    v-model="form.reason"
                                                    rows="4"
                                                    style="width: 100%"
                                                    placeholder="Please leave a note"
                                                ></textarea>
                                            </div>

                                            <!-- Form Actions -->
                                            <div class="form-actions">
                                                <a-button
                                                    type="primary"
                                                    html-type="submit"
                                                    style="margin-right: 10px"
                                                    >Submit</a-button
                                                >
                                                <a-button
                                                    type="default"
                                                    @click="onClose"
                                                    >Cancel</a-button
                                                >
                                            </div>
                                        </form>
                                    </template>
                                </a-drawer>
                            </a-col>
                        </a-row>
                        <DataTables
                        :filterOption="true"
                        :filterOnchange="true"
                        :tableData="tableDataScource"
                        :columns="dataTableColumn"
                        :rowSelection="true"
                        @search="fetchCreditNotes"
                        />
                    </sdCards>
                </BorderLessHeading>
            </a-col>
        </a-row>
    </Main>
</template>

<script>

import { DataService } from "@/config/dataService/dataService";
import {
    defineComponent,
    reactive,
    ref,
    onMounted,
    watch,
    computed,
} from "vue";
import { Main } from "../../../styled";
import DataTables from "./DataTable.vue";
import { BorderLessHeading } from "../../../styled";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import axios from 'axios';
import { getItem } from "../../../../utility/localStorageControl";

export default defineComponent({
    name: "CreditNote",
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

        const clients = ref([]);

        const invoices = ref([]);
        const drawerWidth = ref("100vw");
        const clientName = ref("");

        const tableDataScource = ref([]);
        const canApprove = computed(() =>
            state.auth.permissions.includes("CreditNote.Approve"),
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


        const API_ENDPOINT = process.env.VUE_APP_API_ENDPOINT;

        const generateCreditNoteNumber = () => {
            return Math.floor(100000 + Math.random() * 900000).toString();
        };

        const form = reactive({
            invoice_id: "",
            // delivery_note_number: "",
            invoice_number: "",
            credit_note_number: generateCreditNoteNumber(),
            credit_amount: "",
            issue_date: "",
            reason: "",
            items: [],
            sub_total: 0,
            total_amount: 0,
            vat_amount: 0,
        });

      
        

        const fetchCreditNotes = async ({
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

                const response = await axios.get(`${API_ENDPOINT}/credit_note`, { params, headers: {
                Authorization: `Bearer ${getItem("access_token")}`,  
                "Content-Type": "application/json",
            }, });
                console.log("API Response for credit notes:", response.data);

                if (
                    response.status === 200 &&
                    Array.isArray(response.data.Credit_notes)
                ) {
                    tableDataScource.value =
                                response.data.Credit_notes.map((credit) => ({
                                    // id: `#${supplier.id}`,
                                    key: credit.id,
                                    credit_note_number: (
                                        <span class="ninjadash-username">
                                            {credit.credit_note_number}
                                        </span>
                                    ),
                                    credit_amount: (
                                        <span class="ninjadash-username">
                                            {formatNumberWithCommas(
                                                credit.credit_amount,
                                            )}
                                        </span>
                                    ),

                                    issue_date: (
                                        <span class="ninjadash-username">
                                            {credit.issue_date}
                                        </span>
                                    ),

                                    user_has_approved: credit.user_has_approved,
                                    clientInfo: credit.invoice.client,
                                    dateIssued: credit.issue_date,
                                    creditAmount: credit.credit_amount,
                                    creditNoteNumber: credit.credit_note_number,


                                    // status: (
                                    //     <span
                                    //         class={`ninjadash-status ninjadash-status-${delivery.status}`}
                                    //     >
                                    //         {delivery.status}
                                    //     </span>
                                    // ),
                                }));
                }
            } catch (error) {
                console.error("What is this error", error);
                //toast.error("Error fetching invoices.");
            }
        };


        const fetchInvoices = async () => {
            try {
                const response = await DataService.get("/invoices");
                if (response.data && response.data.Invoices) {
                    invoices.value = response.data.Invoices;
                    console.log("Invoices fetched", invoices.value);
                } else {
                    toast.error("Failed to load invoices");
                }
            } catch (error) {
                toast.error("An error occurred while fetching invoices");
            }
        };

        const fetchInvoiceData = async (invoiceId) => {
            const invoice = invoices.value.find((inv) => inv.id === invoiceId);
            console.log("Invoices fetched at this time", invoice);
            if (invoice) {
                try {
                    const items = JSON.parse(invoice.items); 
                    form.invoice_number = invoice.invoice_number;
                    (form.invoice_id = invoice.id),
                        
                        (clientName.value =
                            `${invoice.client.user.first_name}` +
                            " " +
                            `${invoice.client.user.last_name}`);

                    form.sub_total = invoice.subtotal;
                    form.total_amount = invoice.total_amount;
                    form.vat_amount = invoice.vat_amount;

                    form.items = items.map((item) => ({
                        itemDescription: item.itemDescription || "",
                        containerNumber: item.containerNumber || "",
                        deliveryNoteNumber: item.deliveryNoteNumber || "",
                        deliveryNoteFileRef: item.deliveryNoteFileRef || "",
                        truck_registration: item.truck_registration || "",
                        loadingPoint: item.loadingPoint || "",
                        offLoadingPoint: item.offLoadingPoint || "",
                        qty: item.qty,
                        price: item.price,
                        tax: item.tax,
                        lineTotal: item.lineTotal,
                    }));
                    calculateCreditNoteAmount();
                } catch (error) {
                    console.error("Error parsing items JSON", error);
                    toast.error("Failed to load invoice items");
                }
            }
        };

        const viewCreditNote = (creditNoteId) => {
            router.push(`/app/credit-note/${creditNoteId}`);
        };

        // const editCreditNote = (creditNoteId) => {
        //     router.push(`/app/credit-note/edit/${creditNoteId}`);
        // };
        const deleteCreditNote = async (creditNoteId) => {
            if (
                window.confirm(
                    "Are you sure you want to delete this credit note? This action cannot be undone.",
                )
            ) {
                try {
                    await DataService.delete(`/credit_note/${creditNoteId}`);
                    toast.success("Credit note deleted successfully.");
                    await fetchCreditNotes();
                } catch (error) {
                    toast.error(
                        "Failed to delete credit notes. Please try again.",
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
                title: "Credit Note Number",
                dataIndex: "credit_note_number",
                key: "credit_note_number",
            },
            {
                title: "Credit Amount",
                dataIndex: "credit_amount",
                key: "credit",
            },

            {
                title: "Date issued",
                dataIndex: "issue_date",
                key: "country",
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
                                        approveCreditNote(record.key);
                                    }
                                }}
                            >
                                {isApproved ? "Approved" : "Approve"}
                            </button>
                            <button
                                class="view"
                                onClick={() => viewCreditNote(record.key)}
                            >
                                <unicon name="eye"></unicon>
                            </button>
                           
                            <button
                                class="delete"
                                onClick={() => deleteCreditNote(record.key)}
                            >
                                <unicon name="trash"></unicon>
                            </button>
                        </div>
                    );
                },
            },
        ];

        const handleFileUpload = (event, fieldName) => {
            const file = event.target.files[0];
            if (file) {
                form[fieldName] = file; // Update the form's state with the selected file
            }
        };

        const handleSubmit = async () => {
            if (!form.invoice_id || !form.credit_amount || !form.issue_date) {
                toast.error("Please fill in all required fields");
                return;
            }

            const formData = {
                invoice_id: String(form.invoice_id),
                credit_amount: form.credit_amount,
                sub_total: String(form.sub_total),
                total_amount: String(form.total_amount),
                vat_amount: String(form.vat_amount),
                credit_note_number: form.credit_note_number,
                issue_date: form.issue_date
                    ? new Date(form.issue_date).toISOString().split("T")[0]
                    : null,
                reason: form.reason,
                items: form.items.map((item) => ({
                    itemDescription: item.itemDescription,
                    containerNumber: item.containerNumber,
                    deliveryNoteNumber: item.deliveryNoteNumber,
                    deliveryNoteFileRef: item.deliveryNoteFileRef,
                    truck_registration: item.truck_registration,
                    loadingPoint: item.loadingPoint,
                    offLoadingPoint: item.offLoadingPoint,
                    qty: item.qty,
                    price: item.price,
                    tax: item.tax,
                    lineTotal: item.lineTotal,
                })),
            };

            try {
                isLoading.value = true;

                const response = await DataService.post(
                    "/credit_note",
                    formData,
                );

                if (response.status === 201) {
                    toast.success("Credit Note created successfully");
                    await fetchCreditNotes();
                    onClose();
                } else {
                    toast.error("Failed to create Credit Note");
                }
            } catch (error) {
                console.error("Record Add error", error);
                console.log("Error Response:", error.response);

                if (error.response && error.response.status === 422) {
                    const errorMessages = error.response.data.Error || [];

                    errorMessages.forEach((message) => {
                        toast.error(message);
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
            form.invoice_id = "";
            form.delivery_note_number = "";
            form.invoice_number = "";
            form.credit_note_number = generateCreditNoteNumber();
            form.credit_amount = "";
            form.issue_date = "";
            form.reason = "";
            form.items = [];
            clientName.value = "";
            open.value = false;
        };

        
        const removeItem = (index) => {
            form.items.splice(index, 1); // Remove the item
            calculateCreditNoteAmount(); 
        };

        
        const calculateCreditNoteAmount = () => {
            let subTotal = 0;
            let taxTotal = 0;

            form.items.forEach((item) => {
                subTotal += parseFloat(item.lineTotal); 
                taxTotal +=
                    (parseFloat(item.lineTotal) * parseFloat(item.tax)) / 100; 
            });

            form.sub_total = subTotal; 
            form.vat_amount = taxTotal; 
            form.total_amount = subTotal + taxTotal; 
            form.credit_amount = form.total_amount; 
        };

        
        watch(
            () => form.items,
            () => {
                calculateCreditNoteAmount();
            },
            { deep: true },
        );

        onMounted(async () => {
            fetchInvoices();
            await fetchCreditNotes();
            form.credit_note_number = generateCreditNoteNumber();
        });

        const approveCreditNote = async (id) => {
            if (!canApprove.value) {
                toast.error("You are not allowed to approve this credit note.");
                return;
            }

            try {
                const response = await DataService.post(
                    `/credit_note/${id}/approve`,
                );
                console.log("I want to see response", response);

                if (response.status === 200) {
                    toast.success("Credit note approved successfully");
                    await fetchCreditNotes();
                } else {
                    toast.error("Failed to approve credit note");
                }
            } catch (error) {
                console.log("Error details:", error);

                let errorMessage =
                    "An unexpected error occurred. Please try again.";

                if (error.response) {
                    errorMessage =
                        error.response.data.error ||
                        "Failed to approve credit note";
                }

                toast.error(errorMessage);
            }
        };


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
            clients,
            fetchInvoiceData,

            invoices,
            fetchCreditNotes,
            drawerWidth,
            clientName,
            calculateCreditNoteAmount,
            removeItem,
            formatNumberWithCommas,
        };
    },
});
</script>

<style scoped>
.credit-note-header {
    margin-bottom: 20px;
}

.styled-table {
    width: 100%;
    margin-bottom: 20px;
    border-collapse: collapse;
    border: 1px solid #ddd;
}

.styled-table th,
.styled-table td {
    padding: 10px;
    text-align: left;
    border: 1px solid #ddd;
}

.styled-table th {
    background-color: #f2f2f2;
}

.form-group {
    margin-bottom: 15px;
}

.form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
}

textarea {
    border-radius: 4px;
    padding: 10px;
    font-size: 14px;
    resize: vertical;
}

.loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}
</style>
