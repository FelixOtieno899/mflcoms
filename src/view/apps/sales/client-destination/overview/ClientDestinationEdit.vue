<template>
    <sdCards>
        <template v-slot:title>
            <div class="setting-card-title">
                <sdHeading as="h4">Edit Client Location Details</sdHeading>
                <span>Set Up clients location Information</span>
            </div>
        </template>
        <BasicFormWrapper v-if="isLoading">
            <a-space class="loading">
                <a-spin size="large" />
            </a-space>
        </BasicFormWrapper>

        <BasicFormWrapper v-else>
            <a-form
                :model="formState"
                @finish="handleFinish"
                @finishFailed="handleFinishFailed"
                layout="vertical"
            >
                <a-row :gutter="16">
                    <a-col :span="8">
                        <a-form-Item label="Location">
                            <a-input
                                v-model:value="formState.location"
                                
                            />
                        </a-form-Item>
                    </a-col>
                    <!-- <a-col :span="8">
                        <a-form-Item label="Contact Person">
                            <a-input v-model:value="formState.contact_person" />
                        </a-form-Item>
                    </a-col> -->

                    <!-- <a-col :span="8">
                        <a-form-Item label="Contact Number">
                            <a-input v-model:value="formState.contact_number" />
                        </a-form-Item>
                    </a-col> -->
                </a-row>

                <a-row :gutter="16">
                    <!-- <a-col :span="12">
                        <a-form-Item label="Email">
                            <a-input v-model:value="formState.contact_email" />
                        </a-form-Item>
                    </a-col> -->

                    <a-col :span="12">
                        <a-form-Item label="Location Coordinates">
                            <a-input
                            
                                v-model:value="
                                    formState.coordinates
                                "
                            />
                        </a-form-Item>
                    </a-col>
                </a-row>

                <div class="setting-form-actions">
                    <sdButton size="default" htmlType="submit" type="primary">
                        Update
                    </sdButton>
                    &nbsp; &nbsp;
                    <sdButton size="default" @click.prevent="handleCancel" type="light">
                        Cancel
                    </sdButton>
                </div>
            </a-form>
        </BasicFormWrapper>
    </sdCards>
</template>

<script>
import { DataService } from "@/config/dataService/dataService";
import { BasicFormWrapper } from "../../../../styled";
import { defineComponent, ref, reactive, onMounted } from "vue";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";

const ClientDestinationEdit = defineComponent({
    name: "ClientDestinationEdit",
    components: { BasicFormWrapper },
    props: ["id"], // Accept the id prop

    setup(props) {
        const router = useRouter();
        const toast = useToast();
        const isLoading = ref(false);

        const formState = reactive({
            location: "",
            first_name: "",
            contact_person: "",
            contact_number: "",
            contact_email: "",
            coordinates: "",
            note: "",
        });

        const fetchClientDestinationDetails = async (clientDestinationId) => {
            try {
                const response = await DataService.get(
                    `/clients-destinations/${clientDestinationId}`,
                );
                console.log(
                    "Details fetched of a  client Destination",
                    response.data,
                );
                const clientDestinationDetails =
                    response.data.Client_destination;

                console.log(
                    "Further details of clients destination:",
                    clientDestinationDetails,
                );
                return clientDestinationDetails;
            } catch (error) {
                console.error("Error fetching client destiantion:", error);
                if (error.response) {
                    console.error("Error response:", error.response);
                }
            }
        };

        const updateClientDestinationDetails = async (
            clientDestinationId,
            updatedDetails,
        ) => {
            try {
                const response = await DataService.put(
                    `/clients-destinations/${clientDestinationId}`,
                    updatedDetails,
                );
                console.log(
                    "Client Destination updated successfully:",
                    response.data,
                );
            } catch (error) {
                console.error("Error updating client destination:", error);
                if (error.response) {
                    console.error("Error response:", error.response);
                }
            }
        };

        onMounted(async () => {
            const clientDestinationDetails =
                await fetchClientDestinationDetails(props.id);
            console.log(
                "Client Destination details:",
                clientDestinationDetails,
            );

            // Assign client details to formState
            // formState.first_name =
            //     clientDestinationDetails.client.user.first_name;
            formState.location = clientDestinationDetails.location;
            formState.contact_person = clientDestinationDetails.contact_person;
            formState.contact_number = clientDestinationDetails.contact_number;
            formState.contact_email = clientDestinationDetails.contact_email;
            formState.coordinates =
                clientDestinationDetails.coordinates;
                formState.note =  clientDestinationDetails.note;
        });

        const handleFinish = async () => {
            try {
                isLoading.value = true;

                await updateClientDestinationDetails(props.id, formState);
                toast.success("Client destination updated successfully!");
                // router.push({
                //     path: `/app/drivers/edit/${props.id}`,
                //     query: { _r: Date.now() },
                // });

                console.log("Client updated successfully");
            } catch (error) {
                toast.error("Error updating Client");
                console.error("Error updating Client:", error);
            } finally {
                isLoading.value = false;
            }
        };

        const handleFinishFailed = (errors) => {
            console.log(errors);
        };

        const handleCancel = () => {
            router.push(`/app/client-locations`);
        };

        return {
            formState,
            handleFinish,
            handleFinishFailed,
            handleCancel,
        };
    },
});

export default ClientDestinationEdit;
</script>

<style scoped>
.loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}
</style>
