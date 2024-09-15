<template>
    <sdCards>
        <template v-slot:title>
            <div class="setting-card-title">
                <sdHeading as="h4">Edit Vehicle Insurance</sdHeading>
                <span>Set Up vehicle insurer's Information</span>
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
                        <a-form-Item label="Policy Number">
                            <a-input v-model:value="formState.policy_number" />
                        </a-form-Item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-Item label="Policy Start Date">
                            <a-input
                                v-model:value="formState.policy_start_date"
                            />
                        </a-form-Item>
                    </a-col>
                </a-row>

                <a-row :gutter="16">
                    <a-col :span="12">
                        <a-form-Item label="Policy Expiry Date">
                            <a-input
                                v-model:value="formState.policy_expiry_date"
                            />
                        </a-form-Item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-Item label="Registration Number">
                            <a-input
                                v-model:value="formState.registration_no"
                                readonly
                            />
                        </a-form-Item>
                    </a-col>
                </a-row>

                <a-row :gutter="16">
                    <a-col :span="12">
                        <a-form-Item label="Premium Amount">
                            <a-input v-model:value="formState.premium_amount" />
                        </a-form-Item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-Item label="Deductible Amount">
                            <a-input
                                v-model:value="formState.deductible_amount"
                            />
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

const VehicleInsuranceEdit = defineComponent({
    name: "VehicleInsuranceEdit",
    components: { BasicFormWrapper },
    props: ["id"], // Accept the id prop

    setup(props) {
        const router = useRouter();
        const toast = useToast();
        const isLoading = ref(false);

        const formState = reactive({
            insurer_id: "",
            policy_number: "",
            policy_start_date: "",
            policy_expiry_date: "",
            registration_no: "",
            premium_amount: "",
            deductible_amount: "",
        });

        const fetchVehicleInsuranceDetails = async (vehicleInsurerId) => {
            try {
                const response = await DataService.get(
                    `/insurance/${vehicleInsurerId}`,
                );
                console.log(
                    "Details fetched of vehicle insurance",
                    response.data,
                );
                const vehicleInsuranceDetails = response.data.VehicleInsurance;
                return vehicleInsuranceDetails;
            } catch (error) {
                console.error(
                    "Error fetching vehicle insurance details:",
                    error,
                );
                if (error.response) {
                    console.error("Error response:", error.response);
                }
            }
        };

        const updateVehicleInsuranceDetails = async (
            vehicleInsurerId,
            updatedDetails,
        ) => {
            try {
                const response = await DataService.put(
                    `/insurance/${vehicleInsurerId}`,
                    updatedDetails,
                );
                console.log(
                    "Vehicle Insurance  updated successfully:",
                    response.data,
                );
            } catch (error) {
                console.error(
                    "Error updating vehicle insurance details:",
                    error,
                );
                if (error.response) {
                    console.error("Error response:", error.response);
                }
            }
        };

        onMounted(async () => {
            const vehicleInsuranceDetails = await fetchVehicleInsuranceDetails(
                props.id,
            );
            Object.assign(formState, vehicleInsuranceDetails);
        });

        const handleFinish = async () => {
            try {
                isLoading.value = true;

                await updateVehicleInsuranceDetails(props.id, formState);
                toast.success("Vehicle Insurance updated successfully!");
                // router.push({
                //     path: `/app/drivers/edit/${props.id}`,
                //     query: { _r: Date.now() },
                // });

                console.log("Vehicle Insurance details updated successfully");
            } catch (error) {
                toast.error("Error updating Vehicle Insurance details");
                console.error(
                    "Error updating Vehicle Insurance details:",
                    error,
                );
            } finally {
                isLoading.value = false;
            }
        };

        const handleFinishFailed = (errors) => {
            console.log(errors);
        };

        const handleCancel = () => {
            router.push(`/app/vehicle-insurances`);
        };

        return {
            formState,
            handleFinish,
            handleFinishFailed,
            handleCancel,
        };
    },
});

export default VehicleInsuranceEdit;
</script>

<style scoped>
.loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}
</style>
