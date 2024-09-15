<template>
    <Main>
        <a-row :gutter="15">
            <a-col :xs="24">
                <BorderLessHeading>
                    <sdCards title="Edit Credit Note">
                        <a-row>
                            <a-col :span="24">
                                <template v-if="isLoading">
                                    <a-space class="loading">
                                        <a-spin size="large" />
                                    </a-space>
                                </template>

                                <template v-else>
                                    <form @submit.prevent="handleSubmit">
                                        <!-- Header Section -->
                                        <div class="credit-note-header">
                                            <h4>
                                                Credit Note #{{
                                                    form.credit_note_number
                                                }}
                                            </h4>
                                            <h4>
                                                
                                                Client: {{ clientName }}
                                            </h4>
                                            <a-row>
                                                <a-col :span="12">
                                                    <label for="invoiceSelect"
                                                        >Select Invoice:</label
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
                                                            :key="invoice.id"
                                                            :value="invoice.id"
                                                        >
                                                            {{
                                                                invoice.invoice_number
                                                            }}
                                                        </option>
                                                    </select>
                                                </a-col>
                                                <a-col :span="12">
                                                    <label for="issueDate"
                                                        >Date:</label
                                                    >
                                                    {{ form.issue_date }}
                                                </a-col>
                                            </a-row>
                                        </div>

                                        <!-- Table Section -->
                                        <table class="styled-table">
                                            <thead>
                                                <tr>
                                                    <th>Item</th>
                                                    <th>Container Number</th>
                                                    <th>Delivery Note #</th>
                                                    <th>Container Ref No</th>
                                                    <th>Loading Point</th>
                                                    <th>Off Loading Point</th>
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
                                                        {{ item.loadingPoint }}
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
                                                    <td colspan="9">Total</td>
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
                                            <label for="reason">Note:</label>
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
                            </a-col>
                        </a-row>
                    </sdCards>
                </BorderLessHeading>
            </a-col>
        </a-row>
    </Main>
</template>

<script>
import { DataService } from "@/config/dataService/dataService";
import { defineComponent, reactive, ref, onMounted, watch } from "vue";
import { Main } from "../../../../styled";

import { BorderLessHeading } from "../../../../styled";
//import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { useToast } from "vue-toastification";

export default defineComponent({
    name: "CreditNoteEdit",
    components: {
        Main,

        BorderLessHeading,
    },
    props: ["id"],
    setup(props) {
        //const { state } = useStore();
        const router = useRouter();
        const toast = useToast();
        const route = useRoute();

        const isLoading = ref(false);

        const clients = ref([]);

        const invoices = ref([]);
        const drawerWidth = ref("100vw");
        const clientName = ref("");
        const creditNoteId = route.params.id;

        const formatNumberWithCommas = (value) => {
            const number = Number(value);
            if (isNaN(number)) {
                return value;
            }
            return new Intl.NumberFormat().format(number);
        };

        const form = reactive({
            invoice_id: "",
            // delivery_note_number: "",
            invoice_number: "",
            credit_note_number: "",
            credit_amount: "",
            issue_date: "",
            reason: "",
            items: [],
            sub_total: 0,
            total_amount: 0,
            vat_amount: 0,
        });

        console.log(props);
        
        const fetchCreditNote = async (id) => {
            try {
                const response = await DataService.get(`/credit_note/${id}`);

                console.log("Hi response", response);
                if (response.status === 200) {
                    const creditNote = response.data.Credit_note;

                    console.log("Response here", creditNote);
                    clientName.value =
                        `${creditNote.invoice.client.user.first_name}` +
                        " " +
                        `${creditNote.invoice.client.user.last_name}`;
                    form.invoice_id = creditNote.invoice.id;
                    form.invoice_number = creditNote.invoice.invoice_number;
                    form.credit_note_number = creditNote.credit_note_number;
                    form.credit_amount = creditNote.credit_amount;
                    form.sub_total = creditNote.sub_total;
                    form.total_amount = creditNote.total_amount;
                    form.vat_amount = creditNote.vat_amount;
                    form.issue_date = creditNote.issue_date;
                    form.reason = creditNote.reason;
                   

                    form.items = creditNote.credit_note_items.map((item) => ({
                        id: item.id,
                        itemDescription: item.itemDescription,
                        containerNumber: item.containerNumber,
                        deliveryNoteNumber: item.deliveryNoteNumber,
                        deliveryNoteFileRef: item.deliveryNoteFileRef,
                        loadingPoint: item.loadingPoint,
                        offLoadingPoint: item.offLoadingPoint,
                        qty: item.qty,
                        price: item.price,
                        tax: item.tax,
                        lineTotal: item.lineTotal,
                    }));
                } else {
                    toast.error("Failed to fetch credit note data.");
                }
            } catch (error) {
                toast.error("Error fetching credit note.");
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
                    const items = JSON.parse(invoice.items); // Parse the items field which is a JSON string
                    form.invoice_number = invoice.invoice_number;
                    (form.invoice_id = invoice.id),
                        // form.delivery_note_number =
                        //     items[0].deliveryNoteNumber || ""; // Get the delivery note number

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
        const handleFileUpload = (event, fieldName) => {
            const file = event.target.files[0];
            if (file) {
                form[fieldName] = file; // Update the form's state with the selected file
            }
        };

        const handleSubmit = async () => {
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

                const response = await DataService.put(
                    `/credit_note/${creditNoteId}`,
                    formData,
                );

                if (response.status === 201) {
                    toast.success("Credit Note updated successfully");
                    await fetchCreditNote(creditNoteId);
                    onClose();
                } else {
                    toast.error("Failed to update Credit Note");
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
            router.push(`/app/credit-note`);
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
            isLoading.value = true;
            try {
                await fetchCreditNote(creditNoteId);
                await fetchInvoices();
            } catch (error) {
                console.error("Error fetching initial data:", error);
            } finally {
                isLoading.value = false;
            }
        });

        return {
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
    height: 500px;
}
</style>
