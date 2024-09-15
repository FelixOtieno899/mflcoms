<template>
    <Main>
        <a-row :gutter="15">
            <a-col :xs="24">
                <BorderLessHeading>
                    <sdCards title="">
                        <a-row>
                            <a-col :span="24">
                                <template v-if="isLoading">
                                    <a-space class="loading">
                                        <a-spin size="large" />
                                    </a-space>
                                </template>
                                <template v-else>
                                    <WizardWrapper style="margin-top: 50px">
                                        <WizardThree>
                                            <Steps
                                                isSwitch
                                                :current="current"
                                                :status="status"
                                                :steps="steps"
                                                @onNext="next"
                                                @onPrev="prev"
                                                @onDone="handleSubmit"
                                                :isFinished="isFinished"
                                            >
                                                <template #step_one>
                                                    <BasicFormWrapper>
                                                        <div>
                                                            <a-row
                                                                :gutter="12"
                                                                justify="left"
                                                            >
                                                                <!-- Order Number Selection -->
                                                                <a-col
                                                                    :sm="10"
                                                                    :xs="10"
                                                                >
                                                                    <a-form-item
                                                                        label="Order Number"
                                                                        name="order_number"
                                                                        :rules="[
                                                                            {
                                                                                required: true,
                                                                                message:
                                                                                    'Select Order Number',
                                                                            },
                                                                        ]"
                                                                    >
                                                                        <select
                                                                            v-model="
                                                                                formState4.order_number
                                                                            "
                                                                            class="custom-select"
                                                                            @change="
                                                                                handleOrderChange
                                                                            "
                                                                        >
                                                                            <option
                                                                                value=""
                                                                            >
                                                                                Select
                                                                                Order
                                                                                Number
                                                                            </option>
                                                                            <option
                                                                                v-for="order in orders"
                                                                                :key="
                                                                                    order.id
                                                                                "
                                                                                :value="
                                                                                    order.order_number
                                                                                "
                                                                            >
                                                                                {{
                                                                                    order.order_number
                                                                                }}
                                                                            </option>
                                                                        </select>
                                                                    </a-form-item>
                                                                </a-col>

                                                                <!-- Client Name (Auto-filled) -->
                                                                <a-col
                                                                    :sm="10"
                                                                    :xs="10"
                                                                >
                                                                    <a-form-item
                                                                        label="Client Name"
                                                                        name="client_name"
                                                                    >
                                                                        <a-input
                                                                            v-model:value="
                                                                                selectedOrder.client_name
                                                                            "
                                                                            disabled
                                                                        />
                                                                    </a-form-item>
                                                                </a-col>

                                                                <!-- Client Email (Auto-filled) -->
                                                                <a-col
                                                                    :sm="10"
                                                                    :xs="10"
                                                                >
                                                                    <a-form-item
                                                                        label="Client Email"
                                                                        name="client_email"
                                                                    >
                                                                        <a-input
                                                                            v-model:value="
                                                                                selectedOrder.client_email
                                                                            "
                                                                            disabled
                                                                        />
                                                                    </a-form-item>
                                                                </a-col>

                                                                <!-- Trip Name -->
                                                                <a-col
                                                                    :sm="10"
                                                                    :xs="10"
                                                                >
                                                                    <a-form-item
                                                                        label="Trip Name"
                                                                        name="name"
                                                                    >
                                                                        <a-input
                                                                            v-model:value="
                                                                                form.name
                                                                            "
                                                                            placeholder="Enter Trip Name"
                                                                        />
                                                                    </a-form-item>
                                                                </a-col>

                                                                <!-- Delivery Notes Display -->
                                                                <a-col
                                                                    :sm="22"
                                                                    :xs="24"
                                                                >
                                                                    <div
                                                                        v-if="
                                                                            selectedOrder.delivery_notes &&
                                                                            selectedOrder
                                                                                .delivery_notes
                                                                                .length
                                                                        "
                                                                    >
                                                                        <h3>
                                                                            Delivery
                                                                            Notes
                                                                        </h3>
                                                                        <div
                                                                            class="delivery-notes-container"
                                                                        >
                                                                            <template
                                                                                v-for="(
                                                                                    note,
                                                                                    index
                                                                                ) in selectedOrder.delivery_notes"
                                                                                :key="
                                                                                    note.id
                                                                                "
                                                                            >
                                                                                <div
                                                                                    class="delivery-note-column"
                                                                                    :class="{
                                                                                        'new-row':
                                                                                            index %
                                                                                                3 ===
                                                                                                0 &&
                                                                                            index !==
                                                                                                0,
                                                                                    }"
                                                                                >
                                                                                    <h4
                                                                                        style="
                                                                                            text-decoration: underline;
                                                                                        "
                                                                                    >
                                                                                        Delivery
                                                                                        Note:
                                                                                        {{
                                                                                            note.delivery_note_number
                                                                                        }}
                                                                                    </h4>
                                                                                    <p
                                                                                        style="
                                                                                            color: black;
                                                                                        "
                                                                                    >
                                                                                        Delivery
                                                                                        Date:
                                                                                        {{
                                                                                            note.delivery_date
                                                                                        }}
                                                                                    </p>
                                                                                    <ul>
                                                                                        <li
                                                                                            v-for="item in note.items"
                                                                                            :key="
                                                                                                item.id
                                                                                            "
                                                                                        >
                                                                                            <div
                                                                                                style="
                                                                                                    color: black;
                                                                                                "
                                                                                            >
                                                                                                <span
                                                                                                    style="
                                                                                                        font-weight: bolder;
                                                                                                    "
                                                                                                    >Item
                                                                                                    Description:</span
                                                                                                >
                                                                                                {{
                                                                                                    item.itemDescription
                                                                                                }}
                                                                                            </div>
                                                                                            <div
                                                                                                style="
                                                                                                    color: black;
                                                                                                "
                                                                                            >
                                                                                                <span
                                                                                                    style="
                                                                                                        font-weight: bolder;
                                                                                                    "
                                                                                                    >Cargo
                                                                                                    Type:</span
                                                                                                >
                                                                                                {{
                                                                                                    item.cargo_type
                                                                                                }}
                                                                                            </div>
                                                                                            <div
                                                                                                style="
                                                                                                    color: black;
                                                                                                "
                                                                                            >
                                                                                                <span
                                                                                                    style="
                                                                                                        font-weight: bolder;
                                                                                                    "
                                                                                                    >Quantity:</span
                                                                                                >
                                                                                                {{
                                                                                                    item.quantity
                                                                                                }}
                                                                                            </div>
                                                                                            <div
                                                                                                style="
                                                                                                    color: black;
                                                                                                "
                                                                                            >
                                                                                                <span
                                                                                                    style="
                                                                                                        font-weight: bolder;
                                                                                                    "
                                                                                                    >Pickup
                                                                                                    Location:</span
                                                                                                >
                                                                                                {{
                                                                                                    item.pick_up_location
                                                                                                }}
                                                                                            </div>
                                                                                            <div
                                                                                                style="
                                                                                                    color: black;
                                                                                                "
                                                                                            >
                                                                                                <span
                                                                                                    style="
                                                                                                        font-weight: bolder;
                                                                                                    "
                                                                                                    >Destination:</span
                                                                                                >
                                                                                                {{
                                                                                                    item.destination
                                                                                                }}
                                                                                            </div>
                                                                                        </li>
                                                                                    </ul>
                                                                                </div>
                                                                            </template>
                                                                        </div>
                                                                    </div>
                                                                </a-col>
                                                            </a-row>
                                                        </div>
                                                    </BasicFormWrapper>
                                                </template>
                                                <template #step_two>
                                                    <div
                                                        class="order-details-container"
                                                    >
                                                        <!-- Order Details Button -->
                                                        <div
                                                            class="order-details-button"
                                                        >
                                                            <sdButton
                                                                class="btn-order-details"
                                                                transparented
                                                                type="primary"
                                                                size="lg"
                                                            >
                                                                Order Details
                                                            </sdButton>
                                                        </div>

                                                        <!-- Order Items List -->
                                                        <a-row
                                                            class="order-items-row"
                                                            :gutter="24"
                                                        >
                                                            <a-col
                                                                :sm="24"
                                                                :xs="24"
                                                                :lg="24"
                                                            >
                                                                <a-card
                                                                    class="order-items-card"
                                                                >
                                                                    <div
                                                                        class="order-items-content"
                                                                    >
                                                                        <!-- Loop through delivery notes -->
                                                                        <template
                                                                            v-for="(
                                                                                note,
                                                                                noteIndex
                                                                            ) in selectedOrder.delivery_notes"
                                                                            :key="
                                                                                noteIndex
                                                                            "
                                                                        >
                                                                            <!-- Display Delivery Note Details -->
                                                                            <div
                                                                                class="delivery-note-details"
                                                                            >
                                                                                <h4>
                                                                                    Delivery
                                                                                    Note
                                                                                    #{{
                                                                                        note.delivery_note_number
                                                                                    }}
                                                                                </h4>
                                                                                <p>
                                                                                    Delivery
                                                                                    Date:
                                                                                    {{
                                                                                        note.delivery_date
                                                                                    }}
                                                                                </p>
                                                                            </div>

                                                                            <!-- Loop through each item in the delivery note -->
                                                                            <ul
                                                                                class="order-items-list"
                                                                            >
                                                                                <li
                                                                                    v-for="(
                                                                                        item,
                                                                                        itemIndex
                                                                                    ) in note.items"
                                                                                    :key="
                                                                                        item.id
                                                                                    "
                                                                                    class="order-item"
                                                                                >
                                                                                    <!-- Item Description -->
                                                                                    <div
                                                                                        class="item-description"
                                                                                    >
                                                                                        <strong
                                                                                            >Description:</strong
                                                                                        >
                                                                                        {{
                                                                                            item.itemDescription
                                                                                        }}
                                                                                    </div>

                                                                                    <!-- Pickup Location Details -->
                                                                                    <div
                                                                                        class="pickup-details"
                                                                                    >
                                                                                        <p>
                                                                                            <strong
                                                                                                >Pickup
                                                                                                Location:</strong
                                                                                            >
                                                                                            {{
                                                                                                item.pick_up_location
                                                                                            }}
                                                                                        </p>
                                                                                        <p>
                                                                                            <strong
                                                                                                >Container:</strong
                                                                                            >
                                                                                            {{
                                                                                                item.cargo_type
                                                                                            }}
                                                                                        </p>

                                                                                        <p>
                                                                                            <strong
                                                                                                >Quantity:</strong
                                                                                            >
                                                                                            {{
                                                                                                item.quantity
                                                                                            }}
                                                                                        </p>
                                                                                        <p>
                                                                                            <strong
                                                                                                >Container
                                                                                                Number:</strong
                                                                                            >
                                                                                            {{
                                                                                                item.containerNumber
                                                                                            }}
                                                                                        </p>

                                                                                        <!-- Input for Reference Number -->
                                                                                        <p>
                                                                                            <strong
                                                                                                >Reference
                                                                                                Number:</strong
                                                                                            >
                                                                                            {{
                                                                                                item.containerRefNo
                                                                                            }}
                                                                                        </p>
                                                                                    </div>

                                                                                    <!-- Destination Details -->
                                                                                    <div
                                                                                        class="destination-details"
                                                                                    >
                                                                                        <p>
                                                                                            <strong
                                                                                                >Destination:</strong
                                                                                            >
                                                                                            {{
                                                                                                item.destination
                                                                                            }}
                                                                                        </p>
                                                                                        <!-- <p>
                                                                                            <strong
                                                                                                >Delivery
                                                                                                Date:</strong
                                                                                            >
                                                                                            {{
                                                                                                note.delivery_date
                                                                                            }}
                                                                                        </p> -->
                                                                                    </div>

                                                                                    <!-- Edit Buttons -->
                                                                                    <div
                                                                                        class="edit-buttons"
                                                                                    >
                                                                                        <sdButton
                                                                                            @click="
                                                                                                showModalForPickup(
                                                                                                    item,
                                                                                                    noteIndex,
                                                                                                    itemIndex,
                                                                                                )
                                                                                            "
                                                                                            class="btn-edit-pickup"
                                                                                            transparented
                                                                                            type="primary"
                                                                                            size="sm"
                                                                                        >
                                                                                            Edit
                                                                                            Pickup
                                                                                        </sdButton>
                                                                                        <sdButton
                                                                                            @click="
                                                                                                showModalForDest(
                                                                                                    item,
                                                                                                    noteIndex,
                                                                                                    itemIndex,
                                                                                                )
                                                                                            "
                                                                                            class="btn-edit-destination"
                                                                                            transparented
                                                                                            type="primary"
                                                                                            size="sm"
                                                                                        >
                                                                                            Edit
                                                                                            Destination
                                                                                        </sdButton>
                                                                                    </div>
                                                                                </li>
                                                                            </ul>
                                                                        </template>
                                                                    </div>
                                                                </a-card>
                                                            </a-col>
                                                        </a-row>
                                                    </div>

                                                    <!-- Modal for Editing Pickup Location -->
                                                    <sdModal
                                                        type="primary"
                                                        title="Edit Pickup Location"
                                                        :visible="
                                                            visibleForPickup
                                                        "
                                                        :footer="null"
                                                        @cancel="
                                                            handleCancelModalForPickup
                                                        "
                                                    >
                                                        <div class="todo-modal">
                                                            <BasicFormWrapper>
                                                                <a-form
                                                                    class="adTodo-form"
                                                                    name="editPickupLocation"
                                                                    :model="
                                                                        currentItem
                                                                    "
                                                                    @submit.prevent="
                                                                        savePickupLocation
                                                                    "
                                                                >
                                                                    <div
                                                                        class="form-group"
                                                                    >
                                                                        <p
                                                                            style="
                                                                                margin-left: 10px;
                                                                                margin-bottom: -1px;
                                                                            "
                                                                        >
                                                                            <code
                                                                                style="
                                                                                    color: red;
                                                                                "
                                                                                >*</code
                                                                            >
                                                                            Container
                                                                        </p>
                                                                        <select
                                                                            class="custom-select"
                                                                            v-model="
                                                                                currentItem.container
                                                                            "
                                                                        >
                                                                            <option
                                                                                value=""
                                                                            >
                                                                                Select
                                                                                Container
                                                                            </option>
                                                                            <option
                                                                                value="20ft container"
                                                                            >
                                                                                20ft
                                                                                Container
                                                                            </option>
                                                                            <option
                                                                                value="40ft container"
                                                                            >
                                                                                40ft
                                                                                Container
                                                                            </option>
                                                                            <option
                                                                                value="Empty Container"
                                                                            >
                                                                                Empty
                                                                                Container
                                                                            </option>
                                                                            <option
                                                                                value="Loose Cargo Container"
                                                                            >
                                                                                Loose
                                                                                Cargo
                                                                                Container
                                                                            </option>
                                                                        </select>
                                                                    </div>
                                                                    <div
                                                                        class="form-group"
                                                                    >
                                                                        <p
                                                                            style="
                                                                                margin-left: 10px;
                                                                                margin-bottom: -1px;
                                                                            "
                                                                        >
                                                                            <code
                                                                                style="
                                                                                    color: red;
                                                                                "
                                                                                >*</code
                                                                            >
                                                                            Pickup
                                                                            Location
                                                                        </p>
                                                                        <input
                                                                            class="input-data"
                                                                            type="text"
                                                                            v-model="
                                                                                currentItem.pick_up_location
                                                                            "
                                                                        />
                                                                    </div>

                                                                    <div
                                                                        class="form-group"
                                                                    >
                                                                        <label>
                                                                            <code
                                                                                style="
                                                                                    color: red;
                                                                                "
                                                                                >*</code
                                                                            >
                                                                            Quantity
                                                                        </label>
                                                                        <input
                                                                            class="input-data"
                                                                            type="text"
                                                                            v-model="
                                                                                currentItem.quantity
                                                                            "
                                                                        />
                                                                    </div>

                                                                    <div
                                                                        class="form-group"
                                                                    >
                                                                        <label>
                                                                            <code
                                                                                style="
                                                                                    color: red;
                                                                                "
                                                                                >*</code
                                                                            >
                                                                            Container
                                                                            Number
                                                                        </label>
                                                                        <input
                                                                            class="input-data"
                                                                            type="text"
                                                                            v-model="
                                                                                currentItem.containerNumber
                                                                            "
                                                                        />
                                                                    </div>

                                                                    <div
                                                                        class="form-group"
                                                                    >
                                                                        <label>
                                                                            <code
                                                                                style="
                                                                                    color: red;
                                                                                "
                                                                                >*</code
                                                                            >
                                                                            Reference
                                                                            Number
                                                                        </label>
                                                                        <input
                                                                            class="input-data"
                                                                            type="text"
                                                                            v-model="
                                                                                currentItem.containerRefNo
                                                                            "
                                                                        />
                                                                    </div>

                                                                    <sdButton
                                                                        htmlType="submit"
                                                                        class="btn-adTodo"
                                                                        type="primary"
                                                                        size="sm"
                                                                        style="
                                                                            margin-top: 50px;
                                                                        "
                                                                    >
                                                                        Save
                                                                    </sdButton>
                                                                </a-form>
                                                            </BasicFormWrapper>
                                                        </div>
                                                    </sdModal>

                                                    <!-- Modal for Editing Destination -->
                                                    <sdModal
                                                        type="primary"
                                                        title="Edit Destination"
                                                        :visible="
                                                            visibleForDestination
                                                        "
                                                        :footer="null"
                                                        @cancel="
                                                            handleCancelModalForDest
                                                        "
                                                    >
                                                        <div class="todo-modal">
                                                            <BasicFormWrapper>
                                                                <a-form
                                                                    class="adTodo-form"
                                                                    name="editDestination"
                                                                    :model="
                                                                        destinationFormState
                                                                    "
                                                                    @submit.prevent="
                                                                        saveDestination
                                                                    "
                                                                >
                                                                    <a-input
                                                                        v-model:value="
                                                                            destinationFormState.location
                                                                        "
                                                                        placeholder="Enter New Destination..."
                                                                    />

                                                                    <br /><br />
                                                                    <!-- <a-date-picker
                                                                        v-model:value="
                                                                            destinationFormState.delivery_date
                                                                        "
                                                                        style="
                                                                            width: 100%;
                                                                        "
                                                                        placeholder="Select Delivery Date"
                                                                    /> -->
                                                                    <br /><br />

                                                                    <sdButton
                                                                        htmlType="submit"
                                                                        class="btn-adTodo"
                                                                        type="primary"
                                                                        size="lg"
                                                                    >
                                                                        Save
                                                                    </sdButton>
                                                                </a-form>
                                                            </BasicFormWrapper>
                                                        </div>
                                                    </sdModal>
                                                </template>

                                                <template #step_three>
                                                    <BasicFormWrapper
                                                        class="basic-form-inner"
                                                    >
                                                        <div class="">
                                                            <a-row
                                                                :gutter="16"
                                                                justify=""
                                                            >
                                                                <a-col :lg="12">
                                                                    <div
                                                                        class="payment-method-form profile-hints"
                                                                    >
                                                                        <a-form-item
                                                                            label="Assign or Select Drivers"
                                                                            name="driver_ids"
                                                                            :rules="[
                                                                                {
                                                                                    required: true,
                                                                                    message:
                                                                                        'Select at least a driver',
                                                                                },
                                                                            ]"
                                                                        >
                                                                            <select
                                                                                v-model="
                                                                                    form.driver_ids
                                                                                "
                                                                                multiple
                                                                                class="custom-select"
                                                                                style="
                                                                                    width: 100%;
                                                                                "
                                                                                placeholder="Please assign a driver"
                                                                            >
                                                                                <option
                                                                                    v-for="driver in drivers"
                                                                                    :key="
                                                                                        driver.id
                                                                                    "
                                                                                    :value="
                                                                                        driver.id
                                                                                    "
                                                                                >
                                                                                    {{
                                                                                        driver.first_name
                                                                                    }}
                                                                                </option>
                                                                            </select>
                                                                        </a-form-item>
                                                                    </div>
                                                                </a-col>

                                                                <a-col :lg="12">
                                                                    <a-form-item
                                                                        label="Truck"
                                                                        name="truck_id"
                                                                        :rules="[
                                                                            {
                                                                                required: true,
                                                                                message:
                                                                                    'truck is needed!',
                                                                            },
                                                                        ]"
                                                                    >
                                                                        <!-- Dropdown for selecting trucks by registration number -->
                                                                        <select
                                                                            v-model="
                                                                                form.selectedTruckRegistration
                                                                            "
                                                                            class="custom-select"
                                                                        >
                                                                            <option
                                                                                value=""
                                                                            >
                                                                                Select
                                                                                Truck
                                                                            </option>
                                                                            <option
                                                                                v-for="vehicle in vehicles"
                                                                                :key="
                                                                                    vehicle.id
                                                                                "
                                                                                :value="
                                                                                    vehicle.registration_no
                                                                                "
                                                                            >
                                                                                {{
                                                                                    vehicle.registration_no
                                                                                }}
                                                                            </option>
                                                                        </select>
                                                                    </a-form-item>
                                                                </a-col>
                                                            </a-row>

                                                            <a-row :gutter="16">
                                                                <a-col
                                                                    :span="8"
                                                                >
                                                                    <a-form-item
                                                                        label="Odometer Reading"
                                                                        name="odometer_reading"
                                                                    >
                                                                        <a-input
                                                                            type="text"
                                                                            v-model:value="
                                                                                form.odometer_reading
                                                                            "
                                                                            placeholder=""
                                                                        />
                                                                    </a-form-item>
                                                                </a-col>
                                                            </a-row>
                                                        </div>
                                                    </BasicFormWrapper>
                                                </template>

                                                <template #summary>
                                                    <a-form
                                                        :model="form"
                                                        layout="vertical"
                                                    >
                                                        <BasicFormWrapper
                                                            v-if="
                                                                status !==
                                                                'finish'
                                                            "
                                                            :style="{
                                                                width: '500px',
                                                            }"
                                                        >
                                                            <div
                                                                class=""
                                                                :style="{
                                                                    width: '100%',
                                                                }"
                                                            >
                                                                <div
                                                                    class="grid-container"
                                                                >
                                                                    <div
                                                                        class="grid-item"
                                                                    >
                                                                        <p>
                                                                            <strong
                                                                                >Client:</strong
                                                                            >
                                                                            {{
                                                                                clientName
                                                                            }}
                                                                        </p>
                                                                        <p>
                                                                            <strong
                                                                                >Trip
                                                                                Name:</strong
                                                                            >
                                                                            {{
                                                                                form.name
                                                                            }}
                                                                        </p>

                                                                        <p>
                                                                            <strong
                                                                                >Pickup
                                                                                Location:</strong
                                                                            >
                                                                        </p>
                                                                        <ul
                                                                            v-if="
                                                                                selectedOrder.delivery_notes &&
                                                                                selectedOrder
                                                                                    .delivery_notes
                                                                                    .length
                                                                            "
                                                                        >
                                                                            <li
                                                                                v-for="(
                                                                                    note,
                                                                                    noteIndex
                                                                                ) in selectedOrder.delivery_notes"
                                                                                :key="
                                                                                    noteIndex
                                                                                "
                                                                            >
                                                                                <ul>
                                                                                    <li
                                                                                        v-for="(
                                                                                            item,
                                                                                            itemIndex
                                                                                        ) in note.items"
                                                                                        :key="
                                                                                            itemIndex
                                                                                        "
                                                                                    >
                                                                                        <p>
                                                                                            <strong
                                                                                                >Location:</strong
                                                                                            >
                                                                                            {{
                                                                                                item.pick_up_location
                                                                                            }}
                                                                                        </p>
                                                                                        <p>
                                                                                            <strong
                                                                                                >Container:</strong
                                                                                            >
                                                                                            {{
                                                                                                item.cargo_type
                                                                                            }}
                                                                                        </p>
                                                                                        <p>
                                                                                            <strong
                                                                                                >Container
                                                                                                No:</strong
                                                                                            >
                                                                                            {{
                                                                                                item.containerNumber
                                                                                            }}
                                                                                        </p>
                                                                                        <p>
                                                                                            <strong
                                                                                                >Container
                                                                                                Ref
                                                                                                No:</strong
                                                                                            >
                                                                                            {{
                                                                                                item.containerRefNo
                                                                                            }}
                                                                                        </p>
                                                                                        <p>
                                                                                            <strong
                                                                                                >Quantity:</strong
                                                                                            >
                                                                                            {{
                                                                                                item.quantity
                                                                                            }}
                                                                                        </p>
                                                                                        <p>
                                                                                            <strong
                                                                                                >Destination:</strong
                                                                                            >
                                                                                            {{
                                                                                                item.destination
                                                                                            }}
                                                                                        </p>
                                                                                        <p>
                                                                                            <strong
                                                                                                >Delivery
                                                                                                Date:</strong
                                                                                            >
                                                                                            {{
                                                                                                note.delivery_date
                                                                                            }}
                                                                                        </p>
                                                                                    </li>
                                                                                </ul>
                                                                            </li>
                                                                        </ul>
                                                                    </div>

                                                                    <div
                                                                        class="grid-item"
                                                                    >
                                                                        <p>
                                                                            <strong
                                                                                >Drivers:</strong
                                                                            >
                                                                            {{
                                                                                driverNames
                                                                            }}
                                                                        </p>

                                                                        <p>
                                                                            <strong
                                                                                >Truck:</strong
                                                                            >
                                                                            {{
                                                                                form.selectedTruckRegistration
                                                                            }}
                                                                        </p>
                                                                        <p>
                                                                            <strong
                                                                                >Odometer
                                                                                Reading:</strong
                                                                            >
                                                                            {{
                                                                                form.odometer_reading
                                                                            }}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    style="
                                                                        margin-top: 20px;
                                                                    "
                                                                >
                                                                    <a-checkbox
                                                                        v-model:checked="
                                                                            checked
                                                                        "
                                                                    >
                                                                        <span
                                                                            class="checkbox-label"
                                                                            >I
                                                                            Agree
                                                                            with
                                                                            the
                                                                            Terms
                                                                            and
                                                                            Conditions.</span
                                                                        >
                                                                    </a-checkbox>
                                                                </div>
                                                            </div>
                                                        </BasicFormWrapper>

                                                        <a-row
                                                            v-else
                                                            justify="center"
                                                            :style="{
                                                                width: '100%',
                                                            }"
                                                        >
                                                            <a-col
                                                                :xl="24"
                                                                :xs="24"
                                                            >
                                                                <div
                                                                    class="checkout-successful"
                                                                >
                                                                    <sdCards
                                                                        headless
                                                                        :bodyStyle="{
                                                                            borderRadius:
                                                                                '20px',
                                                                        }"
                                                                    >
                                                                        <sdCards
                                                                            headless
                                                                        >
                                                                            <span
                                                                                class="icon-success"
                                                                            >
                                                                                <unicon
                                                                                    name="check"
                                                                                ></unicon>
                                                                            </span>
                                                                            <sdHeading
                                                                                as="h3"
                                                                                >Thank
                                                                                You</sdHeading
                                                                            >
                                                                            <p>
                                                                                Your
                                                                                trip
                                                                                has
                                                                                started
                                                                                successfully
                                                                            </p>
                                                                        </sdCards>
                                                                    </sdCards>
                                                                </div>
                                                            </a-col>
                                                        </a-row>
                                                    </a-form>
                                                </template>
                                            </Steps>
                                        </WizardThree>
                                    </WizardWrapper>
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
import { WizardWrapper, WizardThree } from "../Style";

