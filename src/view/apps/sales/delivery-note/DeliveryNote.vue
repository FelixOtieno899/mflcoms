<template>
    <Main>
        <a-row :gutter="15">
            <a-col :xs="24">
                <BorderLessHeading>
                    <sdCards title="Manage Delivery Notes">
                        <a-row>
                            <a-col
                                style="display: flex; justify-content: flex-end"
                                :span="24"
                            >
                                <a-button
                                    style="margin-top: -30px"
                                    type="primary"
                                    @click="createDeliveryNote"
                                >
                                    <template #icon>
                                        <PlusOutlined />
                                    </template>
                                    + Add New
                                </a-button>
                            </a-col>
                        </a-row>

                        <DataTables
                            :filterOption="true"
                            :filterOnchange="true"
                            :tableData="tableDataScource"
                            :columns="dataTableColumn"
                            :rowSelection="false"
                            @search="fetchDeliveryNotes"
                        />
                    </sdCards>
                </BorderLessHeading>
            </a-col>
        </a-row>
    </Main>
</template>

<script>
import { DataService } from "@/config/dataService/dataService";
import { defineComponent, ref, onMounted,computed } from "vue";
import { Main } from "../../../styled";
import DataTables from "@/components/table/DataTable.vue";
import { BorderLessHeading } from "../../../styled";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { useStore } from "vuex";

export default defineComponent({
    name: "DeliveryNote",
    components: {
        Main,
        DataTables,
        BorderLessHeading,
    },
    setup() {
        const { state } = useStore();
        const router = useRouter();
        const toast = useToast();

        const tableDataScource = ref([]);
        const canApprove = computed(() =>
            state.auth.permissions.includes("DeliveryNote.Approve"),
        );

        console.log("User Permissions:", state.auth.permissions);
        console.log("Can Approve:", canApprove.value);


        const dataTableColumn = [
            {
                title: "Delivery Note Number",
                dataIndex: "delivery_note_number",
                key: "delivery_note_number",
            },
            {
                title: "Client",
                dataIndex: "client",
                key: "user",
            },
            {
                title: "Delivery Date",
                dataIndex: "delivery_date",
                key: "delivery_date",
            },
            {
                title: "Loading point",
                dataIndex: "loading_point",
                key: "loading_point",
            },
            {
                title: "Off Loading point",
                dataIndex: "off_loading_point",
                key: "off_loading_point",
            },
            {
                title: "Actions",
                dataIndex: "action",
                key: "action",
                width: "90px",
                customRender: ({ record }) => {
                    const isApproved = record.user_has_approved;
                    return (
                        <div class="table-actions">
                            <button
                                style={`cursor: ${isApproved ? "not-allowed" : "pointer"}; background: ${isApproved ? "gray" : "green"}; border-radius: 10px; color: white; font-size: 12px`}
                                disabled={isApproved}
                                onclick={() => {
                                    if (!isApproved) {
                                        approveDeliveryNote(record.key);
                                    }
                                }}
                            >
                                {isApproved ? "Approved" : "Approve"}
                            </button>
                            <button
                                style="cursor: pointer"
                                class="view"
                                onClick={() => viewDeliveryNote(record.key)}
                            >
                                <unicon name="eye"></unicon>
                            </button>
                            <button
                                style="cursor: pointer"
                                class="edit"
                                onClick={() => editDeliveryNote(record.key)}
                            >
                                <unicon name="edit"></unicon>
                            </button>
                            <button
                                style="cursor: pointer"
                                class="delete"
                                onClick={() => deleteDeliveryNote(record.key)}
                            >
                                <unicon name="trash"></unicon>
                            </button>
                        </div>
                    );
                },
            },
        ];

        const fetchDeliveryNotes = async (deliveryDate = null) => {
            try {
                let response;
                if (deliveryDate) {
                    response = await searchDeliveryNotes(deliveryDate);
                } else {
                    response = await DataService.get("/delivery_note");
                    console.log("Delivery notes fetched", response.data);
                    if (response.status === 200) {
                        if (Array.isArray(response.data.Delivery_notes)) {
                            tableDataScource.value =
                                response.data.Delivery_notes.map((note) => ({
                                    key: note.id,
                                    delivery_note_number:
                                        note.delivery_note_number,
                                    client: (
                                        <span>
                                            {note.client.user.first_name}{" "}
                                            {note.client.user.last_name}
                                        </span>
                                    ),
                                    delivery_date: note.delivery_date,
                                    loading_point: note.pick_up_location,
                                    off_loading_point: note.destination,
                                    user_has_approved: note.user_has_approved,
                                }));
                        } else {
                            tableDataScource.value = [];
                        }
                    } else {
                        return;
                    }
                }
            } catch (error) {
                console.error("Error fetching delivery notes:", error);
                toast.error("An error occurred. Please try again.");
            }
        };

        const searchDeliveryNotes = async (deliveryDate) => {
            try {
                const response = await DataService.get(
                    `/delivery_note/search/${deliveryDate}`,
                );
                if (
                    response.status === 200 &&
                    Array.isArray(response.data.Delivery_notes)
                ) {
                    tableDataScource.value = response.data.Delivery_notes.map(
                        (note) => ({
                            key: note.id,
                            client: (
                                <span>
                                    {note.client.user.first_name}{" "}
                                    {note.client.user.last_name}
                                </span>
                            ),
                            delivery_date: note.delivery_date,
                            loading_point: note.pick_up_location,
                            off_loading_point: note.destination,
                        }),
                    );
                } else {
                    tableDataScource.value = [];
                }
            } catch (error) {
                console.error("Error searching sales order:", error);
                toast.error("An error occurred. Please try again.");
            }
        };

        const createDeliveryNote = () => {
             router.push(`/app/delivery-note/create`);

            // router
            //     .push({
            //         path: "/app/delivery-note/create",
            //     });
                
        };

        const viewDeliveryNote = (deliveryNoteId) => {
            router.push(`/app/delivery-note/${deliveryNoteId}`);
        };

        const editDeliveryNote = (deliveryNoteId) => {
            router.push(`/app/delivery-note/edit/${deliveryNoteId}`);
        };

        const deleteDeliveryNote = async (deliveryNoteId) => {
            if (
                confirm("Are you sure you want to delete this delivery note?")
            ) {
                try {
                    await DataService.delete(
                        `/delivery_note/${deliveryNoteId}`,
                    );
                    toast.success("Delivery notes deleted successfully.");
                    await fetchDeliveryNotes();
                } catch (error) {
                    toast.error("Failed to delete order. Please try again.");
                }
            }
        };


        
        const approveDeliveryNote = async (id) => {
            if (!canApprove.value) {
                toast.error("You are not allowed to approve this delivery note.");
                return;
            }

            try {
                const response = await DataService.post(
                    `/delivery_note/${id}/approve`,
                );
                console.log("I want to see response", response);

                if (response.status === 200) {
                    toast.success("Delivery Note approved successfully");
                    await fetchDeliveryNotes(); 
                } else {
                
                    toast.error("Failed to approve delivery note");
                }
            } catch (error) {
                console.log("Error details:", error);

                let errorMessage =
                    "An unexpected error occurred. Please try again.";

                
                if (error.response) {
                    
                    errorMessage =
                        error.response.data.error || "Failed to approve delivery note";
                }

                
                toast.error(errorMessage);
            }
        };


        onMounted(async () => {
            await fetchDeliveryNotes();
        });
        return {
            tableDataScource,
            dataTableColumn,
            createDeliveryNote,
        };
    },
});
</script>
