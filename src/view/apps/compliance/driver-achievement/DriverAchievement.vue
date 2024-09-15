<template>
  <Main>
    <a-row :gutter="15">
      <a-col :xs="24">
        <BorderLessHeading>
          <sdCards title="Driver Achievements">
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
                  title="Create New Driver Achievement"
                  :width="720"
                  v-model:visible="open"
                  :body-style="{ paddingBottom: '80px' }"
                  :footer-style="{ textAlign: 'right' }"
                  @close="onClose"
                >
                  <a-form :model="form" :rules="rules" layout="vertical">
                    <a-row :gutter="16">
                      <a-col :span="12">
                        <a-form-item label="First Name" name="first_name">
                          <a-input
                            v-model:value="form.first_name"
                            placeholder="Please enter first name"
                          />
                        </a-form-item>
                      </a-col>
                      <a-col :span="12">
                        <a-form-item label="Last Name" name="last_name">
                          <a-input
                            v-model:value="form.last_name"
                            placeholder="Please enter last name"
                          />
                        </a-form-item>
                      </a-col>
                    </a-row>

                    <a-row :gutter="16">
                      <a-col :span="12">
                        <a-form-item label="Email" name="email">
                          <a-input
                            type="email"
                            v-model:value="form.email"
                            placeholder="Please enter email"
                          />
                        </a-form-item>
                      </a-col>

                      <a-col :span="12">
                        <a-form-item label="Password" name="password">
                          <a-input
                            type="password"
                            v-model:value="form.password"
                            placeholder=".........."
                          />
                        </a-form-item>
                      </a-col>
                    </a-row>
                    <a-row :gutter="16">
                      <a-col :span="12">
                        <a-form-item label="User Role" name="role">
                          <a-select
                            v-model:value="form.role"
                            placeholder="Please assign a role"
                          >
                            <a-select-option value="private"
                              >First Role</a-select-option
                            >
                            <a-select-option value="public"
                              >Second Role</a-select-option
                            >
                          </a-select>
                        </a-form-item>
                      </a-col>
                      <a-col :span="12">
                        <a-form-item label="Phone" name="phone">
                          <a-input
                            type="password"
                            v-model:value="form.phone"
                            placeholder="Please enter phone number"
                          />
                        </a-form-item>
                      </a-col>
                    </a-row>
                    <a-row :gutter="16">
                      <a-col :span="24">
                        <a-space align="end">
                          <a-button @click="onClose">Cancel</a-button>
                          <a-button type="primary" @click="onClose"
                            >Submit</a-button
                          >
                        </a-space>
                      </a-col>
                    </a-row>
                  </a-form>
                </a-drawer>
              </a-col>
            </a-row>
            <DataTables
              :filterOption="true"
              :filterOnchange="true"
              :tableData="tableDataScource"
              :columns="dataTableColumn"
              :rowSelection="false"
            />
          </sdCards>
        </BorderLessHeading>
      </a-col>
    </a-row>
  </Main>
</template>

<script>
import { defineComponent, computed, onMounted } from "vue";
import { Main } from "../../../styled";
import DataTables from "@/components/table/DataTable.vue";
import { BorderLessHeading } from "../../../styled";
import { reactive, ref } from "vue";
import { useStore } from "vuex";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    filters: [
      {
        text: "Joe",
        value: "Joe",
      },
      {
        text: "Jim",
        value: "Jim",
      },
      {
        text: "Submenu",
        value: "Submenu",
        children: [
          {
            text: "Green",
            value: "Green",
          },
          {
            text: "Black",
            value: "Black",
          },
        ],
      },
    ],
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    onFilter: (value, record) => record.name.indexOf(value) === 0,
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ["descend"],
  },
  {
    title: "Age",
    dataIndex: "age",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: "Address",
    dataIndex: "address",
    filters: [
      {
        text: "London",
        value: "London",
      },
      {
        text: "New York",
        value: "New York",
      },
    ],
    filterMultiple: false,
    onFilter: (value, record) => record.address.indexOf(value) === 0,
    sorter: (a, b) => a.address.length - b.address.length,
    sortDirections: ["descend", "ascend"],
  },
];
const columnsPagination = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
  },
];
const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
  },
  {
    key: "4",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
  {
    key: "4",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
  {
    key: "5",
    name: "Jim Red 2",
    age: 37,
    address: "London No. 2 Lake Park",
  },
  {
    key: "6",
    name: "Jim Red 2",
    age: 35,
    address: "London No. 2 Lake Park",
  },
  {
    key: "7",
    name: "Jim Red 2",
    age: 37,
    address: "London No. 2 Lake Park",
  },
];
const dataTableColumn = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "User",
    dataIndex: "user",
    key: "user",
  },
  {
    title: "Country",
    dataIndex: "country",
    key: "coutry",
  },
  {
    title: "Company",
    dataIndex: "company",
    key: "company",
  },
  {
    title: "Position",
    dataIndex: "position",
    key: "position",
  },
  {
    title: "Join Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Actions",
    dataIndex: "action",
    key: "action",
    width: "90px",
  },
];

export default defineComponent({
  name: "DriverAchievement",
  components: {
    Main,
    DataTables,
    BorderLessHeading,
  },
  setup() {
    const { state, dispatch } = useStore();

    onMounted(() => dispatch("tableReadData"));

    const tableDataScource = computed(() =>
      state.dataTable.tableData.map((item) => {
        const { id, name, country, company, position, status, date } = item;
        return {
          id: `#${id}`,
          key: item.id,
          user: <span class="ninjadash-username">{name}</span>,
          country: <span>{country}</span>,
          company: <span>{company}</span>,
          position,
          date,
          status: (
            <span class={`ninjadash-status ninjadash-status-${status}`}>
              {status}
            </span>
          ),
          action: (
            <div class="table-actions">
              <router-link class="view" to={`#`}>
                <unicon name="eye"></unicon>
              </router-link>
              <router-link class="edit" to="#">
                <unicon name="edit"></unicon>
              </router-link>
              <router-link class="delete" to="#">
                <unicon name="trash"></unicon>
              </router-link>
            </div>
          ),
        };
      })
    );

    const form = reactive({
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      role: "",
      phone: "",
    });

    const rules = {
      first_name: [
        {
          required: true,
          message: "Please enter first name",
        },
      ],
      last_name: [
        {
          required: true,
          message: "Please enter last name",
        },
      ],
      email: [
        {
          required: true,
          message: "please enter valid email",
        },
      ],
      password: [
        {
          required: true,
          message: "Please enter password",
        },
      ],
      role: [
        {
          required: true,
          message: "Please assign a role",
        },
      ],
      phone: [
        {
          required: false,
          message: "Please choose the approver",
        },
      ],
    };
    const open = ref(false);
    const showDrawer = () => {
      open.value = true;
    };
    const onClose = () => {
      open.value = false;
    };

    return {
      data,
      columns,
      columnsPagination,
      tableDataScource,
      dataTableColumn,
      form,
      rules,
      open,
      showDrawer,
      onClose,
    };
  },
});
</script>
