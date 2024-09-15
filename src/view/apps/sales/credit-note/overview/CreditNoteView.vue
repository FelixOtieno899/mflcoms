<template>
    <Main>
        <a-row :gutter="15">
            <a-col :xs="24">
                <BorderLessHeading>
                    <sdCards title="Credit Note Info">
                        <div style="display: flex; justify-content: left">
                            <h3>
                                Export Data:
                                <span
                                    style="
                                        cursor: pointer;
                                        color: #0d79df;
                                        font-size: 14px;
                                    "
                                    @click="exportToPDF"
                                    >PDF</span
                                >
                                <span
                                    style="
                                        cursor: pointer;
                                        color: #0d79df;
                                        font-size: 14px;
                                        margin-left: 15px;
                                    "
                                    @click="exportToCSV"
                                    >CSV</span
                                >
                                <span
                                    style="
                                        cursor: pointer;
                                        color: #0d79df;
                                        font-size: 14px;
                                        margin-left: 15px;
                                    "
                                    @click="exportToJSON"
                                    >JSON</span
                                >
                            </h3>
                        </div>
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
                                            <h4>Client: {{ clientName }}</h4>
                                            <a-row>
                                                <a-col :span="12">
                                                    <h4>
                                                        Invoice Number#{{
                                                            form.invoice_number
                                                        }}
                                                    </h4>
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
                                                    <!-- <th>Action</th> -->
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
                                                    <!-- <td>
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
                                                    </td> -->
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
                                                readonly
                                                v-model="form.reason"
                                                rows="4"
                                                style="width: 100%"
                                                placeholder="Please leave a note"
                                            ></textarea>
                                        </div>

                                        <!-- Form Actions -->
                                        <div class="form-actions">
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
import jsPDF from "jspdf";
import "jspdf-autotable";
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
           
            credit_note_number: "",
            credit_amount: "",
            issue_date: "",
            invoice_number: "",
            client_name: "",
            company_name: "",
            company_pin: "",
            postal_code: "",
            province: "",
            city: "",
            email: "",
            reason: "",
            items: [],
            sub_total: 0,
            total_amount: 0,
            vat_amount: 0,
        });

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
                    form.issue_date = creditNote.issue_date;
                    form.reason = creditNote.reason;
                   
                form.company_pin = creditNote.invoice.client.company_pin;
                form.company_name = creditNote.invoice.client.company_name;
                form.postal_code = creditNote.invoice.client.postal_code;
                form.province = creditNote.invoice.client.province;
                form.city = creditNote.invoice.client.city;
                form.email = creditNote.invoice.client.email;
                    (form.sub_total = creditNote.invoice.subtotal),
                        (form.total_amount = creditNote.invoice.total_amount),
                        (form.vat_amount = creditNote.invoice.vat_amount);

                    form.items = creditNote.credit_note_items.map((item) => ({
                        id: item.id,
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
                sub_total: form.sub_total,
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
                    truck_registration:item.truck_registration,
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
            form.items.splice(index, 1); 
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
                await fetchCreditNote(props.id);
                await fetchInvoices();
            } catch (error) {
                console.error("Error fetching initial data:", error);
            } finally {
                isLoading.value = false;
            }
        });

        
        const exportToPDF = () => {
            const doc = new jsPDF();
            let fileName = `credit_note_${form.credit_note_number}`;

            const logoBase64 =
                "data:image/png;base64,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";

            const companyName = form.company_name || "Unknown Client";
            const companyPin = form.company_pin || "Unknown PIN";
            const postalCode = form.postal_code || "00000";
            const province = form.province || "Business Park";
            const city = form.city || "Nairobi";
            const email = form.email || "info@biashara.co.ke";

            doc.addImage(logoBase64, "PNG", 10, 40, 30, 15);

            doc.setFontSize(10);
            doc.setFont("helvetica", "normal");
            doc.text("PIN: P019283839Z", 50, 36);
            doc.text("P.O. BOX 84208-00100", 50, 42);
            doc.text("+25470123456", 50, 48);
            doc.text("Dynasoft Business Park", 50, 54);
            doc.text("Mombasa Road, Nairobi", 50, 60);
            doc.text("info@forwarders.co.ke", 50, 66);

            doc.setLineWidth(0.2);
            doc.line(100, 25, 100, 70);

            doc.setFontSize(10);
            doc.setFont("helvetica", "bold");
            doc.text(companyName, 110, 30);
            doc.setFont("helvetica", "normal");
            doc.text(`PIN: ${companyPin}`, 110, 36);
            doc.text(`P.O. BOX ${postalCode}`, 110, 42);
            doc.text(`${province}`, 110, 48);
            doc.text(`${city}`, 110, 54);
            doc.text(`${email}`, 110, 60);

            doc.line(150, 25, 150, 70);

            doc.setFontSize(10);
            doc.setFont("helvetica", "bold");
            doc.text("Credit Note", 160, 30);
            doc.setFont("helvetica", "normal");
            doc.text(`Credit Note #: ${form.credit_note_number}`, 160, 36);
            doc.text(`Date: ${form.issue_date}`, 160, 42);
            doc.text(`KES ${formatNumberWithCommas(form.credit_amount)}`, 160, 48);

            let count20FTE = 0;
            let count40FTE = 0;
            let count20FT = 0;
            let count40FT = 0;
            let countLooseCargo = 0;

            const tableHeaders = [
                [
                    "DO #",
                    "File Ref.",
                    "Item",
                    "CNT/TNE",
                    "Vehicle",
                    "Load",
                    "Offload",
                    "Rate",
                ],
            ];

            const tableData = form.items.map((item) => {
                if (item.itemDescription === "20FTE") count20FTE++;
                if (item.itemDescription === "40FTE") count40FTE++;
                if (item.itemDescription === "20FT") count20FT++;
                if (item.itemDescription === "40FT") count40FT++;
                if (item.itemDescription === "Loose Cargo") countLooseCargo++;

                return [
                    item.deliveryNoteNumber,
                    item.deliveryNoteFileRef,
                    item.itemDescription,
                    item.qty,
                    item.truck_registration,
                    item.loadingPoint,
                    item.offLoadingPoint,
                    formatNumberWithCommas(item.lineTotal),
                ];
            });

            doc.autoTable({
                startY: 80,
                head: tableHeaders,
                body: tableData,
                theme: "grid",
                styles: { fontSize: 8 },
                headStyles: {
                    fillColor: [0, 112, 192],
                    textColor: [255, 255, 255],
                },
                columnStyles: {
                    0: { cellWidth: 20 },
                    1: { cellWidth: 25 },
                    2: { cellWidth: 40 },
                    3: { cellWidth: 20 },
                    4: { cellWidth: 25 },
                    5: { cellWidth: 15 },
                    6: { cellWidth: 15 },
                    7: { cellWidth: 25 },
                },
            });

            const finalY = doc.previousAutoTable.finalY || 100;

            const totalRow = [
                "Total",
                "20FTE",
                "40FTE",
                "20FT",
                "40FT",
                "Loose Cargo  (tons)",
            ];

            const countRow = [
                "Count",
                count20FTE.toString(),
                count40FTE.toString(),
                count20FT.toString(),
                count40FT.toString(),
                countLooseCargo.toString(),
            ];

            doc.autoTable({
                startY: finalY + 1,
                head: [totalRow],
                body: [countRow],
                theme: "grid",
                styles: { fontSize: 8, halign: "center" },
                headStyles: {
                    fillColor: [0, 112, 192],
                    textColor: [255, 255, 255],
                },
                columnStyles: {
                    0: { cellWidth: 25 },
                    1: { cellWidth: 30 },
                    2: { cellWidth: 30 },
                    3: { cellWidth: 30 },
                    4: { cellWidth: 35 },
                    5: { cellWidth: 35 },
                },
            });

            doc.setFontSize(10);
            doc.text(`Subtotal: KES ${formatNumberWithCommas(form.sub_total)}`, 160, finalY + 20);
            doc.text(`Tax (16%): KES ${formatNumberWithCommas(form.vat_amount)}`, 160, finalY + 26);
            doc.text(`Total: KES ${formatNumberWithCommas(form.credit_amount)}`, 160, finalY + 32);

            doc.setFontSize(8);
            doc.text(
                "Terms & Conditions: Payment due within 30 days. Late payments will incur a 5% penalty.",
                10,
                finalY + 40,
            );

            const finalFileName = `${fileName}.pdf`;
            doc.save(finalFileName);
        };

        const exportToCSV = () => {
            const headers = [
                "Item Description",
                "Container Number",
                "Delivery Note #",
                "Container Ref No",
                "Vehicle",
                "Loading Point",
                "Off Loading Point",
                "Qty",
                "Price",
                "Tax",
                "Line Total",
            ];

            const rows = form.items.map((item) => {
                console.log("Item Data:", item);
                return [
                    item.itemDescription || "",
                    item.containerNumber || "",
                    item.deliveryNoteNumber || "",
                    item.deliveryNoteFileRef || "",
                    item.truck_registration || "",
                    item.loadingPoint || "",
                    item.offLoadingPoint || "",
                    item.qty || "",
                    item.price || "",
                    item.tax || "",
                    item.lineTotal || "",
                ];
            });

            console.log("Invoice Rows:", rows);

            const metadata = [
                [
                    "Client",
                    form.client_name || "N/A",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                ],
                [
                    "Invoice #",
                    form.credit_note_number || "N/A",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "Tax",
                    form.vat || "N/A",
                ],
                [
                    "Date",
                    form.issue_date || "N/A",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                ],
            ];

            console.log("Metadata:", metadata);

            const totals = [
                [
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "Sub Total",
                    form.sub_total || "0",
                ],
                ["", "", "", "", "", "", "", "", "Tax", form.vat_amount || "0"],
                ["", "", "", "", "", "", "", "", "Total", form.credit_amount || "0"],
            ];

            console.log("Totals:", totals);

            const csvContent = [
                ...metadata.map((e) => e.join(",")),
                headers.join(","),
                ...rows.map((e) => e.join(",")),
                ...totals.map((e) => e.join(",")),
            ].join("\n");

            console.log("Generated CSV Content:", csvContent);

            // const encodedUri = encodeURI(
            //     "data:text/csv;charset=utf-8," + csvContent,
            // );

            const encodedUri = encodeURI(
                "data:text/csv;charset=utf-8,\uFEFF" + csvContent,
            );

            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", `credit_note_${form.credit_note_number}.csv`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        };

        const exportToJSON = () => {
            const jsonString = JSON.stringify(form, null, 2);
            const blob = new Blob([jsonString], { type: "application/json" });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = `credit_note_${form.invoice_number}.json`;
            document.body.appendChild(link);

            link.click();
            document.body.removeChild(link);
        };

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
            exportToPDF,
            exportToCSV,
            exportToJSON
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