import Steps from "@/components/steps/steps";

//import { TodoStyleWrapper } from "../StyleModal";
import { DataService } from "@/config/dataService/dataService";
import { defineComponent, onMounted, watch, computed } from "vue";

import { Main, BorderLessHeading, BasicFormWrapper } from "../../../../styled";
import { reactive, ref } from "vue";

import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const TripCreate = defineComponent({
    name: "TripCreate",
    components: {
        Main,

        BorderLessHeading,
        BasicFormWrapper,
        //TodoStyleWrapper,
        Steps,
        WizardWrapper,
        WizardThree,
    },
    setup() {
        const router = useRouter();
        const toast = useToast();
        const status = ref("process");
        const isFinished = ref(false);
        const current = ref(0);
        const isStepValid = ref(false);

        const validateStep = () => {
            let valid = true;
            switch (current.value) {
                case 0:
                    if (!selectedOrder.client_id || !form.name) {
                        toast.error(
                            "Please fill in all required fields in Step 1.",
                        );
                        valid = false;
                    }
                    break;
                case 1:
                    if (!pickupLocation.value) {
                        toast.error("Please add a pickup location in Step 2.");
                        valid = false;
                    }
                    break;
            }
            isStepValid.value = valid;
            return valid;
        };

        const next = () => {
            if (validateStep()) {
                status.value = "process";
                current.value += 1;
                isStepValid.value = false;
            }
        };

        const prev = () => {
            status.value = "process";
            current.value -= 1;
        };

        const open = ref(false);
        const visible = ref(false);

        const visibleForPickup = ref(false);
        const visibleForDestination = ref(false);
        const isLoading = ref(false);

        const drivers = ref([]);
        const clients = ref([]);
        const orders = ref([]);
        const vehicles = ref([]);

        const formatDate = (date) => {
            const d = new Date(date);
            const year = d.getFullYear();
            const month = String(d.getMonth() + 1).padStart(2, "0");
            const day = String(d.getDate()).padStart(2, "0");
            return `${year}-${month}-${day}`;
        };

        //  const fuelPurchaseOrders = ref([]);

        const fetchAllData = async () => {
            await Promise.all([
                // fetchTrips(),

                fetchDrivers(),
                // fetchFuelPurchaseOrders(),
                fetchClients(),
                fetchVehicles(),
            ]);
        };

        const fetchDrivers = async () => {
            try {
                const response = await DataService.get(`/drivers`);
                drivers.value = response.data.Drivers;
            } catch (error) {
                console.error("Error fetching drivers:", error);
            }
        };

        const fetchOrders = async () => {
            try {
                const response = await DataService.get(`/sales_orders`);
                orders.value = response.data.Sales_orders;

                // Apply the filter to remove orders with status 'onDelivery'
                const filteredOrders = orders.value.filter(
                    (order) => order.status !== "onDelivery",
                );

                // Update orders.value with the filtered list
                orders.value = filteredOrders;

                console.log("Filtered Orders fetched", orders.value);
            } catch (error) {
                console.error("Error fetching sales orders:", error);
            }
        };

        // const fetchVehicles = async () => {
        //     try {
        //         const response = await DataService.get(`/vehicle`);
        //         vehicles.value = response.data.Vehicles;
        //     } catch (error) {
        //         console.error("Error fetching vehicles:", error);
        //     }
        // };

        const fetchVehicles = async () => {
            try {
                const response = await DataService.get(`/vehicle`);

                vehicles.value = response.data.Vehicles.filter(
                    (vehicle) => vehicle.current_fuel_tank_level > 0,
                );
            } catch (error) {
                console.error("Error fetching vehicles:", error);
            }
        };

        // const fetchFuelPurchaseOrders = async () => {
        //     try {
        //         const response = await DataService.get(`/fuel_purchase_order`);
        //         fuelPurchaseOrders.value = response.data.Fuel_purchase_orders;
        //     } catch (error) {
        //         console.error("Error fetching fuel purchase orders:", error);
        //     }
        // };

        const fetchClients = async () => {
            try {
                const response = await DataService.get(`/clients`);
                clients.value = response.data.Clients;
            } catch (error) {
                console.error("Error fetching clients:", error);
            }
        };

        const formState = reactive({
            client_id: "",
            trip_weight: "",
            trip_status: "",
            kms_done: "",
            litres_consumed: "",
            description: "",
        });

        const formState1 = reactive({
            location: "",
        });

        const destinationFormState = reactive({
            location: "",
            delivery_date: "",
            index: -1,
        });

        const form = reactive({
            client_id: "",
            truck_id: "",
            trip_weight: "",
            trip_status: "",
            description: "",
            name: "",
            origin: "",
            driver_ids: [],
            remarks: "",
            review_points: "",
            fuel_dispensation_id: "",
            value: "",
            previous_kms: "",
            previous_litres: "",
            litres_given: "",
            kms_done: "",

            fuel_purchase_id: "",
            fuel_type: "",
            quantity: "",
            quantity_abbreviation_name: "",
            quantity_abbreviation_id: "",
            dispense_date: "",
            odometer_reading: "",
            dispense_location: "",
            selectedTruckRegistration: "",
        });

        const handleFileUpload = (event, fieldName) => {
            const file = event.target.files[0];
            if (file) {
                form[fieldName] = file;
            }
        };

        const handleSubmit = async () => {
            if (
                !form.name ||
                !selectedOrder.client_id ||
                !form.driver_ids.length
            ) {
                toast.error("Please fill in all required fields.");
                return;
            }

            const tripDetails = {
                name: form.name,
                sales_order_id: String(selectedOrder.sales_order_id),
                client_id: selectedOrder.client_id,
                truck_id: form.truck_id,
                description: form.description,
                driver_ids: form.driver_ids,
                remarks: form.remarks,
                review_points: form.review_points,
                odometer_reading: form.odometer_reading,
                fuel_dispensation_id: form.fuel_dispensation_id,
                value: form.value,
                previous_kms: form.previous_kms,
                previous_litres: form.previous_litres,
                litres_given: form.litres_given,
                litres_consumed: form.litres_consumed,
                kms_done: form.kms_done,
                trip_weight: form.trip_weight,
                delivery_notes: selectedOrder.delivery_notes.map((note) => ({
                    delivery_note_number: note.delivery_note_number,
                    delivery_date: note.delivery_date,
                    items: note.items.map((item) => ({
                        itemDescription: item.itemDescription,
                        cargo_type: item.cargo_type,
                        pick_up_location: item.pick_up_location,
                        containerNumber: item.containerNumber,
                        containerRefNo: item.containerRefNo,
                        quantity: item.quantity,
                        destination: item.destination,
                        delivery_date: item.delivery_date,
                    })),
                })),
            };

            console.log("What am I submitting", tripDetails);

            try {
                isLoading.value = true;
                const response = await DataService.post("/trips", tripDetails);

                if (response.status === 201) {
                    toast.success("Trip started successfully");
                    resetForm();
                    router.push("/app/trips");
                } else {
                    toast.error("Failed to start trip. Please try again.");
                }
            } catch (error) {
                console.error("API call failed: ", error);
                if (error.response) {
                    toast.error(`Error: ${error.response.data.message}`);
                } else {
                    toast.error("Network error, please try again later.");
                }
            } finally {
                isLoading.value = false;
            }
        };

        const resetForm = () => {
            form.name = "";
            selectedOrder.client_id = ""; // Ensure client_id is reset
            selectedOrder.sales_order_id = "";
            form.truck_id = "";
            form.description = "";
            form.driver_ids = [];
            form.remarks = "";
            form.review_points = "";
            form.fuel_dispensation_id = "";
            form.value = "";
            form.previous_kms = "";
            form.previous_litres = "";
            form.litres_given = "";
            form.litres_consumed = "";
            form.kms_done = "";
            form.trip_weight = "";

            // Reset selectedOrder details
            selectedOrder.delivery_notes = []; // Clear delivery notes
            selectedOrder.client_name = "";
            selectedOrder.client_email = "";

            // Reset related states
            pickupLocation.value = { location: "", items: [] };
            destinations.value = [];
            pickupLocationSaved.value = false; // Reset saved flags
            destinationSaved.value = false;
        };

        const onClose = () => {
            open.value = false;
        };

        onMounted(async () => {
            await fetchOrders();
            await fetchAllData();
        });

        const handleCancel = () => {
            visible.value = false;
        };

        const onCancelModalForPickup = () => {
            visibleForPickup.value = false;
        };

        const handleCancelModalForPickup = () => {
            onCancelModalForPickup();
        };

        const onCancelModalForDest = () => {
            visibleForDestination.value = false;
        };

        const handleCancelModalForDest = () => {
            onCancelModalForDest();
        };

        // watch(
        //     () => form.fuel_purchase_id,
        //     (newVal) => {
        //         const selectedOrder = fuelPurchaseOrders.value.find(
        //             (order) => order.id === newVal,
        //         );
        //         if (selectedOrder) {
        //             form.fuel_type = selectedOrder.fuel_type;
        //             form.quantity = selectedOrder.quantity;
        //             form.quantity_abbreviation_name =
        //                 selectedOrder.quantityabbreviationid.name;
        //             form.quantity_abbreviation_id =
        //                 selectedOrder.quantityabbreviationid.id;
        //         } else {
        //             form.fuel_type = "";
        //             form.quantity = "";
        //             form.quantity_abbreviation_name = "";
        //             form.quantity_abbreviation_id = "";
        //         }
        //     },
        // );

        watch(
            () => form.selectedTruckRegistration,
            (newVal) => {
                const selectedTruck = vehicles.value.find(
                    (vehicle) => vehicle.registration_no === newVal,
                );
                if (selectedTruck) {
                    form.truck_id = selectedTruck.id;
                    form.odometer_reading = selectedTruck.odometer_reading;
                } else {
                    form.truck_id = "";
                    form.odometer_reading = "";
                }
            },
        );

        const lineItems = ref([
            {
                container: "",
                containerNumber: "",
                containerRefNo: "",
                itemDescription: "",
                quantity: "",
                amount: "",
            },
        ]);
        const pickupLocation = ref({});
        const destinations = ref([]);
        const selectedPickupItem = ref("");
        const pickupLocationSaved = ref(false);
        const destinationSaved = ref(false);
        const allPickupItems = computed(() => {
            return pickupLocation.value ? pickupLocation.value.items : [];
        });

        const currentItem = reactive({
            pick_up_location: "",
            container: "",
            containerNumber: "",
            containerRefNo: "",
            quantity: "",
            index: -1,
        });

        // const showModalForPickup = (item) => {
        //     currentItem.pick_up_location = item.pick_up_location;
        //     currentItem.container = item.cargo_type;
        //     currentItem.containerNumber = item.containerNumber;
        //     currentItem.containerRefNo = item.containerRefNo;
        //     currentItem.quantity = item.quantity;
        //     currentItem.index = selectedOrder.delivery_notes.findIndex((note) =>
        //         note.items.includes(item),
        //     );

        //     visibleForPickup.value = true;
        // };

        const showModalForPickup = (item, noteIndex, itemIndex) => {
            currentItem.pick_up_location = item.pick_up_location;
            currentItem.container = item.cargo_type;
            currentItem.containerNumber = item.containerNumber;
            currentItem.containerRefNo = item.containerRefNo;
            currentItem.quantity = item.quantity;
            currentItem.noteIndex = noteIndex;
            currentItem.index = itemIndex;
            visibleForPickup.value = true;
        };

        const showModalForDest = (item, noteIndex, itemIndex) => {
            destinationFormState.location = item.destination;
            destinationFormState.delivery_date = item.delivery_date;
            destinationFormState.noteIndex = noteIndex;
            destinationFormState.index = itemIndex;
            visibleForDestination.value = true;
        };

        // const showModalForDest = (item) => {
        //     destinationFormState.location = item.destination;
        //     destinationFormState.delivery_date = item.delivery_date;
        //     destinationFormState.index = selectedOrder.delivery_notes.findIndex(
        //         (note) => note.items.includes(item),
        //     );

        //     visibleForDestination.value = true;
        // };

        const addLineItem = () => {
            lineItems.value.push({
                container: "",
                containerNumber: "",
                containerRefNo: "",
                itemDescription: "",
                quantity: "",
                amount: "",
            });
        };

        const removeLastLineItem = () => {
            if (lineItems.value.length > 1) {
                lineItems.value.pop();
            } else {
                toast.warning("Cannot remove the last line item.");
            }
        };

        const savePickupLocation = () => {
            if (!currentItem.pick_up_location) {
                toast.error("Please complete the required fields.");
                return;
            }

            const noteIndex = currentItem.noteIndex;
            const itemIndex = currentItem.index;

            if (
                selectedOrder.delivery_notes[noteIndex] &&
                selectedOrder.delivery_notes[noteIndex].items[itemIndex]
            ) {
                const targetItem =
                    selectedOrder.delivery_notes[noteIndex].items[itemIndex];
                targetItem.pick_up_location = currentItem.pick_up_location;
                targetItem.cargo_type = currentItem.container;
                targetItem.containerNumber = currentItem.containerNumber;
                targetItem.containerRefNo = currentItem.containerRefNo;
                targetItem.quantity = currentItem.quantity;

                selectedOrder.delivery_notes = [
                    ...selectedOrder.delivery_notes,
                ]; // Trigger reactivity

                visibleForPickup.value = false;
                resetCurrentItem();
            } else {
                console.error(
                    "Invalid noteIndex or itemIndex",
                    noteIndex,
                    itemIndex,
                );
                toast.error(
                    "Failed to save pickup location due to an invalid item reference.",
                );
            }
        };

        const saveDestination = () => {
            if (!destinationFormState.location) {
                toast.error("Please complete the required fields.");
                return;
            }

            const noteIndex = destinationFormState.noteIndex;
            const itemIndex = destinationFormState.index;

            if (
                selectedOrder.delivery_notes[noteIndex] &&
                selectedOrder.delivery_notes[noteIndex].items[itemIndex]
            ) {
                const targetItem =
                    selectedOrder.delivery_notes[noteIndex].items[itemIndex];
                targetItem.destination = destinationFormState.location;
                targetItem.delivery_date = destinationFormState.delivery_date;

                selectedOrder.delivery_notes = [
                    ...selectedOrder.delivery_notes,
                ]; // Trigger reactivity

                visibleForDestination.value = false;
                resetDestinationFormState();
            } else {
                console.error(
                    "Invalid noteIndex or itemIndex",
                    noteIndex,
                    itemIndex,
                );
                toast.error(
                    "Failed to save destination due to an invalid item reference.",
                );
            }
        };

        const resetCurrentItem = () => {
            currentItem.pick_up_location = "";
            currentItem.container = "";
            currentItem.containerNumber = "";
            currentItem.containerRefNo = "";
            currentItem.quantity = "";
        };

        const resetDestinationFormState = () => {
            destinationFormState.location = "";
            destinationFormState.delivery_date = "";
        };

        const clientName = computed(() => {
            const client = clients.value.find(
                (c) => c.id === selectedOrder.client_id,
            );
            return client ? client.user.first_name : "";
        });

        const driverNames = computed(() => {
            return form.driver_ids
                .map((id) => {
                    const driver = drivers.value.find((d) => d.id === id);
                    return driver ? driver.first_name : "";
                })
                .join(", ");
        });

        const selectedOrder = reactive({
            client_id: "",
            sales_order_id: "",
            client_name: "",
            client_email: "",
            // items: [],
            delivery_notes: [],
        });

        const formState4 = reactive({
            order_number: "",
        });

        // watch(
        //     () => formState4.order_number,
        //     (newOrderNumber) => {
        //         handleOrderChange(newOrderNumber);
        //     },
        // );

        const handleOrderChange = () => {
            const selected = orders.value.find(
                (order) => order.order_number === formState4.order_number,
            );

            if (selected) {
                selectedOrder.client_id = selected.client.id;
                selectedOrder.sales_order_id = selected.id;
                selectedOrder.client_name = `${selected.client.user.first_name} ${selected.client.user.last_name}`;
                selectedOrder.client_email = selected.client.user.email;

                // Map delivery notes and their items
                selectedOrder.delivery_notes = selected.delivery_notes.map(
                    (note) => ({
                        ...note,
                        items: note.items.map((item) => ({
                            ...item,
                            pickupLocationSaved: false,
                            destinationSaved: false,
                            containerNumber: "",
                            containerRefNo: "",
                        })),
                    }),
                );
                console.log(
                    "I want to see delivery date",
                    selectedOrder.delivery_notes,
                );
            } else {
                // Reset the selected order if nothing is found
                selectedOrder.client_name = "";
                selectedOrder.client_email = "";
                selectedOrder.delivery_notes = [];
            }
        };

        // const handleOrderChange = () => {
        //     const selected = orders.value.find(
        //         (order) => order.order_number === formState4.order_number,
        //     );
        //     if (selected) {
        //         (selectedOrder.client_id = selected.client.id),
        //             (selectedOrder.sales_order_id = selected.id),
        //             (selectedOrder.client_name = `${selected.client.user.first_name} ${selected.client.user.last_name}`);
        //         selectedOrder.client_email = selected.client.user.email;
        //         selectedOrder.items = selected.items;
        //     } else {
        //         selectedOrder.client_name = "";
        //         selectedOrder.client_email = "";
        //         selectedOrder.items = [];
        //     }
        // };

        return {
            form,

            open,
            // showDrawer,
            addLineItem,
            removeLastLineItem,
            lineItems,
            pickupLocation,
            destinations,
            selectedPickupItem,
            allPickupItems,
            onClose,
            handleSubmit,
            isLoading,
            handleFileUpload,
            //   fuelPurchaseOrders,
            drivers,
            visible,
            visibleForPickup,
            showModalForDest,
            onCancelModalForDest,
            handleCancelModalForDest,
            visibleForDestination,

            handleCancel,
            formState,
            formState1,
            formState4,
            destinationFormState,

            clients,
            vehicles,
            prev,
            next,
            status,
            isFinished,
            current,
            handleCancelModalForPickup,
            showModalForPickup,
            steps: [
                { title: "Basic Information", content: "step_one" },
                { title: "Pickup & Destination", content: "step_two" },
                { title: "Driver & Fuel Details", content: "step_three" },
                { title: "Summary", content: "summary" },
            ],
            savePickupLocation,
            saveDestination,
            // isItemSelected,
            clientName,
            driverNames,
            isStepValid,
            orders,
            handleOrderChange,
            selectedOrder,
            currentItem,
            pickupLocationSaved,
            destinationSaved,
            formatDate,
        };
    },
});

