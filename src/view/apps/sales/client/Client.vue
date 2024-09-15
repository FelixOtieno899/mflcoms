<template>
    <Main>
        <a-row :gutter="15">
            <a-col :xs="24">
                <BorderLessHeading>
                    <sdCards title="Manage Clients">
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
                                    title="Create New Client"
                                    :width="720"
                                    v-model:visible="open"
                                    :body-style="{ paddingBottom: '80px' }"
                                    :footer-style="{ textAlign: 'right' }"
                                    @close="onClose"
                                >
                                    <template v-if="isLoading">
                                        <a-space class="loading">
                                            <a-spin size="large" />
                                        </a-space>
                                    </template>

                                    <template v-else>
                                        <a-form
                                            :model="form"
                                            @finish="handleSubmit"
                                            :rules="rules"
                                            layout="vertical"
                                        >
                                            <a-row :gutter="16">
                                                <a-col :span="8">
                                                    <a-form-item
                                                        label="Company Name"
                                                        name="company_name"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                                message:
                                                                    'Required!',
                                                            },
                                                        ]"
                                                    >
                                                        <a-input
                                                            v-model:value="
                                                                form.company_name
                                                            "
                                                            placeholder=""
                                                        />
                                                    </a-form-item>
                                                </a-col>
                                            </a-row>
                                            <a-row :gutter="16">
                                                <a-col :span="8">
                                                    <a-form-item
                                                        label="First Name"
                                                        name="first_name"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                                message:
                                                                    'Required!',
                                                            },
                                                        ]"
                                                    >
                                                        <a-input
                                                            v-model:value="
                                                                form.first_name
                                                            "
                                                            placeholder=""
                                                        />
                                                    </a-form-item>
                                                </a-col>

                                                <a-col :span="8">
                                                    <a-form-item
                                                        label="Last Name"
                                                        name="last_name"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                                message:
                                                                    'Required!',
                                                            },
                                                        ]"
                                                    >
                                                        <a-input
                                                            v-model:value="
                                                                form.last_name
                                                            "
                                                            placeholder=""
                                                        />
                                                    </a-form-item>
                                                </a-col>
                                                <a-col :span="8">
                                                    <a-form-item
                                                        label="Email"
                                                        name="email"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                                message:
                                                                    'Required!',
                                                            },
                                                        ]"
                                                    >
                                                        <a-input
                                                            type="email"
                                                            v-model:value="
                                                                form.email
                                                            "
                                                            placeholder=""
                                                        />
                                                    </a-form-item>
                                                </a-col>
                                            </a-row>
                                            <a-row :gutter="16">
                                                <a-col :span="8">
                                                    <a-form-item
                                                        label="Client Pin No"
                                                        name="company_pin"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                                message:
                                                                    'Required!',
                                                            },
                                                        ]"
                                                    >
                                                        <a-input
                                                            v-model:value="
                                                                form.company_pin
                                                            "
                                                            placeholder=""
                                                        />
                                                    </a-form-item>
                                                </a-col>
                                                <a-col :span="8">
                                                    <a-form-item
                                                        label="Phone"
                                                        name="phone"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                                message:
                                                                    'Required!',
                                                            },
                                                        ]"
                                                    >
                                                        <a-input
                                                            v-model:value="
                                                                form.phone
                                                            "
                                                            placeholder=""
                                                        />
                                                    </a-form-item>
                                                </a-col>

                                                <a-col :span="8">
                                                    <a-form-item
                                                        label="Address"
                                                        name="address"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                                message:
                                                                    'Required!',
                                                            },
                                                        ]"
                                                    >
                                                        <a-input
                                                            type="text"
                                                            v-model:value="
                                                                form.address
                                                            "
                                                            placeholder=""
                                                        />
                                                    </a-form-item>
                                                </a-col>
                                            </a-row>

                                            <a-row :gutter="16">
                                                <a-col :span="12">
                                                    <a-form-item
                                                        label="Pass set"
                                                        name="is_password_set"
                                                        hidden
                                                    >
                                                        <a-input
                                                            v-model:value="
                                                                form.is_password_set
                                                            "
                                                            hid
                                                        />
                                                    </a-form-item>
                                                </a-col>

                                                <a-col :span="12">
                                                    <a-form-item
                                                        label="Email Verify"
                                                        name="email_verified_at"
                                                        hidden
                                                    >
                                                        <a-input
                                                            type="text"
                                                            v-model:value="
                                                                form.email_verified_at
                                                            "
                                                        />
                                                    </a-form-item>
                                                </a-col>
                                            </a-row>

                                            <a-row :gutter="16">
                                                <a-col :span="12">
                                                    <a-form-item
                                                        label="Website"
                                                        name="website"
                                                        :rules="[
                                                            {
                                                                required: false,
                                                                message:
                                                                    'Please enter website!',
                                                            },
                                                        ]"
                                                    >
                                                        <a-input
                                                            type="text"
                                                            v-model:value="
                                                                form.website
                                                            "
                                                            placeholder=""
                                                        />
                                                    </a-form-item>
                                                </a-col>

                                                <a-col :span="12">
                                                    <a-form-item
                                                        label="Postal Code"
                                                        name="postal_code"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                                message:
                                                                    'Required!',
                                                            },
                                                        ]"
                                                    >
                                                        <a-input
                                                            type="text"
                                                            v-model:value="
                                                                form.postal_code
                                                            "
                                                            placeholder=""
                                                        />
                                                    </a-form-item>
                                                </a-col>
                                            </a-row>
                                            <a-row :gutter="16">
                                                <a-col :span="8">
                                                    <a-form-item
                                                        label="Country"
                                                        name="country_id"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                                message:
                                                                    'Required!',
                                                            },
                                                        ]"
                                                    >
                                                        <select
                                                            style="
                                                                padding: 7px;
                                                                border: 1px
                                                                    solid #ccc;
                                                                border-radius: 6px;
                                                                background-color: #f8f8f8;
                                                                font-size: 14px;
                                                                width: 200px;
                                                                max-width: 300px;
                                                            "
                                                            v-model="
                                                                form.country_id
                                                            "
                                                        >
                                                            <option disabled value="">
                                                                Select Country
                                                            </option>
                                                            <option
                                                                v-for="country in countries"
                                                                :key="
                                                                    country.id
                                                                "
                                                                :value="
                                                                    country.id
                                                                "
                                                            >
                                                                {{
                                                                    country.name
                                                                }}
                                                            </option>
                                                        </select>
                                                    </a-form-item>
                                                </a-col>
                                                <a-col :span="8">
                                                    <a-form-item
                                                        label="City"
                                                        name="city"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                                message:
                                                                    'Required!',
                                                            },
                                                        ]"
                                                    >
                                                        <a-input
                                                            type="text"
                                                            v-model:value="
                                                                form.city
                                                            "
                                                            placeholder=""
                                                        />
                                                    </a-form-item>
                                                </a-col>

                                                <a-col :span="8">
                                                    <a-form-item
                                                        label="Province"
                                                        name="province"
                                                        :rules="[
                                                            {
                                                                required: false,
                                                                message:
                                                                    'Please enter address!',
                                                            },
                                                        ]"
                                                    >
                                                        <a-input
                                                            type="text"
                                                            v-model:value="
                                                                form.province
                                                            "
                                                            placeholder=""
                                                        />
                                                    </a-form-item>
                                                </a-col>
                                            </a-row>

                                            <a-row :gutter="16">
                                                <a-col :span="12">
                                                    <a-form-item
                                                        label="Open Balance"
                                                        name="opening_balance"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                                message:
                                                                    'Required!',
                                                            },
                                                        ]"
                                                    >
                                                        <a-input
                                                            v-model:value="
                                                                form.opening_balance
                                                            "
                                                            placeholder=""
                                                        />
                                                    </a-form-item>
                                                </a-col>

                                                <a-col :span="12">
                                                    <a-form-item
                                                        label="As of"
                                                        name="open_as_of"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                                message:
                                                                    'Required!',
                                                            },
                                                        ]"
                                                    >
                                                        <a-date-picker
                                                            v-model:value="
                                                                form.open_as_of
                                                            "
                                                            style="width: 100%"
                                                            :get-popup-container="
                                                                (trigger) =>
                                                                    trigger.parentElement
                                                            "
                                                        />
                                                    </a-form-item>
                                                </a-col>
                                            </a-row>

                                            <a-row>
                                                <a-col :span="12">
                                                    <a-form-item
                                                        label="Note"
                                                        name="note"
                                                        :rules="[
                                                            {
                                                                required: false,
                                                            },
                                                        ]"
                                                    >
                                                        <a-textarea
                                                            type="text"
                                                            v-model:value="
                                                                form.note
                                                            "
                                                        />
                                                    </a-form-item>
                                                </a-col>
                                            </a-row>
                                            <a-row :gutter="16">
                                                <a-col :span="24">
                                                    <a-space align="end">
                                                        <a-button
                                                            @click="onClose"
                                                            >Cancel</a-button
                                                        >
                                                        <a-button
                                                            type="primary"
                                                            html-type="submit"
                                                            >Submit</a-button
                                                        >
                                                    </a-space>
                                                </a-col>
                                            </a-row>
                                        </a-form>
                                    </template>
                                </a-drawer>

                                <a-drawer
                                    title="Receive Payment"
                                    :width="1000"
                                    :height="600"
                                    :visible="openReceivePaymentDrawer"
                                    :placement="placement1"
                                    :body-style="{ paddingBottom: '80px' }"
                                    :footer-style="{ textAlign: 'right' }"
                                    @close="
                                        () => (openReceivePaymentDrawer = false)
                                    "
                                >
                                    <template v-if="isLoading">
                                        <a-space class="loading">
                                            <a-spin size="large" />
                                        </a-space>
                                    </template>

                                    <template v-else>
                                        <form
                                            :model="formState"
                                            layout="vertical"
                                        >
                                            <section class="wrapper-invoice">
                                                <!-- switch mode rtl by adding class rtl on invoice class -->
                                                <div class="invoice">
                                                    <div
                                                        class="invoice-information"
                                                    >
                                                        <div
                                                            class="invoice-logo-brand"
                                                        >
                                                            Deposit to:
                                                            <select
                                                                v-model="
                                                                    formState.account_id
                                                                "
                                                                class="custom-select"
                                                            >
                                                                <option
                                                                    value=""
                                                                >
                                                                    Select an
                                                                    account
                                                                </option>
                                                                <template
                                                                    v-if="
                                                                        Accounts
                                                                    "
                                                                >
                                                                    <option
                                                                        v-for="account in Accounts"
                                                                        :key="
                                                                            account.id
                                                                        "
                                                                        :value="
                                                                            account.id
                                                                        "
                                                                    >
                                                                        {{
                                                                            account.name
                                                                        }}
                                                                    </option>
                                                                </template>
                                                                <template
                                                                    v-else
                                                                >
                                                                    <option
                                                                        disabled
                                                                    >
                                                                        No
                                                                        accounts
                                                                        available
                                                                    </option>
                                                                </template>
                                                            </select>
                                                        </div>

                                                        <p
                                                            style="
                                                                margin-top: 20px;
                                                            "
                                                        >
                                                            Amount Recieved: Ksh

                                                            <input
                                                                readonly
                                                                style="
                                                                    outline: none;
                                                                "
                                                                class="input-data"
                                                                type="text"
                                                                v-model="
                                                                    formState.total_amount
                                                                "
                                                            />
                                                        </p>
                                                    </div>
                                                    <!-- logo brand invoice -->

                                                    <div
                                                        class="invoice-logo-brand"
                                                    >
                                                        Client:
                                                        <select
                                                            v-model="
                                                                formState.client_id
                                                            "
                                                            class="custom-select"
                                                        >
                                                            <option value="">
                                                                Choose Client
                                                            </option>
                                                            <template
                                                                v-if="Clients"
                                                            >
                                                                <option
                                                                    v-for="client in Clients"
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
                                                                </option>
                                                            </template>
                                                            <template v-else>
                                                                <option
                                                                    disabled
                                                                >
                                                                    No clients
                                                                    available
                                                                </option>
                                                            </template>
                                                        </select>
                                                    </div>

                                                    <p></p>

                                                    <div class="invoice-body">
                                                        <p>
                                                            Outstanding
                                                            Transactions:
                                                        </p>
                                                        <table class="table">
                                                            <thead>
                                                                <tr>
                                                                    <th>
                                                                        Description
                                                                    </th>
                                                                    <th>
                                                                        Original
                                                                        Amount
                                                                    </th>
                                                                    <th>
                                                                        Open
                                                                        Balance
                                                                    </th>
                                                                    <th>
                                                                        Payment
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr
                                                                    v-for="invoice in filteredInvoices"
                                                                    :key="
                                                                        invoice.id
                                                                    "
                                                                >
                                                                    <td>
                                                                        Invoice
                                                                        #
                                                                        {{
                                                                            invoice.invoice_number
                                                                        }}
                                                                    </td>

                                                                    <td
                                                                        style="
                                                                            align: left;
                                                                        "
                                                                    >
                                                                        {{
                                                                            invoice.total_amount
                                                                        }}
                                                                    </td>
                                                                    <td>
                                                                        {{
                                                                            invoice.total_amount
                                                                        }}
                                                                    </td>

                                                                    <td>
                                                                        {{
                                                                            invoice.total_amount
                                                                        }}
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>

                                                        <div
                                                            class="invoice-total-amount"
                                                        >
                                                            <p>
                                                                Amount to apply:
                                                                Ksh
                                                                <input
                                                                    readonly
                                                                    style="
                                                                        outline: none;
                                                                    "
                                                                    class="input-data"
                                                                    type="text"
                                                                    v-model="
                                                                        formState.total_amount
                                                                    "
                                                                />
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </section>

                                            <div
                                                style="
                                                    margin-left: 200px;
                                                    margin-top: 40px;
                                                "
                                                class="setting-form-actions"
                                            >
                                                <sdButton
                                                    size="small"
                                                    type="primary"
                                                    @click.prevent="
                                                        handleUpdateReceivePayment
                                                    "
                                                >
                                                    Save
                                                </sdButton>

                                                &nbsp; &nbsp;
                                                <sdButton
                                                    size="small"
                                                    @click.prevent="
                                                        () =>
                                                            (openReceivePaymentDrawer = false)
                                                    "
                                                    type="light"
                                                >
                                                    Cancel
                                                </sdButton>
                                            </div>
                                        </form>
                                    </template>
                                </a-drawer>

                                <a-drawer
                                    title="Create New Invoice"
                                    :width="1300"
                                    v-model:visible="openCreateInvoiceDrawer"
                                    :body-style="{ paddingBottom: '80px' }"
                                    :footer-style="{ textAlign: 'right' }"
                                    @close="
                                        () => (openCreateInvoiceDrawer = false)
                                    "
                                >
                                    <template v-if="isLoading">
                                        <a-space class="loading">
                                            <a-spin size="large" />
                                        </a-space>
                                    </template>

                                    <template v-else>
                                        <form
                                            :model="formCreateInvoice"
                                            layout="vertical"
                                        >
                                            <table>
                                                <tr class="invoice-header">
                                                    <td>
                                                        {{
                                                            formCreateInvoice.client_name
                                                        }}
                                                    </td>
                                                    <td>Invoice #</td>
                                                    <td>
                                                        {{
                                                            formCreateInvoice.invoice_number
                                                        }}
                                                    </td>
                                                    <td>Tax</td>
                                                    <td>0</td>
                                                    <td>Date</td>
                                                    <td>
                                                        <a-date-picker
                                                            v-model:value="
                                                                formCreateInvoice.invoice_date
                                                            "
                                                            format="YYYY-MM-DD"
                                                        />
                                                    </td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td colspan="7">
                                                        <a-button
                                                            type="primary"
                                                            @click="
                                                                openAddDeliveryNoteModal
                                                            "
                                                        >
                                                            Add Delivery Notes
                                                        </a-button>
                                                    </td>
                                                </tr>

                                                <tr v-if="noItemsAvailable">
                                                    <td
                                                        colspan="10"
                                                        style="
                                                            text-align: center;
                                                            color: red;
                                                        "
                                                    >
                                                        No new items available
                                                        to add from the delivery
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
                                                <tr
                                                    v-for="(
                                                        item, index
                                                    ) in formCreateInvoice.items"
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
                                                        <input
                                                            type="number"
                                                            v-model="item.price"
                                                            @input="
                                                                updateLineTotal(
                                                                    index,
                                                                )
                                                            "
                                                        />
                                                    </td>
                                                    <td>{{ item.tax }}</td>
                                                    <td>
                                                        {{ item.lineTotal }}
                                                    </td>
                                                </tr>
                                                <tr class="total-row">
                                                    <td
                                                        colspan="9"
                                                        class="label"
                                                    >
                                                        Sub Total
                                                    </td>
                                                    <td>
                                                        {{
                                                            formCreateInvoice.subTotal
                                                        }}
                                                    </td>
                                                </tr>
                                                <tr class="total-row">
                                                    <td
                                                        colspan="9"
                                                        class="label"
                                                    >
                                                        Tax
                                                    </td>
                                                    <td>
                                                        {{
                                                            formCreateInvoice.taxTotal
                                                        }}
                                                    </td>
                                                </tr>
                                                <tr class="total-row">
                                                    <td
                                                        colspan="9"
                                                        class="label"
                                                    >
                                                        Total
                                                    </td>
                                                    <td>
                                                        {{
                                                            formCreateInvoice.total
                                                        }}
                                                    </td>
                                                </tr>
                                            </table>
                                            <div
                                                style="
                                                    margin-left: 90px;
                                                    margin-top: 40px;
                                                "
                                                class="setting-form-actions"
                                            >
                                                <sdButton
                                                    size="small"
                                                    type="primary"
                                                    @click.prevent="
                                                        handleSubmitCreateInvoice
                                                    "
                                                >
                                                    Save
                                                </sdButton>
                                                &nbsp; &nbsp;
                                                <sdButton
                                                    size="small"
                                                    @click.prevent="
                                                        onCloseCreateInvoiceDrawer
                                                    "
                                                    type="light"
                                                >
                                                    Cancel
                                                </sdButton>
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
                            :rowSelection="false"
                            @search="fetchClients"
                            @rowClick="onRowClick"
                        />
                    </sdCards>
                </BorderLessHeading>
            </a-col>

            <!-- Add Delivery Notes Modal -->
            <sdModal
                title="Add Delivery Notes"
                class="ninjadash_addTask-modal"
                :type="modalType"
                :visible="isAddDeliveryNote"
                :footer="null"
                :onCancel="onCloseModalForDeliveryNote"
            >
                <BasicFormWrapper>
                    <a-form :model="bulkAddForm" layout="vertical">
                        <a-collapse>
                            <a-collapse-panel
                                v-for="(note, index) in deliveryNotes"
                                :key="index"
                                :header="`Delivery Note #${note.delivery_note_number} -  Destination: ${note.destination}`"
                            >
                                <div class="note-details">
                                    <p>
                                        <strong>Pick-up Location:</strong>
                                        {{ note.pick_up_location }}
                                    </p>
                                    <p>
                                        <strong>Destination:</strong>
                                        {{ note.destination }}
                                    </p>
                                    <p>
                                        <strong>Date:</strong>
                                        {{ note.delivery_date }}
                                    </p>

                                    <a-table
                                        :dataSource="note.items"
                                        :columns="itemColumns"
                                        :pagination="false"
                                    />

                                    <a-checkbox
                                        v-model="note.selected"
                                        :disabled="note.isDisabled"
                                        @change="toggleNoteSelection(note)"
                                    >
                                        Add this Delivery Note
                                    </a-checkbox>
                                </div>
                            </a-collapse-panel>
                        </a-collapse>

                        <div
                            class="ninjadash-modal-actions"
                            style="margin-top: 20px"
                        >
                            <sdButton
                                size="sm"
                                type="light"
                                key="cancel"
                                outlined
                                @click.prevent="onCloseModalForDeliveryNote"
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
                </BasicFormWrapper>
            </sdModal>
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
    computed,
    watch,
} from "vue";
import { Main } from "../../../styled";
import DataTables from "@/components/table/DataTable.vue";
import { BorderLessHeading } from "../../../styled";
//import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

