<template>
    <sdCards>
        <template v-slot:title>
            <div class="setting-card-title">
                <sdHeading as="h4">Edit Account Type</sdHeading>
                <span>Set Up account's type Information</span>
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
                        <a-form-Item label="Name">
                            <a-input v-model:value="formState.name" />
                        </a-form-Item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-Item label="Type">
                            <a-input v-model:value="formState.type" />
                        </a-form-Item>
                    </a-col>
                </a-row>

                <a-row :gutter="16">
                    <a-col :span="8">
                        <a-form-Item label="Status">
                            <a-input v-model:value="formState.status" />
                        </a-form-Item>
                    </a-col>
                </a-row>

                <div class="setting-form-actions">
                    <sdButton size="default" htmlType="submit" type="primary">
                        Update
                    </sdButton>
                    &nbsp; &nbsp;
                    <sdButton size="default" @click="handleCancel" type="light">
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

const AccountTypeEdit = defineComponent({
    name: "AccountTypeEdit",
    components: { BasicFormWrapper },
    props: ["id"], // Accept the id prop

    setup(props) {
        const router = useRouter();
        const toast = useToast();
        const isLoading = ref(false);

        const formState = reactive({
            name: "",
            type: "",
            status: "",
        });

        const fetchAccountTypeDetails = async (accountTypeId) => {
            try {
                const response = await DataService.get(
                    `/account_type/${accountTypeId}`,
                );
                console.log("Details fetched of account Type", response.data);
                const accountTypeDetails = response.data.Account_type;
                return accountTypeDetails;
            } catch (error) {
                console.error("Error fetching accounty type details:", error);
                if (error.response) {
                    console.error("Error response:", error.response);
                }
            }
        };

        const updateAccountTypeDetails = async (
            accountTypeId,
            updatedDetails,
        ) => {
            try {
                const response = await DataService.put(
                    `/account_type/${accountTypeId}`,
                    updatedDetails,
                );
                console.log(
                    "Account type updated successfully:",
                    response.data,
                );
            } catch (error) {
                console.error("Error updating account type  details:", error);
                if (error.response) {
                    console.error("Error response:", error.response);
                }
            }
        };

        onMounted(async () => {
            const accountTypeDetails = await fetchAccountTypeDetails(props.id);
            Object.assign(formState, accountTypeDetails);
        });

        const handleFinish = async () => {
            try {
                isLoading.value = true;

                await updateAccountTypeDetails(props.id, formState);
                toast.success("Account type updated successfully!");
                // router.push({
                //     path: `/app/drivers/edit/${props.id}`,
                //     query: { _r: Date.now() },
                // });

                console.log("Account type details updated successfully");
            } catch (error) {
                toast.error("Error updating Account type details");
                console.error("Error updating Account type details:", error);
            } finally {
                isLoading.value = false;
            }
        };

        const handleFinishFailed = (errors) => {
            console.log(errors);
        };

        const handleCancel = () => {
            router.push(`/app/account-types`);
        };

        return {
            formState,
            handleFinish,
            handleFinishFailed,
            handleCancel,
        };
    },
});

export default AccountTypeEdit;
</script>

<style scoped>
.loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}
</style>
