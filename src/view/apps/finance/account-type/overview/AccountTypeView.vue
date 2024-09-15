<template>
    <sdCards>
        <template v-slot:title>
            <div class="setting-card-title">
                <sdHeading as="h4">Account Type Info</sdHeading>
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
                        <a-form-Item label="Type">
                            <a-input v-model:value="formState.type" readonly />
                        </a-form-Item>
                    </a-col>
                </a-row>

                <a-row :gutter="16">
                    <a-col :span="8">
                        <a-form-Item label="Status">
                            <a-input
                                v-model:value="formState.status"
                                readonly
                            />
                        </a-form-Item>
                    </a-col>
                </a-row>

                <div class="setting-form-actions">
                    <sdButton size="small" @click="handleCancel" type="light">
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

const AccountTypeView = defineComponent({
    name: "AccountTypeView",
    components: { BasicFormWrapper },
    props: ["id"], // Accept the id prop

    setup(props) {
        const router = useRouter();
        //const toast = useToast();
        //const isLoading = ref(false);

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

        onMounted(async () => {
            const accountTypeDetails = await fetchAccountTypeDetails(props.id);
            Object.assign(formState, accountTypeDetails);
        });

        const handleFinishFailed = (errors) => {
            console.log(errors);
        };

        const handleCancel = () => {
            router.push(`/app/account-types`);
        };

        return {
            formState,
            //handleFinish,
            handleFinishFailed,
            handleCancel,
        };
    },
});

export default AccountTypeView;
</script>
