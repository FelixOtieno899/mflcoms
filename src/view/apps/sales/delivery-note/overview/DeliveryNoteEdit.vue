<template>
    <Main>
        <a-row style="height: 700px; margin-top: 50px">
            <a-col :xs="24">
                <BorderLessHeading>
                    <sdCards title="Edit Delivery Note">
                        <template v-if="isLoading">
                            <a-space class="loading">
                                <a-spin size="large" />
                            </a-space>
                        </template>

                        <template v-else>
                            <form :model="form" layout="vertical">
                                <template
                                    v-for="(
                                        note, noteIndex
                                    ) in form.delivery_notes"
                                    :key="noteIndex"
                                >
                                    <div class="delivery-note-section">
                                        <table>
                                            <tr class="invoice-header">
                                                <td>
                                                    <code style="color: red"
                                                        >*</code
                                                    > Client: <span style="font-weight: bold">{{form.client_name}}</span>
                                                </td>

                                                <td>
                                                    <code style="color: red"
                                                        >*</code
                                                    >Delivery Note#
                                                </td>
                                                <td>
                                                    <span style="font-weight: bold"> 
                                                        {{
                                                            note.delivery_note_number
                                                        }}
                                                        </span>
                                                    
                                                </td>
                                                <td>
                                                    <code style="color: red"
                                                        >*</code
                                                    >Delivery Date
                                                </td>
                                                <td><span style="font-weight: bold"> {{ note.delivery_date }}</span>
                                                   
                                                    <!-- <a-date-picker
                                                        v-model:value="
                                                            note.delivery_date
                                                        "
                                                        format="YYYY-MM-DD"
                                                    /> -->
                                                </td>
                                            </tr>
                                            <tr class="invoice-header">
                                                <td colspan="2">
                                                    <a-button
                                                        type="primary"
                                                        @click="
                                                            showModal(noteIndex)
                                                        "
                                                    >
                                                        Bulk Add
                                                    </a-button>
                                                </td>
                                                <td>
                                                    <code style="color: red"
                                                        >*</code
                                                    >Loading Point
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        class="custom-input"
                                                        v-model="
                                                            note.pick_up_location
                                                        "
                                                    />
                                                </td>
                                                <td>
                                                    <code style="color: red"
                                                        >*</code
                                                    >Off Loading Point
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        class="custom-input"
                                                        v-model="
                                                            note.destination
                                                        "
                                                    />
                                                </td>
                                            </tr>
                                            <!-- Items Header -->
                                            <tr>
                                                <th>Item</th>
                                                <th>Container Number</th>
                                                <th>Driver</th>
                                                <th>Truck Number</th>
                                                <th>File Ref #</th>
                                                <th>Qty</th>
                                                <th>UOM</th>
                                            </tr>
                                            <!-- Search to Add Item -->
                                            <tr>
                                                <td>
                                                    <input
                                                        type="text"
                                                        placeholder="Search to add item"
                                                        class="custom-input"
                                                        v-model="searchTerm"
                                                    />
                                                    <div
                                                        v-if="
                                                            filteredItems.length
                                                        "
                                                    >
                                                        <ul
                                                            class="search-results"
                                                        >
                                                            <li
                                                                v-for="(
                                                                    filteredItem,
                                                                    index
                                                                ) in filteredItems"
                                                                :key="index"
                                                                @click="
                                                                    selectItem(
                                                                        noteIndex,
                                                                        filteredItem,
                                                                    )
                                                                "
                                                            >
                                                                {{
                                                                    filteredItem.itemDescription
                                                                }}
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </td>
                                                <td colspan="6"></td>
                                            </tr>
                                            <template
                                                v-if="note.items.length > 0"
                                            >
                                                <template
                                                    v-for="(
                                                        item, itemIndex
                                                    ) in note.items"
                                                    :key="itemIndex"
                                                >
                                                    <!-- Loop through each item in the delivery note -->

                                                    <tr>
                                                        <td>
                                                            <input
                                                                class="custom-input"
                                                                type="text"
                                                                v-model="
                                                                    item.itemDescription
                                                                "
                                                                @input="
                                                                    updateUomAndQuantity(
                                                                        item,
                                                                    )
                                                                "
                                                            />
                                                        </td>
                                                        <td>
                                                            <input
                                                                class="custom-input"
                                                                type="text"
                                                                v-model="
                                                                    item.containerNumber
                                                                "
                                                            />
                                                        </td>
                                                        <td>
                                                            <select
                                                                style="
                                                                    width: 120px;
                                                                "
                                                                class="custom-input"
                                                                v-model="
                                                                    item.driver_id
                                                                "
                                                            >
                                                                <option
                                                                    value=""
                                                                ></option>

                                                                <option
                                                                    v-for="driver in drivers"
                                                                    :value="
                                                                        driver.id
                                                                    "
                                                                    :key="
                                                                        driver.id
                                                                    "
                                                                >
                                                                    {{
                                                                        driver.first_name
                                                                    }}
                                                                    {{
                                                                        driver.last_name
                                                                    }}
                                                                </option>
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <select
                                                                style="
                                                                    width: 100px;
                                                                "
                                                                class="custom-input"
                                                                v-model="
                                                                    item.truck_id
                                                                "
                                                            >
                                                                <option
                                                                    value=""
                                                                ></option>

                                                                <option
                                                                    v-for="truck in trucks"
                                                                    :value="
                                                                        truck.id
                                                                    "
                                                                    :key="
                                                                        truck.id
                                                                    "
                                                                >
                                                                    {{
                                                                        truck.registration_no
                                                                    }}
                                                                </option>
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <input
                                                                class="custom-input"
                                                                type="text"
                                                                v-model="
                                                                    item.containerRefNo
                                                                "
                                                            />
                                                        </td>
                                                        <td>
                                                            <input
                                                                class="custom-input"
                                                                type="text"
                                                                v-model="
                                                                    item.qty
                                                                "
                                                                :readonly="
                                                                    item.itemDescription !==
                                                                    'Loose Cargo'
                                                                "
                                                            />
                                                        </td>
                                                        <td>
                                                            <input
                                                                class="custom-input"
                                                                type="text"
                                                                v-model="
                                                                    item.uom
                                                                "
                                                                :readonly="
                                                                    item.itemDescription !==
                                                                    'Loose Cargo'
                                                                "
                                                            />
                                                        </td>
                                                    </tr>
                                                </template>
                                            </template>
                                        </table>
                                    </div>
                                    <div>
                                        <p v-if="totalContainers > 0">Total Containers: {{totalContainers}}</p>
                                        <p v-if="totalLooseCargo > 0">Total of Loose Cargo: {{totalLooseCargo}}</p>
                                    </div>


                                    <!-- Add/Remove Line Item Buttons -->
                                    <div
                                        style="
                                            margin-top: 15px;
                                            display: flex;
                                            justify-content: space-between;
                                        "
                                    >
                                        <sdButton
                                            size="small"
                                            type="primary"
                                            @click.prevent="
                                                addLineItem(noteIndex)
                                            "
                                        >
                                            + Add Line Item
                                        </sdButton>
                                        <sdButton
                                            size="small"
                                            type="danger"
                                            @click.prevent="
                                                removeLastLineItem(noteIndex)
                                            "
                                            :disabled="note.items.length === 0"
                                        >
                                            - Remove Line Item
                                        </sdButton>
                                    </div>
                                </template>

                                <!-- Add/Remove Delivery Note Buttons -->
                                <!-- <div
                                    style="
                                        margin-top: 20px;
                                        display: flex;
                                        justify-content: space-between;
                                    "
                                >
                                    <sdButton
                                        type="primary"
                                        @click.prevent="addDeliveryNote"
                                    >
                                        + Add Delivery Note Item
                                    </sdButton>

                                    <sdButton
                                        type="danger"
                                        @click.prevent="removeLastDeliveryNote"
                                        :disabled="
                                            form.delivery_notes.length === 0
                                        "
                                    >
                                        - Remove Delivery Note Item
                                    </sdButton>
                                </div> -->

                                <!-- Save/Cancel Buttons -->
                                <div
                                    style="margin-top: 40px"
                                    class="setting-form-actions"
                                >
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
                                        type="light"
                                        @click.prevent="onClose"
                                    >
                                        Cancel
                                    </sdButton>
                                </div>
                            </form>
                        </template>
                    </sdCards>
                </BorderLessHeading>
            </a-col>

            
            <sdModal
            title="Bulk Add Items"
            class="ninjadash_addTask-modal"
            :type="modalType"
            :visible="isBulkAddModalVisible"
            :footer="null"
            :onCancel="handleCancelBulkAdd"
          >
            <BasicFormWrapper>
                <a-form :model="bulkAddForm" layout="vertical">
                    <a-form-item label="Item Description">
                        <a-select
                            v-model:value="
                                bulkAddForm.itemDescription
                            "
                            placeholder="Select or enter an item"
                            allow-clear
                            :options="itemOptions"
                            show-search
                            filter-option
                        />
                    </a-form-item>

                    <a-form-item label="Quantity of Lines">
                        <a-input-number
                            style="width: 200px"
                            v-model:value="bulkAddForm.quantity"
                            min="1"
                            placeholder="Enter number of lines"
                        />
                    </a-form-item>

                    <div class="ninjadash-modal-actions">
                        <sdButton
                            size="sm"
                            type="light"
                            key="cancel"
                            outlined
                            @click.prevent="handleCancelBulkAdd"
                        >
                            Cancel
                        </sdButton>
                        <sdButton
                            @click="handleSaveBulkAddItems"
                            htmlType="submit"
                            size="sm"
                            type="primary"
                        >
                            Save
                        </sdButton>
                    </div>
                </a-form>
            </BasicFormWrapper>
        </sdModal>

        </a-row>
    </Main>
