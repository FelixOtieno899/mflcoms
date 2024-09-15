<template>
    <sdCards>
        <template v-slot:title>
            <div class="setting-card-title">
                <sdHeading as="h4">Edit Driver</sdHeading>
                <span>Set Up driver's Information</span>
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
                        <a-form-Item label="First Name">
                            <a-input v-model:value="formState.first_name" />
                        </a-form-Item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-Item label="Last Name">
                            <a-input v-model:value="formState.last_name" />
                        </a-form-Item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-Item label="ID Number">
                            <a-input v-model:value="formState.national_id" />
                        </a-form-Item>
                    </a-col>
                </a-row>

                <a-row :gutter="16">
                    <a-col :span="8">
                        <a-form-Item label="Date of Birth">
                            <a-input
                                v-model:value="formState.date_of_birth"
                                readonly
                            />
                        </a-form-Item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-Item label="Phone">
                            <a-input v-model:value="formState.phone" />
                        </a-form-Item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-Item label="NSSF">
                            <a-input
                                v-model:value="formState.nssf_number"
                                readonly
                            />
                        </a-form-Item>
                    </a-col>
                </a-row>

                <a-row :gutter="16">
                    <a-col :span="8">
                        <a-form-Item label="NHIF">
                            <a-input
                                v-model:value="formState.nhif_number"
                                readonly
                            />
                        </a-form-Item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-Item label="KRA Pin">
                            <a-input
                                v-model:value="formState.kra_pin"
                                readonly
                            />
                        </a-form-Item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-Item label="Driver License Number">
                            <a-input
                                v-model:value="formState.license_no"
                                readonly
                            />
                        </a-form-Item>
                    </a-col>
                </a-row>

                <a-row :gutter="16">
                    <a-col :span="8">
                        <a-form-Item label="Bank Account Name">
                            <a-input v-model:value="formState.bank_name" />
                        </a-form-Item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-Item label="Bank Account Number">
                            <a-input
                                v-model:value="formState.bank_account_number"
                            />
                        </a-form-Item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-Item label="Address">
                            <a-input v-model:value="formState.address" />
                        </a-form-Item>
                    </a-col>
                </a-row>

                <div class="setting-form-actions">
                    <sdButton size="default" htmlType="submit" type="primary">
                        Update
                    </sdButton>
                    &nbsp; &nbsp;
                    <sdButton
                        size="default"
                        @click.prevent="handleCancel"
                        type="light"
                    >
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

const DriverEdit = defineComponent({
    name: "DriverEdit",
    components: { BasicFormWrapper },
    props: ["id"], // Accept the id prop

    setup(props) {
        const router = useRouter();
        const toast = useToast();
        const isLoading = ref(false);

        const formState = reactive({
            first_name: "",
            last_name: "",
            national_id: "",
            date_of_birth: "",
            phone: "",
            nssf_number: "",
            nhif_number: "",
            kra_pin: "",
            license_no: "",
            bank_name: "",
            bank_account_number: "",
            address: "",
        });

        const fetchDriverDetails = async (driverId) => {
            try {
                const response = await DataService.get(`/driver/${driverId}`);
                console.log("Details fetched of a driver", response.data);
                const driverDetails = response.data.Driver;
                return driverDetails;
            } catch (error) {
                console.error("Error fetching driver details:", error);
                if (error.response) {
                    console.error("Error response:", error.response);
                }
            }
        };

        const updateDriverDetails = async (driverId, updatedDetails) => {
            try {
                const response = await DataService.put(
                    `/driver/${driverId}`,
                    updatedDetails,
                );
                console.log("Driver updated successfully:", response.data);
            } catch (error) {
                console.error("Error updating driver details:", error);
                if (error.response) {
                    console.error("Error response:", error.response);
                }
            }
        };

        onMounted(async () => {
            const driverDetails = await fetchDriverDetails(props.id);
            Object.assign(formState, driverDetails);
        });

        const handleFinish = async () => {
            try {
                isLoading.value = true;

                await updateDriverDetails(props.id, formState);
                toast.success("Driver updated successfully!");
                // router.push({
                //     path: `/app/drivers/edit/${props.id}`,
                //     query: { _r: Date.now() },
                // });

                console.log("Driver details updated successfully");
            } catch (error) {
                toast.error("Error updating driver details");
                console.error("Error updating driver details:", error);
            } finally {
                isLoading.value = false;
            }
        };

        const handleFinishFailed = (errors) => {
            console.log(errors);
        };

        const handleCancel = () => {
            router.push(`/app/drivers`);
        };

        return {
            formState,
            handleFinish,
            handleFinishFailed,
            handleCancel,
            isLoading,
        };
    },
});

export default DriverEdit;
</script>

<style scoped>
.loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 500px;
}
</style>