export default TripCreate;
</script>

<style scoped>
.custom-select {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    padding: 6px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f8f8f8;
    font-size: 16px;
    width: 100%;
    max-width: 300px; /* Adjust the width as needed */
}

.custom-select:focus {
    outline: none;
    border-color: #007bff; /* Change border color on focus */
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); /* Add a subtle shadow on focus */
}

.input-data {
    width: 150px;
    height: 10px;
    padding: 10px;
    border-radius: 5px;
    border: 0.5px solid gray;
}

.loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 700px;
}
.list-item {
    color: #333;
}

.form-column {
    display: block;
    margin-bottom: 20px;
}

.form-group {
    margin-bottom: 15px;
}

.custom-select,
.custom-textarea,
.input-data {
    width: 100%;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid #ccc;
}

.custom-textarea {
    height: 80px; /* Adjust this height as needed */
}

.input-data {
    height: 34px; /* Adjust this height to match the height of the other input fields */
}

.button-row {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
}

.button-col {
    display: flex;
    justify-content: center;
    margin: 0 20px;
}

.flexobject {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
}

.pickup-col,
.destination-col {
    margin: 0 30px;
}

.section-title {
    margin: 10px 30px;
    font-size: 1.8em;
    font-weight: bold;
    color: #333;
    text-align: center;
}

