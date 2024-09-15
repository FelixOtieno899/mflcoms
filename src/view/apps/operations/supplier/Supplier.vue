<template>
    <Main>
        <a-row :gutter="15">
            <a-col :xs="24">
                <BorderLessHeading>
                    <sdCards title="Manage Suppliers">
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
                                    title="Create New Supplier"
                                    :width="850"
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
                                                <a-col :span="12">
                                                    <p>Name and Contact</p>
                                                    <a-divider
                                                        style="
                                                            height: 2px;
                                                            background-color: #89cff0;
                                                            margin-top: -3px;
                                                        "
                                                    />
                                                </a-col>
                                            </a-row>

                                            <a-row :gutter="16">
                                                <a-col :span="3">
                                                    <a-form-item
                                                        label="Title"
                                                        name="title"
                                                        :rules="[
                                                            {
                                                                required: false,
                                                            },
                                                        ]"
                                                    >
                                                        <a-input
                                                            v-model:value="
                                                                form.title
                                                            "
                                                            placeholder=""
                                                        />
                                                    </a-form-item>
                                                </a-col>
                                                <a-col :span="7">
                                                    <a-form-item
                                                        label="First name"
                                                        name="first_name"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                                message:
                                                                    'First name required!',
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
                                                <a-col :span="7">
                                                    <a-form-item
                                                        label="Last name"
                                                        name="last_name"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                                message:
                                                                    'Last name required!',
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

                                                <a-col :span="7">
                                                    <a-form-item
                                                        label="Email"
                                                        name="email"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                                message:
                                                                    'Email required!',
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
                                                        label="Supplier display name"
                                                        name="supplier_display_name"
                                                    >
                                                        <a-input
                                                            type="text"
                                                            :value="
                                                                supplierDisplayName
                                                            "
                                                            readonly
                                                        />
                                                    </a-form-item>
                                                </a-col>

                                                <a-col :span="8">
                                                    <a-form-item
                                                        label="Company Name"
                                                        name="company_name"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                                message:
                                                                    'Company Name Required!',
                                                            },
                                                        ]"
                                                    >
                                                        <a-input
                                                            type="text"
                                                            v-model:value="
                                                                form.company_name
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
                                                                    'Phone required!',
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
                                            </a-row>

                                            <a-row :gutter="16">
                                                <a-col :span="8">
                                                    <a-form-item
                                                        label="Other"
                                                        name="other"
                                                    >
                                                        <a-input
                                                            type="text"
                                                            v-model:value="
                                                                form.other
                                                            "
                                                            placeholder=""
                                                        />
                                                    </a-form-item>
                                                </a-col>
                                                <a-col :span="8">
                                                    <a-form-item
                                                        label="Website"
                                                        name="website"
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

                                                <a-col :span="8">
                                                    <a-form-item
                                                        label="Product"
                                                        name="product_id"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                                message:
                                                                    'Required!',
                                                            },
                                                        ]"
                                                    >
                                                        <select
                                                            v-model="
                                                                form.product_id
                                                            "
                                                            class="custom-select1"
                                                        >
                                                            <option
                                                                disabled
                                                                value=""
                                                            >
                                                                Select product
                                                            </option>
                                                            <option
                                                                v-for="product in Products"
                                                                :key="
                                                                    product.id
                                                                "
                                                                :value="
                                                                    product.id
                                                                "
                                                            >
                                                                {{
                                                                    product.name
                                                                }}
                                                            </option>
                                                        </select>
                                                    </a-form-item>
                                                </a-col>
                                            </a-row>

                                            <a-row
                                                style="margin-top: 20px"
                                                :gutter="16"
                                            >
                                                <a-col :span="12">
                                                    <p>
                                                        <unicorn
                                                            name="location-point"
                                                        ></unicorn
                                                        >Address
                                                    </p>
                                                    <a-divider
                                                        style="
                                                            height: 2px;
                                                            background-color: #89cff0;
                                                            margin-top: -3px;
                                                        "
                                                    />
                                                </a-col>
                                            </a-row>

                                            <a-row :gutter="16">
                                                <a-col :span="24">
                                                    <a-form-item
                                                        label="Street Address"
                                                        name="address"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                                message:
                                                                    'Address required!',
                                                            },
                                                        ]"
                                                    >
                                                        <a-textarea
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
                                                        label="City"
                                                        name="city"
                                                    >
                                                        <a-input
                                                            type="text"
                                                            v-model:value="
                                                                form.city
                                                            "
                                                        />
                                                    </a-form-item>
                                                </a-col>
                                                <a-col :span="12">
                                                    <a-form-item
                                                        label="Province"
                                                        name="province"
                                                    >
                                                        <a-input
                                                            type="text"
                                                            v-model:value="
                                                                form.province
                                                            "
                                                        />
                                                    </a-form-item>
                                                </a-col>
                                            </a-row>

                                            <a-row :gutter="16">
                                                <a-col :span="12">
                                                    <a-form-item
                                                        label="Postal Code"
                                                        name="postal_code"
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

                                                <a-col :span="12">
                                                    <a-form-item
                                                        label="Country"
                                                        name="country_id"
                                                    >
                                                        <select
                                                            v-model="
                                                                form.country_id
                                                            "
                                                            class="custom-select1"
                                                        >
                                                            <option value="">
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
                                            </a-row>

                                            <a-row
                                                style="margin-top: 20px"
                                                :gutter="16"
                                            >
                                                <a-col :span="12">
                                                    <p>
                                                        <unicorn
                                                            name="location-point"
                                                        ></unicorn
                                                        >Notes and attachments
                                                    </p>
                                                    <a-divider
                                                        style="
                                                            height: 2px;
                                                            background-color: #89cff0;
                                                            margin-top: -3px;
                                                        "
                                                    />
                                                </a-col>
                                            </a-row>

                                            <a-row>
                                                <a-col :span="24">
                                                    <a-form-item
                                                        label="Notes"
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

                                            <a-row
                                                style="margin-top: 20px"
                                                :gutter="16"
                                            >
                                                <a-col :span="12">
                                                    <p>
                                                        <unicorn
                                                            name="location-point"
                                                        ></unicorn
                                                        >Additional info
                                                    </p>
                                                    <a-divider
                                                        style="
                                                            height: 2px;
                                                            background-color: #89cff0;
                                                            margin-top: -3px;
                                                        "
                                                    />
                                                </a-col>
                                            </a-row>

                                            <a-row :gutter="16">
                                                <a-col :span="12">
                                                    <a-form-item
                                                        label="Payment Terms"
                                                        name="payment_terms"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                                message:
                                                                    'Required!',
                                                            },
                                                        ]"
                                                    >
                                                        <select
                                                            v-model="
                                                                form.payment_terms
                                                            "
                                                            class="custom-select1"
                                                        >
                                                            <option value="">
                                                                Terms
                                                            </option>
                                                            <option
                                                                value="Due on receipt"
                                                            >
                                                                Due on receipt
                                                            </option>

                                                            <option
                                                                value="Net 15"
                                                            >
                                                                Net 15
                                                            </option>
                                                            <option
                                                                value="Net 30"
                                                            >
                                                                Net 30
                                                            </option>
                                                            <option
                                                                value="Net 60"
                                                            >
                                                                Net 60
                                                            </option>
                                                        </select>
                                                    </a-form-item>
                                                </a-col>

                                                <a-col :span="12">
                                                    <a-form-item
                                                        label="Account no."
                                                        name="account_number"
                                                    >
                                                        <a-input
                                                            type="text"
                                                            v-model:value="
                                                                form.account_number
                                                            "
                                                        />
                                                    </a-form-item>
                                                </a-col>
                                            </a-row>

                                            <a-row :gutter="16">
                                                <a-col :span="12">
                                                    <a-form-item
                                                        label="Opening balance"
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
                                                            type="text"
                                                            v-model:value="
                                                                form.opening_balance
                                                            "
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

                                            <a-row
                                                style="margin-top: 50px"
                                                :gutter="16"
                                            >
                                                <a-col :span="24">
                                                    <a-space align="end">
                                                        <a-button
                                                            @click="onClose"
                                                            >Cancel</a-button
                                                        >
                                                        <a-button
                                                            type="primary"
                                                            html-type="submit"
                                                            >Save</a-button
                                                        >
                                                    </a-space>
                                                </a-col>
                                            </a-row>
                                        </a-form>
                                    </template>
                                </a-drawer>

                                <a-drawer
                                    title="Create New Local Purchase Order"
                                    :width="1000"
                                    v-model:visible="openPurchaseOrderDrawer"
                                    :body-style="{ paddingBottom: '80px' }"
                                    :footer-style="{ textAlign: 'right' }"
                                    @close="
                                        () => (openPurchaseOrderDrawer = false)
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
                                                        <p>
                                                            <b>Order Date</b>:
                                                            <a-date-picker
                                                                v-model:value="
                                                                    formState.order_date
                                                                "
                                                                style="
                                                                    width: 30px;
                                                                    padding: 3px;
                                                                "
                                                                :get-popup-container="
                                                                    (trigger) =>
                                                                        trigger.parentElement
                                                                "
                                                            />
                                                        </p>
                                                        <p>
                                                            <b>Delivery Date</b>
                                                            :
                                                            <a-date-picker
                                                                v-model:value="
                                                                    formState.delivery_date
                                                                "
                                                                style="
                                                                    width: 30px;
                                                                    padding: 3px;
                                                                "
                                                                :get-popup-container="
                                                                    (trigger) =>
                                                                        trigger.parentElement
                                                                "
                                                            />
                                                        </p>

                                                        <p>
                                                            REF_NO:
                                                            <input
                                                                class="input-data"
                                                                type="text"
                                                                v-model="
                                                                    formState.reference_number
                                                                "
                                                            />
                                                        </p>

                                                        <!-- <p>
                                                            Status:
                                                            <select
                                                                v-model="
                                                                    formState.status
                                                                "
                                                                class="custom-select"
                                                            >
                                                                <option
                                                                    value=""
                                                                >
                                                                    Select
                                                                    Status
                                                                </option>
                                                                <option
                                                                    value="Approved"
                                                                >
                                                                    Approved
                                                                </option>
                                                                <option
                                                                    value="Cancelled"
                                                                >
                                                                    Cancelled
                                                                </option>
                                                                <option
                                                                    value="Draft"
                                                                >
                                                                    Draft
                                                                </option>
                                                            </select>
                                                        </p> -->
                                                    </div>
                                                    <!-- logo brand invoice -->
                                                    <p>Purchase Order</p>
                                                    <div
                                                        class="invoice-logo-brand"
                                                    >
                                                        Supplier:
                                                        <select
                                                            v-model="
                                                                formState.supplier_id
                                                            "
                                                            class="custom-select"
                                                        >
                                                            <option value="">
                                                                Choose Supplier
                                                            </option>
                                                            <template
                                                                v-if="Suppliers"
                                                            >
                                                                <option
                                                                    v-for="supplier in Suppliers"
                                                                    :key="
                                                                        supplier.id
                                                                    "
                                                                    :value="
                                                                        supplier.id
                                                                    "
                                                                >
                                                                    {{
                                                                        supplier.title
                                                                    }}
                                                                    {{
                                                                        supplier.first_name
                                                                    }}
                                                                    {{
                                                                        supplier.last_name
                                                                    }}
                                                                </option>
                                                            </template>
                                                            <template v-else>
                                                                <option
                                                                    disabled
                                                                >
                                                                    No suppliers
                                                                    available
                                                                </option>
                                                            </template>
                                                        </select>
                                                    </div>

                                                    <div class="invoice-footer">
                                                        <p>Mailing address</p>

                                                        <a-textarea
                                                            style="
                                                                width: 200px;
                                                                border-radius: 5px;
                                                                align-items: left;
                                                            "
                                                            readonly
                                                            v-model:value="
                                                                formattedSupplierDetails
                                                            "
                                                        />
                                                    </div>

                                                    <div class="invoice-body">
                                                        <table class="table">
                                                            <thead>
                                                                <tr>
                                                                    <th>
                                                                        Product/Service
                                                                    </th>
                                                                    <th>
                                                                        Item
                                                                        Description
                                                                    </th>
                                                                    <th>Qty</th>
                                                                    <th>
                                                                        Price/Rate
                                                                    </th>

                                                                    <th>
                                                                        Amount
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr
                                                                    v-for="(
                                                                        item,
                                                                        index
                                                                    ) in lineItems"
                                                                    :key="index"
                                                                >
                                                                    <td>
                                                                        <div>
                                                                            <select
                                                                                style="
                                                                                    border-radius: 5px;

                                                                                    width: 100px;
                                                                                    margin-left: 5px;
                                                                                "
                                                                                class=""
                                                                                v-model="
                                                                                    item.product_id
                                                                                "
                                                                            >
                                                                                <option
                                                                                    value=""
                                                                                >
                                                                                    Select
                                                                                    Product
                                                                                </option>
                                                                                <template
                                                                                    v-if="
                                                                                        Products
                                                                                    "
                                                                                >
                                                                                    <option
                                                                                        v-for="product in Products"
                                                                                        :key="
                                                                                            product.id
                                                                                        "
                                                                                        :value="
                                                                                            product.id
                                                                                        "
                                                                                    >
                                                                                        {{
                                                                                            product.name
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
                                                                                        products
                                                                                        available
                                                                                    </option>
                                                                                </template>
                                                                            </select>
                                                                        </div>
                                                                    </td>

                                                                    <td>
                                                                        <textarea
                                                                            style="
                                                                                width: 200px;
                                                                                border-radius: 5px;
                                                                            "
                                                                            class=""
                                                                            type="text"
                                                                            v-model="
                                                                                item.itemDescription
                                                                            "
                                                                        />
                                                                    </td>
                                                                    <td>
                                                                        <div
                                                                            style="
                                                                                display: flex;
                                                                                justify-content: space-between;
                                                                            "
                                                                        >
                                                                            <input
                                                                                style="
                                                                                    width: 40px;
                                                                                "
                                                                                class="input-data"
                                                                                type="text"
                                                                                v-model="
                                                                                    item.quantity
                                                                                "
                                                                            />
                                                                            <br />
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div
                                                                            style="
                                                                                display: flex;
                                                                                justify-content: space-between;
                                                                            "
                                                                        >
                                                                            <input
                                                                                style="
                                                                                    width: 80px;
                                                                                "
                                                                                class="input-data"
                                                                                type="text"
                                                                                v-model="
                                                                                    item.unit_price
                                                                                "
                                                                            />
                                                                        </div>
                                                                    </td>

                                                                    <td>
                                                                        <div
                                                                            style="
                                                                                display: flex;
                                                                                justify-content: space-between;
                                                                            "
                                                                        >
                                                                            <input
                                                                                style="
                                                                                    width: 80px;
                                                                                "
                                                                                class="input-data"
                                                                                type="text"
                                                                                v-model="
                                                                                    item.amount
                                                                                "
                                                                            />
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
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
                                                                    addLineItem
                                                                "
                                                            >
                                                                + add New Line
                                                                Item
                                                            </sdButton>

                                                            <sdButton
                                                                size="small"
                                                                type="danger"
                                                                @click.prevent="
                                                                    removeLastLineItem
                                                                "
                                                            >
                                                                - remove Line
                                                                Item
                                                            </sdButton>
                                                        </div>

                                                        <div
                                                            class="invoice-total-amount"
                                                        >
                                                            <p>
                                                                Subtotal :
                                                                <input
                                                                    class="input-data"
                                                                    type="text"
                                                                    v-model="
                                                                        formState.sub_total
                                                                    "
                                                                />
                                                            </p>
                                                        </div>
                                                        <!-- invoice total  -->
                                                        <div
                                                            class="invoice-total-amount"
                                                        >
                                                            <p>
                                                                Total :
                                                                <input
                                                                    class="input-data"
                                                                    type="text"
                                                                    v-model="
                                                                        formState.total_amount
                                                                    "
                                                                />
                                                            </p>
                                                        </div>

                                                        <div
                                                            class="invoice-footer"
                                                        >
                                                            Your Message to
                                                            Supplier
                                                            <p>
                                                                <textarea
                                                                    style="
                                                                        width: 250px;
                                                                        height: 60px;
                                                                        border-radius: 5px;
                                                                    "
                                                                    class=""
                                                                    type="text"
                                                                    v-model="
                                                                        formState.note
                                                                    "
                                                                />
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </section>

                                            <div
                                                style="
                                                    margin-left: 120px;
                                                    margin-top: 40px;
                                                "
                                                class="setting-form-actions"
                                            >
                                                <sdButton
                                                    size="small"
                                                    type="primary"
                                                    @click.prevent="
                                                        handleSubmitPurchaseOrder
                                                    "
                                                >
                                                    Save
                                                </sdButton>

                                                &nbsp; &nbsp;
                                                <sdButton
                                                    size="small"
                                                    @click.prevent="
                                                        () =>
                                                            (openPurchaseOrderDrawer = false)
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
                                    title="Create New Bill"
                                    :width="1000"
                                    :height="600"
                                    v-model:visible="openCreateBillDrawer"
                                    :placement="placement"
                                    :body-style="{ paddingBottom: '80px' }"
                                    :footer-style="{ textAlign: 'right' }"
                                    @close="
                                        () => (openCreateBillDrawer = false)
                                    "
                                >
                                    <template v-if="isLoading">
                                        <a-space class="loading">
                                            <a-spin size="large" />
                                        </a-space>
                                    </template>

                                    <template v-else>
                                        <form
                                            :model="formState1"
                                            layout="vertical"
                                        >
                                            <section class="wrapper-invoice">
                                                <!-- switch mode rtl by adding class rtl on invoice class -->
                                                <div class="invoice">
                                                    <div
                                                        class="invoice-information"
                                                    >
                                                        <p>
                                                            <b>Bill Date</b>:
                                                            <a-date-picker
                                                                v-model:value="
                                                                    formState1.bill_date
                                                                "
                                                                style="
                                                                    width: 30px;
                                                                    padding: 3px;
                                                                "
                                                                :get-popup-container="
                                                                    (trigger) =>
                                                                        trigger.parentElement
                                                                "
                                                            />
                                                        </p>
                                                        <p>
                                                            <b>Due Date</b>
                                                            :
                                                            <a-date-picker
                                                                v-model:value="
                                                                    formState1.due_date
                                                                "
                                                                style="
                                                                    width: 30px;
                                                                    padding: 3px;
                                                                "
                                                                :get-popup-container="
                                                                    (trigger) =>
                                                                        trigger.parentElement
                                                                "
                                                            />
                                                        </p>

                                                        <p>
                                                            Bill No:
                                                            <input
                                                                class="input-data"
                                                                type="text"
                                                                v-model="
                                                                    formState1.bill_no
                                                                "
                                                            />
                                                        </p>

                                                        <p>
                                                            Terms:
                                                            <select
                                                                v-model="
                                                                    formState1.payment_terms
                                                                "
                                                                class="custom-select"
                                                            >
                                                                <option
                                                                    value=""
                                                                ></option>
                                                                <option
                                                                    value="Due on receipt"
                                                                >
                                                                    Due on
                                                                    receipt
                                                                </option>
                                                                <option
                                                                    value="Net 15"
                                                                >
                                                                    Net 15
                                                                </option>
                                                                <option
                                                                    value="Net 30"
                                                                >
                                                                    Net 30
                                                                </option>

                                                                <option
                                                                    value="Net 60"
                                                                >
                                                                    Net 60
                                                                </option>
                                                            </select>
                                                        </p>
                                                    </div>
                                                    <!-- logo brand invoice -->
                                                    <p>Bill</p>
                                                    <div
                                                        class="invoice-logo-brand"
                                                    >
                                                        Supplier:
                                                        <select
                                                            v-model="
                                                                formState1.supplier_id
                                                            "
                                                            class="custom-select"
                                                        >
                                                            <option value="">
                                                                Choose Supplier
                                                            </option>
                                                            <template
                                                                v-if="Suppliers"
                                                            >
                                                                <option
                                                                    v-for="supplier in Suppliers"
                                                                    :key="
                                                                        supplier.id
                                                                    "
                                                                    :value="
                                                                        supplier.id
                                                                    "
                                                                >
                                                                    {{
                                                                        supplier.title
                                                                    }}
                                                                    {{
                                                                        supplier.first_name
                                                                    }}
                                                                    {{
                                                                        supplier.last_name
                                                                    }}
                                                                </option>
                                                            </template>
                                                            <template v-else>
                                                                <option
                                                                    disabled
                                                                >
                                                                    No suppliers
                                                                    available
                                                                </option>
                                                            </template>
                                                        </select>
                                                    </div>
                                                    <br />

                                                    <!-- <div
                                                        class="invoice-logo-brand"
                                                     >
                                                        Account:
                                                        <select
                                                            v-model="
                                                                formState1.account_id
                                                            "
                                                            class="custom-select"
                                                        >
                                                            <option value="">
                                                                Select an
                                                                account
                                                            </option>
                                                            <template
                                                                v-if="Accounts"
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
                                                            <template v-else>
                                                                <option
                                                                    disabled
                                                                >
                                                                    No accounts
                                                                    available
                                                                </option>
                                                            </template>
                                                        </select>
                                                    </div> -->

                                                    <div
                                                        style="margin-top: 20px"
                                                        class="invoice-logo-brand"
                                                    >
                                                        Purchase Order:
                                                        <select
                                                            v-model="
                                                                formState1.purchase_order_id
                                                            "
                                                            class="custom-select"
                                                        >
                                                            <option value="">
                                                                Select purchase
                                                                order
                                                            </option>
                                                            <template
                                                                v-if="
                                                                    purchaseOrders
                                                                "
                                                            >
                                                                <option
                                                                    v-for="purchaseOrder in purchaseOrders"
                                                                    :key="
                                                                        purchaseOrder.id
                                                                    "
                                                                    :value="
                                                                        purchaseOrder.id
                                                                    "
                                                                >
                                                                    {{
                                                                        purchaseOrder.reference_number
                                                                    }}
                                                                </option>
                                                            </template>
                                                            <template v-else>
                                                                <option
                                                                    disabled
                                                                >
                                                                    No pos
                                                                    available
                                                                </option>
                                                            </template>
                                                        </select>
                                                    </div>

                                                    <div class="invoice-footer">
                                                        <p>Mailing address</p>
                                                        <a-textarea
                                                            style="
                                                                width: 200px;
                                                                border-radius: 5px;
                                                                align-items: left;
                                                            "
                                                            readonly
                                                            v-model:value="
                                                                formattedSupplierDetails2
                                                            "
                                                        />
                                                    </div>

                                                    <div class="invoice-body">
                                                        <table class="table">
                                                            <thead>
                                                                <tr>
                                                                    <th>
                                                                        Item
                                                                        Description
                                                                    </th>
                                                                    <th>Qty</th>
                                                                    <th>
                                                                        Price/Rate
                                                                    </th>
                                                                    <th>
                                                                        Amount
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr
                                                                    v-for="(
                                                                        item,
                                                                        index
                                                                    ) in lineItems2"
                                                                    :key="index"
                                                                >
                                                                    <td>
                                                                        <div>
                                                                            {{
                                                                                item.itemDescription
                                                                            }}
                                                                        </div>
                                                                    </td>

                                                                    <td>
                                                                        <div
                                                                            style="
                                                                                display: flex;
                                                                                justify-content: space-between;
                                                                            "
                                                                        >
                                                                            <input
                                                                                style="
                                                                                    width: 80px;
                                                                                "
                                                                                class="input-data"
                                                                                type="text"
                                                                                v-model="
                                                                                    item.quantity
                                                                                "
                                                                            />
                                                                            <br />
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div
                                                                            style="
                                                                                display: flex;
                                                                                justify-content: space-between;
                                                                            "
                                                                        >
                                                                            <input
                                                                                style="
                                                                                    width: 100px;
                                                                                "
                                                                                class="input-data"
                                                                                type="text"
                                                                                v-model="
                                                                                    item.unit_price
                                                                                "
                                                                            />
                                                                        </div>
                                                                    </td>

                                                                    <td>
                                                                        <div
                                                                            style="
                                                                                display: flex;
                                                                                justify-content: space-between;
                                                                            "
                                                                        >
                                                                            <input
                                                                                style="
                                                                                    width: 120px;
                                                                                "
                                                                                class="input-data"
                                                                                type="text"
                                                                                v-model="
                                                                                    item.amount
                                                                                "
                                                                            />
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <!-- <div
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
                                                                    addLineItem2
                                                                "
                                                            >
                                                                + add New Line
                                                                Item
                                                            </sdButton>

                                                            <sdButton
                                                                size="small"
                                                                type="danger"
                                                                @click.prevent="
                                                                    removeLastLineItem2
                                                                "
                                                            >
                                                                - remove Line
                                                                Item
                                                            </sdButton>
                                                        </div> -->

                                                        <div
                                                            class="invoice-total-amount"
                                                        >
                                                            <p>
                                                                Subtotal :Ksh
                                                                <input
                                                                    class="input-data"
                                                                    type="text"
                                                                    v-model="
                                                                        formState1.sub_total
                                                                    "
                                                                />
                                                            </p>
                                                        </div>

                                                        <div
                                                            class="invoice-total-amount"
                                                        >
                                                            <p>
                                                                Total :Ksh
                                                                <input
                                                                    class="input-data"
                                                                    type="text"
                                                                    v-model="
                                                                        formState1.total_amount
                                                                    "
                                                                />
                                                            </p>
                                                        </div>

                                                        <div
                                                            class="invoice-footer"
                                                        >
                                                            Notes:
                                                            <p>
                                                                <textarea
                                                                    style="
                                                                        width: 250px;
                                                                        height: 60px;
                                                                        border-radius: 5px;
                                                                    "
                                                                    class=""
                                                                    type="text"
                                                                    v-model="
                                                                        formState1.note
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
                                                        handleSubmitCreateBill
                                                    "
                                                >
                                                    Save
                                                </sdButton>

                                                &nbsp; &nbsp;
                                                <sdButton
                                                    size="small"
                                                    @click.prevent="
                                                        () =>
                                                            (openCreateBillDrawer = false)
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
                                    title="Bill Payment"
                                    :width="1000"
                                    :height="600"
                                    :visible="openBilPaymentDrawer"
                                    :placement="placement1"
                                    :body-style="{ paddingBottom: '80px' }"
                                    :footer-style="{ textAlign: 'right' }"
                                    @close="
                                        () => (openBilPaymentDrawer = false)
                                    "
                                >
                                    <template v-if="isLoading">
                                        <a-space class="loading">
                                            <a-spin size="large" />
                                        </a-space>
                                    </template>

                                    <template v-else>
                                        <form
                                            :model="formState2"
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
                                                            Account:
                                                            <select
                                                                v-model="
                                                                    formState2.account_id
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
                                                                margin-top: 15px;
                                                            "
                                                        >
                                                            Balance:Ksh
                                                            <input
                                                                style="
                                                                    width: 100px;
                                                                "
                                                                class="input-data"
                                                                type="text"
                                                                v-model="
                                                                    accountBalance.balance
                                                                "
                                                                readonly
                                                            />
                                                        </p>

                                                        <p
                                                            style="
                                                                margin-top: 80px;
                                                            "
                                                        >
                                                            Amount: Ksh

                                                            <input
                                                                readonly
                                                                style="
                                                                    outline: none;
                                                                "
                                                                class="input-data"
                                                                type="text"
                                                                v-model="
                                                                    formState2.total_amount
                                                                "
                                                            />
                                                        </p>
                                                    </div>
                                                    <!-- logo brand invoice -->
                                                    <p>Bill Payment No</p>
                                                    <div
                                                        class="invoice-logo-brand"
                                                    >
                                                        Payee:
                                                        <select
                                                            v-model="
                                                                formState2.supplier_id
                                                            "
                                                            class="custom-select"
                                                        >
                                                            <option value="">
                                                                Choose Supplier
                                                            </option>
                                                            <template
                                                                v-if="Suppliers"
                                                            >
                                                                <option
                                                                    v-for="supplier in Suppliers"
                                                                    :key="
                                                                        supplier.id
                                                                    "
                                                                    :value="
                                                                        supplier.id
                                                                    "
                                                                >
                                                                    {{
                                                                        supplier.title
                                                                    }}
                                                                    {{
                                                                        supplier.first_name
                                                                    }}
                                                                    {{
                                                                        supplier.last_name
                                                                    }}
                                                                </option>
                                                            </template>
                                                            <template v-else>
                                                                <option
                                                                    disabled
                                                                >
                                                                    No suppliers
                                                                    available
                                                                </option>
                                                            </template>
                                                        </select>
                                                    </div>

                                                    <p></p>

                                                    <div class="invoice-footer">
                                                        <p>Mailing address</p>
                                                        <a-textarea
                                                            style="
                                                                width: 200px;
                                                                border-radius: 5px;
                                                                align-items: left;
                                                            "
                                                            readonly
                                                            v-model:value="
                                                                formattedSupplierDetails3
                                                            "
                                                        />
                                                    </div>

                                                    <div class="invoice-body">
                                                        <p>
                                                            Outstanding
                                                            Transactions:
                                                        </p>
                                                        <table class="table">
                                                            <thead>
                                                                <tr>
                                                                    <th>
                                                                        Due Date
                                                                    </th>
                                                                    <th>
                                                                        Payment
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr
                                                                    v-for="bill in filteredBills"
                                                                    :key="
                                                                        bill.id
                                                                    "
                                                                >
                                                                    <td>
                                                                        {{
                                                                            bill.due_date
                                                                        }}
                                                                    </td>

                                                                    <td>
                                                                        {{
                                                                            bill.total_amount
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
                                                                        formState2.total_amount
                                                                    "
                                                                />
                                                            </p>
                                                        </div>

                                                        <!-- <div
                                                            class="invoice-footer"
                                                        >
                                                            Notes:
                                                            <p>
                                                                <textarea
                                                                    style="
                                                                        width: 250px;
                                                                        height: 60px;
                                                                        border-radius: 5px;
                                                                    "
                                                                    class=""
                                                                    type="text"
                                                                    v-model="
                                                                        formState1.note
                                                                    "
                                                                />
                                                            </p>
                                                        </div> -->
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
                                                        handleUpdateBill
                                                    "
                                                >
                                                    Save
                                                </sdButton>

                                                &nbsp; &nbsp;
                                                <sdButton
                                                    size="small"
                                                    @click.prevent="
                                                        () =>
                                                            (openBilPaymentDrawer = false)
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
                            @search="fetchSuppliers"
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
    name: "Supplier",
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

        const Vendors = ref([]);

        const countries = ref([]);

        const Accounts = ref([]);

        const purchaseOrders = ref([]);

        const Products = ref([]);

        const Suppliers = ref([]);

        const placement = ref("top");

        const placement1 = ref("bottom");

        const unitsOfMeasures = ref([]);

        const openPurchaseOrderDrawer = ref(false);

        const openCreateBillDrawer = ref(false);

        const openBilPaymentDrawer = ref(false);

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
                fetchSuppliers(),
                fetchVendors(),
                fetchCountries(),
                fetchSuppliersForCreatePurchaseOrders(),
                fetchProducts(),
                fetchUnitsOfMeasures(),
                fetchAccounts(),
                fetchPurchaseOrders(),
            ]);
        };

        const fetchSuppliers = async (name = null) => {
            try {
                isLoading.value = true;
                let response;

                if (name) {
                    // Call the searchSuppliers method if name is provided
                    response = await searchSuppliers(name);
                } else {
                    // Existing logic to fetch all suppliers
                    response = await DataService.get("/suppliers");
                    console.log("Suppliers fetched", response.data);

                    if (response.status === 200) {
                        if (Array.isArray(response.data.Suppliers)) {
                            // Format the data to match the structure expected by DataTables
                            tableDataScource.value =
                                response.data.Suppliers.map((supplier) => ({
                                    key: supplier.id,
                                    supplier: (
                                        <span class="ninjadash-username">
                                            {supplier.title}{" "}
                                            {supplier.first_name}{" "}
                                            {supplier.last_name}
                                        </span>
                                    ),
                                    company_name: (
                                        <span>{supplier.company_name}</span>
                                    ),
                                    email: <span>{supplier.email}</span>,
                                    phone: <span>{supplier.phone}</span>,
                                    open_balance: (
                                        <span>
                                            Ksh{" "}
                                            {formatNumberWithCommas(
                                                supplier.opening_balance,
                                            )}
                                        </span>
                                    ),
                                    bills: supplier.bills,
                                    lpos: supplier.lpos,
                                }));

                            console.log(
                                "Whats inside this tabledatasource",
                                tableDataScource.value,
                            );
                        } else {
                            // No suppliers found, handle accordingly
                            tableDataScource.value = [];
                        }
                    } else {
                        toast.error(
                            "Failed to fetch suppliers. Please try again.",
                        );
                    }
                }
            } catch (error) {
                console.error("Error fetching suppliers:", error);
                toast.error("An error occurred. Please try again.");
            } finally {
                isLoading.value = false;
            }
        };

        const searchSuppliers = async (name) => {
            try {
                const response = await DataService.get(
                    `/suppliers/search/${name}`,
                );
                if (
                    response.status === 200 &&
                    Array.isArray(response.data.Supplier)
                ) {
                    tableDataScource.value = response.data.Supplier.map(
                        (supplier) => ({
                            key: supplier.id,
                            supplier: (
                                <span class="ninjadash-username">
                                    {supplier.title} {supplier.first_name}{" "}
                                    {supplier.last_name}
                                </span>
                            ),

                            company_name: <span>{supplier.company_name}</span>,
                            email: <span>{supplier.email}</span>,
                            phone: <span>{supplier.phone}</span>,
                            open_balance: (
                                <>
                                    <span>
                                        Ksh {supplier.opening_balance}
                                        .toFixed(2)
                                    </span>
                                </>
                            ),
                        }),
                    );
                } else {
                    tableDataScource.value = [];
                }
            } catch (error) {
                console.error("Error searching suppliers:", error);
                toast.error("An error occurred. Please try again.");
            }
        };

        const fetchVendors = async () => {
            try {
                const response5 = await DataService.get(`/vendor_type`);
                console.log("Vendors fetched", response5.data.Vendor_types);
                Vendors.value = response5.data.Vendor_types;
            } catch (error) {
                console.error("Error fetching vendors:", error);
                if (error.response5) {
                    console.error("Error response:", error.response5);
                }
            }
        };

        const fetchSuppliersForCreatePurchaseOrders = async () => {
            try {
                const response = await DataService.get("/suppliers");
                Suppliers.value = response.data.Suppliers;

                console.log("I am now receiving suppliers:", Suppliers.value);
            } catch (error) {
                console.error("Error fetching suppliers:", error);
                Suppliers.value = []; // Ensure it's always an array, even on error
            }
        };

        const fetchProducts = async () => {
            try {
                const response = await DataService.get("/products");
                Products.value = response.data.Products;

                console.log("I am now receiving Products:", Products.value);
            } catch (error) {
                console.error("Error fetching products:", error);
                Products.value = []; // Ensure it's always an array, even on error
            }
        };

        const fetchUnitsOfMeasures = async () => {
            try {
                const response3 = await DataService.get(`/units_of_measure`);
                console.log("Units of Measures fetched", response3.data);
                unitsOfMeasures.value = response3.data.Units;
            } catch (error) {
                console.error("Error fetching units of measures:", error);
                if (error.response3) {
                    console.error("Error response:", error.response3);
                }
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
                const response = await DataService.get(`/account`);
                console.log("Accounts fetched", response.data.Accounts);
                Accounts.value = response.data.Accounts;
            } catch (error) {
                console.error("Error fetching accounts:", error);
                if (error.response) {
                    console.error("Error response:", error.response);
                }
            }
        };

        const fetchPurchaseOrders = async () => {
            try {
                const response = await DataService.get(`/lpo`);
                console.log("Purchase orders fetched", response.data.LPOs);

                const filteredLPos = response.data.LPOs.filter(
                    (lpo) => lpo.status !== "pending",
                );
                purchaseOrders.value = filteredLPos;
            } catch (error) {
                console.error("Error fetching purchase orders:", error);
                if (error.response) {
                    console.error("Error response:", error.response);
                }
            }
        };

        const editSupplier = (supplierId) => {
            router.push(`/app/suppliers/edit/${supplierId}`);
        };

        const viewSupplier = (supplierId) => {
            router.push(`/app/suppliers/${supplierId}`);
        };

        const deleteSupplier = async (supplierId) => {
            if (
                window.confirm(
                    "Are you sure you want to delete this supplier? This action cannot be undone.",
                )
            ) {
                try {
                    await DataService.delete(`/suppliers/${supplierId}`);
                    toast.success("Supplier  deleted successfully.");
                    await fetchSuppliers(); // Refresh the list
                } catch (error) {
                    toast.error(
                        "Failed to delete  supplier. Please try again.",
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
                title: "Supplier",
                dataIndex: "supplier",
                key: "supplier",
            },

            {
                title: "Company Name",
                dataIndex: "company_name",
                key: "company_name",
            },
            {
                title: "Email",
                dataIndex: "email",
                key: "coutry",
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
                    console.log("What is here really again??", record);

                    const hasUnpaidBills = record.bills.some(
                        (bill) => bill.status === "unpaid",
                    );

                    const emptyBills = record.bills.length === 0;

                    const emptyLpos = record.lpos.length === 0;
                    const approvedLpos = record.lpos.some(
                        (lpo) => lpo.status === "approved",
                    );

                    console.log(approvedLpos);

                    const createbillCheck = !emptyLpos;

                    // Check if there are unpaid bills and the bills array is not empty
                    const makePaymentCheck = hasUnpaidBills && !emptyBills;

                    return (
                        <div class="table-actions">
                            {makePaymentCheck && (
                                <button
                                    style="color:blue"
                                    class="view"
                                    onClick={() => makePayment(record.key)}
                                >
                                    Make Payment
                                </button>
                            )}

                            <select
                                style=" appearance: none;
                                    -webkit-appearance: none;
                                    -moz-appearance: none;
                                    padding: 2px;
                                    border: 1px solid #ccc;
                                    border-radius: 5px;
                                    background-color: #f8f8f8;
                                    font-size: 12px;
                                    width: 80px;
                                    margin-top: -20px
                                                     "
                                onChange={(event) =>
                                    handleActionChange(event, record.key)
                                }
                            >
                                <option value="">More Actions</option>
                                <option value="createExpense">
                                    Create Expense
                                </option>
                                {createbillCheck && (
                                    <option value="createBill">
                                        Create Bill
                                    </option>
                                )}

                                <option value="createPO">
                                    Create Purchase Order
                                </option>
                                <option value="editSupplier">
                                    Edit Supplier
                                </option>

                                <option value="delete">Make Inactive</option>
                            </select>
                            <button
                                style="font-size: 12px"
                                class="delete"
                                onClick={() => viewSupplier(record.key)}
                            >
                                <unicon name="eye"></unicon>
                            </button>
                            <button
                                style="font-size: 12px"
                                class="delete"
                                onClick={() => deleteSupplier(record.key)}
                            >
                                <unicon name="trash"></unicon>
                            </button>
                        </div>
                    );
                },
            },
        ];

        const supplierDetails = reactive({
            title: "",
            first_name: "",
            last_name: "",
            company_name: "",
            address: "",
            city: "",
        });

        const supplierDetails2 = reactive({
            title: "",
            first_name: "",
            last_name: "",
            company_name: "",
            address: "",
            city: "",
        });

        const supplierDetails3 = reactive({
            title: "",
            first_name: "",
            last_name: "",
            company_name: "",
            address: "",
            city: "",
            bills: [],
        });

        const filteredBills = computed(() => {
            return supplierDetails3.bills.filter(
                (bill) => bill.total_amount !== "0" && bill.status !== "paid",
            );
        });

        //console.log("What is being updated here", supplierDetails.value);

        const showPurchaseOrderDrawer = async (supplierId) => {
            console.log("Which is this id:", supplierId);

            try {
                const response = await DataService.get(
                    `/suppliers/${supplierId}`,
                );
                console.log("Details fetched of supplier", response.data);
                Object.assign(supplierDetails, response.data.Supplier);
                // return supplierDetails;
            } catch (error) {
                console.error("Error fetching supplier:", error);
                if (error.response) {
                    console.error("Error response:", error.response);
                }
            }

            formState.supplier_id = supplierId;

            openPurchaseOrderDrawer.value = true;
        };

        const createBill = async (supplierId) => {
            console.log("Which is this id on create bill:", supplierId);

            try {
                const response = await DataService.get(
                    `/suppliers/${supplierId}`,
                );
                console.log("Details fetched of supplier", response.data);

                Object.assign(supplierDetails2, response.data.Supplier);
                formState1.supplier_id = response.data.Supplier.id;
                formState1.payment_terms = response.data.Supplier.payment_terms;

                // return supplierDetails;
            } catch (error) {
                console.error("Error fetching supplier:", error);
                if (error.response) {
                    console.error("Error response:", error.response);
                }
            }

            openCreateBillDrawer.value = true;
        };

        const makePayment = async (supplierId) => {
            isLoading.value = true;
            console.log("Which is this id on  make payment:", supplierId);

            try {
                const response = await DataService.get(
                    `/suppliers/${supplierId}`,
                );
                console.log(
                    "Details fetched of supplier for making payment",
                    response.data.Supplier,
                );

                Object.assign(supplierDetails3, response.data.Supplier);
                formState2.supplier_id = response.data.Supplier.id;
                supplierDetails3.bills = response.data.Supplier.bills || [];

                // Collect bill ids
                formState2.bill_ids = supplierDetails3.bills
                    .filter(
                        (bill) =>
                            bill.total_amount !== "0" && bill.status !== "paid",
                    )
                    .map((bill) => bill.id);
            } catch (error) {
                console.error("Error fetching supplier:", error);
                if (error.response) {
                    console.error("Error response:", error.response);
                }
            } finally {
                isLoading.value = false;
                openBilPaymentDrawer.value = true;
            }

            // formState2.supplier_id = supplierId;

            // openBilPaymentDrawer.value = true;
        };

        // Computed property to calculate the total amount
        const totalAmount = computed(() => {
            return supplierDetails3.bills
                .filter((bill) => bill.status !== "paid")
                .reduce(
                    (acc, bill) => acc + parseFloat(bill.total_amount || 0),
                    0,
                );
        });

        // Watcher or method to update formState2.total_amount when totalAmount changes
        watch(totalAmount, (newTotal) => {
            formState2.total_amount = newTotal.toFixed(2);
        });

        const handleActionChange = (event, key) => {
            const action = event.target.value;
            switch (action) {
                case "createPO":
                    showPurchaseOrderDrawer(key);
                    break;
                case "delete":
                   console.log(key);
                    break;
                case "createBill":
                    createBill(key);
                    break;
                case "editSupplier":
                    editSupplier(key);
                    break;
                default:
                    console.log("No action selected");
            }
        };

        onMounted(async () => {
            await fetchAllData();
            formState.reference_number = generateInvoiceNumber();
            formState1.bill_no = generateInvoiceNumber();
        });

        const formState2 = reactive({
            account_id: "",
            supplier_id: "",
            total_amount: "",
            bill_ids: [],
        });

        const accountBalance = reactive({
            balance: 0,
        });

        watch(
            () => formState2.account_id,
            (newVal) => {
                const selectedAccount = Accounts.value.find(
                    (account) => account.id === newVal,
                );
                if (selectedAccount) {
                    accountBalance.balance = selectedAccount.opening_balance;
                } else {
                    accountBalance.balance = "";
                }
            },
        );

        const formState = reactive({
            reference_number: "",
            quantity: "",
            order_date: "",
            delivery_date: "",
            quantity_abbreviation_id: "",
            item: "",
            purchase_date: "",
            unit_price: "",
            unit_price_abbreviation_id: "",
            supplier_id: "",
            invoice_id: "",
            sub_total: 0,
            total_amount: 0,
            status: "",
            note: "",
        });

        const formState1 = reactive({
            bill_no: "",
            bill_date: "",
            due_date: "",
            item: "",
            payment_terms: "",
            unit_price: "",
            supplier_id: "",
            account_id: "",
            purchase_order_id: "",
            sub_total: 0,
            total_amount: 0,
            status: "",
            note: "",
        });

        const form = reactive({
            title: "",
            first_name: "",
            last_name: "",
            company_name: "",

            vendor_type_id: "",
            product_id: "",
            other: "",

            email: "",
            phone: "",
            website: "",
            postal_code: "",
            address: "",
            country_id: "",
            province: "",
            city: "",
            note: "",
            payment_terms: "",
            account_number: "",
            opening_balance: "",
        });

        const handleFileUpload = (event, fieldName) => {
            const file = event.target.files[0];
            if (file) {
                form[fieldName] = file;
            }
        };

        console.log("Items to be submmited", form.value);

        const handleSubmit = async () => {
            if (
                !form.first_name ||
                !form.last_name ||
                !form.company_name ||
                !form.email ||
                !form.phone
            ) {
                toast.error("Please fill in all required fields.");
                return;
            }

            const selectedProduct = Products.value.find(
                (product) => product.id === form.product_id,
            );
            if (!selectedProduct) {
                toast.error("Please select a product.");
                return;
            }

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
            formData.append("title", form.title);
            formData.append("first_name", form.first_name);
            formData.append("last_name", form.last_name);
            formData.append("company_name", form.company_name);
            formData.append("email", form.email);
            formData.append("phone", form.phone);
            formData.append("other", form.first_name);
            formData.append("website", form.website);
            formData.append("product_id", form.product_id);
            // formData.append("vendor_type_id", form.vendor_type_id);
            formData.append("postal_code", form.postal_code);
            formData.append("address", form.address);
            formData.append("country_id", form.country_id);
            formData.append("opening_balance", form.opening_balance);
            formData.append("payment_terms", form.payment_terms);
            formData.append("account_number", form.account_number);
            formData.append("city", form.city);
            formData.append("province", form.province);
            formData.append("note", form.note);
            if (form.open_as_of) {
                formData.append("open_as_of", formattedAsof);
            }

            try {
                isLoading.value = true;
                const response = await DataService.post("/suppliers", formData);

                if (response.status === 201) {
                    toast.success("Record Saved Successfully");

                    // Reset the form data to its initial state
                    form.title = "";
                    form.first_name = "";
                    form.last_name = "";
                    form.email = "";
                    form.company_name = "";
                    form.vendor_type_id = "";
                    form.other = "";
                    form.phone = "";
                    form.website = "";
                    form.postal_code = "";
                    form.address = "";
                    form.province = "";
                    form.city = "";
                    form.opening_balance = "";
                    form.account_number = "";
                    form.payment_terms = "";
                    form.open_as_of = "";
                    form.note = "";
                    form.country_id = "";

                    // Close the drawer
                    open.value = false;

                    await fetchSuppliers();

                    router.push({ path: "/app/suppliers" }).then(() => {
                        window.location.reload();
                    });
                } else {
                    toast.error("Failed to add record. Please try again.");
                }
            } catch (error) {
                console.error("Record Add error", error);
                console.log("Error Response:", error.response);

                if (error.response && error.response.status === 422) {
                    // Extract the errors from the correct key
                    const errorMessages = error.response.data.errors || {};

                    // Display each error message in its own toast
                    Object.values(errorMessages)
                        .flat()
                        .forEach((message) => {
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

        const handleUpdateBill = async () => {
            if (!formState2.supplier_id || !formState2.account_id) {
                toast.error("Please fill in all required fields.");
                return; // Prevent form submission
            }

            const selectedSupplier = Suppliers.value.find(
                (supplier) => supplier.id === formState2.supplier_id,
            );
            if (!selectedSupplier) {
                toast.error("Please select payee.");
                return; // Prevent form submission
            }

            const selectedAccount = Accounts.value.find(
                (account) => account.id === formState2.account_id,
            );
            if (!selectedAccount) {
                toast.error("Please select account.");
                return; // Prevent form submission
            }

            const formData3 = new FormData();

            formData3.append("supplier_id", formState2.supplier_id);
            formData3.append("account_id", formState2.account_id);
            formData3.append("total_amount", formState2.total_amount);
            formState2.bill_ids.forEach((id, index) => {
                formData3.append(`bill_ids[${index}]`, id);
            });

            try {
                isLoading.value = true;
                const response = await DataService.post(
                    "/update_bill_payment",
                    formData3,
                );

                if (response.status === 201) {
                    toast.success("Record Saved Successfully");
                    formState2.supplier_id = "";
                    formState2.account_id = "";
                    formState2.total_amount = "";
                    formState2.bill_ids = [];

                    resetSupplierDetails3();
                    onCloseBilPaymentDrawer();

                    await fetchSuppliers();

                    router.push({
                        path: "/app/suppliers",
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

        const open = ref(false);
        const showDrawer = () => {
            open.value = true;
        };
        const onClose = () => {
            open.value = false;
        };

        const onClosePurchaseOrderDrawer = () => {
            openPurchaseOrderDrawer.value = false;
        };

        const onCloseBillDrawer = () => {
            openCreateBillDrawer.value = false;
        };

        const onCloseBilPaymentDrawer = () => {
            openBilPaymentDrawer.value = false;
        };

        const supplierDisplayName = computed(() => {
            return `${form.title} ${form.first_name} ${form.last_name}`.trim();
        });
        const lineItems = ref([
            {
                product_id: "",
                itemDescription: "",
                quantity: 0,
                unit_price: 0,
                amount: 0,
            },
        ]);

        const lineItems2 = ref([
            {
                product_id: "",
                itemDescription: "",
                quantity: 0,
                unit_price: 0,
                amount: 0,
            },
        ]);

        const addLineItem = () => {
            lineItems.value.push({
                product_id: "",
                itemDescription: "",
                quantity: 0,
                unit_price: 0,
                amount: 0,
            });

            console.log("New lineItems:", lineItems.value);
        };

        const addLineItem2 = () => {
            lineItems2.value.push({
                product_id: "",
                itemDescription: "",
                quantity: 0,
                unit_price: 0,
                amount: 0,
            });

            console.log("New lineItems:", lineItems.value);
        };

        const removeLastLineItem = () => {
            if (lineItems.value.length > 1) {
                lineItems.value.pop();
            } else {
                console.warn("Cannot remove the last line item.");
            }
        };

        const removeLastLineItem2 = () => {
            if (lineItems2.value.length > 1) {
                lineItems2.value.pop();
            } else {
                console.warn("Cannot remove the last line item.");
            }
        };

        // Watch changes in product_id, quantity, and unit_price for each line item
        watch(
            () =>
                lineItems.value.map((item) => ({
                    product_id: item.product_id,
                    quantity: item.quantity,
                    unit_price: item.unit_price,
                })),
            (newValues, oldValues) => {
                // Handle cases where oldValues may not be defined yet
                if (!oldValues) return; // This will exit the watch callback if oldValues are undefined

                newValues.forEach((current, index) => {
                    // Safely check if the oldValues at the current index are defined
                    const old = oldValues[index];
                    if (old && current.product_id !== old.product_id) {
                        updateProductDetails(index);
                    }
                    updateAmount(index); // Always update amount whenever there's a change in any of these fields
                });
            },
            { deep: true },
        );

        // Watch changes in product_id, quantity, and unit_price for each line item
        watch(
            () =>
                lineItems2.value.map((item) => ({
                    product_id: item.product_id,
                    quantity: item.quantity,
                    unit_price: item.unit_price,
                })),
            (newValues, oldValues) => {
                // Handle cases where oldValues may not be defined yet
                if (!oldValues) return; // This will exit the watch callback if oldValues are undefined

                newValues.forEach((current, index) => {
                    // Safely check if the oldValues at the current index are defined
                    const old = oldValues[index];
                    if (old && current.product_id !== old.product_id) {
                        updateProductDetails2(index);
                    }
                    updateAmount2(index); // Always update amount whenever there's a change in any of these fields
                });
            },
            { deep: true },
        );

        watch(
            () => formState1.purchase_order_id,
            async (newPurchaseOrderId) => {
                if (newPurchaseOrderId) {
                    // Find the selected purchase order by ID
                    const selectedOrder = purchaseOrders.value.find(
                        (order) => order.id === newPurchaseOrderId,
                    );

                    if (selectedOrder && selectedOrder.items) {
                        // Update lineItems2 with the items from the selected purchase order
                        lineItems2.value = selectedOrder.items.map((item) => ({
                            product_id: item.product_id,
                            itemDescription: item.itemDescription,
                            quantity: item.quantity,
                            unit_price: item.unit_price,
                            amount: item.amount,
                        }));

                        // Update totals
                        updateTotals2();
                    }
                }
            },
        );

        const updateProductDetails = (index) => {
            const item = lineItems.value[index];

            if (!item) return;
            const product = Products.value.find(
                (p) => p.id === item.product_id,
            );
            if (product) {
                item.product_id = product.id;
                item.itemDescription = product.description || "";
                item.unit_price = product.price || 0;
                item.quantity = product.stock_quantity || 0;
                updateAmount(index); // Ensure the amount is updated whenever product details are updated
            }
        };

        const updateProductDetails2 = (index) => {
            const item = lineItems2.value[index];

            if (!item) return;
            const product = Products.value.find(
                (p) => p.id === item.product_id,
            );
            if (product) {
                item.product_id = product.id;
                item.itemDescription = product.description || "";
                item.unit_price = product.price || 0;
                item.quantity = product.stock_quantity || 0;
                updateAmount2(index); // Ensure the amount is updated whenever product details are updated
            }
        };

        const updateAmount = (index) => {
            const item = lineItems.value[index];
            item.amount = (item.quantity * item.unit_price).toFixed(2); // Calculate new amount and fix to 2 decimal places
            updateTotals();
        };

        const updateAmount2 = (index) => {
            const item = lineItems2.value[index];
            item.amount = (item.quantity * item.unit_price).toFixed(2); // Calculate new amount and fix to 2 decimal places
            updateTotals2();
        };

        const updateTotals = () => {
            let subtotal = 0;
            lineItems.value.forEach((item) => {
                subtotal += parseFloat(item.amount);
            });
            formState.sub_total = subtotal.toFixed(2);

            formState.total_amount = subtotal.toFixed(2);
        };

        const updateTotals2 = () => {
            let subtotal = 0;
            lineItems2.value.forEach((item) => {
                subtotal += parseFloat(item.amount);
            });
            formState1.sub_total = subtotal.toFixed(2);

            formState1.total_amount = subtotal.toFixed(2);
        };

        const resetSupplierDetails = () => {
            supplierDetails.title = "";
            supplierDetails.first_name = "";
            supplierDetails.last_name = "";
            supplierDetails.company_name = "";
            supplierDetails.address = "";
            supplierDetails.city = "";
        };

        const handleSubmitPurchaseOrder = async () => {
            // Check if all required fields are filled
            if (
                !formState.order_date ||
                !formState.delivery_date ||
                !formState.supplier_id
            ) {
                toast.error("Please fill in all required fields.");
                return; // Prevent form submission
            }

            for (let item of lineItems.value) {
                if (
                    !Products.value.some(
                        (product) => product.id === item.product_id,
                    )
                ) {
                    toast.error("Please select product");
                    return; // Prevent form submission
                }
            }

            const isValidSupplierSelected = Suppliers.value.some(
                (supplier) => supplier.id === formState.supplier_id,
            );
            if (!isValidSupplierSelected) {
                toast.error("Please select a valid supplier.");
                return; // Prevent form submission
            }

            const formattedOrderDate = new Date(formState.order_date)
                .toISOString()
                .split("T")[0];

            const formattedDeliveryDate = new Date(formState.delivery_date)
                .toISOString()
                .split("T")[0];

            const formData1 = new FormData();

            formData1.append("reference_number", formState.reference_number);
            formData1.append("supplier_id", formState.supplier_id);
            if (formState.order_date) {
                formData1.append("order_date", formattedOrderDate);
            }

            if (formState.delivery_date) {
                formData1.append("delivery_date", formattedDeliveryDate);
            }

            formData1.append("sub_total", formState.sub_total);
            formData1.append("total_amount", formState.total_amount);

            formData1.append("status", formState.status);
            formData1.append("note", formState.note);

            lineItems.value.forEach((item, index) => {
                formData1.append(
                    `items[${index}][itemDescription]`,
                    item.itemDescription,
                );
                formData1.append(`items[${index}][quantity]`, item.quantity);
                formData1.append(
                    `items[${index}][unit_price]`,
                    item.unit_price,
                );
                formData1.append(`items[${index}][amount]`, item.amount);

                formData1.append(
                    `items[${index}][product_id]`,
                    item.product_id,
                );
            });

            console.log("Various items to be submitted", formData1);

            try {
                isLoading.value = true;
                const response = await DataService.post("/lpo", formData1);

                if (response.status === 201) {
                    toast.success("Purchase Order saved Successfully");
                    // Reset the form data to its initial state
                    formState.reference_number = generateInvoiceNumber();
                    formState.quantity = "";
                    formState.status = "";
                    formState.order_date = "";
                    formState.delivery_date = "";

                    formState.purchase_date = "";
                    formState.unit_price = "";
                    formState.supplier_id = "";
                    formState.invoice_id = "";
                    lineItems.value = [
                        {
                            product_id: "",
                            itemDescription: "",
                            quantity: "",
                            unit_price: "",
                            amount: "",
                        },
                    ];

                    (formState.note = ""), resetSupplierDetails();
                    // Close the drawer
                    console.log("Attempting to close the drawer");
                    onClosePurchaseOrderDrawer();
                    await fetchSuppliers();

                    router
                        .push({
                            path: "/app/suppliers",
                        })
                        .then(() => {
                            window.location.reload();
                        });
                } else {
                    //console.error("Record Add Failed");
                    toast.error("Failed to add record. Please try again.");
                }
            } catch (error) {
                console.error("Record Add error", error);
                toast.error("An error occurred. Please try again.");
            } finally {
                isLoading.value = false;
            }
        };

        const resetSupplierDetails2 = () => {
            supplierDetails2.title = "";
            supplierDetails2.first_name = "";
            supplierDetails2.last_name = "";
            supplierDetails2.company_name = "";
            supplierDetails2.address = "";
            supplierDetails2.city = "";
        };

        const resetSupplierDetails3 = () => {
            supplierDetails2.title = "";
            supplierDetails2.first_name = "";
            supplierDetails2.last_name = "";
            supplierDetails2.company_name = "";
            supplierDetails2.address = "";
            supplierDetails2.city = "";
        };

        const handleSubmitCreateBill = async () => {
            // Check if all required fields are filled
            if (!formState1.supplier_id) {
                toast.error("Please fill in all required fields.");
                return; // Prevent form submission
            }

            const isValidSupplierSelected = Suppliers.value.some(
                (supplier) => supplier.id === formState1.supplier_id,
            );
            if (!isValidSupplierSelected) {
                toast.error("Please select a valid supplier.");
                return; // Prevent form submission
            }

            // const isValidAccountSelected = Accounts.value.some(
            //     (account) => account.id === formState1.account_id,
            // );
            // if (!isValidAccountSelected) {
            //     toast.error("Please select a valid account.");
            //     return; // Prevent form submission
            // }

            const formattedBillDate = new Date(formState1.bill_date)
                .toISOString()
                .split("T")[0];

            const formattedDueDate = new Date(formState1.due_date)
                .toISOString()
                .split("T")[0];

            const formData2 = new FormData();

            formData2.append("bill_no", formState1.bill_no);
            formData2.append("supplier_id", formState1.supplier_id);
            formData2.append("purchase_order_id", formState1.purchase_order_id);
            formData2.append("account_id", formState1.account_id);
            if (formState1.bill_date) {
                formData2.append("bill_date", formattedBillDate);
            }

            if (formState1.due_date) {
                formData2.append("due_date", formattedDueDate);
            }

            formData2.append("payment_terms", formState1.payment_terms);
            formData2.append("sub_total", formState1.sub_total);
            formData2.append("total_amount", formState1.total_amount);

            formData2.append("status", formState1.status);
            formData2.append("note", formState1.note);

            lineItems2.value.forEach((item, index) => {
                formData2.append(
                    `items[${index}][itemDescription]`,
                    item.itemDescription,
                );
                formData2.append(`items[${index}][quantity]`, item.quantity);
                formData2.append(
                    `items[${index}][unit_price]`,
                    item.unit_price,
                );
                formData2.append(`items[${index}][amount]`, item.amount);

                formData2.append(
                    `items[${index}][product_id]`,
                    item.product_id,
                );
            });

            console.log("Various items to be submitted", formData2);

            try {
                isLoading.value = true;
                const response = await DataService.post("/bills", formData2);

                if (response.status === 201) {
                    toast.success("Bill saved Successfully");
                    // Reset the form data to its initial state
                    formState1.supplier_id = "";
                    formState1.account_id = "";
                    formState1.bill_date = "";
                    formState1.due_date = "";
                    formState1.bill_no = generateInvoiceNumber();
                    formState1.payment_terms = "";
                    formState1.total_amount = "";
                    formState1.sub_total = "";

                    lineItems.value = [
                        {
                            product_id: "",
                            itemDescription: "",
                            quantity: "",
                            unit_price: "",
                            amount: "",
                        },
                    ];

                    (formState1.note = ""), resetSupplierDetails2();
                    // Close the drawer
                    console.log("Attempting to close the drawer");
                    onCloseBillDrawer();
                    await fetchSuppliers();

                    router.push({
                        path: "/app/suppliers",
                    });
                } else {
                    //console.error("Record Add Failed");
                    toast.error("Failed to add record. Please try again.");
                }
            } catch (error) {
                console.error("Record Add error", error);
                toast.error("An error occurred. Please try again.");
            } finally {
                isLoading.value = false;
            }
        };

        const formattedSupplierDetails = computed({
            get() {
                // Formats the supplier details into a single string.
                return `${supplierDetails.title} ${supplierDetails.first_name} ${supplierDetails.last_name}\n${supplierDetails.company_name}\n${supplierDetails.city}\n${supplierDetails.address}`;
            },
        });

        const formattedSupplierDetails2 = computed({
            get() {
                // Formats the supplier details into a single string.
                return `${supplierDetails2.title} ${supplierDetails2.first_name} ${supplierDetails2.last_name}\n${supplierDetails2.company_name}\n${supplierDetails2.city}\n${supplierDetails2.address}`;
            },
        });

        const formattedSupplierDetails3 = computed({
            get() {
                // Formats the supplier details into a single string.
                return `${supplierDetails3.title} ${supplierDetails3.first_name} ${supplierDetails3.last_name}\n${supplierDetails3.company_name}\n${supplierDetails3.city}\n${supplierDetails3.address}`;
            },
        });

        // watch(
        //     () => router.currentRoute.value.path,
        //     (newPath) => {
        //         if (newPath === "/app/suppliers") {
        //             fetchSuppliers();
        //             fetchAccounts();
        //             fetchProducts();
        //         }
        //     },
        // );

        const generateInvoiceNumber = () => {
            return Math.floor(100000 + Math.random() * 900000).toString(); // Generates a random 6-digit number
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

            Vendors,
            fetchSuppliers,
            supplierDisplayName,
            openPurchaseOrderDrawer,
            onClosePurchaseOrderDrawer,
            onCloseBillDrawer,
            openCreateBillDrawer,
            openBilPaymentDrawer,
            onCloseBilPaymentDrawer,
            removeLastLineItem,
            removeLastLineItem2,
            lineItems,
            lineItems2,
            addLineItem,
            addLineItem2,
            formState,
            formState1,
            formState2,
            Suppliers,
            Products,
            unitsOfMeasures,

            supplierDetails,
            supplierDetails2,
            handleSubmitPurchaseOrder,
            handleSubmitCreateBill,
            placement,
            placement1,
            formattedSupplierDetails,
            formattedSupplierDetails2,
            formattedSupplierDetails3,
            Accounts,
            supplierDetails3,
            accountBalance,
            handleUpdateBill,
            filteredBills,
            purchaseOrders,

            // handleCancel,
            // handlePreview,
            // fileList,
        };
    },
});
</script>

<style scoped>
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
.rtl {
    direction: rtl;
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
.rtl .invoice-body .flex-table .flex-column .table-subtotal tbody tr td {
    text-align: right !important;
}
.rtl
    .invoice-body
    .flex-table
    .flex-column
    .table-subtotal
    tbody
    tr
    td:nth-child(2) {
    text-align: left !important;
}
.rtl .invoice-body .invoice-total-amount p {
    text-align: left !important;
}
</style>
