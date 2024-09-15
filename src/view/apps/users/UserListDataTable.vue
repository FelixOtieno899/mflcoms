<template>
    <CardToolbox>
        <sdPageHeader
            title="Roles & Permissions"
            :routes="[]"
            class="ninjadash-page-header-main"
        >
            <template #subTitle>
                <span class="title-counter"
                    >{{ roles.length }} Roles</span
                >
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
                    + Add New Role
                </a-button>
                <a-drawer
                    title="Create New Role & Permissions"
                    :width="drawerWidth"
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
                        <a-form :model="form" :rules="rules" layout="vertical">
                            <a-row style="margin-bottom: 20px">
                                <a-col>
                                    <h4>Role Name</h4>
                                    <div
                                        style="width: 200px; position: relative"
                                    >
                                        <input
                                            class="custom-select"
                                            list="roles-list"
                                            type="text"
                                            v-model="form.role"
                                            @input="handleInput"
                                            @blur="handleBlur"
                                            placeholder="Enter or Select a Role"
                                            style="width: 100%"
                                        />
                                        <datalist id="roles-list">
                                            <option
                                                v-for="role in roles"
                                                :key="role.id"
                                                :value="role.name"
                                            />
                                        </datalist>
                                    </div>
                                </a-col>
                            </a-row>

                            <a-row>
                                <a-col>
                                    <h3>Assign Permission to Role</h3>
                                </a-col>
                            </a-row>

                            <a-row>
                                <a-col>
                                    <a-checkbox
                                        @change="toggleAllModules"
                                        :checked="form.allModulesSelected"
                                    >
                                        Module
                                    </a-checkbox>
                                </a-col>
                                <a-col
                                    style="
                                        margin-left: 150px;
                                        font-weight: bold;
                                    "
                                >
                                    Permissions
                                </a-col>
                            </a-row>
                            <a-divider
                                style="height: 2px; background-color: #89cff0"
                            />

                            <!-- Permissions List -->
                            <div
                                v-for="(module, index) in permissionsGrouped"
                                :key="index"
                            >
                                <a-row style="margin-top: 10px">
                                    <a-col :span="4">
                                        <a-checkbox
                                            @change="
                                                toggleModulePermissions(
                                                    module.name,
                                                )
                                            "
                                            :checked="
                                                isModuleChecked(module.name)
                                            "
                                            :indeterminate="
                                                isModuleIndeterminate(
                                                    module.name,
                                                )
                                            "
                                        >
                                            {{ module.name }}
                                        </a-checkbox>
                                    </a-col>
                                    <a-col
                                        :span="4"
                                        v-for="perm in module.permissions"
                                        :key="perm"
                                    >
                                        <a-checkbox
                                            :value="perm"
                                            v-model="form.permissions"
                                            @change="
                                                toggleSinglePermission(perm)
                                            "
                                            :checked="isPermissionChecked(perm)"
                                        >
                                            {{ perm.split(".").pop() }}
                                        </a-checkbox>
                                    </a-col>
                                </a-row>
                                <br />
                            </div>

                            <a-row style="margin-top: 50px">
                                <a-col :span="24">
                                    <a-space align="end">
                                        <a-button @click.prevent="onClose"
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
        <a-row :gutter="15">
            <a-col :md="24">
                <usersListTable>
                    <UserListTable />
                </usersListTable>
            </a-col>
        </a-row>
    </Main>
</template>

<script>
import { DataService } from "@/config/dataService/dataService";
import UserListTable from "./overview/UserTable";
import { reactive, ref, defineComponent, onMounted, computed } from "vue";
import { useToast } from "vue-toastification";
import { Main, CardToolbox } from "../../styled";
import { usersListTable } from "./style";

