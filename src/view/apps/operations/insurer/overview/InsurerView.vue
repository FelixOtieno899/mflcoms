<template>
    <sdCards>
        <template v-slot:title>
            <div class="setting-card-title">
                <sdHeading as="h4">Insurer's Info</sdHeading>
            </div>
        </template>

        <BasicFormWrapper>
            <a-form
                :model="formState"
                @finish="handleFinish"
                @finishFailed="handleFinishFailed"
                layout="vertical"
            >
                <a-row :gutter="16">
                    <a-col :span="12">
                        <a-form-Item label="Name">
                            <a-input v-model:value="formState.name" readonly />
                        </a-form-Item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-Item label="Insurer Contact">
                            <a-input
                                v-model:value="formState.insurer_contact"
                                readonly
                            />
                        </a-form-Item>
                    </a-col>
                </a-row>

                <a-row :gutter="16">
                    <a-col :span="12">
                        <a-form-Item label="Broker">
                            <a-input
                                v-model:value="formState.broker"
                                readonly
                            />
                        </a-form-Item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-Item label="Broker Contact">
                            <a-input
                                v-model:value="formState.broker_contact"
                                readonly
                            />
                        </a-form-Item>
                    </a-col>
                </a-row>

                <div class="setting-form-actions">
                    <sdButton size="default" @click="handleCancel" type="light">
                        Back
                    </sdButton>
                </div>
            </a-form>
        </BasicFormWrapper>
    </sdCards>
</template>

<script>
import { DataService } from "@/config/dataService/dataService";
import { BasicFormWrapper } from "../../../../styled";
import { defineComponent, reactive, onMounted } from "vue";
//import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";

const InsurerView = defineComponent({
    name: "InsurerView",
    components: { BasicFormWrapper },
    props: ["id"], // Accept the id prop

    setup(props) {
        const router = useRouter();
        // const toast = useToast();
        //const isLoading = ref(false);

        const formState = reactive({
            name: "",
            broker: "",
            insurer_contact: "",
            broker_contact: "",
        });

        const fetchInsurerDetails = async (insurerId) => {
            try {
                const response = await DataService.get(`/insurer/${insurerId}`);
                console.log("Details fetched of an insurrer", response.data);
                const insurerDetails = response.data.Insurer;
                return insurerDetails;
            } catch (error) {
                console.error("Error fetching insurer details:", error);
                if (error.response) {
                    console.error("Error response:", error.response);
                }
            }
        };

        // const updateInsurerDetails = async (insurerId, updatedDetails) => {
        //     try {
        //         const response = await DataService.put(
        //             `/insurer/${insurerId}`,
        //             updatedDetails,
        //         );
        //         console.log("Insurer updated successfully:", response.data);
        //     } catch (error) {
        //         console.error("Error updating insurer details:", error);
        //         if (error.response) {
        //             console.error("Error response:", error.response);
        //         }
        //     }
        // };

        onMounted(async () => {
            const insurerDetails = await fetchInsurerDetails(props.id);
            Object.assign(formState, insurerDetails);
        });

        // const handleFinish = async () => {
        //     try {
        //         isLoading.value = true;

        //         await updateInsurerDetails(props.id, formState);
        //         toast.success("Insurer updated successfully!");
        //         // router.push({
        //         //     path: `/app/drivers/edit/${props.id}`,
        //         //     query: { _r: Date.now() },
        //         // });

        //         console.log("Insurer details updated successfully");
        //     } catch (error) {
        //         toast.error("Error updating insurer details");
        //         console.error("Error updating insurer details:", error);
        //     } finally {
        //         isLoading.value = false;
        //     }
        // };

        // const handleFinishFailed = (errors) => {
        //     console.log(errors);
        // };

        const handleCancel = () => {
            router.push(`/app/insurers`);
        };

        return {
            formState,
            // handleFinish,
            //handleFinishFailed,
            handleCancel,
        };
    },
});

export default InsurerView;
</script>
