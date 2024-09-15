<template>
    <CardToolbox>
        <sdPageHeader
            title="Users"
            :routes="[]"
            class="ninjadash-page-header-main"
        >
            <template #subTitle>
                <span class="title-counter">{{ users.length }} Users</span>
                <sdAutoComplete
                    :dataSource="searchData"
                    width="100%"
                    placeholder="Search by Name"
                    patterns
                />
            </template>
            <template #buttons>
                <a-button type="primary" @click="showDrawer">
                    <template #icon><PlusOutlined /></template>
                    + Add New User
                </a-button>
                <a-drawer
                    title="Add New User"
                    :width="720"
                    v-model:visible="open"
                    :body-style="{ paddingBottom: '80px' }"
                    :footer-style="{ textAlign: 'right' }"
                    @close="onClose"
                >
                    <!-- Loading State -->
                    <template v-if="isLoading">
                        <a-space class="loading">
                            <a-spin size="large" />
                        </a-space>
                    </template>

                    <!-- Form Content -->
                    <template v-else>
                        <a-form :model="form" :rules="rules" layout="vertical">
                            <a-row :gutter="16">
                                <a-col :span="12">
                                    <a-form-item
                                        label="First Name"
                                        name="first_name"
                                        :rules="[
                                            {
                                                required: true,
                                                message: 'Required!',
                                            },
                                        ]"
                                    >
                                        <a-input
                                            v-model:value="form.first_name"
                                            placeholder=""
                                        />
                                    </a-form-item>
                                </a-col>
                                <a-col :span="12">
                                    <a-form-item
                                        label="Last Name"
                                        name="last_name"
                                        :rules="[
                                            {
                                                required: true,
                                                message: 'Required!',
                                            },
                                        ]"
                                    >
                                        <a-input
                                            v-model:value="form.last_name"
                                            placeholder=""
                                        />
                                    </a-form-item>
                                </a-col>
                            </a-row>

                            <a-row :gutter="16">
                                <a-col :span="12">
                                    <a-form-item
                                        label="Email"
                                        name="email"
                                        :rules="[
                                            {
                                                required: true,
                                                message: 'Required!',
                                            },
                                        ]"
                                    >
                                        <a-input
                                            type="email"
                                            v-model:value="form.email"
                                            placeholder=""
                                        />
                                    </a-form-item>
                                </a-col>

                                <a-col :span="12">
                                    <a-form-item
                                        label="Password"
                                        name="password"
                                        :rules="[
                                            {
                                                required: true,
                                                message: 'Required!',
                                            },
                                        ]"
                                    >
                                        <a-input
                                            type="password"
                                            v-model:value="form.password"
                                            placeholder=""
                                        />
                                    </a-form-item>
                                </a-col>
                            </a-row>

                            <a-row :gutter="16">
                                <a-col :span="12">
                                    <a-form-item label="Phone" name="phone">
                                        <a-input
                                            v-model:value="form.phone"
                                            placeholder=""
                                        />
                                    </a-form-item>
                                </a-col>

                                <a-col :span="12">
                                    <a-form-item
                                        label="Assign Role"
                                        name="role_id"
                                        :rules="[
                                            {
                                                required: true,
                                                message: 'Required!',
                                            },
                                        ]"
                                    >
                                        <select
                                            class="custom-select"
                                            v-model="form.role_id"
                                            placeholder="Select Role"
                                        >
                                            <option
                                                v-for="role in roles"
                                                :key="role.id"
                                                :value="role.id"
                                            >
                                                {{ role.name }}
                                            </option>
                                        </select>
                                    </a-form-item>
                                </a-col>
                            </a-row>

                            <a-row>
                                <a-col :span="12">
                                    <a-form-item
                                        label="Enable Login"
                                        name="enable_login"
                                    >
                                        <a-switch
                                            v-model:checked="form.enable_login"
                                        />
                                    </a-form-item>
                                </a-col>
                            </a-row>

                            <a-row :gutter="16">
                                <a-col :span="24">
                                    <a-space align="end">
                                        <a-button @click="onClose"
                                            >Cancel</a-button
                                        >
                                        <a-button
                                            type="primary"
                                            @click="handleSubmit"
                                            >Submit</a-button
                                        >
                                    </a-space>
                                </a-col>
                            </a-row>
                        </a-form>
                    </template>
                </a-drawer>
            </template>
        </sdPageHeader>
    </CardToolbox>

    <Main>
        <a-row :gutter="25">
            <a-col
                v-for="user in users"
                :key="user.id"
                :xxl="6"
                :lg="8"
                :sm="12"
                :xs="24"
            >
                <Suspense>
                    <template #fallback>
                        <sdCards headless>
                            <a-skeleton avatar active />
                        </sdCards>
                    </template>
                    <template v-if="isLoading2">
                        <a-space class="loading">
                            <a-spin size="large" />
                        </a-space>
                    </template>
                    <template v-else>
                        <TeamCard :user="user">
                            <template #item>
                                <a to="#" @click="viewUser(user)">
                                    <unicon name="eye" width="14"></unicon>
                                    <span>View</span>
                                </a>
                                <a to="#" @click="editUser(user)">
                                    <unicon name="edit" width="14"></unicon>
                                    <span>Edit</span>
                                </a>
                                <a to="#" @click="deleteUser(user)">
                                    <unicon
                                        name="trash-alt"
                                        width="14"
                                    ></unicon>
                                    <span>Delete</span>
                                </a>
                            </template>
                        </TeamCard>
                    </template>
                </Suspense>
            </a-col>
        </a-row>

        <sdModal
            style="width: auto"
            title="Update User"
            class="ninjadash_addTask-modal"
            :type="modalType"
            :visible="updateUser"
            :footer="null"
            @cancel="handleCancel"
        >
            <BasicFormWrapper>
                <a-form :model="formState" layout="vertical">
                    <!-- First Name -->
                    <a-row :gutter="16">
                        <a-col :span="12">
                            <a-form-item label="First Name" name="first_name">
                                <input
                                    class="custom-select"
                                    v-model="formState.first_name"
                                    placeholder="Enter First Name"
                                />
                            </a-form-item>
                        </a-col>
                        <!-- Last Name -->
                        <a-col :span="12">
                            <a-form-item label="Last Name" name="last_name">
                                <input
                                    class="custom-select"
                                    v-model="formState.last_name"
                                    placeholder="Enter Last Name"
                                />
                            </a-form-item>
                        </a-col>
                    </a-row>

                    <!-- Email and Phone -->
                    <a-row :gutter="16">
                        <a-col :span="12">
                            <a-form-item label="Email" name="email">
                                <input
                                    class="custom-select"
                                    type="email"
                                    v-model="formState.email"
                                    placeholder="Enter Email"
                                />
                            </a-form-item>
                        </a-col>
                        <a-col :span="12">
                            <a-form-item label="Phone" name="phone">
                                <input
                                    class="custom-select"
                                    v-model="formState.phone"
                                    placeholder="Enter Phone Number"
                                />
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <!-- Role and Enable Login -->
                    <a-row :gutter="16">
                        <a-col :span="12">
                            <a-form-item label="Assign Role" name="role_id">
                                <select
                                    class="custom-select"
                                    v-model="formState.role_id"
                                    placeholder="Select Role"
                                >
                                    <option
                                        v-for="role in roles"
                                        :key="role.id"
                                        :value="role.id"
                                    >
                                        {{ role.name }}
                                    </option>
                                </select>
                            </a-form-item>
                        </a-col>
                        <a-col :span="12">
                            <a-form-item
                                label="Enable Login"
                                name="enable_login"
                            >
                                <a-switch
                                    v-model:checked="formState.enable_login"
                                />
                            </a-form-item>
                        </a-col>
                    </a-row>
                    

                    <!-- Image Upload -->
                    <!-- <a-row :gutter="16">
                        <a-col :span="24">
                            <a-form-item label="Profile Image" name="image">
                                <input
                                    style=""
                                    type="file"
                                    @change="handleImageChange"
                                    accept="image/*"
                                />
                                <div v-if="formState.imageUrl">
                                    <img
                                        :src="formState.imageUrl"
                                        alt="Profile Image"
                                        style=" width: 150px; 
                                        height: auto;  margin-top: 20px"
                                    />
                                </div>
                            </a-form-item>
                        </a-col>
                    </a-row> -->

                    <!-- Actions -->
                    <div
                        class="ninjadash-modal-actions"
                        style="margin-top: 20px"
                    >
                        <sdButton
                            size="sm"
                            type="light"
                            key="cancel"
                            outlined
                            @click.prevent="handleCancel"
                        >
                            Cancel
                        </sdButton>
                        <sdButton
                            @click.prevent="handleUpdateUser"
                            htmlType="submit"
                            size="sm"
                            type="primary"
                        >
                            Update
                        </sdButton>
                    </div>
                </a-form>
            </BasicFormWrapper>
        </sdModal>

        <div>
            <sdModal
                style="width: auto"
                title="User Info"
                class="ninjadash_addTask-modal"
                :type="modalType"
                :visible="UserInfo"
                :footer="null"
                @cancel="handleCancelInfo"
            >
                <BasicFormWrapper>
                    <a-form :model="formState" layout="vertical">
                        <!-- First Name -->
                        <a-row :gutter="16">
                            <a-col :span="12">
                                <a-form-item
                                    label="First Name"
                                    name="first_name"
                                >
                                    <a-input
                                        readonly
                                        v-model:value="formState.first_name"
                                        placeholder="Enter First Name"
                                    />
                                </a-form-item>
                            </a-col>
                            <!-- Last Name -->
                            <a-col :span="12">
                                <a-form-item label="Last Name" name="last_name">
                                    <a-input
                                        readonly
                                        v-model:value="formState.last_name"
                                        placeholder="Enter Last Name"
                                    />
                                </a-form-item>
                            </a-col>
                        </a-row>

                        <!-- Email and Phone -->
                        <a-row :gutter="16">
                            <a-col :span="12">
                                <a-form-item label="Email" name="email">
                                    <a-input
                                        readonly
                                        type="email"
                                        v-model:value="formState.email"
                                        placeholder="Enter Email"
                                    />
                                </a-form-item>
                            </a-col>
                            <a-col :span="12">
                                <a-form-item label="Phone" name="phone">
                                    <a-input
                                        readonly
                                        v-model:value="formState.phone"
                                        placeholder="Enter Phone Number"
                                    />
                                </a-form-item>
                            </a-col>
                        </a-row>

                        <!-- Role and Enable Login -->
                        <a-row :gutter="16">
                            <a-col :span="12">
                                <a-form-item label="Role" name="role_id">
                                    <a-input
                                        readonly
                                        v-model:value="formState.role"
                                        placeholder="Enter Phone Number"
                                    />
                                </a-form-item>
                            </a-col>
                        </a-row>

                        <!-- Image Upload -->
                        <!-- <a-row :gutter="16">
                            <a-col :span="24">
                                <a-form-item label="Profile Image" name="image">
                                    <div v-if="formState.imageUrl">
                                        <img
                                            :src="formState.imageUrl"
                                            alt="Profile Image"
                                            style="
                                                max-width: 50%;
                                                margin-top: 10px;
                                            "
                                        />
                                    </div>
                                </a-form-item>
                            </a-col>
                        </a-row> -->

                        <!-- Actions -->
                        <div
                            class="ninjadash-modal-actions"
                            style="margin-top: 20px"
                        >
                            <sdButton
                                size="sm"
                                type="light"
                                key="cancel"
                                outlined
                                @click.prevent="handleCancelInfo"
                            >
                                Cancel
                            </sdButton>
                        </div>
                    </a-form>
                </BasicFormWrapper>
            </sdModal>
        </div>
    </Main>
