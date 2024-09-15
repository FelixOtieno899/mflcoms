<template>
    <sdCards>
        <template v-slot:title>
            <div class="setting-card-title">
                <sdHeading as="h4">Edit Roles & Permissions</sdHeading>
                
            </div>
        </template>
        <BasicFormWrapper v-if="isLoading">
            <a-space class="loading">
                <a-spin size="large" />
            </a-space>
        </BasicFormWrapper>

        <BasicFormWrapper v-else>
           <a-form :model="form" :rules="rules" layout="vertical">
                            <a-row style="margin-bottom: 20px">
                                <a-col>
                                    <h4>Role Name</h4>
                                    <div
                                        style="width: 200px; position: relative"
                                    >
                                        <input
                                        readonly
                                        
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
                                        <a-button @click="onClose"
                                            >Cancel</a-button
                                        >
                                        <a-button
                                            type="primary"
                                            @click="handleSubmit"
                                            >Update</a-button
                                        >
                                    </a-space>
                                </a-col>
                            </a-row>
                        </a-form>
        </BasicFormWrapper>
    </sdCards>
</template>

<script>
import { DataService } from "@/config/dataService/dataService";
import { reactive, ref, defineComponent, onMounted, computed } from "vue";
import { useToast } from "vue-toastification";
import {  BasicFormWrapper  } from "../../../styled";
import { useRouter } from "vue-router";


export default defineComponent({
    name: "UserTableEdit",
    components: { BasicFormWrapper },
    props: ["id"],
    setup(props) {
        const toast = useToast();
        const router = useRouter();
        const roles = ref([]);
        const permissions = ref([]);
        const open = ref(false);
        const isLoading = ref(false);
        const drawerWidth = ref("100vw");
        const form = reactive({
            role: "",
            role_id: props.id,
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

        const fetchRoleDetails = async () => {
            try {
                const response = await DataService.get(`/roles/${props.id}`);
                console.log("I am in edit component", response);
                form.role = response.data.role.name;
                form.permissions = response.data.role.permissions.map(
                    (perm) => perm.name,
                );
            } catch (error) {
                toast.error("Failed to fetch role details. Please try again.");
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
            if (!form.role) {
                toast.error("Role name is required.");
                return;
            }

            try {
                const response = await DataService.put(
                    `/roles/${form.role_id}`,
                    {
                        name: form.role,
                        permissions: form.permissions,
                    },
                );

                if (response.status === 200) {
                    toast.success("Role and permissions updated successfully.");
                    onClose();
                    await fetchRoleDetails();
                    await fetchPermissions();
                }
            } catch (error) {
                toast.error(
                    "Failed to update role and permissions. Please try again.",
                );
            }
        };

        const showDrawer = () => {
            open.value = true;
        };

        const onClose = () => {
            router.push({ path: "/app/users/roles" });

        };

        onMounted(async () => {
            await fetchRoleDetails();
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
