<template>
    <Main>
        <a-row :gutter="15">
            <a-col :xs="24">
                <BorderLessHeading>
                    <sdCards title="Edit Invoice">
                        <template v-if="isLoading">
                            <a-space class="loading">
                                <a-spin size="large" />
                            </a-space>
                        </template>

                        <template v-else>
                            <form :model="form" layout="vertical">
                                <table>
                                    <tr class="invoice-header">
                                        <td>Client</td>
                                        <td>
                                            {{ form.client_name }}
                                        </td>
                                        <td>Invoice #</td>
                                        <td>{{ form.invoice_number }}</td>
                                        <td>Tax</td>
                                        <td>0</td>
                                        <td>Date</td>
                                        <td>
                                            {{ form.invoice_date }}
                                        </td>
                                        <td></td>
                                    </tr>

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
                                    </tr>
                                    <tr
                                        v-for="(item, index) in form.items"
                                        :key="index"
                                    >
                                        <td>{{ item.itemDescription }}</td>
                                        <td>{{ item.containerNumber }}</td>
                                        <td>{{ item.deliveryNoteNumber }}</td>
                                        <td>{{ item.deliveryNoteFileRef }}</td>
                                        <td>{{ item.loadingPoint }}</td>
                                        <td>{{ item.offLoadingPoint }}</td>
                                        <td>
                                            <input
                                            
                                                type=""
                                                v-model="item.qty"
                                                @input="updateLineTotal(index)"
                                                readonly
                                            />
                                        </td>
                                        <td>
                                            <input
                                            
                                                type="number"
                                                v-model="item.price"
                                                @input="updateLineTotal(index)"
                                            />
                                        </td>
                                        <td>{{ item.tax }}</td>
                                        <td>{{ item.lineTotal }}</td>
                                    </tr>
                                    <tr class="total-row">
                                        <td colspan="9" class="label">
                                            Sub Total
                                        </td>
                                        <td>{{ form.subTotal }}</td>
                                    </tr>
                                    <tr class="total-row">
                                        <td colspan="9" class="label">Tax</td>
                                        <td>{{ form.taxTotal }}</td>
                                    </tr>
                                    <tr class="total-row">
                                        <td colspan="9" class="label">Total</td>
                                        <td>{{ form.total }}</td>
                                    </tr>
                                </table>
                                <div>
                                    <sdButton
                                        size="small"
                                        type="primary"
                                        @click.prevent="handleSubmit"
                                    >
                                        Save
                                    </sdButton>
                                    &nbsp; &nbsp;
                                    <sdButton
                                        size="small"
                                        @click.prevent="onClose"
                                        type="light"
                                    >
                                        Cancel
                                    </sdButton>
                                </div>
                            </form>
                        </template>
                    </sdCards>
                </BorderLessHeading>
            </a-col>
        </a-row>
    </Main>
</template>

<script>
import { DataService } from "@/config/dataService/dataService";
import { defineComponent, ref, reactive, onMounted, watch } from "vue";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";


const InvoiceEdit = defineComponent({
    name: "InvoiceEdit",
    props: ["id"],

    setup(props) {
        const router = useRouter();
        const toast = useToast();
        const isLoading = ref(false);

        const form = reactive({
            client_id: null,
            client_name: "",
            invoice_date: "",
            invoice_number: "",
            items: [],
            subTotal: 0,
            taxTotal: 0,
            total: 0,
        });

        const fetchInvoiceDetails = async (invoiceId) => {
            try {
                const response = await DataService.get(
                    `/invoices/${invoiceId}`,
                );
                const invoiceDetails = response.data.Invoice;

                console.log("Invoice Details",invoiceDetails)

                form.client_id = invoiceDetails.client_id;
                form.client_name = invoiceDetails.client.user.first_name;
                form.invoice_date = invoiceDetails.invoice_date;
                form.invoice_number = invoiceDetails.invoice_number;
                form.items = invoiceDetails.items.map((item) => ({
                    ...item,
                    qty:item.qty,
                    price: Number(item.price),
                    lineTotal: Number(item.lineTotal),
                }));
                updateSubtotalAndTotal();
            } catch (error) {
                console.error("Error fetching invoice:", error);
                if (error.response) {
                    console.error("Error response:", error.response);
                }
            }
        };

        const updateInvoiceDetails = async (invoiceId, updatedDetails) => {
            try {
                const response = await DataService.put(
                    `/invoices/${invoiceId}`,
                    updatedDetails,
                );
                console.log("Invoice updated successfully:", response.data);
            } catch (error) {
                console.error("Error updating invoice:", error);
                if (error.response) {
                    console.error("Error response:", error.response);
                }
            }
        };

        onMounted(() => {
            fetchInvoiceDetails(props.id);
        });

        const handleSubmit = async () => {
            try {
                isLoading.value = true;
                await updateInvoiceDetails(props.id, form);
                toast.success("Invoice updated successfully!");
            } catch (error) {
                toast.error("Error updating Invoice");
                console.error("Error updating Invoice:", error);
            } finally {
                isLoading.value = false;
            }
        };

        const updateLineTotal = (index) => {
            const item = form.items[index];
            item.lineTotal = ( item.price * 1.16).toFixed(2);
            updateSubtotalAndTotal();
        };

        const updateSubtotalAndTotal = () => {
            form.subTotal = form.items.reduce(
                (total, item) => total + parseFloat(item.lineTotal || 0),
                0,
            );
            form.taxTotal = (form.subTotal * 0.16).toFixed(2);
            form.total = (form.subTotal + parseFloat(form.taxTotal)).toFixed(2);
        };

        watch(() => form.items, updateSubtotalAndTotal, { deep: true });

        const onClose = () => {
            router.push(`/app/invoices`);
        };

        return {
            form,
            handleSubmit,
            updateLineTotal,
            onClose,
            isLoading,
        };
    },
});

export default InvoiceEdit;
</script>

<style scoped>
table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
}
th,
td {
    border: 1px solid #000;
    padding: 8px;
    text-align: center;
}
th {
    background-color: #f2f2f2;
}
.invoice-header td {
    border: none;
    text-align: left;
}
.total-row td {
    border: none;
}
.total-row .label {
    text-align: right;
    padding-right: 20px;
}

.loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}

.loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 500px;
}
</style>
