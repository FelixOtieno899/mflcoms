<template>
    <UserTableStyleWrapper>
        <TableWrapper class="table-responsive">
            <a-table
                :rowSelection="rowSelection"
                :dataSource="usersTableData"
                :columns="usersTableColumns"
                :pagination="{
                    defaultPageSize: 5,
                    total: usersTableData.length,
                    showTotal: (total, range) =>
                        `${range[0]}-${range[1]} of ${total} items`,
                }"
            />
        </TableWrapper>
    </UserTableStyleWrapper>
</template>
<script>
import { DataService } from "@/config/dataService/dataService";
import { UserTableStyleWrapper } from "../style";
import { TableWrapper } from "../../../styled";
import { defineComponent, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const UserListTable = defineComponent({
    name: "UserListTable",
    components: { UserTableStyleWrapper, TableWrapper },
    setup() {
        const usersTableData = ref([]);
        const router = useRouter();
        const toast = useToast();

        const usersTableColumns = [
            {
                title: "Role",
                dataIndex: "role",
                key: "role",
            },
            {
                title: "Permissions",
                dataIndex: "permissions",
                key: "permissions",
            },
            {
                title: "Actions",
                dataIndex: "action",
                key: "action",
                width: "90px",
                customRender: ({ record }) => {
                    console.log("What is here for roles", record);
                    return (
                        <div class="table-actions">
                            <>
                                <sdButton
                                    class="btn-icon"
                                    type="default"
                                    to="#"
                                    shape="circle"
                                    onClick={() => viewRole(record.key)}
                                >
                                    <unicon name="eye" width="16"></unicon>
                                </sdButton>
                                <sdButton
                                    class="btn-icon"
                                    type="default"
                                    to="#"
                                    shape="circle"
                                    onClick={() => editRole(record.key)}
                                >
                                    <unicon name="edit" width="16"></unicon>
                                </sdButton>
                                <sdButton
                                    class="btn-icon"
                                    type="default"
                                    to="#"
                                    shape="circle"
                                    onClick={() => deleteRole(record.key)}
                                >
                                    <unicon
                                        name="trash-alt"
                                        width="16"
                                    ></unicon>
                                </sdButton>
                            </>
                        </div>
                    );
                },
            },
        ];

        const formatPermission = (permission) => {
            const parts = permission.split(".");
            return `${parts[1]} ${parts[0]}`; // Format as "View User"
        };

        const splitPermissions = (permissions, chunkSize) => {
            const chunks = [];
            for (let i = 0; i < permissions.length; i += chunkSize) {
                chunks.push(permissions.slice(i, i + chunkSize));
            }
            return chunks;
        };

        const fetchRoles = async () => {
            try {
                const response = await DataService.get("/roles");

                console.log("Roles fetched", response.data);
                usersTableData.value = response.data.roles.map((role) => {
                    const permissionChunks = splitPermissions(
                        role.permissions,
                        4,
                    );
                    return {
                        key: role.id,
                        role: role.name,
                        permissions: permissionChunks.map((chunk) => (
                            <p style="color: #0d79df">
                                {chunk
                                    .map((perm) => formatPermission(perm.name))
                                    .join(", ")}
                            </p>
                        )),
                    };
                });
            } catch (error) {
                console.error("Error fetching roles and permissions:", error);
            }
        };

        const viewRole = (roleId) => {
            router.push(`/app/users/roles/${roleId}`);
        };

        const editRole = (roleId) => {
            router.push(`/app/users/roles/edit/${roleId}`);
        };

        const deleteRole = async (roleId) => {
            if (
                window.confirm(
                    "Are you sure you want to delete this role? This action cannot be undone.",
                )
            ) {
                try {
                    await DataService.delete(`/roles/${roleId}`);
                    toast.success("Role  deleted successfully.");
                    await fetchRoles(); // Refresh the list
                } catch (error) {
                    toast.error("Failed to delete  role. Please try again.");
                }
            }
        };

        const rowSelection = {
            getCheckboxProps: (record) => ({
                disabled: record.name === "Disabled User",
                name: record.name,
            }),
        };

        onMounted(async () => {
            await fetchRoles();
        });

        return { usersTableColumns, usersTableData, rowSelection };
    },
});

export default UserListTable;
</script>
