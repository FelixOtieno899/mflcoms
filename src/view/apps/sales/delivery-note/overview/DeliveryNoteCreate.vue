<template>
    <Main>
        <a-row :gutter="15">
            <a-col :xs="24">
                <BorderLessHeading>
                    <sdCards title="Create New Delivery Notes">
                        <a-row>
                            <a-col :span="24">
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
                                                <div class="table-responsive">
                                                    <table>
                                                        <tr
                                                            class="invoice-header"
                                                        >
                                                            <td>
                                                                <code
                                                                    style="
                                                                        color: red;
                                                                    "
                                                                    >*</code
                                                                >Select Client:
                                                                <select
                                                                    v-model="
                                                                        note.client_id
                                                                    "
                                                                    @change="
                                                                        handleClientChange(
                                                                            noteIndex,
                                                                        )
                                                                    "
                                                                >
                                                                    <option
                                                                        v-for="client in clients"
                                                                        :key="
                                                                            client.id
                                                                        "
                                                                        :value="
                                                                            client.id
                                                                        "
                                                                    >
                                                                        {{
                                                                            client
                                                                                .user
                                                                                .first_name
                                                                        }}

                                                                        {{
                                                                            client
                                                                                .user
                                                                                .last_name
                                                                        }}
                                                                    </option>
                                                                </select>
                                                            </td>

                                                            <td>
                                                                <code
                                                                    style="
                                                                        color: red;
                                                                    "
                                                                    >*</code
                                                                >Delivery Note#
                                                            </td>
                                                            <td>
                                                                <h4>
                                                                    {{
                                                                        note.delivery_note_number
                                                                    }}
                                                                </h4>
                                                            </td>
                                                            <td>
                                                                <code
                                                                    style="
                                                                        color: red;
                                                                    "
                                                                    >*</code
                                                                >Delivery Date
                                                            </td>
                                                            <td>
                                                                <a-date-picker
                                                                    v-model:value="
                                                                        note.delivery_date
                                                                    "
                                                                    format="YYYY-MM-DD HH:mm:ss"
                                                                    show-time
                                                                    placeholder="Select date and time"
                                                                />
                                                            </td>
                                                        </tr>
                                                        <tr
                                                            class="invoice-header"
                                                        >
                                                            <td colspan="2">
                                                                <a-button
                                                                    type="primary"
                                                                    @click="
                                                                        showModal(
                                                                            noteIndex,
                                                                        )
                                                                    "
                                                                >
                                                                    Bulk Add
                                                                </a-button>
                                                            </td>

                                                            <td>
                                                                <code
                                                                    style="
                                                                        color: red;
                                                                    "
                                                                    >*</code
                                                                >Loading Point
                                                            </td>
                                                            <td>
                                                                <div
                                                                    class="input-wrapper"
                                                                >
                                                                    <input
                                                                        type="text"
                                                                        class="custom-input"
                                                                        v-model="
                                                                            form
                                                                                .delivery_notes[
                                                                                noteIndex
                                                                            ]
                                                                                .pick_up_location
                                                                        "
                                                                        @blur="
                                                                            validateLoadingOffloading(
                                                                                noteIndex,
                                                                            )
                                                                        "
                                                                        @input="
                                                                            form.delivery_notes[
                                                                                noteIndex
                                                                            ].searchTermForLoading =
                                                                                $event.target.value
                                                                        "
                                                                        placeholder="Search Loading Point"
                                                                    />
                                                                    <div
                                                                        v-if="
                                                                            filteredLoadingPoints(
                                                                                noteIndex,
                                                                            )
                                                                                .length
                                                                        "
                                                                        class="search-results-container"
                                                                    >
                                                                        <ul
                                                                            class="search-results"
                                                                        >
                                                                            <li
                                                                                v-for="(
                                                                                    location,
                                                                                    index
                                                                                ) in filteredLoadingPoints(
                                                                                    noteIndex,
                                                                                )"
                                                                                :key="
                                                                                    index
                                                                                "
                                                                                @click="
                                                                                    selectLoadingPoint(
                                                                                        noteIndex,
                                                                                        location,
                                                                                    )
                                                                                "
                                                                            >
                                                                                {{
                                                                                    location.location
                                                                                }}
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <code
                                                                    style="
                                                                        color: red;
                                                                    "
                                                                    >*</code
                                                                >Off Loading
                                                                Point
                                                            </td>
                                                            <td>
                                                                <div
                                                                    class="input-wrapper"
                                                                >
                                                                    <input
                                                                        style="
                                                                            width: 180px;
                                                                        "
                                                                        type="text"
                                                                        class="custom-input"
                                                                        v-model="
                                                                            form
                                                                                .delivery_notes[
                                                                                noteIndex
                                                                            ]
                                                                                .destination
                                                                        "
                                                                        @blur="
                                                                            validateLoadingOffloading(
                                                                                noteIndex,
                                                                            )
                                                                        "
                                                                        @input="
                                                                            form.delivery_notes[
                                                                                noteIndex
                                                                            ].searchTermForOffLoading =
                                                                                $event.target.value
                                                                        "
                                                                        placeholder="Search Off Loading Point"
                                                                    />
                                                                    <div
                                                                        v-if="
                                                                            filteredOffLoadingPoints(
                                                                                noteIndex,
                                                                            )
                                                                                .length
                                                                        "
                                                                        class="search-results-container"
                                                                    >
                                                                        <ul
                                                                            class="search-results"
                                                                        >
                                                                            <li
                                                                                v-for="(
                                                                                    location,
                                                                                    index
                                                                                ) in filteredOffLoadingPoints(
                                                                                    noteIndex,
                                                                                )"
                                                                                :key="
                                                                                    index
                                                                                "
                                                                                @click="
                                                                                    selectOffLoadingPoint(
                                                                                        noteIndex,
                                                                                        location,
                                                                                    )
                                                                                "
                                                                            >
                                                                                {{
                                                                                    location.location
                                                                                }}
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <!-- Items Header -->
                                                        <tr>
                                                            <th>Item</th>
                                                            <th>
                                                                Container Number
                                                            </th>
                                                            <th>Driver</th>
                                                            <th>
                                                                Truck Number
                                                            </th>
                                                            <th>File Ref #</th>
                                                            <th>Qty</th>
                                                            <th>UOM</th>
                                                            <th>Action</th>
                                                        </tr>
                                                        <!-- Search to Add Item -->
                                                        <tr>
                                                            <td>
                                                                <div
                                                                    class="input-wrapper"
                                                                >
                                                                    <input
                                                                        type="text"
                                                                        placeholder="Search to add item"
                                                                        class="custom-input"
                                                                        v-model="
                                                                            searchTerm
                                                                        "
                                                                    />
                                                                    <div
                                                                        v-if="
                                                                            filteredItems.length
                                                                        "
                                                                        class="search-results-container"
                                                                    >
                                                                        <ul
                                                                            class="search-results"
                                                                        >
                                                                            <li
                                                                                v-for="(
                                                                                    filteredItem,
                                                                                    index
                                                                                ) in filteredItems"
                                                                                :key="
                                                                                    index
                                                                                "
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
                                                                </div>
                                                            </td>
                                                            <td
                                                                colspan="6"
                                                            ></td>
                                                        </tr>
                                                        <template
                                                            v-if="
                                                                note.items
                                                                    .length > 0
                                                            "
                                                        >
                                                            <template
                                                                v-for="(
                                                                    item,
                                                                    itemIndex
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
                                                                            @blur="
                                                                                validateContainerNumber(
                                                                                    noteIndex,
                                                                                    itemIndex,
                                                                                )
                                                                            "
                                                                            v-model="
                                                                                item.containerNumber
                                                                            "
                                                                        />
                                                                    </td>
                                                                    <td>
                                                                        <div
                                                                            class="input-wrapper"
                                                                        >
                                                                            <input
                                                                                type="text"
                                                                                class="custom-input"
                                                                                v-model="
                                                                                    item.driver_name
                                                                                "
                                                                                @blur="
                                                                                    validateDriverTruck(
                                                                                        noteIndex,
                                                                                        itemIndex,
                                                                                    )
                                                                                "
                                                                                @input="
                                                                                    item.searchTermForDriver =
                                                                                        $event.target.value
                                                                                "
                                                                                placeholder="Search Driver"
                                                                            />
                                                                            <div
                                                                                v-if="
                                                                                    filteredDrivers(
                                                                                        noteIndex,
                                                                                        itemIndex,
                                                                                    )
                                                                                        .length
                                                                                "
                                                                                class="search-results-container"
                                                                            >
                                                                                <ul
                                                                                    class="search-results"
                                                                                >
                                                                                    <li
                                                                                        v-for="(
                                                                                            driver,
                                                                                            index
                                                                                        ) in filteredDrivers(
                                                                                            noteIndex,
                                                                                            itemIndex,
                                                                                        )"
                                                                                        :key="
                                                                                            index
                                                                                        "
                                                                                        @click="
                                                                                            selectDriver(
                                                                                                noteIndex,
                                                                                                itemIndex,
                                                                                                driver,
                                                                                            )
                                                                                        "
                                                                                    >
                                                                                        {{
                                                                                            driver.first_name
                                                                                        }}
                                                                                        {{
                                                                                            driver.last_name
                                                                                        }}
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div
                                                                            class="input-wrapper"
                                                                        >
                                                                            <input
                                                                                type="text"
                                                                                class="custom-input"
                                                                                v-model="
                                                                                    item.truck_registration
                                                                                "
                                                                                @input="
                                                                                    item.searchTermForTruck =
                                                                                        $event.target.value
                                                                                "
                                                                                placeholder="Search Truck"
                                                                            />
                                                                            <div
                                                                                v-if="
                                                                                    filteredTrucks(
                                                                                        noteIndex,
                                                                                        itemIndex,
                                                                                    )
                                                                                        .length
                                                                                "
                                                                                class="search-results-container"
                                                                            >
                                                                                <ul
                                                                                    class="search-results"
                                                                                >
                                                                                    <li
                                                                                        v-for="(
                                                                                            truck,
                                                                                            index
                                                                                        ) in filteredTrucks(
                                                                                            noteIndex,
                                                                                            itemIndex,
                                                                                        )"
                                                                                        :key="
                                                                                            index
                                                                                        "
                                                                                        @click="
                                                                                            selectTruck(
                                                                                                noteIndex,
                                                                                                itemIndex,
                                                                                                truck,
                                                                                            )
                                                                                        "
                                                                                    >
                                                                                        {{
                                                                                            truck.registration_no
                                                                                        }}
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
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
                                                                    <td>
                                                                        <button
                                                                            @click.prevent="
                                                                                removeLastLineItem(
                                                                                    noteIndex,
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

                                                                                "
                                                                                name="trash"
                                                                            ></unicon>
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            </template>
                                                        </template>
                                                    </table>
                                                </div>
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
                                                <!-- <sdButton
                                                    size="small"
                                                    type="danger"
                                                    @click.prevent="
                                                        removeLastLineItem(
                                                            noteIndex,
                                                        )
                                                    "
                                                    :disabled="
                                                        note.items.length === 0
                                                    "
                                                >
                                                    - Remove Line Item
                                                </sdButton> -->
                                            </div>
                                        </template>

                                        <!-- Add/Remove Delivery Note Buttons -->
                                        <div
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
                                                @click.prevent="
                                                    removeLastDeliveryNote
                                                "
                                                :disabled="
                                                    form.delivery_notes
                                                        .length === 0
                                                "
                                            >
                                                - Remove Delivery Note Item
                                            </sdButton>
                                        </div>

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
                            </a-col>
                        </a-row>

                        <a-modal
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
                        </a-modal>
                    </sdCards>
                </BorderLessHeading>
            </a-col>
        </a-row>
    </Main>
</template>

<script>
import { DataService } from "@/config/dataService/dataService";
import { defineComponent, reactive, ref, onMounted, computed } from "vue";
import { Main } from "../../../../styled";

import { BorderLessHeading } from "../../../../styled";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

export default defineComponent({
    name: "DeliveryNoteCreate",
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
        const open = ref(false);
        const showDeliveryNoteForm = ref(false);
        const placement = ref("left");
        const drivers = ref([]);
        const vehicles = ref([]);
        const items = ref([]);
        const searchTerm = ref("");
        const searchTermForLoading = ref("");
        const searchtermForOffLoading = ref("");
        const isBulkAddModalVisible = ref(false);
        const bulkAddItemDescription = ref(null);
        const bulkAddQuantity = ref(1);
        const noteIndex = ref(null);
        const Locations = ref([]);
        const selectedLoadingPoint = ref("");
        const selectedOffLoadingPoint = ref("");
        let currentNumber = ref(100);

        const generateSequentialNumber = () => {
            currentNumber.value += 1;
            return currentNumber.value.toString();
        };

        const formatDate = (date) => {
            const d = new Date(date);
            const year = d.getFullYear();
            const month = String(d.getMonth() + 1).padStart(2, "0");
            const day = String(d.getDate()).padStart(2, "0");
            const hours = String(d.getHours()).padStart(2, "0");
            const minutes = String(d.getMinutes()).padStart(2, "0");
            const seconds = String(d.getSeconds()).padStart(2, "0");
            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`; // Date and time format
        };

        const fetchAllData = async () => {
            await fetchItems();
            await fetchLocations();
            await Promise.all([
                fetchClients(),
                fetchDrivers(),
                fetchVehicles(),
            ]);
        };

        const fetchLastDeliveryNoteNumber = async () => {
            try {
                const response = await DataService.get("/delivery/last_number");
                if (response.status === 200 && response.data.last_number) {
                    currentNumber.value = parseInt(
                        response.data.last_number,
                        10,
                    );
                } else {
                    currentNumber.value = 100;
                }

                console.log(
                    "Fetched last delivery note number:",
                    currentNumber.value,
                );
                form.delivery_notes.forEach(
                    (note) =>
                        (note.delivery_note_number =
                            generateSequentialNumber()),
                );
                open.value = true;
            } catch (error) {
                console.error(
                    "Error fetching last delivery note number or showing drawer:",
                    error.message,
                );
                return;
            }
        };

        const fetchClients = async () => {
            try {
                const response = await DataService.get("/clients");
                clients.value = response.data.Clients;
            } catch (error) {
                toast.error("Error fetching clients. Please try again.");
            }
        };

        const fetchItems = async () => {
            try {
                const response = await DataService.get(`/delivery-note/items`);
                items.value = response.data.sub_items;

                console.log("Items response", items.value);
            } catch (error) {
                toast.error("Error fetching Items. Please try again.");
            }
        };

        const fetchLocations = async () => {
            try {
                const response = await DataService.get(`/clients-destinations`);
                Locations.value = response.data.Client_destinations;

                console.log("Locations response", Locations.value);
            } catch (error) {
                toast.error("Error fetching Location. Please try again.");
            }
        };

        const fetchDrivers = async () => {
            try {
                const response = await DataService.get(`/drivers`);
                drivers.value = response.data.Drivers;
            } catch (error) {
                console.error("Error fetching drivers:", error);
            }
        };

        const fetchVehicles = async () => {
            try {
                const response = await DataService.get(`/vehicle`);
                vehicles.value = response.data.Vehicles;
            } catch (error) {
                console.error("Error fetching vehicles:", error);
            }
        };

        const handleClientChange = () => {
            console.log("Client selected:", form.client_id);
        };

        const handleFileUpload = (event, fieldName) => {
            const file = event.target.files[0];
            if (file) {
                form[fieldName] = file;
            }
        };

        // const handleSubmit = async () => {
        //     // if (!form.client_id) {
        //     //     toast.error("Please fill in all required fields.");
        //     //     return;
        //     // }

        //     for (const note of form.delivery_notes) {
        //         if (!note.client_id ||
        //             !note.delivery_date ||
        //             !note.pick_up_location ||
        //             !note.destination
        //         ) {
        //             toast.error("Please complete all delivery note details.");
        //             return;
        //         }

        //         for (const item of note.items) {
        //             if (!item.itemDescription || !item.qty || !item.uom) {
        //                 toast.error("Ensure all item details are filled in.");
        //                 return;
        //             }
        //         }
        //     }

        //     const formData = {
        //         client_id: form.client_id,
        //         delivery_notes: form.delivery_notes.map((note) => ({
        //             client_id: note.client_id,
        //             delivery_note_number: note.delivery_note_number,
        //             delivery_date: formatDate(note.delivery_date),
        //             pick_up_location: note.pick_up_location,
        //             destination: note.destination,
        //             items: note.items.map((item) => ({
        //                 itemDescription: item.itemDescription,
        //                 containerNumber: item.containerNumber,
        //                 driver_id: String(item.driver_id),
        //                 truck_id: String(item.truck_id),
        //                 containerRefNo: item.containerRefNo,
        //                 quantity: item.qty,
        //                 uom: item.uom,
        //             })),
        //         })),
        //     };

        //     console.log("Submitting the following data:", formData);

        //     try {
        //         isLoading.value = true;
        //         const response = await DataService.post(
        //             "/delivery_note",
        //             formData,
        //         );
        //         if (response.status === 201) {
        //             toast.success("Delivery Note created successfully");
        //             resetForm();
        //             open.value = false;

        //             router.push("/app/delivery-note");
        //         } else {
        //             toast.error(
        //                 "Failed to create delivery note. Please try again.",
        //             );
        //         }
        //     } catch (error) {
        //         toast.error("An error occurred. Please try again.");
        //     } finally {
        //         isLoading.value = false;
        //     }
        // };

        const handleSubmit = async () => {
            for (const note of form.delivery_notes) {
                if (
                    !note.client_id ||
                    !note.delivery_date ||
                    !note.pick_up_location ||
                    !note.destination
                ) {
                    toast.error("Please complete all delivery note details.");
                    return;
                }

                for (const item of note.items) {
                    if (!item.itemDescription || !item.qty || !item.uom) {
                        toast.error("Ensure all item details are filled in.");
                        return;
                    }
                }
            }

            const formData = {
                delivery_notes: form.delivery_notes.map((note) => ({
                    client_id: note.client_id,
                    delivery_note_number: note.delivery_note_number,
                    delivery_date: formatDate(note.delivery_date),
                    pick_up_location: note.pick_up_location,
                    destination: note.destination,
                    items: note.items.map((item) => ({
                        itemDescription: item.itemDescription,
                        containerNumber: item.containerNumber,
                        truck_registration: item.truck_registration,
                        driver_name: item.driver_name,
                        driver_id: String(item.driver_id),
                        truck_id: String(item.truck_id),
                        containerRefNo: item.containerRefNo,
                        quantity: item.qty,
                        uom: item.uom,
                    })),
                })),
            };

            console.log("Submitting the following data:", formData);

            try {
                isLoading.value = true;
                const response = await DataService.post(
                    "/delivery_note",
                    formData,
                );
                if (response.status === 201) {
                    toast.success("Delivery Note created successfully");
                    resetForm();
                    open.value = false;

                    router.push("/app/delivery-note");
                } else {
                    toast.error(
                        "Failed to create delivery note. Please try again.",
                    );
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
        const resetForm = () => {
            form.client_id = "";

            form.order_date = "";

            form.delivery_notes = [
                {
                    delivery_note_number: generateSequentialNumber(),
                    delivery_date: "",
                    pick_up_location: "",
                    destination: "",
                    items: [
                        {
                            itemDescription: "",
                            containerNumber: "",
                            driver_id: "",
                            driver_name: "",
                            truck_id: "",
                            truck_registration: "",
                            containerRefNo: "",
                            qty: "",
                            uom: "",
                            searchTermForDriver: "",
                            searchTermForTruck: "",
                        },
                    ],
                },
            ];
        };

        const addDeliveryNote = () => {
            form.delivery_notes.push({
                delivery_note_number: generateSequentialNumber(),
                delivery_date: "",
                pick_up_location: "",
                destination: "",
                client_id: "",
                items: [
                    {
                        itemDescription: "",
                        containerNumber: "",
                        driver_id: "",
                        driver_name: "",
                        truck_id: "",
                        truck_registration: "",
                        containerRefNo: "",
                        qty: "1",
                        uom: "CNT",
                        searchTermForDriver: "",
                        searchTermForTruck: "",
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
                driver_name: "",
                truck_id: "",
                truck_registration: "",
                containerRefNo: "",
                qty: "1",
                uom: "CNT",
                searchTermForDriver: "",
                searchTermForTruck: "",
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

        const onClose = () => {
            router.push(`/app/delivery-note`);
        };

        onMounted(async () => {
            isLoading.value = true;
            try {
                await fetchLastDeliveryNoteNumber();
                await fetchAllData();
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                isLoading.value = false;
            }
        });

        const form = reactive({
            order_number: "",
            order_date: "",
            delivery_notes: [
                {
                    delivery_note_number: generateSequentialNumber(),
                    delivery_date: "",
                    pick_up_location: "",
                    destination: "",
                    client_id: "",
                    items: [],
                    searchTermForLoading: "",
                    searchTermForOffLoading: "",
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
                lineItem.uom = item.uom;
                lineItem.qty = item.uom === "KGS" ? "" : "1";
            } else {
                form.delivery_notes[noteIndex].items.push({
                    itemDescription: item.itemDescription,
                    containerNumber: "",
                    driver_id: "",
                    driver_name: "",
                    truck_id: "",
                    truck_registration: "",
                    containerRefNo: "",
                    qty: item.uom === "KGS" ? "" : "1",
                    uom: item.uom,
                    searchTermForDriver: "",
                    searchTermForTruck: "",
                });
            }

            searchTerm.value = "";
        };

        const updateUomAndQuantity = (item) => {
            const matchedItem = items.value.find(
                (i) => i.itemDescription === item.itemDescription,
            );

            if (matchedItem) {
                item.uom = matchedItem.uom;
                item.qty = matchedItem.uom === "KGS" ? "" : "1";
            }
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

            const note = form.delivery_notes[noteIndex.value];
            let insertionIndex = note.items.length;

            for (let i = 0; i < note.items.length; i++) {
                if (note.items[i].itemDescription) {
                    insertionIndex = i + 1;
                }
            }

            const matchedItem = items.value.find(
                (i) => i.itemDescription === bulkAddForm.itemDescription,
            );

            const newItems = [];
            for (let i = 0; i < bulkAddForm.quantity; i++) {
                newItems.push({
                    itemDescription: bulkAddForm.itemDescription,
                    containerNumber: "",
                    driver_id: "",
                    driver_name: "",
                    truck_id: "",
                    truck_registration: "",
                    containerRefNo: "",
                    qty: matchedItem.uom === "KGS" ? "" : "1",
                    uom: matchedItem.uom,
                    searchTermForDriver: "",
                    searchTermForTruck: "",
                });
            }

            note.items.splice(insertionIndex, 0, ...newItems);

            bulkAddForm.itemDescription = "";
            bulkAddForm.quantity = "";

            handleCancelBulkAdd();
        };

        // const filteredLoadingPoints = (noteIndex) => {
        //     const searchTerm =
        //         form.delivery_notes[noteIndex].searchTermForLoading;
        //     if (!searchTerm) return [];
        //     return Locations.value.filter((location) =>
        //         location.location
        //             .toLowerCase()
        //             .includes(searchTerm.toLowerCase()),
        //     );
        // };

        // const filteredOffLoadingPoints = (noteIndex) => {
        //     const searchTerm =
        //         form.delivery_notes[noteIndex].searchTermForOffLoading;
        //     if (!searchTerm) return [];
        //     return Locations.value.filter((location) =>
        //         location.location
        //             .toLowerCase()
        //             .includes(searchTerm.toLowerCase()),
        //     );
        // };

        const filteredLoadingPoints = (noteIndex) => {
            const searchTerm =
                form.delivery_notes[noteIndex].searchTermForLoading;

            // Ensure that Locations is defined and has a value array before filtering
            if (
                !searchTerm ||
                !Locations.value ||
                !Array.isArray(Locations.value) ||
                Locations.value.length === 0
            )
                return [];

            return Locations.value.filter((location) =>
                location.location
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()),
            );
        };

        const filteredOffLoadingPoints = (noteIndex) => {
            const searchTerm =
                form.delivery_notes[noteIndex].searchTermForOffLoading;

            // Ensure that Locations is defined and has a value array before filtering
            if (
                !searchTerm ||
                !Locations.value ||
                !Array.isArray(Locations.value) ||
                Locations.value.length === 0
            )
                return [];

            return Locations.value.filter((location) =>
                location.location
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()),
            );
        };

        const filteredDrivers = (noteIndex, itemIndex) => {
            const searchTerm =
                form.delivery_notes[noteIndex].items[itemIndex]
                    .searchTermForDriver;
            if (
                !searchTerm ||
                !Array.isArray(drivers.value) ||
                drivers.value.length === 0
            )
                return [];

            return drivers.value.filter((driver) =>
                `${driver.first_name} ${driver.last_name}`
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()),
            );
        };

        const filteredTrucks = (noteIndex, itemIndex) => {
            const searchTerm =
                form.delivery_notes[noteIndex].items[itemIndex]
                    .searchTermForTruck;
            if (
                !searchTerm ||
                !Array.isArray(vehicles.value) ||
                vehicles.value.length === 0
            )
                return [];
            return vehicles.value.filter((truck) =>
                truck.registration_no
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()),
            );
        };

        const selectLoadingPoint = (noteIndex, location) => {
            form.delivery_notes[noteIndex].pick_up_location = location.location;
            form.delivery_notes[noteIndex].searchTermForLoading = "";
            validateLoadingOffloading(noteIndex);
        };

        const selectOffLoadingPoint = (noteIndex, location) => {
            form.delivery_notes[noteIndex].destination = location.location;
            form.delivery_notes[noteIndex].searchTermForOffLoading = "";

            validateLoadingOffloading(noteIndex);
        };

        const selectDriver = (noteIndex, itemIndex, driver) => {
            const item = form.delivery_notes[noteIndex].items[itemIndex];
            item.driver_id = driver.id;
            item.driver_name = `${driver.first_name} ${driver.last_name}`;
            item.searchTermForDriver = "";
            validateDriverTruck(noteIndex, itemIndex);
        };

        const selectTruck = (noteIndex, itemIndex, truck) => {
            const item = form.delivery_notes[noteIndex].items[itemIndex];
            item.truck_id = truck.id;
            item.truck_registration = truck.registration_no;
            item.searchTermForTruck = "";
            validateDriverTruck(noteIndex, itemIndex);
        };

        const validateLoadingOffloading = (noteIndex) => {
            const note = form.delivery_notes[noteIndex];

            if (!note.pick_up_location || !note.destination) {
                return;
            }

            if (note.pick_up_location === note.destination) {
                toast.error(
                    "Loading point and offloading point cannot be the same.",
                );
                note.destination = "";
            }
        };

        const validateDriverTruck = (noteIndex, itemIndex) => {
            const note = form.delivery_notes[noteIndex];
            const currentItem = note.items[itemIndex];

            if (!currentItem.driver_id || !currentItem.truck_id) {
                return;
            }

            const isDuplicate = note.items.some((item, index) => {
                return (
                    index !== itemIndex &&
                    item.driver_id === currentItem.driver_id &&
                    item.truck_id === currentItem.truck_id
                );
            });

            if (isDuplicate) {
                toast.error(
                    "The same driver cannot be assigned to the same truck more than once.",
                );

                currentItem.driver_id = "";
                currentItem.truck_id = "";
                currentItem.driver_name = "";
                currentItem.truck_registration = "";
            }
        };

        const validateContainerNumber = (noteIndex, itemIndex) => {
            const note = form.delivery_notes[noteIndex];
            const currentItem = note.items[itemIndex];

            if (!currentItem.containerNumber) {
                return;
            }

            const isDuplicate = note.items.some((item, index) => {
                return (
                    index !== itemIndex &&
                    item.containerNumber === currentItem.containerNumber
                );
            });

            if (isDuplicate) {
                toast.error("The container number cant be the same.");
                currentItem.containerNumber = "";
            }
        };

        const validateContainerRefNo = (noteIndex, itemIndex) => {
            const note = form.delivery_notes[noteIndex];
            const currentItem = note.items[itemIndex];

            if (!currentItem.containerRefNo) {
                return;
            }

            const isDuplicate = note.items.some((item, index) => {
                return (
                    index !== itemIndex &&
                    item.containerRefNo === currentItem.containerRefNo
                );
            });

            if (isDuplicate) {
                toast.error("The container reference number cant be the same.");
                currentItem.containerNumber = "";
            }
        };

        return {
            form,
            open,

            onClose,
            handleSubmit,
            isLoading,
            handleFileUpload,
            clients,
            handleClientChange,
            addLineItem,
            removeLastLineItem,
            showDeliveryNoteForm,
            addDeliveryNote,
            removeLastDeliveryNote,
            placement,

            drivers,
            vehicles,
            selectItem,
            filteredItems,
            searchTerm,

            isBulkAddModalVisible,
            bulkAddItemDescription,
            bulkAddQuantity,
            itemOptions,
            showModal,
            handleSaveBulkAddItems,
            handleCancelBulkAdd,
            bulkAddForm,
            updateUomAndQuantity,
            drawerWidth,
            searchTermForLoading,
            searchtermForOffLoading,
            filteredLoadingPoints,
            filteredOffLoadingPoints,
            selectLoadingPoint,
            selectOffLoadingPoint,
            filteredDrivers,
            filteredTrucks,
            selectDriver,
            selectTruck,
            selectedLoadingPoint,
            selectedOffLoadingPoint,
            validateDriverTruck,
            validateLoadingOffloading,
            validateContainerNumber,
            validateContainerRefNo,
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

.table-responsive {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
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

.search-results li:hover {
    background-color: #f0f0f0;
}

input:focus {
    outline: none;
}

@media (max-width: 768px) {
    .ant-drawer-content-wrapper {
        width: 100% !important;
    }
}

@media (min-width: 768px) and (max-width: 1200px) {
    .ant-drawer-content-wrapper {
        width: 80% !important;
    }
}

@media (min-width: 1200px) {
    .ant-drawer-content-wrapper {
        width: 70% !important;
    }
}

.input-wrapper {
    position: relative;
    display: inline-block; /* Ensure the input-wrapper takes only as much space as needed */
    width: 100%; /* This ensures the wrapper is the same width as the input field */
}

.search-results-container {
    position: absolute;
    z-index: 1000;
    background-color: white;
    width: 100%;
    max-height: 150px;
    overflow-y: auto;
    border: 1px solid #ccc;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    margin-top: 2px; /* A little space between input and dropdown */
}

.search-results {
    list-style: none;
    padding: 0;
    margin: 0;
}

.search-results li {
    padding: 8px;
    cursor: pointer;
}

.search-results li:hover {
    background-color: #f0f0f0;
}
</style>
