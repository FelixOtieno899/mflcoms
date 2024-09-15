<template>
  <Main>
    <a-row :gutter="15">
      <a-col :xs="24">
        <BorderLessHeading>
          <sdCards title="Create Invoice">
            <a-row>
              <a-col :span="24">
                <template v-if="isLoading">
                  <a-space class="loading">
                    <a-spin size="large" />
                  </a-space>
                </template>

                <template v-else>
                  <form :model="form" layout="vertical">
                    <div class="table-responsive">
                      <table>
                        <tr class="invoice-header">
                          <td>
                            <code style="color: red">*</code>
                            <label for="client-select"> Select Client </label>
                            <select
                              id="client-select"
                              v-model="form.client_id"
                              @change="fetchDeliveryNotes"
                            >
                              <option
                                v-for="client in clients"
                                :key="client.id"
                                :value="client.id"
                              >
                                {{ client.user.first_name }}
                              </option>
                            </select>
                          </td>
                          <td>
                            <code style="color: red">*</code>
                            Invoice #
                          </td>
                          <td>
                            {{ form.invoice_number }}
                          </td>
                          <td>Tax</td>
                          <td>0</td>
                          <td>
                            <code style="color: red">*</code>
                            Date
                          </td>
                          <td>
                            <a-date-picker
                              v-model:value="form.invoice_date"
                              format="YYYY-MM-DD"
                            />
                          </td>
                          <td></td>
                          <td>
                            <a-checkbox @change="handleAdjustmentChange">
                              Adjustment
                            </a-checkbox>
                          </td>
                        </tr>
                        <tr>
                          <td colspan="7">
                            <a-button type="primary" @click="showDrawer">
                              Add Delivery Notes
                            </a-button>
                          </td>
                        </tr>
                        <tr v-if="noItemsAvailable">
                          <td
                            colspan="10"
                            style="text-align: center; color: red"
                          >
                            No new items available to add from the delivery
                            notes.
                          </td>
                        </tr>
                        <tr v-else>
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
                        <tr v-for="(item, index) in form.items" :key="index">
                          <td>
                            {{ item.itemDescription }}
                          </td>
                          <td>
                            {{ item.containerNumber }}
                          </td>
                          <td>
                            {{ item.deliveryNoteNumber }}
                          </td>
                          <td>
                            {{ item.deliveryNoteFileRef }}
                          </td>
                          <td>
                            {{ item.loadingPoint }}
                          </td>
                          <td>
                            {{ item.offLoadingPoint }}
                          </td>
                          <td>{{ item.qty }}</td>
                          <td>
                            <input
                              type="number"
                              v-model="item.price"
                              @input="updateLineTotal(index)"
                            />
                          </td>
                          <td>{{ item.tax }}</td>
                          <td>
                            {{ formatNumberWithCommas(item.lineTotal) }}
                          </td>
                        </tr>
                        <tr class="total-row">
                          <td colspan="9" class="label">Sub Total</td>
                          <td>{{ formatNumberWithCommas(form.subTotal) }}</td>
                        </tr>
                        <tr class="total-row">
                          <td colspan="9" class="label">Tax</td>
                          <td>{{ formatNumberWithCommas(form.taxTotal) }}</td>
                        </tr>
                        <tr class="total-row">
                          <td colspan="9" class="label">Total</td>
                          <td>{{ formatNumberWithCommas(form.total) }}</td>
                        </tr>
                      </table>
                    </div>
                    <div class="setting-form-actions">
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
              </a-col>
            </a-row>
          </sdCards>
        </BorderLessHeading>

        
      <a-drawer
      :width="modalWidth"
      title="Add Delivery Notes"
      v-model:visible="open"
      :body-style="{ paddingBottom: '80px' }"
      :footer-style="{ textAlign: 'right' }"
      @close="handleCancelAddDeliveryNote"
    >
      <!-- <BasicFormWrapper>
        <a-form layout="vertical">
          <div style="display: flex; justify-content: end">
            <a-input
              v-model:value="searchQuery"
              placeholder="Search..."
              allowClear
              style="margin-bottom: 20px; width: 250px"
            >
              <template #prefix>
                <unicon name="search"></unicon>
              </template>
            </a-input>
          </div>

          <template v-if="filteredDeliveryNotes.length === 0">
            <p style="text-align: center; color: red">
              No delivery notes found.
            </p>
          </template>

          <template v-else>
            <div
              v-for="(note, index) in filteredDeliveryNotes"
              :key="index"
              class="collapsible-section"
            >
              <div class="collapsible-header" @click="toggleCollapse(index)">
                <div
                  style="
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 100%;
                  "
                >
                  <span style="margin-left: 80px">
                    Delivery Note #{{ note.delivery_note_number }}
                  </span>
                
                  <span v-if="getContainerCount(note).twentyFT > 0">
                    20FT Count: {{ getContainerCount(note).twentyFT }}
                  </span>
                  <span v-if="getContainerCount(note).fortyFT > 0">
                    40FT Count: {{ getContainerCount(note).fortyFT }}
                  </span>
                  <span v-if="getContainerCount(note).twentyFTE > 0">
                    20FTE Count:{{ getContainerCount(note).twentyFTE }}
                  </span>
                  <span v-if="getContainerCount(note).fortyFTE > 0">
                    {{ getContainerCount(note).fortyFTE }}x40FTE
                  </span>
                  <span v-if="getContainerCount(note).looseCargo > 0">
                    Loose Cargo Count:
                    {{ getContainerCount(note).looseCargo }}
                  </span>
                  <span style="margin-right: 300px">
                    Off Loading Point: {{ note.destination }}
                  </span>
                  <a-checkbox
                    :checked="note.selected"
                    @change="() => toggleNoteSelection(note)"
                  />
                </div>
              </div>

              <div v-if="isCollapsed(index)" class="collapsible-content">
                <p>
                  <strong>Loading Point:</strong> {{ note.pick_up_location }}
                </p>
                <p>
                  <strong>Off Loading Point:</strong> {{ note.destination }}
                </p>
                <p><strong>Date:</strong> {{ note.delivery_date }}</p>

                <a-table
                  :dataSource="note.items"
                  :columns="itemColumns"
                  :pagination="false"
                />
              </div>
            </div>
          </template>

          <div class="ninjadash-modal-actions" style="margin-top: 20px">
            <sdButton
              size="sm"
              type="light"
              key="cancel"
              outlined
              @click.prevent="handleCancelAddDeliveryNote"
            >
              Cancel
            </sdButton>
            <sdButton
              @click="handleSaveDelivery"
              htmlType="submit"
              size="sm"
              type="primary"
            >
              Save
            </sdButton>
          </div>
        </a-form>
      </BasicFormWrapper> -->
    </a-drawer>
      </a-col>

    </a-row>
  </Main>