export default defineComponent({
    name: "Client",
    components: {
        Main,
        DataTables,
        BorderLessHeading,
    },
    setup() {
        //const { state } = useStore();
        const router = useRouter();
        const toast = useToast();

        const isLoading = ref(false);

        const countries = ref([]);
        const placement1 = ref("bottom");
        const openReceivePaymentDrawer = ref(false);
        const openCreateInvoiceDrawer = ref(false);

        const deliveryNotes = ref([]);

        const Clients = ref([]);
        const Accounts = ref([]);
        const isAddDeliveryNote = ref(false);
        const noItemsAvailable = ref(false);
        // let currentNumber = ref(100);

        // const generateSequentialNumber = () => {
        //     currentNumber.value += 1;
        //     return currentNumber.value.toString();
        // };

        const formatNumberWithCommas = (value) => {
            const number = Number(value);
            if (isNaN(number)) {
                return value;
            }
            return new Intl.NumberFormat().format(number);
        };


        const tableDataScource = ref([]);

        const fetchAllData = async () => {
            await Promise.all([
                fetchClients(),
                fetchCountries(),
                fetchClientsForCreateReceivePayment(),
                fetchAccounts(),
            ]);
        };

        const fetchClients = async (address = null) => {
            try {
                let response;
                if (address) {
                    // Call the searchDrivers method if a nationalId is provided
                    response = await searchClients(address);
                } else {
                    // Existing logic to fetch all drivers
                    response = await DataService.get("/clients");
                    console.log("Clients fetched", response.data);
                    if (response.status === 200) {
                        if (Array.isArray(response.data.Clients)) {
                            // Format the data to match the structure expected by DataTables
                            tableDataScource.value = response.data.Clients.map(
                                (client) => ({
                                    // id: `#${client.id}`,
                                    key: client.id,
                                    name: (
                                        <span class="ninjadash-username">
                                            {client.user.first_name} {""}{" "}
                                            {client.user.last_name}
                                        </span>
                                    ),

                                    company_name: (
                                        <span>{client.company_name}</span>
                                    ),
                                    phone: <span>{client.phone}</span>,
                                    open_balance: (
                                        <span>
                                            Ksh {formatNumberWithCommas(client.opening_balance)}
                                        </span>
                                    ),
                                    invoices: client.invoices,
                                }),
                            );
                        } else {
                            // No drivers found, handle accordingly
                            tableDataScource.value = [];
                        }
                    } else {
                        return;
                        //toast.error("Failed to fetch drivers. Please try again.");
                    }
                }
            } catch (error) {
                console.error("Error fetching Clients:", error);
                toast.error("An error occurred. Please try again.");
            }
        };

        const searchClients = async (address) => {
            try {
                const response = await DataService.get(
                    `/clients/search/${address}`,
                );
                if (
                    response.status === 200 &&
                    Array.isArray(response.data.Clients)
                ) {
                    tableDataScource.value = response.data.Clients.map(
                        (client) => ({
                            // id: `#${client.id}`,
                            key: client.id,
                            name: (
                                <span class="ninjadash-username">
                                    {client.user.first_name} {""}{" "}
                                    {client.user.last_name}
                                </span>
                            ),

                            company_name: <span>{client.company_name}</span>,
                            phone: <span>{client.phone}</span>,
                            open_balance: <span>{formatNumberWithCommas(client.opening_balance)}</span>,
                        }),
                    );
                } else {
                    tableDataScource.value = [];
                }
            } catch (error) {
                console.error("Error searching Clients:", error);
                toast.error("An error occurred. Please try again.");
            }
        };

        const fetchCountries = async () => {
            try {
                const response2 = await DataService.get(`/countries`);
                console.log("Countries fetched", response2.data.Countries);
                countries.value = response2.data.Countries;
            } catch (error) {
                console.error("Error fetching countries:", error);
                if (error.response2) {
                    console.error("Error response:", error.response2);
                }
            }
        };

        const fetchAccounts = async () => {
            try {
                const response = await DataService.get(
                    `/accounts/cash-and-cash-equivalents`,
                );
                console.log("Accounts fetched", response.data.Accounts);
                Accounts.value = response.data.Accounts;
            } catch (error) {
                console.error("Error fetching accounts:", error);
                if (error.response) {
                    console.error("Error response:", error.response);
                }
            }
        };

        const handleRowClick = (record) => {
            router.push(`/app/clients/${record}`);
        };

        const onRowClick = (record) => {
            viewClient(record.key);
        };

        const viewClient = (clientId) => {
            router.push(`/app/clients/${clientId}`);
        };

        const onCloseCreateInvoiceDrawer = () => {
            openCreateInvoiceDrawer.value = false;
        };

        const createInvoice = async (clientId) => {
            isLoading.value = true;
            console.log("Which is this id on receive payment:", clientId);

            try {
                const response = await DataService.get(
                    `/delivery_notes/client/${clientId}`,
                );
                console.log("Delivery notes fetched", response.data);

                deliveryNotes.value = response.data.Delivery_notes.map(
                    (note) => ({
                        ...note,
                        selected: false,
                        isDisabled: note.is_associated_with_invoice,
                    }),
                );

                if (deliveryNotes.value.length > 0) {
                    const client = deliveryNotes.value[0].client;
                    formCreateInvoice.client_id = clientId;
                    formCreateInvoice.client_name =
                        client.user.first_name + " " + client.user.last_name;
                } else {
                    formCreateInvoice.client_id = clientId;
                    formCreateInvoice.client_name = "";
                }

                noItemsAvailable.value = deliveryNotes.value.length === 0;
            } catch (error) {
                console.error("Error fetching Invoice:", error);
                if (error.response) {
                    console.error("Error response:", error.response);
                }
            } finally {
                isLoading.value = false;
                openCreateInvoiceDrawer.value = true;
            }
        };

        const toggleNoteSelection = (note) => {
            note.selected = !note.selected;
        };

        const handleSaveDelivery = () => {
            const selectedNotes = deliveryNotes.value.filter(
                (note) => note.selected && !note.isDisabled,
            );
            if (selectedNotes.length === 0) {
                toast.error("Please select at least one valid delivery note.");
                return;
            }

            selectedNotes.forEach((note) => {
                note.items.forEach((item) => {
                    formCreateInvoice.items.push({
                        itemDescription: item.itemDescription,
                        containerNumber: item.containerNumber,
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
            isAddDeliveryNote.value = false;
        };

        // const editClient = (clientId) => {
        //     router.push(`/app/clients/edit/${clientId}`);
        // };
        const deleteClient = async (clientId) => {
            if (
                window.confirm(
                    "Are you sure you want to delete this measurement? This action cannot be undone.",
                )
            ) {
                try {
                    await DataService.delete(`/clients/${clientId}`);
                    toast.success("Client  deleted successfully.");
                    await fetchClients(); // Refresh the list
                } catch (error) {
                    toast.error("Failed to delete client. Please try again.");
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
                title: "Name",
                dataIndex: "name",
                key: "name",
            },

            {
                title: "Company Name",
                dataIndex: "company_name",
                key: "company_name",
            },
            {
                title: "Phone",
                dataIndex: "phone",
                key: "coutry",
            },
            {
                title: "Open Balance",
                dataIndex: "open_balance",
                key: "open_balance",
            },

            {
                title: "Actions",
                dataIndex: "action",
                key: "action",
                width: "90px",
                customRender: ({ record }) => {
                    console.log("What is here really??", record);

                    const openBalance =
                        record.open_balance.children[1].children;

                    const emptyInvoices = record.invoices.length === 0;

                    console.log("I found this", openBalance);
                    const hasUnpaidInvoices = record.invoices.some(
                        (invoice) => invoice.payment_status === "pending",
                    );

                    const receivePaymentCheck =
                        !emptyInvoices && hasUnpaidInvoices;

                    return (
                        <div class="table-actions">
                            <button
                                style="color:blue; cursor: pointer"
                                class="view"
                                onClick={() => createInvoice(record.key)}
                            >
                                Create Invoice
                            </button>

                            <select
                                style=" appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    padding: 2px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f8f8f8;
    font-size: 12px;
    width: 80px;"
                                onChange={(event) =>
                                    handleActionChange(event, record.key)
                                }
                            >
                                <option value="">More Actions</option>
                                <option value="createSalesReceipt">
                                    Create Sales receipt
                                </option>

                                <option value="createInvoice">
                                    Create Invoice
                                </option>

                                {receivePaymentCheck && (
                                    <option value="receivePayment">
                                        Receive Payment
                                    </option>
                                )}

                                <option value="delete">Make Inactive</option>
                            </select>

                            <button
                                style="cursor: pointer"
                                class="view"
                                onClick={() => viewClient(record.key)}
                            >
                                <unicon name="eye"></unicon>
                            </button>
                            <button
                                style="cursor: pointer"
                                class="delete"
                                onClick={() => deleteClient(record.key)}
                            >
                                <unicon name="trash"></unicon>
                            </button>
                        </div>
                    );
                },
            },
        ];

        const handleActionChange = (event, key) => {
            const action = event.target.value;
            switch (action) {
                case "createInvoice":
                    createInvoice(key);
                    break;
                case "receivePayment":
                    receivePayment(key);
                    break;
                case "delete":
                    console.log(key);
                    //deleteSupplier(key);
                    break;
                case "createSalesReceipt":
                    console.log(key);
                    break;
                default:
                    console.log("No action selected");
            }
        };

        //Start of receive payment section //
        const fetchClientsForCreateReceivePayment = async () => {
            try {
                const response = await DataService.get("/clients");
                Clients.value = response.data.Clients;

                console.log("I am now receiving clients:", Clients.value);
            } catch (error) {
                console.error("Error fetching clients:", error);
                Clients.value = []; // Ensure it's always an array, even on error
            }
        };

        const receivePayment = async (clientId) => {
            isLoading.value = true;
            console.log("Which is this  id on  receive payment:", clientId);

            try {
                const response = await DataService.get(`/clients/${clientId}`);
                console.log(
                    "Details fetched of client for receving  payment",
                    response.data.Client,
                );

                Object.assign(invoiceDetails, response.data.Client);
                formState.client_id = response.data.Client.id;
                invoiceDetails.invoices = response.data.Client.invoices || [];

                // Collect invoice ids
                formState.invoice_ids = invoiceDetails.invoices
                    .filter((invoice) => invoice.total_amount !== "0")
                    .map((invoice) => invoice.id);
            } catch (error) {
                console.error("Error fetching Invoice:", error);
                if (error.response) {
                    console.error("Error response:", error.response);
                }
            } finally {
                isLoading.value = false;
                openReceivePaymentDrawer.value = true;
            }

            // formState2.supplier_id = supplierId;

            // openBilPaymentDrawer.value = true;
        };

        const filteredInvoices = computed(() => {
            return invoiceDetails.invoices.filter(
                (invoice) =>
                    invoice.total_amount !== "0" &&
                    invoice.payment_status !== "paid",
            );
        });

        onMounted(async () => {
            await fetchAllData();
            formCreateInvoice.invoice_number = generateInvoiceNumber();
        });

        const handleUpdateReceivePayment = async () => {
            if (!formState.client_id || !formState.account_id) {
                toast.error("Please fill in all required fields.");
                return; // Prevent form submission
            }

            const selectedClient = Clients.value.find(
                (client) => client.id === formState.client_id,
            );
            if (!selectedClient) {
                toast.error("Please select client.");
                return; // Prevent form submission
            }

            const selectedAccount = Accounts.value.find(
                (account) => account.id === formState.account_id,
            );
            if (!selectedAccount) {
                toast.error("Please select account.");
                return; // Prevent form submission
            }

            const formData3 = new FormData();

            formData3.append("client_id", formState.client_id);
            formData3.append("account_id", formState.account_id);
            formData3.append("total_amount", formState.total_amount);
            formState.invoice_ids.forEach((id, index) => {
                formData3.append(`invoice_ids[${index}]`, id);
            });

            try {
                isLoading.value = true;
                const response = await DataService.post(
                    "/update_invoice_payment",
                    formData3,
                );

                if (response.status === 201) {
                    toast.success("Record Saved Successfully");
                    formState.client_id = "";
                    formState.account_id = "";
                    formState.total_amount = "";
                    formState.invoice_ids = [];

                    onCloseReceivePaymentDrawer();

                    await fetchClients();

                    router.push({
                        path: "/app/clients",
                    });
                } else {
                    toast.error("Failed to add record. Please try again.");
                }
            } catch (error) {
                console.error("Record Add error", error);
                toast.error("An error occurred. Please try again.");
            } finally {
                isLoading.value = false;
            }
        };

        const onCloseReceivePaymentDrawer = () => {
            openReceivePaymentDrawer.value = false;
        };

        //End of Receive payment section

        //Start of Create invoice drawer

        const formCreateInvoice = reactive({
            client_id: "",
            client_name: "",
            invoice_number: "",
            invoice_date: "",
            total_amount: "",
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

        const openAddDeliveryNoteModal = () => {
            isAddDeliveryNote.value = true;
        };

        const generateInvoiceNumber = () => {
            return Math.floor(100000 + Math.random() * 900000).toString(); // Generates a random 6-digit number
        };

        const handleClientChange = () => {
            console.log("Client selected:", formCreateInvoice.client_id);
        };

        const handleSubmitCreateInvoice = async () => {
            if (
                !formCreateInvoice.client_id ||
                !formCreateInvoice.invoice_date
            ) {
                toast.error("Please fill in all required fields.");
                return;
            }

            // Format dates
            const formattedInvoiceDate = new Date(
                formCreateInvoice.invoice_date,
            )
                .toISOString()
                .split("T")[0];
            const formattedDueDate = formCreateInvoice.due_date
                ? new Date(formCreateInvoice.due_date)
                      .toISOString()
                      .split("T")[0]
                : null;
            const formattedTaxDate = formCreateInvoice.tax_date
                ? new Date(formCreateInvoice.tax_date)
                      .toISOString()
                      .split("T")[0]
                : null;

            // Prepare form data
            const formData = {
                lpo_no: formCreateInvoice.lpo_no
                    ? String(formCreateInvoice.lpo_no)
                    : "",
                invoice_number: formCreateInvoice.invoice_number
                    ? String(formCreateInvoice.invoice_number)
                    : "",
                client_id: String(formCreateInvoice.client_id),
                invoice_date: formattedInvoiceDate,
                total_amount: String(formCreateInvoice.total),
                subtotal: String(formCreateInvoice.subTotal),
                vat: formCreateInvoice.vat ? "Yes" : "No",
                vat_amount: formCreateInvoice.taxTotal
                    ? String(formCreateInvoice.taxTotal)
                    : "",
                notes: formCreateInvoice.notes
                    ? String(formCreateInvoice.notes)
                    : "",
                due_date: formattedDueDate,
                tax_date: formattedTaxDate,
                payment_terms: formCreateInvoice.payment_terms
                    ? String(formCreateInvoice.payment_terms)
                    : "",
                status: formCreateInvoice.status
                    ? String(formCreateInvoice.status)
                    : "",
                due_payment: formCreateInvoice.due_payment
                    ? String(formCreateInvoice.due_payment)
                    : "",
                payment_status: formCreateInvoice.payment_status
                    ? String(formCreateInvoice.payment_status)
                    : "",
                items: formCreateInvoice.items.map((item) => ({
                    itemDescription: String(item.itemDescription),
                    containerNumber: item.containerNumber
                        ? String(item.containerNumber)
                        : "",
                    deliveryNoteNumber: String(item.deliveryNoteNumber),
                    deliveryNoteFileRef: item.deliveryNoteFileRef
                        ? String(item.deliveryNoteFileRef)
                        : "",
                    loadingPoint: String(item.loadingPoint),
                    offLoadingPoint: String(item.offLoadingPoint),
                    qty: String(item.qty),
                    price: String(item.price),
                    tax: String(item.tax),
                    lineTotal: String(item.lineTotal),
                })),
            };

            console.log("What are we submitting for invoice", formData);

            try {
                isLoading.value = true;
                const response = await DataService.post("/invoices", formData);

                if (response.status === 201) {
                    toast.success("Invoice created successfully");
                    resetForm();
                    onCloseCreateInvoiceDrawer();
                    await fetchClients();
                    router.push({ path: "/app/clients" });
                } else if (
                    response.status === 400 &&
                    response.data.associated_notes
                ) {
                    const noteNumbers = response.data.associated_notes
                        .map((note) => note.delivery_note_number)
                        .join(", ");
                    toast.error(
                        `The following delivery notes are already associated with another invoice: ${noteNumbers}`,
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
            formCreateInvoice.client_id = "";
            formCreateInvoice.invoice_number = generateInvoiceNumber(); // Reset to a new random invoice number
            formCreateInvoice.total_amount = "";
            formCreateInvoice.subtotal = "";
            formCreateInvoice.vat_amount = "";
            formCreateInvoice.due_payment = "";
            formCreateInvoice.due_date = "";
            formCreateInvoice.tax_date = "";
            formCreateInvoice.item_description = "";
            formCreateInvoice.quantity = "";
            formCreateInvoice.payment_terms = "";
            formCreateInvoice.notes = "";
            formCreateInvoice.lpo_no = "";
            formCreateInvoice.items = [];
            formCreateInvoice.subTotal = 0;
            formCreateInvoice.taxTotal = 0;
            formCreateInvoice.total = 0;
        };

        //const open = ref(false);
        // const showDrawer = () => {
        //     open.value = true;
        // };
        // const onClose = () => {
        //     open.value = false;
        // };

        const addItem = () => {
            formCreateInvoice.items.push({
                itemDescription: "",
                containerNumber: "",
                deliveryNoteNumber: "",
                deliveryNoteFileRef: "",
                loadingPoint: "",
                offLoadingPoint: "",
                qty: 0,
                price: 0,
                tax: "16%",
                lineTotal: 0,
            });
        };

        const updateLineTotal = (index) => {
            const item = formCreateInvoice.items[index];
            item.lineTotal = (item.qty * item.price * 1.16).toFixed(2); // Assuming tax is included in line total
            updateSubtotalAndTotal();
        };

        const itemColumns = [
            {
                title: "Item ",
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

        const onCloseModalForDeliveryNote = () => {
            isAddDeliveryNote.value = false;
        };

        const updateSubtotalAndTotal = () => {
            formCreateInvoice.subTotal = formCreateInvoice.items.reduce(
                (total, item) => {
                    return total + parseFloat(item.lineTotal || 0);
                },
                0,
            );
            formCreateInvoice.taxTotal = (
                formCreateInvoice.subTotal * 0.16
            ).toFixed(2);
            formCreateInvoice.total = (
                formCreateInvoice.subTotal +
                parseFloat(formCreateInvoice.taxTotal)
            ).toFixed(2);
        };

        const clientName = computed(() => {
            const client = Clients.value.find(
                (client) => client.id === formCreateInvoice.client_id,
            );
            return client
                ? `${client.user.first_name} ${client.user.last_name}`
                : "";
        });

        watch(
            () => formCreateInvoice.client_id,
            () => {
                formCreateInvoice.client_name = clientName.value;
            },
        );
        //End of Create Invoice Drawer

        const formState = reactive({
            client_id: "",
            account_id: "",
            // supplier_id: "",
            total_amount: "",
            invoice_ids: [],
        });

        const invoiceDetails = reactive({
            invoices: [],
        });

        const form = reactive({
            first_name: "",
            last_name: "",
            email: "",
            company_pin: "",
            phone: "",
            website: "",
            is_password_set: "",
            email_verified_at: "",
            postal_code: "",
            address: "",
            country_id: "",
            city: "",
            province: "",
            company_name: "",
            note: "",
            opening_balance: "",
            open_as_of: "",
        });

        // Computed property to calculate the total amount
        const totalAmount = computed(() => {
            return invoiceDetails.invoices.reduce(
                (acc, invoice) => acc + parseFloat(invoice.total_amount || 0),
                0,
            );
        });

        // Watcher or method to update formState2.total_amount when totalAmount changes
        watch(totalAmount, (newTotal) => {
            formState.total_amount = newTotal.toFixed(2);
        });

        const handleFileUpload = (event, fieldName) => {
            const file = event.target.files[0];
            if (file) {
                form[fieldName] = file; // Update the form's state with the selected file
            }
        };

        console.log("Items to be submmited", form.value);

        // const handleSubmit = async () => {
        //     // Check if all required fields are filled
        //     if (
        //         !form.first_name ||
        //         !form.last_name ||
        //         !form.email ||
        //         !form.company_pin ||
        //         !form.phone
        //     ) {
        //         toast.error("Please fill in all required fields.");
        //         return; // Prevent form submission
        //     }

        //     // Check if the selected country is valid
        //     const selectedCountry = countries.value.find(
        //         (country) => country.id === form.country_id,
        //     );
        //     if (!selectedCountry) {
        //         toast.error("Please select country.");
        //         return; // Prevent form submission
        //     }

        //     const formattedAsof = new Date(form.open_as_of)
        //         .toISOString()
        //         .split("T")[0];

        //     const formData = new FormData();

        //     // Append existing form fields
        //     formData.append("first_name", form.first_name);
        //     formData.append("last_name", form.last_name);
        //     formData.append("email", form.email);
        //     formData.append("phone", form.phone);
        //     formData.append("company_pin", form.company_pin);
        //     formData.append("opening_balance", form.opening_balance);
        //     if (form.open_as_of) {
        //         formData.append("open_as_of", formattedAsof);
        //     }

        //     formData.append("website", form.website);
        //     formData.append("is_password_set", form.is_password_set);
        //     formData.append("email_verified_at", form.email_verified_at);
        //     formData.append("postal_code", form.postal_code);
        //     formData.append("address", form.address);
        //     formData.append("country_id", form.country_id);
        //     formData.append("city", form.city);
        //     formData.append("province", form.province);
        //     formData.append("company_name", form.company_name);
        //     formData.append("note", form.note);

        //     console.log("What am i sending to the backend", formData.value);

        //     try {
        //         isLoading.value = true;
        //         const response = await DataService.post("/clients", formData);

        //         console.log(
        //             "Client response after post:",
        //             response.data.client,
        //         );

        //         if (response.status === 201) {
        //             toast.success("Record Added Successfully");
        //             // Reset the form data to its initial state
        //             form.first_name = "";
        //             form.last_name = "";
        //             form.email = "";
        //             form.phone = "";
        //             form.website = "";
        //             form.postal_code = "";
        //             form.is_password_set = "";
        //             form.email_verified_at = "";
        //             form.address = "";
        //             form.country_id = "";
        //             form.state_id = "";
        //             form.city_id = "";
        //             form.company_pin = "";
        //             form.opening_balance = "";
        //             form.open_as_of = "";

        //             // Close the drawer
        //             open.value = false;

        //             //Fetch Clients again to update the table data

        //             await fetchClients();

        //             router.push({ path: "/app/clients" });
        //         } else {
        //             //console.error("Record Add Failed");
        //             toast.error("Failed to add record. Please try again.");
        //         }
        //     } catch (error) {
        //         console.error("Record Add error", error);
        //         console.log("Error Response:", error.response);

        //         if (error.response && error.response.status === 422) {
        //             // Extract the errors from the correct key
        //             const errorMessages = error.response.data.error || [];

        //             // Display each error message in its own toast
        //             errorMessages.forEach((message) => {
        //                 toast.error(message);
        //             });
        //         } else if (error.response && error.response.status === 500) {
        //             toast.error(
        //                 "A server error occurred. Please try again later.",
        //             );
        //         } else {
        //             toast.error("An error occurred. Please try again.");
        //         }
        //     } finally {
        //         isLoading.value = false;
        //     }
        // };

        const handleSubmit = async () => {
    // Check if all required fields are filled
    if (
        !form.first_name ||
        !form.last_name ||
        !form.email ||
        !form.company_pin ||
        !form.phone ||
        !form.country_id ||
        !form.postal_code ||
        !form.address ||
        !form.city
    ) {
        toast.error("Please fill in all required fields.");
        return; // Prevent form submission
    }

    // Check if the selected country is valid
    const selectedCountry = countries.value.find(
        (country) => country.id === form.country_id,
    );
    if (!selectedCountry) {
        toast.error("Please select a country.");
        return; // Prevent form submission
    }

    const formattedAsof = new Date(form.open_as_of)
        .toISOString()
        .split("T")[0];

    const formData = new FormData();

    // Append existing form fields
    formData.append("first_name", form.first_name);
    formData.append("last_name", form.last_name);
    formData.append("email", form.email);
    formData.append("phone", form.phone);
    formData.append("company_pin", form.company_pin);
    formData.append("opening_balance", form.opening_balance);
    if (form.open_as_of) {
        formData.append("open_as_of", formattedAsof);
    }

    formData.append("website", form.website);
    formData.append("is_password_set", form.is_password_set);
    formData.append("email_verified_at", form.email_verified_at);
    formData.append("postal_code", form.postal_code);
    formData.append("address", form.address);
    formData.append("country_id", form.country_id);
    formData.append("city", form.city);
    formData.append("province", form.province);
    formData.append("company_name", form.company_name);
    formData.append("note", form.note);

    console.log("What am I sending to the backend", formData.value);

    try {
        isLoading.value = true;
        const response = await DataService.post("/clients", formData);

        if (response.status === 201) {
            toast.success("Record Added Successfully");

            // Reset the form data to its initial state
            form.first_name = "";
            form.last_name = "";
            form.email = "";
            form.phone = "";
            form.website = "";
            form.postal_code = "";
            form.is_password_set = "";
            form.email_verified_at = "";
            form.address = "";
            form.country_id = "";
            form.city = "";
            form.province = "";
            form.company_pin = "";
            form.company_name = "";
            form.opening_balance = "";
            form.open_as_of = "";

            // Close the drawer
            open.value = false;

            //Fetch Clients again to update the table data
            await fetchClients();

            router.push({ path: "/app/clients" });
        } else {
            toast.error("Failed to add record. Please try again.");
        }
    } catch (error) {
        console.error("Record Add error", error);
        console.log("Error Response:", error.response);

        if (error.response && error.response.status === 422) {
            // Extract the errors from the correct key
            const errorMessages = error.response.data.error || [];

            // Display each error message in its own toast
            errorMessages.forEach((message) => {
                toast.error(message);
            });
        } else if (error.response && error.response.status === 500) {
            toast.error("A server error occurred. Please try again later.");
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
            open.value = false;
        };

        return {
            // data,
            // columns,
            // columnsPagination,
            tableDataScource,
            dataTableColumn,
            form,
            open,
            showDrawer,
            onClose,
            handleSubmit,
            isLoading,
            handleFileUpload,
            countries,
            fetchClients,
            formState,
            filteredInvoices,
            placement1,
            Clients,
            openReceivePaymentDrawer,
            openCreateInvoiceDrawer,
            Accounts,
            handleUpdateReceivePayment,
            addItem,
            updateSubtotalAndTotal,

            handleClientChange,
            updateLineTotal,
            itemColumns,
            toggleNoteSelection,
            handleSaveDelivery,
            formCreateInvoice,
            handleSubmitCreateInvoice,
            onCloseCreateInvoiceDrawer,
            handleRowClick,
            onRowClick,
            noItemsAvailable,
            onCloseModalForDeliveryNote,

            isAddDeliveryNote,
            openAddDeliveryNoteModal,
            deliveryNotes,

            // handleCancel,
            // handlePreview,
            // fileList,
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
    height: 100%;
}
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

.loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}

.custom-select:focus {
    outline: none;
    border-color: #007bff; /* Change border color on focus */
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); /* Add a subtle shadow on focus */
}

.wrapper-invoice {
    display: flex;
    justify-content: center;
}
.wrapper-invoice .invoice {
    height: auto;
    background: #fff;
    padding: 5vh;
    margin-top: 5vh;
    max-width: 400vh;
    width: 900px;
    box-sizing: border-box;
    border: 1px solid #dcdcdc;
}
.wrapper-invoice .invoice .invoice-information {
    float: right;
    text-align: right;
}
.wrapper-invoice .invoice .invoice-information b {
    color: "#0F172A";
}
.wrapper-invoice .invoice .invoice-information p {
    font-size: 2vh;
    color: gray;
}
.wrapper-invoice .invoice .invoice-logo-brand h2 {
    text-transform: uppercase;
    font-family:
        "Inter",
        -apple-system,
        BlinkMacSystemFont,
        "Segoe UI",
        Roboto,
        Oxygen,
        Ubuntu,
        Cantarell,
        "Open Sans",
        "Helvetica Neue",
        sans-serif;
    font-size: 2.9vh;
    color: "#0F172A";
}

.input-data {
    width: 150px;
    height: 10px;
    padding: 10px;
    border-radius: 5px;
    border: 0.5px solid gray;
}

.custom-select {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    padding: 2px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f8f8f8;
    font-size: 12px;
    width: 120px;
    max-width: 300px; /* Adjust the width as needed */
}
.custom-select1 {
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

.custom-select1:focus {
    outline: none;
    border-color: #007bff; /* Change border color on focus */
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); /* Add a subtle shadow on focus */
}

.loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}

.custom-select:focus {
    outline: none;
    border-color: #007bff; /* Change border color on focus */
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); /* Add a subtle shadow on focus */
}

.wrapper-invoice {
    display: flex;
    justify-content: center;
}
.wrapper-invoice .invoice {
    height: auto;
    background: #fff;
    padding: 5vh;
    margin-top: 5vh;
    max-width: 400vh;
    width: 900px;
    box-sizing: border-box;
    border: 1px solid #dcdcdc;
}
.wrapper-invoice .invoice .invoice-information {
    float: right;
    text-align: right;
}
.wrapper-invoice .invoice .invoice-information b {
    color: "#0F172A";
}
.wrapper-invoice .invoice .invoice-information p {
    font-size: 2vh;
    color: gray;
}
.wrapper-invoice .invoice .invoice-logo-brand h2 {
    text-transform: uppercase;
    font-family:
        "Inter",
        -apple-system,
        BlinkMacSystemFont,
        "Segoe UI",
        Roboto,
        Oxygen,
        Ubuntu,
        Cantarell,
        "Open Sans",
        "Helvetica Neue",
        sans-serif;
    font-size: 2.9vh;
    color: "#0F172A";
}
.switch {
    position: relative;
    display: inline-block;
    margin-top: 20px;
    width: 28px;
    height: 12px;
}

.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
}

.slider:before {
    position: absolute;
    content: "";
    height: 8px;
    width: 8px;
    left: 4px;
    bottom: 2.5px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
}

input:checked + .slider {
    background-color: #2196f3;
}

input:focus + .slider {
    box-shadow: 0 0 1px #2196f3;
}
input:checked + .slider:before {
    -webkit-transform: translateX(15px);
    -ms-transform: translateX(15px);
    transform: translateX(15px);
}

/* Rounded sliders */
.slider.round {
    border-radius: 34px;
}

.slider.round:before {
    border-radius: 50%;
}

.input-data {
    width: 150px;
    height: 10px;
    padding: 10px;
    border-radius: 5px;
    border: 0.5px solid gray;
}
.wrapper-invoice .invoice .invoice-logo-brand img {
    max-width: 100px;
    width: 100%;
    object-fit: fill;
}
.wrapper-invoice .invoice .invoice-head {
    display: flex;
    margin-top: 8vh;
}
.wrapper-invoice .invoice .invoice-head .head {
    width: 100%;
    box-sizing: border-box;
}
.wrapper-invoice .invoice .invoice-head .client-info {
    text-align: left;
}
.wrapper-invoice .invoice .invoice-head .client-info h2 {
    font-weight: 500;
    letter-spacing: 0.3px;
    font-size: 2vh;
    color: "#0F172A";
}
.wrapper-invoice .invoice .invoice-head .client-info p {
    font-size: 2vh;
    color: gray;
}
.wrapper-invoice .invoice .invoice-head .client-data {
    text-align: right;
}
.wrapper-invoice .invoice .invoice-head .client-data h2 {
    font-weight: 500;
    letter-spacing: 0.3px;
    font-size: 2vh;
    color: "#0F172A";
}
.wrapper-invoice .invoice .invoice-head .client-data p {
    font-size: 2vh;
    color: gray;
}
.wrapper-invoice .invoice .invoice-body {
    margin-top: 8vh;
}
.wrapper-invoice .invoice .invoice-body .table {
    border-collapse: collapse;
    width: 100%;
}
.wrapper-invoice .invoice .invoice-body .table thead tr th {
    font-size: 2vh;
    border: 1px solid #dcdcdc;
    text-align: left;
    padding: 1vh;
    background-color: #eeeeee;
}
.wrapper-invoice .invoice .invoice-body .table tbody tr td {
    font-size: 2vh;
    border: 1px solid #dcdcdc;
    text-align: left;
    padding: 1vh;
    background-color: #fff;
}
.wrapper-invoice .invoice .invoice-body .table tbody tr td:nth-child(2) {
    text-align: right;
}
.wrapper-invoice .invoice .invoice-body .flex-table {
    display: flex;
}
.wrapper-invoice .invoice .invoice-body .flex-table .flex-column {
    width: 100%;
    box-sizing: border-box;
}
.wrapper-invoice
    .invoice
    .invoice-body
    .flex-table
    .flex-column
    .table-subtotal {
    border-collapse: collapse;
    box-sizing: border-box;
    width: 100%;
    margin-top: 2vh;
}
.wrapper-invoice
    .invoice
    .invoice-body
    .flex-table
    .flex-column
    .table-subtotal
    tbody
    tr
    td {
    font-size: 2vh;
    border-bottom: 1px solid #dcdcdc;
    text-align: left;
    padding: 1vh;
    background-color: #fff;
}
.wrapper-invoice
    .invoice
    .invoice-body
    .flex-table
    .flex-column
    .table-subtotal
    tbody
    tr
    td:nth-child(2) {
    text-align: right;
}
.wrapper-invoice .invoice .invoice-body .invoice-total-amount {
    margin-top: 1rem;
}
.wrapper-invoice .invoice .invoice-body .invoice-total-amount p {
    font-weight: bold;
    color: "#0F172A";
    text-align: right;
    font-size: 2vh;
}
.wrapper-invoice .invoice .invoice-footer {
    margin-top: 4vh;
}
.wrapper-invoice .invoice .invoice-footer p {
    font-size: 1.7vh;
    color: gray;
}

.copyright {
    margin-top: 2rem;
    text-align: center;
}
.copyright p {
    color: gray;
    font-size: 1.8vh;
}

@media print {
    .table thead tr th {
        -webkit-print-color-adjust: exact;
        background-color: #eeeeee !important;
    }

    .copyright {
        display: none;
    }
}
.rtl .invoice-information {
    float: left !important;
    text-align: left !important;
}
.rtl .invoice-head .client-info {
    text-align: right !important;
}
.rtl .invoice-head .client-data {
    text-align: left !important;
}
.rtl .invoice-body .table thead tr th {
    text-align: right !important;
}
.rtl .invoice-body .table tbody tr td {
    text-align: right !important;
}
.rtl .invoice-body .table tbody tr td:nth-child(2) {
    text-align: left !important;
}

.rtl .invoice-body .invoice-total-amount p {
    text-align: left !important;
}
</style>
