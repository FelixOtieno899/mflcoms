<template>
  <Main>
    <a-row :gutter="15">
      <a-col :xs="24">
        <BorderLessHeading>
          <sdCards title="Manage Job Cards">
            <a-row>
              <a-col
                style="display: flex; justify-content: flex-end"
                :span="24"
              >
                <a-button
                  style="margin-top: -30px"
                  type="primary"
                  @click="createJobCard"
                >
                  <template #icon><PlusOutlined /></template>
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
            />
          </sdCards>
        </BorderLessHeading>
      </a-col>
    </a-row>
  </Main>
</template>

<script>
import { DataService } from "@/config/dataService/dataService";
import { defineComponent,ref, onMounted, computed } from "vue";
import { Main } from "../../../styled";
import DataTables from "@/components/table/DataTable.vue";
import { BorderLessHeading } from "../../../styled";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { Modal } from "ant-design-vue";
import { useStore } from "vuex";


export default defineComponent({
  name: "JobCard",
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
            state.auth.permissions.includes("JobCard.Approve"),
        );

        console.log("User Permissions:", state.auth.permissions);
        console.log("Can Approve:", canApprove.value);


        const dataTableColumn = [
            {
                title: "Job Card ID",
                dataIndex: "job_card_id",
                key: "job_card_id",
            },
            {
                title: "Workshop Ref No",
                dataIndex: "workshop_reference_number",
                key: "workshop_reference_number",
            },
            {
                title: "Truck",
                dataIndex: "truck",
                key: "truck",
            },

            {
                title: "Driver",
                dataIndex: "driver",
                key: "driver",
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
                customRender: ({ record }) => {
                  const isApproved = record.user_has_approved;
                    return (
                        <div class="table-actions">
                          <button
                                style={`cursor: ${isApproved ? "not-allowed" : "pointer"}; background: ${isApproved ? "gray" : "green"}; border-radius: 10px; color: white; font-size: 12px`}
                                disabled={isApproved}
                                onclick={() => {
                                    if (!isApproved) {
                                        approveJobCard(record.key);
                                    }
                                }}
                            >
                                {isApproved ? "Approved" : "Approve"}
                            </button>
                            <button
                                class="view"
                                onClick={() => viewJobCard(record.key)}
                            >
                                <unicon name="eye"></unicon>
                            </button>
                            <button
                                class="edit"
                                onClick={() => editJobcard(record.key)}
                            >
                                <unicon name="edit"></unicon>
                            </button>
                            <button
                                class="delete"
                                onClick={() => deleteJobCard(record.key)}
                            >
                                <unicon name="trash"></unicon>
                            </button>
                        </div>
                    );
                },
            },
        ];


    


    const fetchJobCards= async () => {
            try {
                const response = await DataService.get("/job_card");
                console.log("Job cards fetched", response.data);
                if (response.status === 200) {
                    if (Array.isArray(response.data.Job_cards)) {
                        
                        tableDataScource.value =
                            response.data.Job_cards.map((jobCard) => ({
                               // id: `#${brand.id}`,
                                key: jobCard.id,
                                job_card_id: (
                                    <span class="ninjadash-username">
                                        {jobCard.job_card_reference_number}
                                    </span>
                                ),
                                workshop_reference_number:<span>{jobCard.workshop_reference_number}</span>,
                                  driver: <span>{jobCard.driver.first_name}  {jobCard.driver.last_name}  </span>,
                                  truck:jobCard.truck.registration_no,
                                status: (
                                    <span
                                        class={`ninjadash-status ninjadash-status-${jobCard.status}`}
                                    >
                                        {jobCard.status}
                                    </span>
                                ),
                                user_has_approved: jobCard.user_has_approved
                            }));
                    } else {
                        // No job cards found, handle accordingly
                        tableDataScource.value = [];
                    }
                } else {
                    return;
                    //toast.error("Failed to fetch job cards. Please try again.");
                }
            } catch (error) {
                console.error("Error fetching job cards:", error);
                toast.error("An error occurred. Please try again.");
            }
        };

   


    const createJobCard = () => {
    
            router.push("/app/job-card/create");
      
    }


    const viewJobCard = (jobCardId) => {
            router.push(`/app/job-card/${jobCardId}`);
        };

        const editJobcard = (jobCardId) => {
          router.push(`/app/job-card/edit/${jobCardId}`);
        };
        const deleteJobCard = async (jobCardId) => {
            try {
                Modal.confirm({
                    title: "Are you sure you want to delete this job card?",
                    content: "This action cannot be undone.",
                    okText: "Yes",
                    okType: "danger",
                    cancelText: "No",
                    onOk: async () => {
                        try {
                            await DataService.delete(`/job_card/${jobCardId}`);
                            toast.success("Job Card removed successfully.");
                            await fetchJobCards();
                        } catch (error) {
                            toast.error(
                                "Failed to delete job card. Please try again.",
                            );
                        }
                    },
                    onCancel() {
                        console.log("Canceled");
                    },
                });
            } catch (error) {
                toast.error(
                    "An error occurred while trying to delete the job card.",
                );
            }
        };

    
        onMounted(async () => {
  
            // isLoading.value = true;
            try {
                await fetchJobCards();
            } catch (error) {
                console.error("Error fetching initial data:", error);
            }
            // } finally {
            //     isLoading.value = false;
            // }
        });


        
        const approveJobCard = async (id) => {
            if (!canApprove.value) {
                toast.error("You are not allowed to approve this job card.");
                return;
            }

            try {
                const response = await DataService.post(
                    `/job_card/${id}/approve`,
                );
                console.log("I want to see response", response);

                if (response.status === 200) {
                    toast.success("Job card approved successfully");
                    await fetchJobCards(); 
                } else {
                
                    toast.error("Failed to approve job card");
                }
            } catch (error) {
                console.log("Error details:", error);

                let errorMessage =
                    "An unexpected error occurred. Please try again.";

                
                if (error.response) {
                    
                    errorMessage =
                        error.response.data.error || "Failed to approve job card";
                }

                
                toast.error(errorMessage);
            }
        };




    return {
      tableDataScource,
      dataTableColumn,
      createJobCard
    
    };
  },
});
</script>