.list-item {
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #f9f9f9;
}

.list-detail {
    margin-bottom: 5px;
    font-size: 1em;
}

.details-list,
.sub-details-list {
    list-style-type: none;
    padding: 0;
}

.btn-toDoAdd {
    display: block;
    margin: 0 auto 20px auto;
    width: 100%;
    max-width: 200px;
    text-align: center;
}

.shipping-form {
    padding: 20px;
    text-align: center;
}

.ninjadash-finish-order {
    font-family: Arial, sans-serif;
    line-height: 1.6;
    margin: 20px 0;
}

.ninjadash-finish-order p {
    margin: 5px 0;
}

.ninjadash-finish-order ul {
    list-style-type: none;
    padding-left: 20px;
}

.ninjadash-finish-order ul li {
    margin-bottom: 10px;
}

.icon-success {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    color: green;
    margin-bottom: 10px;
}

.checkbox-label {
    font-weight: normal;
}

.checkout-successful {
    text-align: center;
    padding: 20px;
}

.sdCards {
    border: 1px solid #e0e0e0;
    border-radius: 20px;
    padding: 20px;
}

.sdHeading {
    margin-bottom: 10px;
    font-size: 24px;
}

.sdHeading h3 {
    margin: 0;
}

.grid-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
}

.grid-item {
    background-color: #f9f9f9;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.order-details-container {
    padding: 20px;
}

