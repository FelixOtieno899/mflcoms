<template>
    <sdCards>
        <template v-slot:title>
            <div class="setting-card-title">
                <sdHeading as="h4">Edit Client</sdHeading>
                <span>Set Up client's Information</span>
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
                    <a-col :span="12">
                        <a-form-Item label="First Name">
                            <a-input
                                v-model:value="formState.first_name"
                                readonly
                            />
                        </a-form-Item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-Item label="Last Name">
                            <a-input
                                v-model:value="formState.last_name"
                                readonly
                            />
                        </a-form-Item>
                    </a-col>
                </a-row>

                <a-row :gutter="16">
                    <a-col :span="8">
                        <a-form-Item label="Client Pin No">
                            <a-input v-model:value="formState.company_pin" />
                        </a-form-Item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-Item label="Email">
                            <a-input v-model:value="formState.email" readonly />
                        </a-form-Item>
                    </a-col>

                    <a-col :span="8">
                        <a-form-Item label="Phone">
                            <a-input v-model:value="formState.phone" readonly />
                        </a-form-Item>
                    </a-col>
                </a-row>

                <a-row :gutter="16">
                    <a-col :span="8">
                        <a-form-Item label="Website">
                            <a-input v-model:value="formState.website" />
                        </a-form-Item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-Item label="Postal Code">
                            <a-input v-model:value="formState.postal_code" />
                        </a-form-Item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-Item label="Address">
                            <a-input v-model:value="formState.address" />
                        </a-form-Item>
                    </a-col>
                </a-row>
                <a-row :gutter="16">
                    <a-col :span="8">
                        <a-form-item label="Country" name="country">
                            <a-input v-model:value="formState.country" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-item label="State" name="state">
                            <a-input v-model:value="formState.state" />
                        </a-form-item>
                    </a-col>

                    <a-col :span="8">
                        <a-form-item label="City" name="city">
                            <a-input v-model:value="formState.city" />
                        </a-form-item>
                    </a-col>
                </a-row>

                <div class="setting-form-actions">
                    <sdButton size="small" htmlType="submit" type="primary">
                        Update
                    </sdButton>
                    &nbsp; &nbsp;
                    <sdButton size="small" @click="handleCancel" type="light">
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

const ClientEdit = defineComponent({
    name: "ClientEdit",
    components: { BasicFormWrapper },
    props: ["id"], // Accept the id prop

    setup(props) {
        const router = useRouter();
        const toast = useToast();
        const isLoading = ref(false);

        const formState = reactive({
            first_name: "",
            last_name: "",
            email: "",
            company_pin: "",
            phone: "",
            website: "",
            postal_code: "",
            address: "",
            country: "",
            state: "",
            city: "",
            description: "",
        });

        const fetchClientDetails = async (clientId) => {
            try {
                const response = await DataService.get(`/clients/${clientId}`);
                console.log("Details fetched of a  client", response.data);
                const clientDetails = response.data.Client;

                console.log("Further details of clients:", clientDetails);
                return clientDetails;
            } catch (error) {
                console.error("Error fetching client:", error);
                if (error.response) {
                    console.error("Error response:", error.response);
                }
            }
        };

        const updateClientDetails = async (clientId, updatedDetails) => {
            try {
                const response = await DataService.put(
                    `/clients/${clientId}`,
                    updatedDetails,
                );
                console.log("Client updated successfully:", response.data);
            } catch (error) {
                console.error("Error updating client:", error);
                if (error.response) {
                    console.error("Error response:", error.response);
                }
            }
        };

        onMounted(async () => {
            const clientDetails = await fetchClientDetails(props.id);
            console.log("Client details:", clientDetails);

            // Assign client details to formState
            formState.first_name = clientDetails.user.first_name;
            formState.last_name = clientDetails.user.last_name;
            formState.email = clientDetails.user.email;
            formState.company_pin = clientDetails.company_pin;
            formState.phone = clientDetails.user.phone;
            formState.website = clientDetails.website;
            formState.postal_code = clientDetails.postal_code;
            formState.address = clientDetails.address;

            formState.country = clientDetails.country.name;
            formState.state = clientDetails.state.name;
            formState.city = clientDetails.city.name;
        });

        const handleFinish = async () => {
            try {
                isLoading.value = true;

                await updateClientDetails(props.id, formState);
                toast.success("Client  updated successfully!");
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
            router.push(`/app/clients`);
        };

        return {
            formState,
            handleFinish,
            handleFinishFailed,
            handleCancel,
        };
    },
});

export default ClientEdit;
</script>

<style scoped>
.loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}
</style>