</template>

<script>
import { DataService } from "@/config/dataService/dataService";
import { computed, defineAsyncComponent, defineComponent } from "vue";
import { useStore } from "vuex";
import { Main, CardToolbox } from "../../styled";
import { reactive, ref, onMounted } from "vue";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import { Modal } from "ant-design-vue";
const TeamCard = defineAsyncComponent(() => import("./overview/TeamCard"));

const Team = defineComponent({
    name: "Team",
    components: { Main, CardToolbox, TeamCard },
    setup() {
        const { state } = useStore();
        const router = useRouter();
        const toast = useToast();
        const users = ref([]);
        const isLoading = ref(false);
        const isLoading2 = ref(false);
        const errors = reactive({});
        const roles = ref([]);
        const updateUser = ref(false);
        const UserInfo = ref(false);
        const selectedUserId = ref(null);

        // const searchData = computed(() => state.headerSearchData.data);
        const team = computed(() => state.team.data);

        const form = reactive({
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            role: "",
            phone: "",
            enable_login: false,
            role_id: "",
            image: null,
            imageUrl: null,
        });

        const formState = reactive({
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            role: "",
            phone: "",
            enable_login: false,
            role_id: "",
            image: null,
            imageUrl: null,
        });

        const fetchUsers = async () => {
            isLoading2.value = true;
            try {
                const response = await DataService.get("/users");
                if (response.status === 200) {
                    users.value = response.data.Users;
                    console.log("Users returned from backend", users.value);
                } else {
                    toast.error("Failed to fetch users. Please try again.");
                }
            } catch (error) {
                console.error("Error fetching users:", error);
                toast.error("An error occurred. Please try again.");
            } finally {
                isLoading2.value = false;
            }
        };

        const fetchRoles = async () => {
            try {
                const response = await DataService.get("/roles");
                roles.value = response.data.roles;
            } catch (error) {
                console.error("Error fetching roles:", error);
                toast.error("Failed to fetch roles. Please try again.");
            }
        };

        const open = ref(false);
        const showDrawer = () => {
            isLoading.value = true;
            try {
                open.value = true;
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                isLoading.value = false;
            }
        };

        const onClose = () => {
            open.value = false;
        };

        const handleImageChange = (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    formState.image = file;
                    formState.imageUrl = e.target.result;
                };
                reader.readAsDataURL(file);
            } else {
                formState.image = null;
                formState.imageUrl = null;
            }
        };

        const handleSubmit = async () => {
            if (
                !form.first_name ||
                !form.last_name ||
                !form.email ||
                !form.password ||
                !form.role_id
            ) {
                toast.error("Please fill in all required fields.");
                return;
            }

            const formData = new FormData();
            formData.append("first_name", form.first_name);
            formData.append("last_name", form.last_name);
            formData.append("email", form.email);
            formData.append("phone", form.phone);
            formData.append("password", form.password);
            formData.append("enable_login", form.enable_login ? "1" : "0"); // Ensure it's sent as '1' or '0'
            formData.append("role_id", form.role_id);

            if (form.image) {
                formData.append("image", form.image);
            }

            try {
                isLoading.value = true;
                const response = await DataService.post("/users", formData);

                if (response.status === 201) {
                    toast.success("Record Added Successfully");

                    // Reset form data
                    form.first_name = "";
                    form.last_name = "";
                    form.email = "";
                    form.password = "";
                    form.phone = "";
                    form.enable_login = false;
                    form.role_id = "";
                    form.image = null;
                    form.imageUrl = null;

                    // Close the drawer
                    open.value = false;

                    await fetchUsers();
                    router.push({ path: "/app/users/team" });
                }
            } catch (error) {
                if (error.response && error.response.status === 422) {
                    const errorData = error.response.data.errors;
                    for (const key in errorData) {
                        if (
                            Object.prototype.hasOwnProperty.call(errorData, key)
                        ) {
                            toast.error(errorData[key][0]);
                        }
                    }
                } else if (error.response && error.response.status === 500) {
                    toast.error(
                        "Something went wrong. Please try again later.",
                    );
                } else {
                    toast.error("An unexpected error occurred.");
                }
            } finally {
                isLoading.value = false;
            }
        };

        const editUser = (user) => {
            selectedUserId.value = user.id;
            formState.first_name = user.first_name;
            formState.last_name = user.last_name;
            formState.email = user.email;
            formState.phone = user.phone;
            formState.role_id = user.roles[0]?.id || "";
            formState.enable_login = user.status === 1;
            formState.imageUrl = user.image ? `/storage/${user.image}` : null;
            setTimeout(() => {
                updateUser.value = true;
            }, 50);
        };

        const viewUser = (user) => {
            selectedUserId.value = user.id;
            formState.first_name = user.first_name;
            formState.last_name = user.last_name;
            formState.email = user.email;
            formState.phone = user.phone;
            formState.role_id = user.roles[0]?.id || "";
            formState.role = user.roles[0]?.name || "";
            formState.enable_login = user.status === 1;
            formState.imageUrl = user.image ? `/storage/${user.image}` : null;
            UserInfo.value = true;
        };

        const deleteUser = async (user) => {
            try {
                Modal.confirm({
                    title: "Are you sure you want to delete this user?",
                    content: "This action cannot be undone.",
                    okText: "Yes",
                    okType: "danger",
                    cancelText: "No",
                    onOk: async () => {
                        try {
                            await DataService.delete(`/users/${user.id}`);
                            toast.success("User Deleted successfully.");
                            await fetchUsers();
                        } catch (error) {
                            toast.error(
                                "Failed to delete user. Please try again.",
                            );
                        }
                    },
                    onCancel() {
                        console.log("Canceled");
                    },
                });
            } catch (error) {
                toast.error("An error occurred while trying to delete user.");
            }
        };

        const handleCancel = () => {
            updateUser.value = false;
            selectedUserId.value = null;
        };

        const handleCancelInfo = () => {
            UserInfo.value = false;
            selectedUserId.value = null;
        };

        const handleUpdateUser = async () => {
    console.log("First Name:", formState.first_name);
    console.log("Last Name:", formState.last_name);
    console.log("Email:", formState.email);
    console.log("Enable Login:", formState.enable_login);
    console.log("Form State:", JSON.stringify(formState));

    if (
        !formState.first_name ||
        !formState.last_name ||
        !formState.email ||
        formState.enable_login === null
    ) {
        toast.error("Please fill in all required fields.");
        return;
    }

    let payload;

    if (formState.image) {
        // Use FormData if an image is provided
        payload = new FormData();
        payload.append("first_name", formState.first_name);
        payload.append("last_name", formState.last_name);
        payload.append("email", formState.email);
        payload.append("phone", formState.phone);
        payload.append("enable_login", formState.enable_login ? 1 : 0);

        if (formState.password) {
            payload.append("password", formState.password);
        }

        if (formState.role_id) {
            payload.append("role_id", formState.role_id);
        }

        payload.append("image", formState.image);
    } else {
        // If no image, send formState directly as JSON
        payload = { ...formState };
    }

    try {
        isLoading.value = true;
        const response = await DataService.put(
            `/users/${selectedUserId.value}`,
            payload
        );

        console.log("Response", response);

        if (response.status === 200) {
            toast.success("User Updated Successfully");

            const userIndex = users.value.findIndex(
                (user) => user.id === selectedUserId.value
            );
            if (userIndex !== -1) {
                users.value[userIndex] = {
                    ...users.value[userIndex],
                    ...formState,
                    status: formState.enable_login ? 1 : 0,
                    image:
                        formState.imageUrl ||
                        users.value[userIndex].image,
                };
            }

            updateUser.value = false;
        }
    } catch (error) {
        if (error.response && error.response.status === 422) {
            const errorData = error.response.data.errors;
            for (const key in errorData) {
                if (Object.prototype.hasOwnProperty.call(errorData, key)) {
                    toast.error(errorData[key][0]);
                }
            }
        } else if (error.response && error.response.status === 500) {
            toast.error("Something went wrong. Please try again later.");
        } else {
            toast.error("An unexpected error occurred.");
        }
    } finally {
        isLoading.value = false;
    }
};


        onMounted(async () => {
            isLoading.value = true;
            try {
                await fetchUsers();
                await fetchRoles();
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                isLoading.value = false;
            }
        });

        return {
            //searchData,
            team,
            form,
            open,
            showDrawer,
            onClose,
            editUser,
            viewUser,
            updateUser,
            UserInfo,
            handleCancel,
            handleCancelInfo,
            handleUpdateUser,
            handleSubmit,
            handleImageChange,
            errors,
            isLoading,
            isLoading2,
            users,
            roles,
            formState,
            deleteUser,
        };
    },
});

export default Team;
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

.loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}
</style>