</template>

<script>
import { DataService } from "@/config/dataService/dataService";
import { defineComponent, reactive, ref, onMounted, computed } from "vue";
import { Main, BorderLessHeading } from "../../../../styled";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

export default defineComponent({
  name: "Invoicecreate",
  components: {
    Main,
    BorderLessHeading,
  },
  setup() {
    const router = useRouter();
    const toast = useToast();
    const drawerWidth = ref("100vw");
    const isLoading = ref(false);
    const clients = ref([]);
    const deliveryNotes = ref([]);
    const isAddDeliveryNote = ref(false);
    const noItemsAvailable = ref(false);
    let currentNumber = ref(1000);
    const searchQuery = ref("");
    const adjustment = ref(false);
    const modalWidth = ref("100vw");

    const collapsedIndexes = ref([]);

    const generateSequentialNumber = () => {
      currentNumber.value += 1;
      return currentNumber.value.toString();
    };

    const formatNumberWithCommas = (value) => {
      const number = Number(value);
      if (isNaN(number)) {
        return value;
      }
      return new Intl.NumberFormat().format(number);
    };

    const form = reactive({
      client_id: "",
      invoice_number: "",
      invoice_date: "",
      total_amount: "",
      adjustment: false,
      status: "",
      due_payment: "",
      payment_status: "",
      item_description: "",
      quantity: "",
      vat: false,
      vat_amount: 0,
      subtotal: 0,
      notes: "",
      due_date: "",
      tax_date: "",
      payment_terms: "",
      lpo_no: "",
      items: [],
      subTotal: 0,
      taxTotal: 0,
      total: 0,
      date: "",
    });

    const fetchClients = async () => {
      try {
        const response = await DataService.get("/clients");
        clients.value = response.data.Clients;
      } catch (error) {
        toast.error("Error fetching clients.");
      }
    };

    const adjustmentChecked = ref(false);

    // Handle checkbox state manually
    const handleAdjustmentChange = (event) => {
      adjustment.value = event.target.checked;
      console.log("Adjustment checkbox value:", adjustment.value);
    };

    const fetchDeliveryNotes = async () => {
      try {
        const response = await DataService.get(
          `/delivery_notes/client/${form.client_id}`
        );

        console.log(
          "Delivery notes coming from backend",
          response.data.Delivery_notes
        );

        if (response.data && Array.isArray(response.data.Delivery_notes)) {
          if (adjustment.value) {
            deliveryNotes.value = response.data.Delivery_notes.map((note) => ({
              ...note,
              selected: false,
            }));
          } else {
            deliveryNotes.value = response.data.Delivery_notes.filter(
              (note) => !note.is_associated_with_invoice
            ).map((note) => ({
              ...note,
              selected: false,
            }));
          }

          noItemsAvailable.value = deliveryNotes.value.length === 0;
        } else {
          deliveryNotes.value = [];
          noItemsAvailable.value = true;
        }
      } catch (error) {
        console.error("Error fetching delivery notes:", error);
        toast.error("Error fetching delivery notes.");
        noItemsAvailable.value = true;
      }
    };

    // const openAddDeliveryNoteModal = () => {
    //   if (!form.client_id) {
    //     toast.error("Please select a client before adding delivery notes.");
    //     return;
    //   }

    //   try {
    //     isAddDeliveryNote.value = true;
    //   } catch (error) {
    //     console.error("Error opening modal:", error);
    //     toast.error("An error occurred while opening the modal.");
    //   }
    // };

    const filteredDeliveryNotes = computed(() => {
      if (searchQuery.value) {
        return deliveryNotes.value.filter(
          (note) =>
            note.delivery_note_number
              .toLowerCase()
              .includes(searchQuery.value.toLowerCase()) ||
            note.destination
              .toLowerCase()
              .includes(searchQuery.value.toLowerCase())
        );
      }
      return deliveryNotes.value.slice(0, 3); // Show the first 3 notes by default
    });

    const fetchLastInvoiceNumber = async () => {
      try {
        const response = await DataService.get("/invoice_last_number");
        if (response.status === 200 && response.data.last_number) {
          currentNumber.value = parseInt(response.data.last_number, 10);
        } else {
          currentNumber.value = 1000;
        }
        form.invoice_number = generateSequentialNumber();
      } catch (error) {
        console.error(
          "Error fetching last invoice number or showing drawer:",
          error.message
        );
      }
    };

    const toggleNoteSelection = (note) => {
      note.selected = !note.selected;
    };

    const handleSaveDelivery = () => {
      const selectedNotes = deliveryNotes.value.filter((note) => note.selected);
      if (selectedNotes.length === 0) {
        toast.error("Please select at least one valid delivery note.");
        return;
      }

      selectedNotes.forEach((note) => {
        note.items.forEach((item) => {
          form.items.push({
            itemDescription: item.itemDescription,
            containerNumber: item.containerNumber,
            truck_registration: item.truck_registration,
            driver_name: item.driver_name,
            deliveryNoteId: note.id,
            deliveryNoteNumber: note.delivery_note_number,
            deliveryNoteFileRef: item.containerRefNo,
            loadingPoint: note.pick_up_location,
            offLoadingPoint: note.destination,
            qty: item.quantity,
            price: 0,
            tax: "16%",
            lineTotal: 0,
          });
        });
      });

      updateSubtotalAndTotal();
      open.value = false;
    };

    const updateSubtotalAndTotal = () => {
      form.subTotal = form.items.reduce(
        (total, item) => total + parseFloat(item.lineTotal || 0),
        0
      );
      form.taxTotal = (form.subTotal * 0.16).toFixed(2);
      form.total = (form.subTotal + parseFloat(form.taxTotal)).toFixed(2);
    };

    const handleCancelAddDeliveryNote = () => {
      open.value = false;
    };

    const handleSubmit = async () => {
      if (!form.client_id || !form.invoice_date) {
        toast.error("Please fill in all required fields.");
        return;
      }

      const formData = {
        lpo_no: form.lpo_no ? String(form.lpo_no) : "",
        invoice_number: form.invoice_number ? String(form.invoice_number) : "",
        client_id: String(form.client_id),
        invoice_date: new Date(form.invoice_date).toISOString().split("T")[0],
        total_amount: String(form.total),
        subtotal: String(form.subTotal),
        vat: form.vat ? "Yes" : "No",
        vat_amount: form.taxTotal ? String(form.taxTotal) : "",
        notes: form.notes ? String(form.notes) : "",
        due_date: form.due_date
          ? new Date(form.due_date).toISOString().split("T")[0]
          : null,
        tax_date: form.tax_date
          ? new Date(form.tax_date).toISOString().split("T")[0]
          : null,
        payment_terms: form.payment_terms ? String(form.payment_terms) : "",
        status: form.status ? String(form.status) : "",
        due_payment: form.due_payment ? String(form.due_payment) : "",
        payment_status: form.payment_status ? String(form.payment_status) : "",
        items: form.items.map((item) => ({
          itemDescription: String(item.itemDescription),
          containerNumber: item.containerNumber
            ? String(item.containerNumber)
            : "",
          deliveryNoteId: item.deliveryNoteId,
          deliveryNoteNumber: item.deliveryNoteNumber,
          deliveryNoteFileRef: item.deliveryNoteFileRef
            ? String(item.deliveryNoteFileRef)
            : "",
          truck_registration: String(item.truck_registration),
          driver_name: String(item.driver_name),
          loadingPoint: String(item.loadingPoint),
          offLoadingPoint: String(item.offLoadingPoint),
          qty: String(item.qty),
          price: String(item.price),
          tax: String(item.tax),
          lineTotal: String(item.lineTotal),
        })),
      };

      try {
        isLoading.value = true;
        const response = await DataService.post("/invoices", formData);

        if (response.status === 201) {
          toast.success("Invoice created successfully");
          resetForm();
          open.value = false;
          router.push({ path: "/app/invoices" });
        } else if (response.status === 400 && response.data.associated_notes) {
          const noteNumbers = response.data.associated_notes
            .map((note) => note.delivery_note_number)
            .join(", ");
          toast.error(
            `The following delivery notes are already associated with another invoice: ${noteNumbers}`
          );
        } else {
          toast.error("Failed to create invoice. Please try again.");
        }
      } catch (error) {
        toast.error("An error occurred. Please try again.");
      } finally {
        isLoading.value = false;
      }
    };

    const resetForm = () => {
      form.client_id = "";
      form.invoice_number = generateSequentialNumber();
      form.invoice_date = "";
      form.total_amount = "";
      form.subtotal = "";
      form.vat_amount = "";
      form.due_payment = "";
      form.due_date = "";
      form.tax_date = "";
      form.item_description = "";
      form.quantity = "";
      form.payment_terms = "";
      form.notes = "";
      form.lpo_no = "";
      form.items = [];
      form.subTotal = 0;
      form.taxTotal = 0;
      form.total = 0;
    };

    onMounted(async () => {
      isLoading.value = true;
      try {
        await fetchLastInvoiceNumber();
        await fetchClients();
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        isLoading.value = false;
      }
    });

    const itemColumns = [
      {
        title: "Item",
        dataIndex: "itemDescription",
        key: "itemDescription",
      },
      {
        title: "Quantity",
        dataIndex: "quantity",
        key: "quantity",
      },
      {
        title: "Container Number",
        dataIndex: "containerNumber",
        key: "containerNumber",
      },
    ];

    const open = ref(false);
    const showDrawer = () => {
      open.value = true;
    };
    const onClose = () => {
      router.push(`/app/invoices`);
    };
    const updateLineTotal = (index) => {
      const item = form.items[index];
      item.lineTotal = (item.price * 1.16).toFixed(2); // Assuming tax is included in line total
      updateSubtotalAndTotal();
    };

    const getContainerCount = (note) => {
      const containerCounts = reactive({
        twentyFT: 0,
        fortyFT: 0,
        twentyFTE: 0,
        fortyFTE: 0,
        looseCargo: 0,
      });

      note.items.forEach((item) => {
        switch (item.itemDescription) {
          case "20FT":
            containerCounts.twentyFT++;
            break;
          case "40FT":
            containerCounts.fortyFT++;
            break;
          case "20FTE":
            containerCounts.twentyFTE++;
            break;
          case "40FTE":
            containerCounts.fortyFTE++;
            break;
          case "Loose Cargo":
            containerCounts.looseCargo++;
            break;
        }
      });

      return containerCounts;
    };

    const isCollapsed = (index) => {
      return collapsedIndexes.value.includes(index);
    };

    const toggleCollapse = (index) => {
      if (collapsedIndexes.value.includes(index)) {
        collapsedIndexes.value = collapsedIndexes.value.filter(
          (i) => i !== index
        );
      } else {
        collapsedIndexes.value.push(index);
      }
    };

    return {
      form,
      open,
      showDrawer,
      onClose,
      handleSubmit,
      isLoading,
      clients,
      itemColumns,
      isAddDeliveryNote,
      updateLineTotal,
      adjustmentChecked,
      handleAdjustmentChange,
      //  openAddDeliveryNoteModal,
      handleSaveDelivery,
      handleCancelAddDeliveryNote,
      filteredDeliveryNotes,
      deliveryNotes,
      toggleNoteSelection,
      updateSubtotalAndTotal,
      noItemsAvailable,
      drawerWidth,
      searchQuery,
      fetchDeliveryNotes,
      getContainerCount,
      formatNumberWithCommas,
      modalWidth,
      isCollapsed,
      toggleCollapse,
    };
  },
});
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
  height: 500px;
}

.table-responsive {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

@media (max-width: 768px) {
  table,
  thead,
  tbody,
  th,
  td,
  tr {
    display: block;
    width: 100%;
  }
  tr {
    margin-bottom: 15px;
  }
  th {
    display: none;
  }
  td {
    display: flex;
    justify-content: space-between;
    border: none;
    border-bottom: 1px solid #eee;
    position: relative;
    padding-left: 50%;
  }
  td:before {
    position: absolute;
    top: 12px;
    left: 6px;
    width: 45%;
    padding-right: 10px;
    white-space: nowrap;
    content: attr(data-label);
    font-weight: bold;
    text-align: left;
  }
}

.setting-form-actions {
  margin-top: 20px;
}

.collapsible-section {
  margin-bottom: 10px;
}
.collapsible-header {
  cursor: pointer;
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 4px;
}
.collapsible-content {
  padding: 10px;
  border-top: 1px solid #ddd;
}
</style>