</template>

<script>
import { DataService } from "@/config/dataService/dataService";
import { BorderLessHeading } from "../../../../styled";
import { defineComponent, ref, reactive, onMounted, computed } from "vue";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";

export default defineComponent({
    name: "DeliveryNoteEdit",
    components: { BorderLessHeading },
    props: ["id"], // Accept the id prop

    setup(props) {
        const router = useRouter();
        const toast = useToast();
        const isLoading = ref(false);
        const drivers = ref([]);
        const trucks = ref([]);
        const searchTerm = ref("");
        const isBulkAddModalVisible = ref(false);
        const bulkAddItemDescription = ref(null);
        const bulkAddQuantity = ref(1);
        const noteIndex = ref(null);
        const items = ref([]);

        const formatDate = (date) => {
            const d = new Date(date);
            const year = d.getFullYear();
            const month = String(d.getMonth() + 1).padStart(2, "0");
            const day = String(d.getDate()).padStart(2, "0");
            return `${year}-${month}-${day}`;
        };

        const formState = reactive({
            client_name: "",
            delivery_date: "",
            delivery_number: "",
            status: "",
            location_from: "",
            location_to: "",
            deliveryNotes: [],
        });

        const lineItems = ref([]);

        const fetchDriversAndTrucks = async () => {
            try {
                const [driversResponse, trucksResponse] = await Promise.all([
                    DataService.get("/drivers"),
                    DataService.get("/vehicle"),
                ]);

                drivers.value = driversResponse.data.Drivers || [];
                trucks.value = trucksResponse.data.Vehicles || [];

                console.log("Drivers:", drivers.value);
                console.log("Trucks:", trucks.value);
            } catch (error) {
                console.error("Error fetching drivers and trucks:", error);
                if (error.response) {
                    console.error("Error response:", error.response);
                }
            }
        };

        const fetchDeliveryNoteDetails = async (deliveryNoteId) => {
            try {
                const response = await DataService.get(
                    `/delivery_note/${deliveryNoteId}`,
                );
                const deliveryNoteDetails = response.data.Delivery_note;

                console.log("Delivery note fetched", deliveryNoteDetails);

                // Populate form with the fetched data
                form.client_id = deliveryNoteDetails.client_id;
                form.client_name = deliveryNoteDetails.client.user.first_name+ " " +deliveryNoteDetails.client.user.last_name;

                form.delivery_notes = [
                    {
                        delivery_note_number:
                            deliveryNoteDetails.delivery_note_number,
                        delivery_date: deliveryNoteDetails.delivery_date,
                        pick_up_location: deliveryNoteDetails.pick_up_location,
                        destination: deliveryNoteDetails.destination,
                        items: deliveryNoteDetails.items.map((item) => ({
                            id: item.id,
                            itemDescription: item.itemDescription,
                            containerNumber: item.containerNumber,
                            driver_id: item.driver_id,
                            truck_id: item.truck_id,
                            containerRefNo: item.containerRefNo,
                            qty: item.quantity, // Use 'quantity' from your API
                            uom: item.uom,
                        })),
                    },
                ];
            } catch (error) {
                console.error("Error fetching delivery note details:", error);
                toast.error(
                    "An error occurred while fetching the delivery note details.",
                );
            }
        };

        const updateDeliveryNoteDetails = async (
            deliveryNoteId,
            updatedDetails,
        ) => {
            try {
                const response = await DataService.put(
                    `/delivery_note/${deliveryNoteId}`,
                    updatedDetails,
                );
                console.log(
                    "Delivery Note updated successfully:",
                    response.data,
                );
                toast.success("Delivery note updated successfully!");
            } catch (error) {
                console.error("Error updating delivery note:", error);
                toast.error(
                    "Failed to update delivery note. Please try again.",
                );
            }
        };

        const fetchItems = async () => {
            try {
                const response = await DataService.get(`/delivery-note/items`);
                items.value = response.data.Items;

                console.log("Items response", items.value);
            } catch (error) {
                toast.error("Error fetching Items. Please try again.");
            }
        };


       
        onMounted(async () => {
            await fetchDriversAndTrucks();
            await fetchItems();
            await fetchDeliveryNoteDetails(props.id);
        });

        const handleSubmit = async () => {
            try {
                isLoading.value = true;

                const updatedDetails = {
                    client_id: form.client_id,
                    order_number: form.order_number,
                    order_date: form.order_date,
                    delivery_notes: form.delivery_notes.map((note) => ({
                        delivery_note_number: note.delivery_note_number,
                        delivery_date: note.delivery_date,
                        pick_up_location: note.pick_up_location,
                        destination: note.destination,
                        items: note.items.map((item) => ({
                            id: item.id,
                            itemDescription: item.itemDescription,
                            containerNumber: item.containerNumber,
                            driver_id: item.driver_id,
                            truck_id: item.truck_id,
                            containerRefNo: item.containerRefNo,
                            quantity: item.qty,
                            uom: item.uom,
                        })),
                    })),
                };

                await updateDeliveryNoteDetails(props.id, updatedDetails);
                router.push(`/app/delivery-note`);
            } catch (error) {
                console.error("Error updating Delivery Note:", error);
                toast.error("Error updating Delivery Note");
            } finally {
                isLoading.value = false;
            }
        };

        const onClose = () => {
            router.push(`/app/delivery-note`);
        };
        const generateRandNumber = () => {
            return Math.floor(100000 + Math.random() * 900000).toString();
        };

        const addDeliveryNote = () => {
            form.delivery_notes.push({
                delivery_note_number: generateRandNumber(),
                delivery_date: "",
                pick_up_location: "",
                destination: "",
                items: [
                    {
                        itemDescription: "",
                        containerNumber: "",
                        driver_id: "",
                        truck_id: "",
                        containerRefNo: "",
                        qty: "1",
                        uom: "CNT",
                    },
                ],
            });
        };

        const removeLastDeliveryNote = () => {
            if (form.delivery_notes.length > 0) {
                form.delivery_notes.pop();
            } else {
                toast.warning("Cannot remove the last delivery note.");
            }
        };

        const addLineItem = (noteIndex) => {
            form.delivery_notes[noteIndex].items.push({
                itemDescription: "",
                containerNumber: "",
                driver_id: "",
                truck_id: "",
                containerRefNo: "",
                qty: "1",
                uom: "CNT",
            });
        };

        const removeLastLineItem = (noteIndex) => {
            const items = form.delivery_notes[noteIndex].items;
            if (items.length > 0) {
                items.pop();
            } else {
                toast.warning("Cannot remove the last item.");
            }
        };

        const form = reactive({
            client_id: "",
            client_name: "",
            order_date: "",
            delivery_notes: [
                {
                    delivery_note_number: generateRandNumber(),
                    delivery_date: "",
                    items: [],
                },
            ],
        });

        const filteredItems = computed(() => {
            if (!searchTerm.value) return [];
            return items.value.filter((item) =>
                item.itemDescription
                    .toLowerCase()
                    .includes(searchTerm.value.toLowerCase()),
            );
        });

        const selectItem = (noteIndex, item) => {
            const lineItem = form.delivery_notes[noteIndex].items.find(
                (line) => !line.itemDescription,
            );

            if (lineItem) {
                lineItem.itemDescription = item.itemDescription;
            } else {
                form.delivery_notes[noteIndex].items.push({
                    itemDescription: item.itemDescription,
                    containerNumber: "",
                    driver_id: "",
                    truck_id: "",
                    containerRefNo: "",
                    qty: "1",
                    uom: "CNT",
                });
            }

            searchTerm.value = "";
        };

        const itemOptions = computed(() =>
            items.value.map((item) => ({
                value: item.itemDescription,
                label: item.itemDescription,
            })),
        );

        const showModal = (index) => {
            noteIndex.value = index;
            isBulkAddModalVisible.value = true;
        };

        const handleCancelBulkAdd = () => {
            isBulkAddModalVisible.value = false;
            bulkAddItemDescription.value = null;
            bulkAddQuantity.value = 1;
        };

        const bulkAddForm = reactive({
            itemDescription: "",
            quantity: "",
        });

        const handleSaveBulkAddItems = () => {
            if (!bulkAddForm.itemDescription || bulkAddForm.quantity <= 0) {
                toast.error(
                    "Item description or quantity is missing or invalid.",
                );
                return;
            }

            // Find the current note
            const note = form.delivery_notes[noteIndex.value];

            // Determine the position to insert new items
            let insertionIndex = note.items.length; // Default to adding at the end

            // Check for the last item with an itemDescription
            for (let i = 0; i < note.items.length; i++) {
                if (note.items[i].itemDescription) {
                    insertionIndex = i + 1; // Set insertion point just below the last filled item
                }
            }

            // Prepare the new items
            const newItems = [];
            for (let i = 0; i < bulkAddForm.quantity; i++) {
                newItems.push({
                    itemDescription: bulkAddForm.itemDescription,
                    containerNumber: "",
                    driver_id: "",
                    truck_id: "",
                    containerRefNo: "",
                    qty: "1",
                    uom: "CNT",
                });
            }

            // Insert the new items at the determined position
            note.items.splice(insertionIndex, 0, ...newItems);

            bulkAddForm.itemDescription = "";
            bulkAddForm.quantity = "";

            handleCancelBulkAdd();
        };

        const updateUomAndQuantity = (item) => {
            if (item.itemDescription === "Loose Cargo") {
                item.uom = "KGS";
                item.qty = "";
            } else {
                item.uom = "CNT";
                item.qty = "1";
            }
        };

        const totalContainers = computed(() => {
            return form.delivery_notes.reduce((total, note) => {
                return (
                    total +
                    note.items.filter((item) =>
                        ["20ft Container", "40ft Container"].includes(
                            item.itemDescription,
                        ),
                    ).length
                );
            }, 0);
        });

        const totalLooseCargo = computed(() => {
            return form.delivery_notes.reduce((total, note) => {
                return (
                    total +
                    note.items.filter(
                        (item) => item.itemDescription === "Loose Cargo",
                    ).length
                );
            }, 0);
        });

        return {
            formState,
            handleSubmit,
            isLoading,
            lineItems,
            addLineItem,
            removeLastLineItem,
            onClose,
            formatDate,
            addDeliveryNote,
            removeLastDeliveryNote,
            filteredItems,
            selectItem,
            items,
            showModal,
            handleCancelBulkAdd,
            handleSaveBulkAddItems,

            itemOptions,
            form,


            searchTerm,

            isBulkAddModalVisible,
            bulkAddItemDescription,
            bulkAddQuantity,

            bulkAddForm,
            updateUomAndQuantity,
            drivers,
            trucks,
            totalContainers,
            totalLooseCargo
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
.delivery-note-section {
    margin-top: 40px;
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

.invoice-header td {
    padding: 10px;
}
.table-actions button {
    margin: 0 5px;
}

.custom-input {
    border-width: 0.5px; /* Adjust the thickness here */
    border-style: solid; /* Make sure the border is solid */
    border-color: #000;
    border-radius: 5px;
}

.search-results {
    border: 1px solid #ccc;
    max-height: 100px;
    overflow-y: auto;
    background-color: white;
    position: relative;
    width: 100%;
    margin-top: 20px;
    z-index: 1000;
}

.search-results li {
    padding: 8px;
    cursor: pointer;
}

.search-results li:hover {
    background-color: #f0f0f0;
}

input:focus {
    outline: none;
}
</style>
