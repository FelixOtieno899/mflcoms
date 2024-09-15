<template>
    <sdCards>
        <template v-slot:title>
            <div class="setting-card-title">
                <sdHeading as="h4">Edit Account</sdHeading>
                <span>Set Up Account's Information</span>
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
                :rules="rules"
                layout="vertical"
            >
                <a-row :gutter="16">
                    <a-col :span="8">
                        <a-form-item label="Account Name" name="name">
                            <a-input
                                type="text"
                                v-model:value="formState.name"
                            />
                        </a-form-item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-item label="Account Type" name="name">
                            <a-input
                                type="text"
                                v-model:value="formState.account_type"
                                readonly
                            />
                        </a-form-item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-item label="Detail Type" name="detail_type">
                            <a-input
                                type="text"
                                v-model:value="formState.detail_type"
                                readonly
                            />
                        </a-form-item>
                    </a-col>
                </a-row>
           
               
                <a-row :gutter="16">
                   

                    <a-col :span="24">
                        <a-form-item
                            label="Opening Balance"
                            name="opening_balance"
                        >
                            <a-input
                                type="text"
                                v-model:value="formState.opening_balance"
                            />
                        </a-form-item>
                    </a-col>

                   
                </a-row>

                <a-row :gutter="16">
                    <a-col :span="24">
                        <a-form-item label="Description" name="description">
                            <a-textarea
                                type="text"
                                v-model:value="formState.description"
                            />
                        </a-form-item>
                    </a-col>
                </a-row>

                <a-row style="margin-top: 30px" :gutter="16">
                    <a-col :span="24">
                        <a-space align="end">
                            <a-button @click.prevent="handleCancel">Cancel</a-button>
                            <a-button type="primary" html-type="submit"
                                >Submit</a-button
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
import { BasicFormWrapper } from "../../../../styled";
import { defineComponent, ref, reactive, onMounted } from "vue";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";

const AccountEdit = defineComponent({
    name: "AccountEdit",
    components: { BasicFormWrapper },
    props: ["id"], // Accept the id prop

    setup(props) {
        const router = useRouter();
        const toast = useToast();
        const isLoading = ref(false);

        const formState = reactive({
            account_type: "",
            detail_type: "",
            name: "",
            
            opening_balance: "",
           
            description: "",
           
        });

        const fetchAccountDetails = async (accountId) => {
            try {
                const response = await DataService.get(`/account/${accountId}`);
                console.log("Details fetched of account", response.data);
                const accountDetails = response.data.Account;
                return accountDetails;
            } catch (error) {
                console.error("Error fetching account details:", error);
                if (error.response) {
                    console.error("Error response:", error.response);
                }
            }
        };

        const updateAccountDetails = async (accountId, updatedDetails) => {
            try {
                const response = await DataService.put(
                    `/account/${accountId}`,
                    updatedDetails,
                );
                console.log("Account updated successfully:", response.data);
            } catch (error) {
                console.error("Error updating account details:", error);
                if (error.response) {
                    console.error("Error response:", error.response);
                }
            }
        };

        onMounted(async () => {
            const accountDetails = await fetchAccountDetails(props.id);
            Object.assign(formState, accountDetails);

            formState.account_type = accountDetails.account_type_category
.account_type.name;
formState.detail_type = accountDetails.account_type_category
.name;
        });

        const handleFinish = async () => {
            try {
                isLoading.value = true;

                await updateAccountDetails(props.id, formState);
                toast.success("Account updated successfully!");
                // router.push({
                //     path: `/app/drivers/edit/${props.id}`,
                //     query: { _r: Date.now() },
                // });

                console.log("Account details updated successfully");
            } catch (error) {
                toast.error("Error updating account details");
                console.error("Error updating account details:", error);
            } finally {
                isLoading.value = false;
            }
        };

        const handleFinishFailed = (errors) => {
            console.log(errors);
        };

        const handleCancel = () => {
            router.push(`/app/accounts`);
        };

        return {
            formState,
            handleFinish,
            handleFinishFailed,
            handleCancel,
        };
    },
});

export default AccountEdit;
</script>

<style scoped>
.loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}
</style>