export default defineComponent({
    name: "UserList",
    components: { Main, CardToolbox, UserListTable, usersListTable },
    setup() {
        const toast = useToast();
        const roles = ref([]);
        const permissions = ref([]);
        const open = ref(false);
        const isLoading = ref(false);
        const drawerWidth = ref("100vw");
        const form = reactive({
            role: "",
            role_id: null,
            permissions: [],
            allModulesSelected: false,
        });

        const rules = {
            role: [{ required: true, message: "Please enter role name" }],
        };

        const permissionsGrouped = computed(() => {
            const grouped = {};
            permissions.value.forEach((perm) => {
                const [module] = perm.name.split(".");
                if (!grouped[module]) {
                    grouped[module] = { name: module, permissions: [] };
                }
                grouped[module].permissions.push(perm.name);
            });
            return Object.values(grouped);
        });

        const fetchRoles = async () => {
            try {
                const response = await DataService.get("/roles");
                roles.value = response.data.roles;
            } catch (error) {
                toast.error("Failed to fetch roles. Please try again.");
            }
        };

        const fetchPermissions = async () => {
            try {
                const response = await DataService.get("/permissions");
                permissions.value = response.data.permissions;
            } catch (error) {
                toast.error("Failed to fetch permissions. Please try again.");
            }
        };

        const handleInput = (event) => {
            form.role = event.target.value;
        };

        const handleBlur = () => {
            const existingRole = roles.value.find(
                (role) => role.name.toLowerCase() === form.role.toLowerCase(),
            );
            if (existingRole) {
                toast.info(`Editing permissions for the role "${form.role}".`);
                form.role_id = existingRole.id;
            } else if (form.role) {
                const newRole = { id: `new-${Date.now()}`, name: form.role };
                roles.value.push(newRole);
                form.role_id = newRole.id;
                toast.success(`New role "${form.role}" created.`);
            }
        };

        const toggleSinglePermission = (perm) => {
            if (form.permissions.includes(perm)) {
                form.permissions = form.permissions.filter((p) => p !== perm);
            } else {
                form.permissions.push(perm);
            }
            updateModuleCheckboxes();
        };

        const toggleModulePermissions = (moduleName) => {
            const modulePermissions = permissionsGrouped.value.find(
                (group) => group.name === moduleName,
            ).permissions;

            const allChecked = modulePermissions.every((perm) =>
                form.permissions.includes(perm),
            );

            if (allChecked) {
                form.permissions = form.permissions.filter(
                    (perm) => !modulePermissions.includes(perm),
                );
            } else {
                form.permissions = [
                    ...new Set([...form.permissions, ...modulePermissions]),
                ];
            }

            updateModuleCheckboxes();
        };

        const toggleAllModules = (event) => {
            const checked = event.target.checked;
            form.allModulesSelected = checked;

            form.permissions = checked
                ? permissionsGrouped.value.flatMap(
                      (module) => module.permissions,
                  )
                : [];
            updateModuleCheckboxes();
        };

        const updateModuleCheckboxes = () => {
            permissionsGrouped.value.forEach((module) => {
                const modulePermissions = module.permissions;
                const allChecked = modulePermissions.every((perm) =>
                    form.permissions.includes(perm),
                );
                const someChecked = modulePermissions.some((perm) =>
                    form.permissions.includes(perm),
                );

                module.checked = allChecked;
                module.indeterminate = someChecked && !allChecked;
            });

            updateAllModulesCheckboxStatus();
        };

        const updateAllModulesCheckboxStatus = () => {
            const allPermissions = permissionsGrouped.value.flatMap(
                (module) => module.permissions,
            );
            form.allModulesSelected = allPermissions.every((perm) =>
                form.permissions.includes(perm),
            );
        };

        const isModuleChecked = (moduleName) => {
            const modulePermissions = permissionsGrouped.value.find(
                (group) => group.name === moduleName,
            ).permissions;
            return modulePermissions.every((perm) =>
                form.permissions.includes(perm),
            );
        };

        const isModuleIndeterminate = (moduleName) => {
            const modulePermissions = permissionsGrouped.value.find(
                (group) => group.name === moduleName,
            ).permissions;
            const allChecked = modulePermissions.every((perm) =>
                form.permissions.includes(perm),
            );
            const someChecked = modulePermissions.some((perm) =>
                form.permissions.includes(perm),
            );
            return someChecked && !allChecked;
        };

        const isPermissionChecked = (perm) => {
            return form.permissions.includes(perm);
        };

        const handleSubmit = async () => {
            isLoading.value = true;

            if (!form.role.trim()) {
                toast.error("Role name is required.");
                isLoading.value = false;
                return;
            }

            try {
                const response = await DataService.post("/roles", {
                    name: form.role,
                    permissions: form.permissions,
                });

                if (response.status === 201) {
                    toast.success(
                        "Role and permissions assigned successfully.",
                    );
                    onClose();
                    await fetchRoles();
                    await fetchPermissions();

                    form.role = "";
                    form.permissions = [];
                    
                    window.location.reload();
                }
            } catch (error) {
                if (error.response) {
                    if (error.response.status === 422) {
                        toast.error(
                            "Failed to save role. " +
                                (error.response.data.error ||
                                    "Validation error."),
                        );
                    } else if (error.response.status === 500) {
                        toast.error(
                            "A server error occurred. Please try again later.",
                        );
                    } else {
                        toast.error("An error occurred. Please try again.");
                    }
                } else {
                    toast.error(
                        "Failed to save role and permissions. Please check your network connection and try again.",
                    );
                }
            } finally {
                isLoading.value = false;
            }
        };

        const showDrawer = () => {
            open.value = true;
        };

        const onClose = () => {
            open.value = false;
        };

        onMounted(async () => {
            await fetchRoles();
            await fetchPermissions();
        });

        return {
            roles,
            permissions,
            form,
            open,
            drawerWidth,
            rules,
            permissionsGrouped,
            handleInput,
            handleBlur,
            toggleAllModules,
            toggleModulePermissions,
            toggleSinglePermission,
            isModuleChecked,
            isModuleIndeterminate,
            isPermissionChecked,
            handleSubmit,
            showDrawer,
            onClose,
            isLoading,
        };
    },
});
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
