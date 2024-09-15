<template>
    <DataTableStyleWrap>
        <div v-if="filterOption" class="ninjadash-datatable-filter">
            <div
                v-if="!filterOnchange"
                class="ninjadash-datatable-filter__left"
            >
                <!-- <div class="ninjadash-datatable-filter__input">
                    <span class="label">Status:</span>
                    <a-select
                        :style="{ width: 200 }"
                        class="ninjadash-data-status"
                        defaultValue="active"
                    >
                        <a-select-option value="active">Active</a-select-option>
                        <a-select-option value="deactiveted"
                            >Deactivated</a-select-option
                        >
                        <a-select-option value="blocked"
                            >Blocked</a-select-option
                        >
                    </a-select>
                </div> -->
                <div class="ninjadash-datatable-filter__action">
                    <sdButton
                        type="primary"
                        size="sm"
                        @click="handleSearch"
                        transparented
                        >Submit</sdButton
                    >
                </div>
            </div>

            <div v-else class="ninjadash-datatable-filter__left">
                <!-- <div class="ninjadash-datatable-filter__input">
                    <span class="label">Status:</span>
                    <a-select
                        @change="handleStatusSearch"
                        :style="{ width: 200 }"
                        defaultValue="active"
                    >
                        <a-select-option value="active">Active</a-select-option>
                        <a-select-option value="deactiveted"
                            >Deactivated</a-select-option
                        >
                        <a-select-option value="blocked"
                            >Blocked</a-select-option
                        >
                    </a-select>
                </div> -->
            </div>

            <div class="ninjadash-datatable-filter__right">
                <a-input
                    @change="handleDataUser"
                    size="default"
                    placeholder="Search"
                >
                    <template #prefix>
                        <unicon name="search"></unicon>
                    </template>
                </a-input>
            </div>
        </div>

        <div class="ninjadasj-datatable">
            <TableWrapper class="table-data-view table-responsive">
                <a-table
                    v-if="rowSelection"
                    :row-selection="rowSelections"
                    :pagination="{ pageSize: 10, showSizeChanger: true }"
                    :data-source="tableData"
                    :columns="columns"
                    @rowClick="handleRowClick"
                />

                <a-table
                    v-else
                    :pagination="{ pageSize: 10, showSizeChanger: true }"
                    :data-source="tableData"
                    :columns="columns"
                    @rowClick="handleRowClick"
                />
            </TableWrapper>
        </div>
    </DataTableStyleWrap>
</template>

<script>
import { defineComponent, computed, ref, unref } from "vue";
import VueTypes from "vue-types";
import { DataTableStyleWrap } from "./Style";
import { TableWrapper } from "../../view/styled";
import { useStore } from "vuex";

export default defineComponent({
    components: { DataTableStyleWrap, TableWrapper },
    props: {
        filterOption: VueTypes.bool,
        filterOnchange: VueTypes.bool,
        rowSelection: VueTypes.bool,
        tableData: VueTypes.array,
        columns: VueTypes.array,
    },
    setup(_, { emit }) {
        const { dispatch } = useStore();

        const handleIdSearch = (e) => {
            const id = e.currentTarget.value;
            dispatch("dataLiveFilter", { value: id, key: "id" });
        };

        const handleStatusSearch = (value) => {
            dispatch("dataLiveFilter", { value, key: "status" });
        };

        const handleDataUser = (e) => {
            const { value } = e.currentTarget;
            emit("search", value); // Emit the search event with the search query
        };

        const handleSearch = () => {
            const id = document.querySelector(".ninjadash-data-id").value;
            const status = document.querySelector(
                ".ninjadash-data-status .ant-select-selection-item",
            ).title;
            dispatch("filterWithSubmit", { id, status });
        };

        const selectedRowKeys = ref([]); // Check here to configure the default column

        const onSelectChange = (changableRowKeys) => {
            console.log("selectedRowKeys changed: ", changableRowKeys);
            selectedRowKeys.value = changableRowKeys;
        };

        const rowSelections = computed(() => {
            return {
                selectedRowKeys: unref(selectedRowKeys),
                onChange: onSelectChange,
                hideDefaultSelections: true,
            };
        });

        const handleRowClick = (record) => {
            console.log("Row clicked:", record);
            emit("rowClick", record); // Emit the rowClick event with the row data
        };

        return {
            handleIdSearch,
            handleStatusSearch,
            handleDataUser,
            handleSearch,
            rowSelections,
            handleRowClick,
        };
    },
});
</script>
