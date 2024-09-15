<template>
    <sdCards>
        <template v-slot:title>
            <div class="setting-card-title">
                <sdHeading as="h4">Edit Vehicle</sdHeading>
                <span>Set Up Vehicle's Information</span>
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
                        <a-form-Item label="Name">
                            <a-input v-model:value="formState.vehicle_name" />
                        </a-form-Item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-Item label="Registration Number">
                            <a-input
                                v-model:value="formState.registration_no"
                            />
                        </a-form-Item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-item
                            label="Color"
                            name="vehicle_color"
                            :rules="[
                                {
                                    required: true,
                                },
                            ]"
                        >
                            <a-select
                                v-model:value="formState.vehicle_color"
                                class="custom-select"
                            >
                                <option value="">Please select Color</option>
                                <option value="blue">Blue</option>
                                <option value="silver">Silver</option>
                                <option value="black">Black</option>
                                <option value="white">White</option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                </a-row>

                <a-row :gutter="16">
                    <a-col :span="8">
                        <a-form-Item label="Odometer Reading">
                            <a-input
                                v-model:value="formState.odometer_reading"
                            />
                        </a-form-Item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-Item label="Engine Number">
                            <a-input v-model:value="formState.engine_no" />
                        </a-form-Item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-Item label="Chassis Number">
                            <a-input v-model:value="formState.chassis_no" />
                        </a-form-Item>
                    </a-col>
                </a-row>

                <a-row :gutter="16">
                    <a-col :span="8">
                        <a-form-Item label="Description">
                            <a-textarea v-model:value="formState.description" />
                        </a-form-Item>
                    </a-col>
                </a-row>

                <div class="setting-form-actions">
                    <sdButton size="small" htmlType="submit" type="primary">
                        Update
                    </sdButton>
                    &nbsp; &nbsp;
                    <sdButton
                        size="small"
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

const VehicleEdit = defineComponent({
    name: "VehicleEdit",
    components: { BasicFormWrapper },
    props: ["id"], // Accept the id prop

    setup(props) {
        const router = useRouter();
        const toast = useToast();
        const isLoading = ref(false);

        const formState = reactive({
            vehicle_name: "",
            vehicle_brand_id: "",
            registration_no: "",
            vehicle_color: "",
            odometer_reading: "",
            engine_no: "",
            chassis_no: "",
            description: "",
            //vehicle_image: null,
        });

        const fetchVehicleDetails = async (vehicleId) => {
            try {
                const response = await DataService.get(`/vehicle/${vehicleId}`);
                console.log("Details fetched of a vehicle", response.data);
                const vehicleDetails = response.data.Vehicle;
                return vehicleDetails;
            } catch (error) {
                console.error("Error fetching vehicle details:", error);
                if (error.response) {
                    console.error("Error response:", error.response);
                }
            }
        };

        const updateVehicleDetails = async (vehicleId, updatedDetails) => {
            try {
                const response = await DataService.put(
                    `/vehicle/${vehicleId}`,
                    updatedDetails,
                );
                console.log("Vehicle updated successfully:", response.data);
            } catch (error) {
                console.error("Error updating driver details:", error);
                if (error.response) {
                    console.error("Error response:", error.response);
                }
            }
        };

        onMounted(async () => {
            const vehicleDetails = await fetchVehicleDetails(props.id);
            Object.assign(formState, vehicleDetails);
        });

        const handleFinish = async () => {
            try {
                isLoading.value = true;

                await updateVehicleDetails(props.id, formState);
                toast.success("Vehicle updated successfully!");
                // router.push({
                //     path: `/app/drivers/edit/${props.id}`,
                //     query: { _r: Date.now() },
                // });

                console.log("Vehicle details updated successfully");
            } catch (error) {
                toast.error("Error updating vehicle details");
                console.error("Error updating vehicle details:", error);
            } finally {
                isLoading.value = false;
            }
        };

        const handleFinishFailed = (errors) => {
            console.log(errors);
        };

        const handleCancel = () => {
            router.push(`/app/vehicles`);
        };

        return {
            formState,
            handleFinish,
            handleFinishFailed,
            handleCancel,
        };
    },
});

export default VehicleEdit;
</script>

<style scoped>
.loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}
</style>