.order-details-button {
    margin-bottom: 20px;
    text-align: center;
}

.btn-order-details {
    font-size: 18px;
}

.order-items-row {
    text-align: left;
}

.order-items-card {
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.order-items-content {
    padding: 20px;
}

.order-items-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.order-item {
    margin-bottom: 20px;
    padding: 10px;
    border-bottom: 1px solid #e8e8e8;
}

.item-description {
    color: black;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
}

.btn-add-location,
.btn-add-destination {
    margin-top: 10px;
}

.pickup-details,
.destination-details {
    margin-top: 10px;
}

.pickup-details p,
.destination-details p {
    margin: 5px 0;
}

.delivery-notes-container {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
}

.delivery-note-column {
    flex: 1 1 calc(33.333% - 16px);
    box-sizing: border-box;
    padding: 16px;
    background-color: #f9f9f9;
    border: 1px solid #e8e8e8;
    border-radius: 8px;
}

.new-row {
    flex-basis: 100%;
}

.order-details-container {
    margin-top: 20px;
}

.order-items-row {
    margin-bottom: 20px;
}

.order-items-card {
    background-color: #f9f9f9;
    border-radius: 8px;
    padding: 20px;
}

.order-items-content {
    margin-top: 10px;
}

.order-items-list {
    list-style-type: none;
    padding: 0;
}

.order-item {
    margin-bottom: 15px;
}

.pickup-details,
.destination-details {
    margin-top: 10px;
}

.btn-edit-pickup,
.btn-edit-destination {
    margin-right: 10px;
}

.todo-modal {
    padding: 20px;
}

.input-data {
    width: 100%;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
    margin-bottom: 10px;
}
</style>
